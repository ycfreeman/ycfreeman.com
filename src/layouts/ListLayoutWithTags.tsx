import { slug } from "github-slugger";
import Link from "@/components/Link";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import { formatDate } from "@/lib/formatDate";
import type { Blog } from "@/lib/content";

interface Props {
  posts: Blog[];
  title: string;
  initialDisplayPosts?: Blog[];
  pagination?: { totalPages: number; currentPage: number };
  tagData: Record<string, number>;
  pathname: string;
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  tagData,
  pathname,
}: Props) {
  const sortedTags = Object.keys(tagData).sort(
    (a, b) => tagData[b] - tagData[a],
  );
  const displayPosts = initialDisplayPosts.length ? initialDisplayPosts : posts;
  const previousPage = pagination && pagination.currentPage > 1;
  const nextPage = pagination && pagination.currentPage < pagination.totalPages;

  return (
    <div>
      <div className="pt-6 pb-6">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          {title}
        </h1>
      </div>
      <div className="flex sm:space-x-24">
        <div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
          <div className="px-6 py-4">
            {pathname.startsWith("/blog") ? (
              <h3 className="text-primary-500 font-bold uppercase">
                All Posts
              </h3>
            ) : (
              <Link
                href="/blog"
                className="hover:text-primary-500 dark:hover:text-primary-500 font-bold text-gray-700 uppercase dark:text-gray-300"
              >
                All Posts
              </Link>
            )}
            <ul>
              {sortedTags.map((tag) => (
                <li key={tag} className="my-3">
                  {pathname.split("/tags/")[1] === slug(tag) ? (
                    <h3 className="text-primary-500 inline px-3 py-2 text-sm font-bold uppercase">
                      {`${tag} (${tagData[tag]})`}
                    </h3>
                  ) : (
                    <Link
                      href={`/tags/${slug(tag)}`}
                      className="hover:text-primary-500 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
                      aria-label={`View posts tagged ${tag}`}
                    >
                      {`${tag} (${tagData[tag]})`}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <ul>
            {displayPosts.map((post) => (
              <li key={post.path} className="py-5">
                <article className="flex flex-col space-y-2 xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                      <time dateTime={post.date}>
                        {formatDate(post.date, siteMetadata.locale)}
                      </time>
                    </dd>
                  </dl>
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-2xl leading-8 font-bold tracking-tight">
                        <Link
                          href={`/${post.path}`}
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <div className="flex flex-wrap">
                        {post.tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      {post.summary}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <div className="space-y-2 pt-6 pb-8 md:space-y-5">
              <nav className="flex justify-between">
                {!previousPage ? (
                  <button className="cursor-auto disabled:opacity-50" disabled>
                    Previous
                  </button>
                ) : (
                  <Link
                    href={
                      pagination.currentPage === 2
                        ? "/blog"
                        : `/blog/page/${pagination.currentPage - 1}`
                    }
                    rel="prev"
                  >
                    Previous
                  </Link>
                )}
                <span>{`${pagination.currentPage} of ${pagination.totalPages}`}</span>
                {!nextPage ? (
                  <button className="cursor-auto disabled:opacity-50" disabled>
                    Next
                  </button>
                ) : (
                  <Link
                    href={`/blog/page/${pagination.currentPage + 1}`}
                    rel="next"
                  >
                    Next
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
