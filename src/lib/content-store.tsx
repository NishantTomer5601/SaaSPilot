import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { contentItems as seedItems, type ContentItem } from "@/data/content";

interface ContentStore {
  items: ContentItem[];
  loading: boolean;
  /** Re-fetch from the API (e.g. after the admin adds a link). */
  refresh: () => Promise<void>;
}

const ContentContext = createContext<ContentStore>({
  items: seedItems,
  loading: false,
  refresh: async () => {},
});

export function ContentProvider({ children }: { children: ReactNode }) {
  // Start from the static seed so SSR/prerender render real content,
  // then replace with live data from the API after hydration.
  const [items, setItems] = useState<ContentItem[]>(seedItems);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/resources");
      if (res.ok) setItems(await res.json());
    } catch {
      // Keep the seed/last-known data if the API is unreachable.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <ContentContext.Provider value={{ items, loading, refresh }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
