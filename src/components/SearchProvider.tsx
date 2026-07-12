"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SearchDocument = {
  title: string;
  summary?: string;
  tags?: string[];
  path: string;
};

const SearchContext = createContext<(() => void) | null>(null);

export function useSearch() {
  const openSearch = useContext(SearchContext);
  if (!openSearch) {
    throw new Error("useSearch must be used inside SearchProvider");
  }
  return openSearch;
}

export default function SearchProvider({
  children,
  documentsPath = "search.json",
}: {
  children: ReactNode;
  documentsPath?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [documents, setDocuments] = useState<SearchDocument[]>([]);

  const openSearch = useCallback(() => setOpen(true), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (!isTyping && event.key === "/") {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open || documents.length) return;
    fetch(`/${documentsPath}`)
      .then((response) => (response.ok ? response.json() : []))
      .then((data) => setDocuments(Array.isArray(data) ? data : []))
      .catch(() => setDocuments([]));
  }, [documents.length, documentsPath, open]);

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    const candidates = value
      ? documents.filter((document) =>
          [document.title, document.summary, ...(document.tags || [])]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(value),
        )
      : documents;
    return candidates.slice(0, 10);
  }, [documents, query]);

  return (
    <SearchContext.Provider value={openSearch}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[15vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-xl overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-gray-900">
            <div className="border-b border-gray-200 p-4 dark:border-gray-700">
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search articles…"
                className="w-full bg-transparent text-lg text-gray-900 outline-none dark:text-gray-100"
              />
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {results.map((document) => (
                <li key={document.path}>
                  <Link
                    href={`/${document.path}`}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                    className="block rounded px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      {document.title}
                    </div>
                    {document.summary && (
                      <div className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                        {document.summary}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
              {!results.length && (
                <li className="px-3 py-6 text-center text-gray-500">
                  No articles found.
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </SearchContext.Provider>
  );
}
