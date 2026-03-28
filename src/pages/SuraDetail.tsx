import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useCallback } from 'react';
import { suraList, getAudioUrl, getAppUrl } from '@/data/quran-metadata';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useSuraTranslation } from '@/hooks/useSuraTranslation';
import { Play, Pause, Share2, ArrowLeft, ListMusic, Copy, Link as LinkIcon, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function SuraDetail() {
  const { suraNumber, ayatNumber } = useParams();
  const navigate = useNavigate();
  const { currentSura, currentAyat, isPlaying, playAyat, togglePlay } = useAudioPlayer();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const ayatRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const suraNum = parseInt(suraNumber || '1');
  const sura = suraList.find(s => s.number === suraNum);
  const { data: translations, isLoading: translationLoading } = useSuraTranslation(suraNum);

  useEffect(() => {
    if (ayatNumber && sura) {
      const ayat = parseInt(ayatNumber);
      if (ayat >= 1 && ayat <= sura.ayatCount) {
        playAyat(suraNum, ayat);
      }
    }
  }, []);

  // Auto-scroll to currently playing ayat
  useEffect(() => {
    if (currentSura === suraNum && currentAyat !== null && currentAyat !== undefined) {
      const el = ayatRefs.current.get(currentAyat);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentAyat, currentSura, suraNum]);

  const setAyatRef = useCallback((ayat: number) => (el: HTMLDivElement | null) => {
    if (el) ayatRefs.current.set(ayat, el);
    else ayatRefs.current.delete(ayat);
  }, []);

  if (!sura) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>সূরা পাওয়া যায়নি</p>
      </div>
    );
  }

  const ayats = Array.from({ length: sura.ayatCount }, (_, i) => i + 1);
  const prevSura = suraList.find(s => s.number === suraNum - 1);
  const nextSura = suraList.find(s => s.number === suraNum + 1);

  const handleShare = (ayat: number, type: 'audio' | 'link') => {
    const url = type === 'audio'
      ? getAudioUrl(sura.number, ayat)
      : `${window.location.origin}${getAppUrl(sura.number, ayat)}`;
    navigator.clipboard.writeText(url);
    toast.success(type === 'audio' ? 'অডিও লিংক কপি হয়েছে!' : 'অ্যাপ লিংক কপি হয়েছে!');
  };

  const isCurrentAyat = (ayat: number) => currentSura === sura.number && currentAyat === ayat;

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{sura.nameBangla} <span className="font-['Amiri'] text-lg">{sura.nameArabic}</span></h1>
              <p className="text-xs opacity-80">{sura.ayatCount} আয়াত • {sura.revelationType} • {sura.nameEnglish}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-4">
        {/* Play all button */}
        <Button
          onClick={() => playAyat(sura.number, suraNum !== 9 ? 0 : 1, true)}
          className="w-full mb-4 gap-2"
          size="lg"
        >
          <ListMusic className="h-5 w-5" />
          পুরো সূরা শুনুন (প্লেলিস্ট)
        </Button>

        {/* Ayat list */}
        <div className="grid gap-2">
          {/* Bismillah row - except Sura 9 */}
          {suraNum !== 9 && (() => {
            const bismillahActive = currentSura === sura.number && currentAyat === 0;
            const bismillahBookmarked = isBookmarked(sura.number, 0);
            return (
              <div
                ref={setAyatRef(0)}
                className={`bismillah-row flex flex-col items-center gap-2 rounded-xl p-5 transition-all duration-300 ${
                  bismillahActive ? 'animate-pulse-glow border-primary ring-2 ring-primary/50 shadow-lg shadow-primary/10 border-l-4 border-l-primary' : ''
                }`}
              >
                <p className="text-2xl font-['Amiri'] text-primary leading-loose tracking-wide">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</p>
                <p className="text-sm text-muted-foreground">বিসমিল্লাহির রাহমানির রাহীম</p>

                <div className="flex items-center gap-1 mt-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      toggleBookmark(sura.number, 0);
                      toast.success(bismillahBookmarked ? 'বুকমার্ক সরানো হয়েছে' : 'বুকমার্ক যোগ হয়েছে ❤️');
                    }}
                  >
                    <Heart className={`h-4 w-4 ${bismillahBookmarked ? 'fill-destructive text-destructive' : ''}`} />
                  </Button>

                  <Button
                    variant={bismillahActive && isPlaying ? 'default' : 'ghost'}
                    size="icon"
                    className="h-9 w-9 rounded-full"
                    onClick={() => {
                      if (bismillahActive) togglePlay();
                      else playAyat(sura.number, 0);
                    }}
                  >
                    {bismillahActive && isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleShare(0, 'audio')}>
                        <Copy className="h-4 w-4 mr-2" />
                        অডিও URL কপি করুন
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })()}

          {ayats.map(ayat => {
            const active = isCurrentAyat(ayat);
            const bookmarked = isBookmarked(sura.number, ayat);
            return (
              <div
                key={ayat}
                ref={setAyatRef(ayat)}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 ${
                  active ? 'border-primary bg-primary/5 ring-2 ring-primary/50 shadow-lg shadow-primary/10 border-l-4 border-l-primary animate-pulse-glow' : 'bg-card hover:bg-accent'
                }`}
              >
                <div className={`sura-number-badge flex h-9 w-9 items-center justify-center text-sm font-bold shrink-0 self-start mt-1 ${
                  active ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                }`}>
                  {ayat}
                </div>

                <div className="flex-1 min-w-0">
                  {translations && translations[ayat - 1] ? (
                    <p className="text-sm leading-relaxed text-foreground">{translations[ayat - 1]}</p>
                  ) : translationLoading ? (
                    <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                  ) : (
                    <span className="text-sm text-muted-foreground">আয়াত {ayat}</span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {/* Bookmark */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      toggleBookmark(sura.number, ayat);
                      toast.success(bookmarked ? 'বুকমার্ক সরানো হয়েছে' : 'বুকমার্ক যোগ হয়েছে ❤️');
                    }}
                  >
                    <Heart className={`h-4 w-4 ${bookmarked ? 'fill-destructive text-destructive' : ''}`} />
                  </Button>

                  <Button
                    variant={active && isPlaying ? 'default' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      if (active) togglePlay();
                      else playAyat(sura.number, ayat);
                    }}
                  >
                    {active && isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleShare(ayat, 'audio')}>
                        <Copy className="h-4 w-4 mr-2" />
                        অডিও URL কপি করুন
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare(ayat, 'link')}>
                        <LinkIcon className="h-4 w-4 mr-2" />
                        অ্যাপ লিংক কপি করুন
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prev / Next Sura Navigation */}
        <div className="flex items-center justify-between mt-6 gap-4">
          {prevSura ? (
            <Button variant="outline" className="gap-2" onClick={() => navigate(`/sura/${prevSura.number}`)}>
              <ChevronLeft className="h-4 w-4" />
              {prevSura.nameBangla}
            </Button>
          ) : <div />}
          {nextSura ? (
            <Button variant="outline" className="gap-2" onClick={() => navigate(`/sura/${nextSura.number}`)}>
              {nextSura.nameBangla}
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : <div />}
        </div>
      </main>
    </div>
  );
}
