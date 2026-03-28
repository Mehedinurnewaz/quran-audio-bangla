import { useNavigate } from 'react-router-dom';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';
import { suraList } from '@/data/quran-metadata';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X, Repeat, Repeat1, Navigation } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function formatTime(s: number) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5];

export default function BottomPlayer() {
  const navigate = useNavigate();
  const {
    currentSura, currentAyat, isPlaying, duration, currentTime, volume,
    togglePlay, seekTo, setVolume, playNext, playPrev, stop,
    repeatMode, cycleRepeatMode, playbackSpeed, setPlaybackSpeed,
  } = useAudioPlayer();

  if (!currentSura || currentAyat === null || currentAyat === undefined) return null;

  const sura = suraList.find(s => s.number === currentSura);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const repeatIcon = repeatMode === 'single'
    ? <Repeat1 className="h-4 w-4" />
    : <Repeat className="h-4 w-4" />;

  const repeatLabel = repeatMode === 'none' ? '' : repeatMode === 'single' ? '১' : 'সূরা';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-in">
      {/* Glassmorphism container */}
      <div className="border-t border-border/50 bg-card/80 backdrop-blur-2xl shadow-[0_-8px_32px_-8px_hsl(var(--primary)/0.15)]">
        {/* Top progress bar - thin, elegant */}
        <div className="relative h-1 w-full bg-muted/50 cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            seekTo(pct * (duration || 1));
          }}
        >
          <div
            className="absolute inset-y-0 left-0 bg-primary transition-all duration-150 group-hover:h-1.5"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `${progress}%`, transform: `translateX(-50%) translateY(-50%)` }}
          />
        </div>

        <div className="mx-auto max-w-4xl px-3 py-2">
          {/* Mobile: stacked layout, Desktop: single row */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Info section */}
            <div className="flex-1 min-w-0 flex items-center gap-2">
              {/* Sura badge */}
              <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{currentSura}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate leading-tight">
                  {sura?.nameBangla}
                  <span className="text-muted-foreground font-normal ml-1 text-xs hidden sm:inline">({sura?.nameArabic})</span>
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>{currentAyat === 0 ? 'বিসমিল্লাহ' : `আয়াত ${currentAyat}`}</span>
                  <span className="text-border">•</span>
                  <span>{currentAyat}/{sura?.ayatCount}</span>
                  <span className="text-border hidden sm:inline">•</span>
                  <span className="hidden sm:inline">{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-primary hover:bg-primary/10"
                onClick={() => navigate(`/sura/${currentSura}/ayat/${currentAyat}`)}
                title="এই আয়াতে যান"
              >
                <Navigation className="h-4 w-4" />
              </Button>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              {/* Repeat */}
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 relative hidden sm:flex ${repeatMode !== 'none' ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={cycleRepeatMode}
                title={repeatMode === 'none' ? 'রিপিট বন্ধ' : repeatMode === 'single' ? 'একটি আয়াত রিপিট' : 'সূরা রিপিট'}
              >
                {repeatIcon}
                {repeatMode !== 'none' && (
                  <span className="absolute -top-0.5 -right-0.5 text-[8px] font-bold text-primary">{repeatLabel}</span>
                )}
              </Button>

              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={playPrev}>
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="h-10 w-10 rounded-full shadow-lg shadow-primary/20 transition-transform active:scale-95"
                onClick={togglePlay}
              >
                {isPlaying
                  ? <Pause className="h-5 w-5" />
                  : <Play className="h-5 w-5 ml-0.5" />
                }
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={playNext}>
                <SkipForward className="h-4 w-4" />
              </Button>

              {/* Speed - hidden on very small screens */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className={`h-8 w-8 text-xs font-bold hidden sm:flex ${playbackSpeed !== 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                    {playbackSpeed}x
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  {SPEEDS.map(s => (
                    <DropdownMenuItem key={s} onClick={() => setPlaybackSpeed(s)} className={playbackSpeed === s ? 'bg-primary/10 text-primary' : ''}>
                      {s}x
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Volume + Close */}
            <div className="flex items-center gap-1">
              {/* Volume toggle - visible on all screens */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => setVolume(volume === 0 ? 1 : 0)}
              >
                {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={([v]) => setVolume(v / 100)}
                className="w-16 hidden sm:flex"
              />
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={stop}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
