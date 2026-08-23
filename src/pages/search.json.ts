import type { APIRoute } from "astro";
import { getBlogs, sortPosts } from "@/lib/content";

export const GET: APIRoute = async () => {
  const documents = sortPosts(await getBlogs()).map(
    ({ entry: _entry, ...post }) => post,
  );
  return new Response(JSON.stringify(documents), {
    headers: { "Content-Type": "application/json" },
  });
};
