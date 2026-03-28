import React from 'react';
import { Sparkles, Hexagon } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-6 px-6 py-3 bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F27D26] to-[#FF4E00] flex items-center justify-center shadow-[0_0_15px_rgba(242,125,38,0.5)]">
            <Hexagon className="w-4 h-4 text-white fill-white/20" />
          </div>
          <h1 className="font-bold tracking-wide text-sm font-display">Nexus</h1>
        </div>
        <div className="w-px h-4 bg-white/20"></div>
        <div className="flex items-center gap-2 text-xs font-mono text-white/50">
          <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
          Gemini 3.1
        </div>
      </div>
    </header>
  );
}
