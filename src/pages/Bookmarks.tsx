import { useNavigate } from 'react-router-dom';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';
import { suraList } from '@/data/quran-metadata';
import { ArrowLeft, Heart, Play, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Bookmarks() {
  const navigate = useNavigate();
  const { bookmarks, removeBookmark } = useBookmarks();
  const { playAyat, currentSura, currentAyat, isPlaying } = useAudioPlayer();

  return (
    <div className="min-h-screen pb-28">
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Heart className="h-5 w-5" /> বুকমার্ক
              </h1>
              <p className="text-xs opacity-80">{bookmarks.length}টি আয়াত সংরক্ষিত</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-4">
        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Heart className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">কোনো বুকমার্ক নেই</p>
            <p className="text-sm">আয়াতের পাশে ❤️ চাপুন বুকমার্ক করতে</p>
          </div>
        ) : (
          <div className="grid gap-2">
            {bookmarks.map(({ sura, ayat }) => {
              const s = suraList.find(x => x.number === sura);
              if (!s) return null;
              const active = currentSura === sura && currentAyat === ayat;
              return (
                <div
                  key={`${sura}-${ayat}`}
                  className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
                    active && isPlaying ? 'border-primary bg-primary/5' : 'bg-card hover:bg-accent'
                  }`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary text-sm font-semibold shrink-0">
                    {sura}:{ayat}
                  </div>
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate(`/sura/${sura}`)}>
                    <p className="text-sm font-semibold truncate">{s.nameBangla} <span className="text-muted-foreground font-['Amiri']">{s.nameArabic}</span></p>
                    <p className="text-xs text-muted-foreground">আয়াত {ayat}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => playAyat(sura, ayat)}>
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeBookmark(sura, ayat)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
