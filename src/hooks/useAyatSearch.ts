import { useQuery } from '@tanstack/react-query';

export interface AyatSearchResult {
  number: number;
  text: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
  };
  numberInSurah: number;
}

interface SearchResponse {
  code: number;
  status: string;
  data: {
    count: number;
    matches: AyatSearchResult[];
  };
}

async function searchAyat(keyword: string): Promise<AyatSearchResult[]> {
  if (!keyword || keyword.trim().length < 2) return [];
  const res = await fetch(
    `https://api.alquran.cloud/v1/search/${encodeURIComponent(keyword.trim())}/all/bn.bengali`
  );
  if (!res.ok) return [];
  const data: SearchResponse = await res.json();
  if (data.code !== 200 || !data.data?.matches) return [];
  return data.data.matches;
}

export function useAyatSearch(keyword: string) {
  return useQuery({
    queryKey: ['ayat-search', keyword],
    queryFn: () => searchAyat(keyword),
    enabled: keyword.trim().length >= 2,
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
}
