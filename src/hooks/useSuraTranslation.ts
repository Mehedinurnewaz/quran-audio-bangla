import { useQuery } from '@tanstack/react-query';

interface AyatTranslation {
  number: number;
  text: string;
  numberInSurah: number;
}

interface QuranApiResponse {
  code: number;
  data: {
    ayahs: AyatTranslation[];
  };
}

async function fetchSuraTranslation(suraNumber: number): Promise<string[]> {
  const res = await fetch(`https://api.alquran.cloud/v1/surah/${suraNumber}/bn.bengali`);
  if (!res.ok) throw new Error('Failed to fetch translation');
  const data: QuranApiResponse = await res.json();
  return data.data.ayahs.map(a => a.text);
}

export function useSuraTranslation(suraNumber: number) {
  return useQuery({
    queryKey: ['sura-translation', suraNumber],
    queryFn: () => fetchSuraTranslation(suraNumber),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
  });
}
