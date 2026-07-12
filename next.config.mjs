import createMDX from "@next/mdx";
import { withContentCollections } from "@content-collections/next";
import path from "node:path";

const root = process.cwd();

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      "remark-mdx-frontmatter",
      "remark-gfm",
      path.join(root, "lib/mdx-plugins.mjs"),
      "remark-math",
      "remark-emoji",
    ],
    rehypePlugins: [
      "rehype-slug",
      "rehype-autolink-headings",
      ["rehype-citation", { path: path.join(root, "data") }],
      ["rehype-prism-plus", { defaultLanguage: "js", ignoreMissing: true }],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.picsum.photos",
      },
      {
        protocol: "https",
        hostname: "**.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default withContentCollections(withMDX(nextConfig));
