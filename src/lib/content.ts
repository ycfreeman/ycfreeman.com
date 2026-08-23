import { getCollection, type CollectionEntry } from "astro:content";
import GithubSlugger from "github-slugger";
import readingTime from "reading-time";
import siteMetadata from "@/data/siteMetadata";
import { extractTocHeadings } from "@/lib/mdx-plugins.mjs";

export type TocItem = {
  value: string;
  url: string;
  depth: number;
};

export type Blog = CollectionEntry<"blogs">["data"] & {
  entry: CollectionEntry<"blogs">;
  readingTime: ReturnType<typeof readingTime>;
  slug: string;
  path: string;
  filePath: string;
  toc: TocItem[];
  structuredData: Record<string, unknown>;
};

export type Author = CollectionEntry<"authors">["data"] & {
  entry: CollectionEntry<"authors">;
  readingTime: ReturnType<typeof readingTime>;
  slug: string;
  path: string;
  filePath: string;
  toc: TocItem[];
};

let blogsPromise: Promise<Blog[]> | undefined;
let authorsPromise: Promise<Author[]> | undefined;

export function getBlogs() {
  return (blogsPromise ||= getCollection("blogs").then((entries) =>
    Promise.all(
      entries
        .filter((entry) => !import.meta.env.PROD || entry.data.draft !== true)
        .map(async (entry) => {
          const slug = entry.id;
          const path = `blog/${slug}`;
          return {
            ...entry.data,
            entry,
            readingTime: readingTime(entry.body || ""),
            slug,
            path,
            filePath: `blog/${slug}.mdx`,
            toc: await extractTocHeadings(entry.body || ""),
            structuredData: {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: entry.data.title,
              datePublished: entry.data.date,
              dateModified: entry.data.lastmod || entry.data.date,
              description: entry.data.summary,
              image:
                typeof entry.data.images === "string"
                  ? entry.data.images
                  : entry.data.images?.[0] || siteMetadata.socialBanner,
              url: `${siteMetadata.siteUrl}/${path}`,
            },
          };
        }),
    ),
  ));
}

export function getAuthors() {
  return (authorsPromise ||= getCollection("authors").then((entries) =>
    Promise.all(
      entries.map(async (entry) => ({
        ...entry.data,
        entry,
        readingTime: readingTime(entry.body || ""),
        slug: entry.id,
        path: `authors/${entry.id}`,
        filePath: `authors/${entry.id}.mdx`,
        toc: await extractTocHeadings(entry.body || ""),
      })),
    ),
  ));
}

export function sortPosts(posts: Blog[]) {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getTagData(posts: Blog[]) {
  const tagCount: Record<string, number> = {};
  for (const post of posts) {
    const slugger = new GithubSlugger();
    for (const tag of post.tags) {
      const formattedTag = slugger.slug(tag);
      tagCount[formattedTag] = (tagCount[formattedTag] || 0) + 1;
    }
  }
  return tagCount;
}
