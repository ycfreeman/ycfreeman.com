import { slug } from "github-slugger";
import { allCoreContent, sortPosts } from "@/lib/content";
import siteMetadata from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayoutWithTags";
import { allBlogs } from "content-collections";
import { genPageMetadata } from "app/seo";
import { Metadata } from "next";
import { tagData } from "app/tag-data";

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURI((await params).tag);
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
  });
}

export const generateStaticParams = async () => {
  const tagCounts = await tagData;
  const tagKeys = Object.keys(tagCounts);
  const paths = tagKeys.map((tag) => ({
    tag: tag,
  }));
  return paths;
};

export default async function TagPage({ params }: Props) {
  const tag = decodeURI((await params).tag);
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(" ").join("-").slice(1);
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) => post.tags && post.tags.map((t) => slug(t)).includes(tag),
      ),
    ),
  );
  return (
    <ListLayout posts={filteredPosts} title={title} tagData={await tagData} />
  );
}
