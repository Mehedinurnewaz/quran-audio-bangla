import { useState, useCallback, useEffect } from 'react';

export interface Bookmark {
  sura: number;
  ayat: number;
}

const STORAGE_KEY = 'quran-bookmarks';

function loadBookmarks(): Bookmark[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(loadBookmarks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = useCallback((sura: number, ayat: number) => {
    return bookmarks.some(b => b.sura === sura && b.ayat === ayat);
  }, [bookmarks]);

  const toggleBookmark = useCallback((sura: number, ayat: number) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.sura === sura && b.ayat === ayat);
      if (exists) return prev.filter(b => !(b.sura === sura && b.ayat === ayat));
      return [...prev, { sura, ayat }];
    });
  }, []);

  const removeBookmark = useCallback((sura: number, ayat: number) => {
    setBookmarks(prev => prev.filter(b => !(b.sura === sura && b.ayat === ayat)));
  }, []);

  return { bookmarks, isBookmarked, toggleBookmark, removeBookmark };
}
