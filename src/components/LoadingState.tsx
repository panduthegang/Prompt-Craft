import React from 'react';
import { Loader2 } from 'lucide-react';
import { SkeletonCard } from './SkeletonCard';

export function LoadingState({ isGenerating }: { isGenerating: boolean }) {
  if (!isGenerating) return null;

  return (
    <section className="space-y-8 pb-24">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="text-2xl font-semibold flex items-center gap-3">
          <Loader2 className="w-6 h-6 text-[#F27D26] animate-spin" />
          Forging Components...
        </h3>
        <span className="text-sm font-mono text-[#F27D26] animate-pulse">Writing code</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <SkeletonCard key={i} index={i} />
        ))}
      </div>
    </section>
  );
}
