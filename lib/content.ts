export type CoreContent<T> = Omit<T, "_meta" | "mdxContent">;

type DatedContent = {
  date: string;
};

type DraftableContent = {
  draft?: boolean;
};

export function sortPosts<T extends DatedContent>(posts: T[]): T[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function coreContent<T extends object>(content: T): CoreContent<T> {
  const { _meta, mdxContent, ...core } = content as T & {
    _meta?: unknown;
    mdxContent?: unknown;
  };
  return core;
}

export function allCoreContent<T extends DraftableContent & object>(
  contents: T[],
): CoreContent<T>[] {
  return contents
    .filter((content) =>
      process.env.NODE_ENV === "production" ? content.draft !== true : true,
    )
    .map(coreContent);
}
