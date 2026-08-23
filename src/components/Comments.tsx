import Giscus, {
  type AvailableLanguage,
  type BooleanString,
  type Mapping,
  type Repo,
  type Theme,
} from "@giscus/react";
import { useState, useSyncExternalStore } from "react";
import siteMetadata from "@/data/siteMetadata";
import { isDarkTheme, subscribeToTheme } from "@/lib/theme";

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false);
  const dark = useSyncExternalStore(subscribeToTheme, isDarkTheme, () => false);
  const config = siteMetadata.comments?.giscusConfig;
  const giscusConfig =
    config?.repo && config.repositoryId && config.category && config.categoryId
      ? {
          ...config,
          repo: config.repo as Repo,
          repositoryId: config.repositoryId,
          category: config.category,
          categoryId: config.categoryId,
        }
      : null;

  return (
    <>
      {!giscusConfig && (
        <p role="status">Comments are temporarily unavailable.</p>
      )}
      {giscusConfig && !loadComments && (
        <button onClick={() => setLoadComments(true)}>Load Comments</button>
      )}
      {giscusConfig && loadComments && (
        <Giscus
          id="comments-container"
          repo={giscusConfig.repo}
          repoId={giscusConfig.repositoryId}
          category={giscusConfig.category}
          categoryId={giscusConfig.categoryId}
          mapping={giscusConfig.mapping as Mapping}
          term={slug}
          reactionsEnabled={giscusConfig.reactions as BooleanString}
          emitMetadata={giscusConfig.metadata as BooleanString}
          inputPosition="bottom"
          theme={(dark ? giscusConfig.darkTheme : giscusConfig.theme) as Theme}
          lang={giscusConfig.lang as AvailableLanguage}
          loading="lazy"
        />
      )}
    </>
  );
}
