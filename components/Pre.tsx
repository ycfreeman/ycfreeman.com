"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useRef, useState } from "react";

export default function Pre(props: ComponentPropsWithoutRef<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(ref.current?.textContent || "");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="group relative">
      <button
        type="button"
        aria-label="Copy code"
        onClick={copyCode}
        className={`absolute top-2 right-2 hidden h-8 rounded border-2 bg-gray-700 px-2 text-xs text-gray-200 group-hover:block ${
          copied ? "border-green-400 text-green-400" : "border-gray-300"
        }`}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre ref={ref} {...props} />
    </div>
  );
}
