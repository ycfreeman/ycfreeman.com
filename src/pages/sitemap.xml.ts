import type { APIRoute } from "astro";
import siteMetadata from "@/data/siteMetadata";
import { getBlogs } from "@/lib/content";

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split("T")[0];
  const pages = ["", "blog", "projects", "tags"].map((route) => ({
    url: `${siteMetadata.siteUrl}/${route}`,
    lastModified: today,
  }));
  const posts = (await getBlogs()).map((post) => ({
    url: `${siteMetadata.siteUrl}/${post.path}`,
    lastModified: post.lastmod || post.date,
  }));
  const body = [...pages, ...posts]
    .map(
      ({ url, lastModified }) =>
        `<url><loc>${url}</loc><lastmod>${lastModified}</lastmod></url>`,
    )
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
};
