import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const entryId = ({ entry }: { entry: string }) => entry.replace(/\.mdx$/, "");
const date = z
  .union([z.string(), z.date()])
  .transform((value) =>
    typeof value === "string" ? value : value.toISOString().split("T")[0],
  );

const blogs = defineCollection({
  loader: glob({
    base: "./src/data/blog",
    pattern: "**/*.mdx",
    generateId: entryId,
  }),
  schema: z.object({
    title: z.string(),
    date,
    tags: z.array(z.string()).default([]),
    lastmod: date.optional(),
    draft: z.boolean().default(false),
    summary: z.string().optional(),
    images: z.union([z.string(), z.array(z.string())]).optional(),
    authors: z.array(z.string()).optional(),
    layout: z.string().optional(),
    bibliography: z.string().optional(),
    canonicalUrl: z.string().optional(),
  }),
});

const authors = defineCollection({
  loader: glob({
    base: "./src/data/authors",
    pattern: "**/*.mdx",
    generateId: entryId,
  }),
  schema: z.object({
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
  }),
});

export const collections = { blogs, authors };
