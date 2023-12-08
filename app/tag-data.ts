import { allBlogs } from "contentlayer/generated";
import GithubSlugger from "github-slugger";

const isProduction = process.env.NODE_ENV === "production";

const slugger = new GithubSlugger();
function createTagCount(allBlogs) {
  const tagCount: Record<string, number> = {};
  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = slugger.slug(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });

  return tagCount;
}

export const tagData = createTagCount(allBlogs);
