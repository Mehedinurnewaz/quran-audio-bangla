import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { suraList, paraList, getSurasInPara, getParasForSura } from '@/data/quran-metadata';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';
import { useAyatSearch } from '@/hooks/useAyatSearch';
import { ArrowLeft, Search, Play, BookOpen, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

type SearchMode = 'sura' | 'ayat';
type RevelationType = 'all' | 'মাক্কী' | 'মাদানী';

// Convert Bengali numerals to English
const banglaToEnglish = (str: string): string =>
  str.replace(/[০-৯]/g, d => '০১২৩৪৫৬৭৮৯'.indexOf(d).toString());

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [mode, setMode] = useState<SearchMode>('sura');
  const [selectedPara, setSelectedPara] = useState<string>('all');
  const [revelationType, setRevelationType] = useState<RevelationType>('all');
  const navigate = useNavigate();
  const { playAyat } = useAudioPlayer();

  // Check if query is a sura:ayat pattern (supports both Bengali & English digits)
  const normalizedQuery = banglaToEnglish(query.trim());
  const ayatNavMatch = normalizedQuery.match(/^(\d{1,3})\s*[:।]\s*(\d{1,3})$/);

  // Debounce for ayat search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(t);
  }, [query]);

  const { data: ayatResults, isLoading: ayatLoading } = useAyatSearch(
    mode === 'ayat' && !ayatNavMatch ? debouncedQuery : ''
  );

  // Sura filtering
  const filteredSuras = useMemo(() => {
    let list = [...suraList];

    // Para filter
    if (selectedPara !== 'all') {
      const paraSuras = getSurasInPara(Number(selectedPara));
      list = list.filter(s => paraSuras.includes(s.number));
    }

    // Revelation type filter
    if (revelationType !== 'all') {
      list = list.filter(s => s.revelationType === revelationType);
    }

    // Text search (support both Bengali and English digits)
    const q = banglaToEnglish(query.trim()).toLowerCase();
    if (q) {
      list = list.filter(s =>
        s.number.toString().includes(q) ||
        s.nameBangla.toLowerCase().includes(q) ||
        s.nameArabic.includes(query.trim()) ||
        s.nameEnglish.toLowerCase().includes(q)
      );
    }

    return list;
  }, [query, selectedPara, revelationType]);

  const highlightMatch = (text: string, keyword: string) => {
    if (!keyword.trim()) return text;
    const idx = text.toLowerCase().indexOf(keyword.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-primary/20 text-foreground rounded px-0.5">{text.slice(idx, idx + keyword.length)}</mark>
        {text.slice(idx + keyword.length)}
      </>
    );
  };

  const clearFilters = () => {
    setSelectedPara('all');
    setRevelationType('all');
    setQuery('');
  };

  const hasActiveFilters = selectedPara !== 'all' || revelationType !== 'all';

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">সার্চ করুন</h1>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={mode === 'sura' ? 'সূরা নাম, নম্বর বা ২:২৫৫ / 2:255...' : 'বাংলায় খুঁজুন বা ২:২৫৫ / 2:255...'}
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-10 pr-10 bg-primary-foreground text-foreground"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-4">
        {/* Tabs */}
        <Tabs value={mode} onValueChange={(v) => { setMode(v as SearchMode); setQuery(''); }} className="mb-4">
          <TabsList className="w-full">
            <TabsTrigger value="sura" className="flex-1 gap-1.5">
              <BookOpen className="h-4 w-4" />
              সূরা খুঁজুন
            </TabsTrigger>
            <TabsTrigger value="ayat" className="flex-1 gap-1.5">
              <Search className="h-4 w-4" />
              আয়াত খুঁজুন
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters (sura mode) */}
        {mode === 'sura' && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-muted-foreground" />

            <Select value={selectedPara} onValueChange={setSelectedPara}>
              <SelectTrigger className="w-[160px] h-9 text-sm">
                <SelectValue placeholder="পারা বাছাই" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব পারা</SelectItem>
                {paraList.map(p => (
                  <SelectItem key={p.number} value={p.number.toString()}>
                    পারা {p.number} — {p.nameBangla}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={revelationType} onValueChange={(v) => setRevelationType(v as RevelationType)}>
              <SelectTrigger className="w-[130px] h-9 text-sm">
                <SelectValue placeholder="প্রকার" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব প্রকার</SelectItem>
                <SelectItem value="মাক্কী">মাক্কী</SelectItem>
                <SelectItem value="মাদানী">মাদানী</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 text-xs gap-1">
                <X className="h-3 w-3" />
                ফিল্টার মুছুন
              </Button>
            )}
          </div>
        )}

        {/* Results */}
        {mode === 'sura' ? (
          <div className="grid gap-2">
            {filteredSuras.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p className="text-lg">কোন সূরা পাওয়া যায়নি</p>
                <p className="text-sm mt-1">অন্য কিছু লিখে চেষ্টা করুন</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-1">{filteredSuras.length}টি সূরা</p>
                {filteredSuras.map(sura => (
                  <Link
                    key={sura.number}
                    to={`/sura/${sura.number}`}
                    className="flex items-center gap-4 rounded-xl border bg-card p-4 transition-all duration-200 hover:bg-accent/50 hover:shadow-md hover:-translate-y-0.5 group"
                  >
                    <div className="sura-number-badge flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground font-bold text-sm shrink-0">
                      {sura.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold">{highlightMatch(sura.nameBangla, query)}</span>
                        <span className="text-sm text-muted-foreground font-['Amiri']">{sura.nameArabic}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <span>{sura.ayatCount} আয়াত</span>
                        <span>•</span>
                        <span>{sura.revelationType}</span>
                        <span>•</span>
                        <span>পারা {getParasForSura(sura.number).join(', ')}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 shrink-0 text-primary hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        playAyat(sura.number, sura.number !== 9 ? 0 : 1, true);
                      }}
                      title="পুরো সূরা শুনুন"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <Badge variant="secondary" className="hidden sm:flex text-xs">
                      {sura.nameEnglish}
                    </Badge>
                  </Link>
                ))}
              </>
            )}
          </div>
        ) : (
          /* Ayat Search Results */
          <div className="grid gap-3">
            {/* Direct ayat navigation card */}
            {ayatNavMatch && (() => {
              const sNum = Number(ayatNavMatch[1]);
              const aNum = Number(ayatNavMatch[2]);
              const sura = suraList.find(s => s.number === sNum);
              if (!sura || aNum < 1 || aNum > sura.ayatCount) return (
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-center text-sm text-destructive">
                  সূরা {sNum}, আয়াত {aNum} পাওয়া যায়নি
                </div>
              );
              return (
                <Link
                  to={`/sura/${sNum}/ayat/${aNum}`}
                  className="flex items-center gap-4 rounded-xl border-2 border-primary/40 bg-primary/5 p-4 transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className="sura-number-badge flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground font-bold text-sm shrink-0">
                    {sNum}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{sura.nameBangla} <span className="text-muted-foreground font-['Amiri']">{sura.nameArabic}</span></p>
                    <p className="text-sm text-muted-foreground">আয়াত {aNum} এ যান →</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-primary"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); playAyat(sNum, aNum, false); }}
                    title="এই আয়াত শুনুন"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </Link>
              );
            })()}

            {!ayatNavMatch && !debouncedQuery.trim() ? (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p className="text-lg">আয়াত সার্চ করুন</p>
                <p className="text-sm mt-1">বাংলায় লিখুন: "রহমান", "নামাজ" অথবা ২:২৫৫ / 2:255</p>
              </div>
            ) : ayatLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="rounded-xl border bg-card p-4 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))
            ) : ayatResults && ayatResults.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-1">{ayatResults.length}টি আয়াত পাওয়া গেছে</p>
                {ayatResults.map((ayat, idx) => {
                  const suraInfo = suraList.find(s => s.number === ayat.surah.number);
                  return (
                    <Link
                      key={`${ayat.surah.number}-${ayat.numberInSurah}-${idx}`}
                      to={`/sura/${ayat.surah.number}/ayat/${ayat.numberInSurah}`}
                      className="block rounded-xl border bg-card p-4 transition-all hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="sura-number-badge flex h-9 w-9 items-center justify-center bg-primary/10 text-primary font-bold text-xs shrink-0 mt-0.5">
                          {ayat.numberInSurah}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-sm font-semibold text-primary">
                              {suraInfo?.nameBangla || ayat.surah.name}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {ayat.surah.number}:{ayat.numberInSurah}
                            </Badge>
                          </div>
                          <p className="text-sm leading-relaxed">
                            {highlightMatch(ayat.text, debouncedQuery)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 shrink-0 text-primary hover:bg-primary/10"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            playAyat(ayat.surah.number, ayat.numberInSurah, false);
                          }}
                          title="এই আয়াত শুনুন"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </Link>
                  );
                })}
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p className="text-lg">কোন আয়াত পাওয়া যায়নি</p>
                <p className="text-sm mt-1">অন্য কিছু লিখে চেষ্টা করুন</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
