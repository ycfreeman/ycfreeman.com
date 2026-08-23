import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import path from "node:path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCitation from "rehype-citation";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkEmoji from "remark-emoji";
import remarkMath from "remark-math";
import remarkCodeTitles from "./src/lib/mdx-plugins.mjs";

const root = process.cwd();

export default defineConfig({
  site: "https://ycfreeman.com",
  output: "static",
  outDir: "./out",
  build: { format: "file" },
  integrations: [react(), mdx()],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    syntaxHighlight: false,
    processor: unified({
      gfm: true,
      smartypants: false,
      remarkPlugins: [remarkCodeTitles, remarkMath, remarkEmoji],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypeCitation, { path: path.join(root, "src/data") }],
        [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
      ],
    }),
  },
});
