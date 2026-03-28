import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AudioPlayerProvider } from "@/contexts/AudioPlayerContext";
import BottomPlayer from "@/components/BottomPlayer";
import Index from "./pages/Index";
import SuraDetail from "./pages/SuraDetail";
import Bookmarks from "./pages/Bookmarks";
import SearchPage from "./pages/Search";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/quran-audio-bangla">
        <AudioPlayerProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sura/:suraNumber" element={<SuraDetail />} />
            <Route path="/sura/:suraNumber/ayat/:ayatNumber" element={<SuraDetail />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomPlayer />
        </AudioPlayerProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

