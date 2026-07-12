import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from "@content-collections/core";
import type { MDXContent } from "mdx/types";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";
import { extractTocHeadings } from "./lib/mdx-plugins.mjs";
import siteMetadata from "./data/siteMetadata";

const root = process.cwd();
const isProduction = process.env.NODE_ENV === "production";

const blogSchema = z.object({
  title: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  lastmod: z.string().optional(),
  draft: z.boolean().default(false),
  summary: z.string().optional(),
  images: z.union([z.string(), z.array(z.string())]).optional(),
  authors: z.array(z.string()).optional(),
  layout: z.string().optional(),
  bibliography: z.string().optional(),
  canonicalUrl: z.string().optional(),
});

const authorSchema = z.object({
  name: z.string(),
  avatar: z.string().optional(),
  occupation: z.string().optional(),
  company: z.string().optional(),
  email: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  paypal: z.string().optional(),
  layout: z.string().optional(),
});

function readMdx(directory: string, filePath: string) {
  const source = readFileSync(path.join(root, directory, filePath), "utf8");
  return matter(source).content;
}

function createSearchIndex<T extends object>(documents: T[]) {
  if (
    siteMetadata.search?.provider !== "kbar" ||
    !siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    return;
  }

  const searchDocuments = documents
    .filter((document) => {
      const blog = document as { draft?: boolean };
      return !isProduction || blog.draft !== true;
    })
    .map((document) => {
      const {
        _meta: _meta,
        mdxContent: _mdxContent,
        ...blog
      } = document as Record<string, unknown>;
      return blog;
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));

  writeFileSync(
    path.join(
      root,
      "public",
      siteMetadata.search.kbarConfig.searchDocumentsPath,
    ),
    JSON.stringify(searchDocuments),
  );
  console.log("Local search index generated...");
}

const blogs = defineCollection({
  name: "blogs",
  typeName: "Blog",
  directory: "./data/blog",
  include: "**/*.mdx",
  parser: "frontmatter-only",
  schema: blogSchema,
  transform: async ({ _meta, ...blog }) => {
    const content = readMdx("data/blog", _meta.filePath);
    const readTime = readingTime(content);
    const toc = (await extractTocHeadings(content)).map(
      ({ value, url, depth }) => ({ value, url, depth }),
    );
    const slug = _meta.path;
    const postPath = `blog/${slug}`;
    const mdxContent = createDefaultImport<MDXContent>(
      `@/data/blog/${_meta.filePath}`,
    );

    return {
      ...blog,
      mdxContent,
      readingTime: {
        text: readTime.text,
        time: readTime.time,
        words: readTime.words,
        minutes: readTime.minutes,
      },
      slug,
      path: postPath,
      filePath: `blog/${_meta.filePath}`,
      toc,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        datePublished: blog.date,
        dateModified: blog.lastmod || blog.date,
        description: blog.summary,
        image:
          typeof blog.images === "string"
            ? blog.images
            : blog.images?.[0] || siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${postPath}`,
      },
    };
  },
  onSuccess: createSearchIndex,
});

const authors = defineCollection({
  name: "authors",
  typeName: "Author",
  directory: "./data/authors",
  include: "**/*.mdx",
  parser: "frontmatter-only",
  schema: authorSchema,
  transform: async ({ _meta, ...author }) => {
    const content = readMdx("data/authors", _meta.filePath);
    const readTime = readingTime(content);
    const toc = (await extractTocHeadings(content)).map(
      ({ value, url, depth }) => ({ value, url, depth }),
    );
    const mdxContent = createDefaultImport<MDXContent>(
      `@/data/authors/${_meta.filePath}`,
    );

    return {
      ...author,
      mdxContent,
      readingTime: {
        text: readTime.text,
        time: readTime.time,
        words: readTime.words,
        minutes: readTime.minutes,
      },
      slug: _meta.path,
      path: `authors/${_meta.path}`,
      filePath: `authors/${_meta.filePath}`,
      toc,
    };
  },
});

export default defineConfig({
  content: [blogs, authors],
});
