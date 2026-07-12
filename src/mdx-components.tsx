import type { MDXComponents } from "mdx/types";
import { components as siteComponents } from "@/components/MDXComponents";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...siteComponents,
    ...components,
  };
}
