import { allBlogs } from "content-collections";
import { allCoreContent, sortPosts } from "@/lib/content";
import Main from "./Main";

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs);
  const posts = allCoreContent(sortedPosts);
  return <Main posts={posts} />;
}
