/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GISCUS_REPO?: string;
  readonly PUBLIC_GISCUS_REPOSITORY_ID?: string;
  readonly PUBLIC_GISCUS_CATEGORY?: string;
  readonly PUBLIC_GISCUS_CATEGORY_ID?: string;
  readonly PUBLIC_GOOGLE_ANALYTICS_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
