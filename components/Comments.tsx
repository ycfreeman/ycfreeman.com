"use client";

import Giscus, {
  type AvailableLanguage,
  type BooleanString,
  type Mapping,
  type Repo,
  type Theme,
} from "@giscus/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import siteMetadata from "@/data/siteMetadata";

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false);
  const { resolvedTheme } = useTheme();
  const config = siteMetadata.comments?.giscusConfig;

  return (
    <>
      {!loadComments && (
        <button onClick={() => setLoadComments(true)}>Load Comments</button>
      )}
      {loadComments &&
        config?.repo &&
        config.repositoryId &&
        config.categoryId && (
          <Giscus
            id="comments-container"
            repo={config.repo as Repo}
            repoId={config.repositoryId}
            category={config.category}
            categoryId={config.categoryId}
            mapping={config.mapping as Mapping}
            term={slug}
            reactionsEnabled={config.reactions as BooleanString}
            emitMetadata={config.metadata as BooleanString}
            inputPosition="bottom"
            theme={
              (resolvedTheme === "dark"
                ? config.darkTheme
                : config.theme) as Theme
            }
            lang={config.lang as AvailableLanguage}
            loading="lazy"
          />
        )}
    </>
  );
}
