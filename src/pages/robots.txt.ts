import type { APIRoute } from "astro";
import siteMetadata from "@/data/siteMetadata";

export const GET: APIRoute = () =>
  new Response(
    `User-Agent: *\nAllow: /\n\nHost: ${siteMetadata.siteUrl}\nSitemap: ${siteMetadata.siteUrl}/sitemap.xml`,
    { headers: { "Content-Type": "text/plain" } },
  );
