import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { suraList } from '@/data/quran-metadata';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Search, BookOpen, Moon, Sun, Play, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Index() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { lastPlayed, playAyat } = useAudioPlayer();
  const { isDark, toggle: toggleDark } = useDarkMode();

  const lastSura = lastPlayed ? suraList.find(s => s.number === lastPlayed.sura) : null;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return suraList;

    const match = q.match(/^(\d+):(\d+)$/);
    if (match) {
      navigate(`/sura/${match[1]}/ayat/${match[2]}`);
      return suraList;
    }

    return suraList.filter(s =>
      s.number.toString().includes(q) ||
      s.nameBangla.toLowerCase().includes(q) ||
      s.nameArabic.includes(q) ||
      s.nameEnglish.toLowerCase().includes(q)
    );
  }, [search, navigate]);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold">কুরআন বাংলা অনুবাদ</h1>
              <p className="text-sm opacity-80">অডিও প্লেয়ার</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => navigate('/search')}
                title="সার্চ"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => navigate('/bookmarks')}
                title="বুকমার্ক"
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={toggleDark}
                title={isDark ? 'লাইট মোড' : 'ডার্ক মোড'}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="সূরা খুঁজুন... (নাম, নম্বর, বা ২:২৫৫)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 bg-primary-foreground text-foreground"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-4">
        {/* Last Played Resume */}
        {lastSura && lastPlayed && (
          <div className="mb-4 rounded-lg border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-2">শেষ শোনা</p>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                {lastSura.number}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{lastSura.nameBangla} <span className="text-muted-foreground font-['Amiri']">{lastSura.nameArabic}</span></p>
                <p className="text-xs text-muted-foreground">আয়াত {lastPlayed.ayat}</p>
              </div>
              <Button size="sm" className="gap-1" onClick={() => playAyat(lastPlayed.sura, lastPlayed.ayat, true)}>
                <Play className="h-4 w-4" />
                চালান
              </Button>
              <Button size="sm" variant="outline" onClick={() => navigate(`/sura/${lastPlayed.sura}`)}>
                দেখুন
              </Button>
            </div>
          </div>
        )}

        {/* Sura List */}
        <div className="grid gap-2">
          {filtered.map(sura => (
            <Link
              key={sura.number}
              to={`/sura/${sura.number}`}
              className="flex items-center gap-4 rounded-xl border bg-card p-4 transition-all duration-200 hover:bg-accent hover:shadow-md hover:-translate-y-0.5 group"
            >
              <div className="sura-number-badge flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground font-bold text-sm shrink-0">
                {sura.number}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{sura.nameBangla}</span>
                  <span className="text-sm text-muted-foreground font-['Amiri']">{sura.nameArabic}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span>{sura.ayatCount} আয়াত</span>
                  <span>•</span>
                  <span>{sura.revelationType}</span>
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
        </div>
      </main>
    </div>
  );
}
