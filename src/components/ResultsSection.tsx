import React from 'react';
import { Sparkles } from 'lucide-react';
import { VariationCard } from './VariationCard';
import { SkeletonCard } from './SkeletonCard';
import { ComponentVariation } from '../services/gemini';

interface ResultsSectionProps {
  variations: ComponentVariation[];
  isGenerating: boolean;
  isGeneratingMore: boolean;
  handleGenerateMore: () => void;
}

export function ResultsSection({
  variations,
  isGenerating,
  isGeneratingMore,
  handleGenerateMore
}: ResultsSectionProps) {
  if (variations.length === 0 || isGenerating) return null;

  return (
    <section className="space-y-8 pb-24">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="text-2xl font-semibold">Generated Variations</h3>
        <span className="text-sm font-mono text-white/50">{variations.length} results</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {variations.map((variation, index) => (
          <VariationCard key={index} variation={variation} index={index} />
        ))}
        {isGeneratingMore && [0, 1, 2].map((i) => (
          <SkeletonCard key={`more-${i}`} index={variations.length + i} />
        ))}
      </div>

      {!isGeneratingMore && variations.length < 6 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleGenerateMore}
            className="group/btn relative flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-black bg-white hover:bg-gray-100 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#F27D26] to-[#FF4E00] opacity-0 group-hover/btn:opacity-10 transition-opacity"></div>
            <Sparkles className="w-4 h-4" />
            Generate 3 More
          </button>
        </div>
      )}
    </section>
  );
}
