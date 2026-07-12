import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypeScript,
  {
    ignores: [
      ".content-collections/**",
      ".contentlayer/**",
      ".next/**",
      ".open-next/**",
      ".wrangler/**",
      "node_modules/**",
      "out/**",
      "next.config.js",
    ],
  },
];

export default eslintConfig;
