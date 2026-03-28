import React from 'react';
import { motion } from 'motion/react';
import { MatrixRain } from './MatrixRain';

export function SkeletonCard({ index }: { index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      className="bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px]"
    >
      <div className="px-6 py-5 border-b border-white/10 flex flex-col gap-4 bg-[#111]">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-white/10 animate-pulse" />
            <div className="h-5 w-32 bg-white/10 rounded animate-pulse" />
          </div>
          <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="flex gap-2 mt-2">
          <div className="h-8 w-20 bg-white/10 rounded-lg animate-pulse" />
          <div className="h-8 w-20 bg-white/10 rounded-lg animate-pulse" />
        </div>
      </div>
      <div className="relative flex-1 bg-[#050505] overflow-hidden">
        <MatrixRain />
      </div>
    </motion.div>
  );
}
