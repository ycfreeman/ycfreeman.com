import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Link from "./Link";

type SearchResult = {
  url: string;
  excerpt: string;
  meta: { title: string };
};

type Pagefind = {
  debouncedSearch: (query: string) => Promise<{
    results: { data: () => Promise<SearchResult> }[];
  } | null>;
};

// A variable path keeps Vite from bundling the file `pagefind --site out` writes after the build.
const pagefindUrl = "/pagefind/pagefind.js";
let pagefind: Promise<Pagefind> | undefined;

const SearchContext = createContext<(() => void) | null>(null);

export function useSearch() {
  const openSearch = useContext(SearchContext);
  if (!openSearch) {
    throw new Error("useSearch must be used inside SearchProvider");
  }
  return openSearch;
}

export default function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

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
    const value = query.trim();
    if (!open || !value) {
      setResults([]);
      return;
    }
    let cancelled = false;
    pagefind ??= import(/* @vite-ignore */ pagefindUrl);
    pagefind
      .then((api) => api.debouncedSearch(value))
      .then((search) =>
        search
          ? Promise.all(search.results.slice(0, 10).map((r) => r.data()))
          : null,
      )
      .then((data) => {
        if (data && !cancelled) setResults(data);
      })
      .catch(() => {
        if (!cancelled) setResults([]);
      });
    return () => {
      cancelled = true;
    };
  }, [open, query]);

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
              {results.map((result) => (
                <li key={result.url}>
                  <Link
                    href={result.url.replace(/\.html$/, "")}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                    className="block rounded px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      {result.meta.title}
                    </div>
                    <div
                      className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400"
                      dangerouslySetInnerHTML={{ __html: result.excerpt }}
                    />
                  </Link>
                </li>
              ))}
              {query.trim() !== "" && !results.length && (
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
