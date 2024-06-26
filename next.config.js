const { withContentlayer } = require("next-contentlayer");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app analytics.umami.is www.googletagmanager.com www.youtube.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src *.s3.amazonaws.com;
  connect-src *;
  font-src 'self';
  frame-src giscus.app www.youtube.com
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer];
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    eslint: {
      dirs: ["app", "components", "layouts", "scripts"],
    },
    images: {
      domains: [
        "picsum.photos",
        "gravatar.com",
        "avatars.githubusercontent.com",
      ],
    },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: securityHeaders,
        },
      ];
    },
    async rewrites() {
      return [
        // rewrite post wordpress legacy pages, that doesn't sit inside /blog
        {
          source: "/web-development/2016/04/09/website-now-on-github-pages",
          destination: "/blog/2016-04-09-website-now-on-github-pages",
        },
        {
          source: "/web-development/2016/07/20/cloudflare-and-travis-ci",
          destination: "/blog/2016-07-20-cloudflare-and-travis-ci",
        },
        {
          source: "/web-development/2017/08/27/openshift-not-free-anymore",
          destination: "/blog/2017-08-27-openshift-not-free-anymore",
        },
      ];
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      return config;
    },
  };

  return plugins.reduce((acc, next) => next(acc), nextConfig);
};
