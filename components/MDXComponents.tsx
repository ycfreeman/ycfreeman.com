import TOCInline from "./TOCInline";
import Pre from "./Pre";
import type { MDXComponents } from "mdx/types";
import Image from "./Image";
import CustomLink from "./Link";

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
};
