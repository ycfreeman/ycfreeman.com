import GithubSlugger from "github-slugger";
import { remark } from "remark";
import { visit } from "unist-util-visit";

/** @typedef {{ value: string, url: string, depth: number }} TocItem */

function nodeText(node) {
  if (typeof node?.value === "string") {
    return node.value;
  }
  if (Array.isArray(node?.children)) {
    return node.children.map(nodeText).join("");
  }
  return "";
}

export function remarkTocHeadings() {
  const slugger = new GithubSlugger();
  return (tree, file) => {
    /** @type {TocItem[]} */
    const toc = [];
    visit(tree, "heading", (node) => {
      const value = nodeText(node);
      toc.push({
        value,
        url: `#${slugger.slug(value)}`,
        depth: node.depth,
      });
    });
    file.data.toc = toc;
  };
}

/** @returns {Promise<TocItem[]>} */
export async function extractTocHeadings(markdown) {
  const file = await remark().use(remarkTocHeadings).process(markdown);
  return /** @type {TocItem[]} */ (file.data.toc || []);
}

export function remarkCodeTitles() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      const languageWithTitle = node.lang || "";
      const separator = languageWithTitle.indexOf(":");
      if (separator === -1 || !parent || index === undefined) {
        return;
      }

      const title = languageWithTitle.slice(separator + 1);
      if (!title) {
        return;
      }

      parent.children.splice(index, 0, {
        type: "mdxJsxFlowElement",
        name: "div",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "className",
            value: "remark-code-title",
          },
        ],
        children: [{ type: "text", value: title }],
      });
      node.lang = languageWithTitle.slice(0, separator);
    });
  };
}
