import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const outputDirectory = path.resolve("out");
const snapshotPath = new URL("./build-contract.json", import.meta.url);

function decode(value = "") {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)=(["'])(.*?)\2/g)].map((match) => [
      match[1],
      decode(match[3]),
    ]),
  );
}

function metadata(html) {
  const meta = {};
  for (const tag of html.match(/<meta\s[^>]*>/g) || []) {
    const values = attributes(tag);
    const key = values.name || values.property;
    if (key && values.content !== undefined) {
      (meta[key] ||= []).push(values.content);
    }
  }

  const links = (html.match(/<link\s[^>]*>/g) || [])
    .map(attributes)
    .filter(({ rel }) => rel === "canonical" || rel === "alternate")
    .map(({ rel, type, href }) => ({ rel, type, href }));
  const jsonLd = [
    ...html.matchAll(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].map((match) => JSON.parse(match[1]));

  return {
    title: decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1]),
    meta,
    links,
    jsonLd,
  };
}

function normalized(contract) {
  for (const page of Object.values(contract.html)) {
    delete page.meta["next-size-adjust"];
  }
  return contract;
}

async function files(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const relativePath = path.join(prefix, entry.name);
    if (entry.isDirectory()) {
      result.push(
        ...(await files(path.join(directory, entry.name), relativePath)),
      );
    } else {
      result.push(relativePath.split(path.sep).join("/"));
    }
  }
  return result;
}

async function capture() {
  const outputFiles = await files(outputDirectory);
  const documents = outputFiles
    .filter(
      (file) =>
        file.endsWith(".html") ||
        file === "robots.txt" ||
        file === "sitemap.xml" ||
        file === "search.json",
    )
    .sort();
  const html = Object.fromEntries(
    await Promise.all(
      documents
        .filter((file) => file.endsWith(".html"))
        .map(async (file) => [
          file,
          metadata(await readFile(path.join(outputDirectory, file), "utf8")),
        ]),
    ),
  );
  const sitemap = await readFile(
    path.join(outputDirectory, "sitemap.xml"),
    "utf8",
  );
  const search = JSON.parse(
    await readFile(path.join(outputDirectory, "search.json"), "utf8"),
  ).map(({ title, summary, tags, path }) => ({ title, summary, tags, path }));

  return {
    documents,
    html,
    sitemapUrls: [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
      (match) => match[1],
    ),
    robots: (
      await readFile(path.join(outputDirectory, "robots.txt"), "utf8")
    ).trim(),
    search,
  };
}

async function verifyInternalReferences() {
  const origin = "https://ycfreeman.com";
  const documentFiles = (await files(outputDirectory)).filter((file) =>
    file.endsWith(".html"),
  );
  const missing = [];

  for (const file of documentFiles) {
    const html = await readFile(path.join(outputDirectory, file), "utf8");
    const pagePath = file === "index.html" ? "/" : `/${file.slice(0, -5)}`;
    const pageUrl = new URL(pagePath, origin);

    for (const tag of html.match(/<(?:a|img|script|source)\s[^>]*>/g) || []) {
      const values = attributes(tag);
      const references = [values.href, values.src];
      if (values.srcset) {
        references.push(
          ...values.srcset
            .split(",")
            .map((candidate) => candidate.trim().split(/\s+/)[0]),
        );
      }

      for (const reference of references.filter(Boolean)) {
        const target = new URL(reference, pageUrl);
        if (target.origin !== origin) continue;

        const relativePath = decodeURIComponent(target.pathname).replace(
          /^\/+/,
          "",
        );
        const candidates = relativePath
          ? [
              path.join(outputDirectory, relativePath),
              path.join(outputDirectory, `${relativePath}.html`),
              path.join(outputDirectory, relativePath, "index.html"),
            ]
          : [path.join(outputDirectory, "index.html")];
        const exists = await Promise.all(
          candidates.map((candidate) =>
            stat(candidate).then(
              (value) => value.isFile(),
              () => false,
            ),
          ),
        );
        if (!exists.some(Boolean)) missing.push(`${file}: ${reference}`);
      }
    }
  }

  if (missing.length) {
    throw new Error(
      `The Astro build has missing internal references:\n${missing.join("\n")}`,
    );
  }
}

const actual = normalized(await capture());
await verifyInternalReferences();

if (process.argv.includes("--write")) {
  await writeFile(snapshotPath, `${JSON.stringify(actual, null, 2)}\n`);
  console.log(
    `Wrote ${actual.documents.length} document routes to ${snapshotPath.pathname}`,
  );
} else {
  const expected = normalized(JSON.parse(await readFile(snapshotPath, "utf8")));
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    const differences = Object.keys(expected).flatMap((key) => {
      if (key !== "html") {
        return JSON.stringify(actual[key]) === JSON.stringify(expected[key])
          ? []
          : [key];
      }
      return Object.keys(expected.html)
        .filter(
          (file) =>
            JSON.stringify(actual.html[file]) !==
            JSON.stringify(expected.html[file]),
        )
        .map((file) => `html:${file}`);
    });
    const firstHtmlDifference = differences.find((value) =>
      value.startsWith("html:"),
    );
    if (firstHtmlDifference) {
      const file = firstHtmlDifference.slice(5);
      console.error("Expected:", expected.html[file]);
      console.error("Actual:", actual.html[file]);
    }
    throw new Error(
      `The Astro build does not match scripts/build-contract.json: ${differences.join(", ")}`,
    );
  }
  console.log(
    `Verified ${actual.documents.length} document routes and their SEO contract.`,
  );
}
