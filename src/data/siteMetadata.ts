const siteMetadata = {
  title: "Ycfreeman's",
  author: "Freeman Man",
  headerTitle: "Ycfreeman's",
  description: `"Do" code for food 😄, have a wife, a kid and a cat, cook a bit and would squeeze time for tv, movies, manga and games.`,
  language: "en-AU",
  theme: "system",
  siteUrl: "https://ycfreeman.com",
  siteRepo: "https://github.com/ycfreeman/ycfreeman.com",
  siteLogo: "/static/images/logo.png",
  socialBanner: "/static/images/twitter-card.jpeg",
  email: "freeman@ycfreeman.com",
  github: "https://github.com/ycfreeman",
  twitter: undefined,
  facebook: undefined,
  youtube: undefined,
  linkedin: "https://www.linkedin.com",
  paypal: "https://paypal.me/ycfreeman",
  locale: "en-US",
  analytics: {
    googleAnalytics: {
      googleAnalyticsId: import.meta.env.PUBLIC_GOOGLE_ANALYTICS_ID,
    },
  },
  comments: {
    provider: "giscus",
    giscusConfig: {
      repo: import.meta.env.PUBLIC_GISCUS_REPO,
      repositoryId: import.meta.env.PUBLIC_GISCUS_REPOSITORY_ID,
      category: import.meta.env.PUBLIC_GISCUS_CATEGORY,
      categoryId: import.meta.env.PUBLIC_GISCUS_CATEGORY_ID,
      mapping: "pathname",
      reactions: "1",
      metadata: "0",
      theme: "light",
      darkTheme: "transparent_dark",
      themeURL: "",
      lang: "en",
    },
  },
  search: {
    provider: "kbar",
    kbarConfig: {
      searchDocumentsPath: "search.json",
    },
  },
};

export default siteMetadata;
