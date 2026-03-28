import React, { useState } from 'react';
import { Sparkles, Wand2, Loader2, RefreshCw, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { MODELS } from '../lib/constants';

interface PromptInputProps {
  prompt: string;
  setPrompt: (val: string) => void;
  isEnhancing: boolean;
  isGenerating: boolean;
  handleEnhance: () => void;
  handleGenerate: () => void;
  selectedModel: string;
  setSelectedModel: (val: string) => void;
  error: string | null;
}

export function PromptInput({
  prompt,
  setPrompt,
  isEnhancing,
  isGenerating,
  handleEnhance,
  handleGenerate,
  selectedModel,
  setSelectedModel,
  error
}: PromptInputProps) {
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  return (
    <section className="max-w-4xl mx-auto relative z-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative group"
      >
        {/* Spinning Border Wrapper */}
        <div className="relative p-[1px] rounded-[2rem] bg-white/10 shadow-2xl">
          {/* Spinning gradient */}
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#F27D26_360deg)] animate-[spin_3s_linear_infinite] opacity-100"></div>
          </div>
          
          {/* Inner Content */}
          <div className="relative bg-[#0A0A0A]/90 backdrop-blur-2xl rounded-[31px] p-3 flex flex-col">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your component... (e.g., 'A modern pricing card with a popular badge, dark mode, and a call to action button')"
              className="w-full h-40 bg-transparent text-white placeholder:text-white/30 resize-none outline-none p-5 text-lg custom-scrollbar"
            />
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 mt-2 bg-black/40 rounded-2xl border border-white/5 gap-3 sm:gap-0">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleEnhance}
                  disabled={isEnhancing || !prompt.trim() || isGenerating}
                  className="flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none justify-center"
                >
                  {isEnhancing ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-[#F27D26]" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-[#F27D26]" />
                  )}
                  {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
                </button>

                <div className="hidden sm:block h-6 w-px bg-white/10 mx-2"></div>

                <div className="relative flex-1 sm:flex-none">
                  <button
                    onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                    disabled={isGenerating}
                    className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2 px-3 py-3 sm:py-2 bg-white/5 sm:bg-transparent text-sm text-white/70 hover:text-white outline-none rounded-xl sm:rounded-lg hover:bg-white/10 sm:hover:bg-white/5 transition-all disabled:opacity-50"
                  >
                    {MODELS.find(m => m.id === selectedModel)?.name}
                    <ChevronDown className={cn("w-4 h-4 opacity-50 transition-transform", isModelDropdownOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isModelDropdownOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setIsModelDropdownOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 sm:left-0 right-0 sm:right-auto mt-2 w-full sm:w-64 p-1 bg-[#111] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                        >
                          {MODELS.map(model => (
                            <button
                              key={model.id}
                              onClick={() => {
                                setSelectedModel(model.id);
                                setIsModelDropdownOpen(false);
                              }}
                              className={cn(
                                "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex flex-col gap-0.5",
                                selectedModel === model.id 
                                  ? "bg-[#F27D26]/10 text-[#F27D26]" 
                                  : "text-white/70 hover:bg-white/5 hover:text-white"
                              )}
                            >
                              <span className="font-medium">{model.name}</span>
                              <span className="text-xs opacity-60">{model.desc}</span>
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim() || isEnhancing}
                className="group/btn relative flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-black bg-white hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#F27D26] to-[#FF4E00] opacity-0 group-hover/btn:opacity-10 transition-opacity"></div>
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Wand2 className="w-4 h-4" />
                )}
                {isGenerating ? 'Generating...' : 'Generate Variations'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3"
          >
            <div className="mt-0.5">⚠️</div>
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
