import React, { useState } from 'react';
import { Sparkles, Wand2, Loader2, RefreshCw, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { enhancePrompt, generateComponents, ComponentVariation } from './services/gemini';
import { cn } from './lib/utils';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VariationCard } from './components/VariationCard';
import { SkeletonCard } from './components/SkeletonCard';


export default function App() {
  const [prompt, setPrompt] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingMore, setIsGeneratingMore] = useState(false);
  const [variations, setVariations] = useState<ComponentVariation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState('gemini-3-flash-preview');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  const MODELS = [
    { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash', desc: 'Fastest & Balanced' },
    { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro', desc: 'Best Quality (Slower)' },
    { id: 'gemini-3.1-flash-lite-preview', name: 'Gemini 3.1 Flash Lite', desc: 'Ultra Fast' }
  ];

  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);
    setError(null);
    try {
      const enhanced = await enhancePrompt(prompt);
      setPrompt(enhanced);
    } catch (err: any) {
      setError(err.message || 'Failed to enhance prompt.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    setVariations([]);
    try {
      const results = await generateComponents(prompt, selectedModel);
      setVariations(results);
    } catch (err: any) {
      setError(err.message || 'Failed to generate components.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateMore = async () => {
    if (!prompt.trim() || isGeneratingMore) return;
    setIsGeneratingMore(true);
    setError(null);
    try {
      const results = await generateComponents(prompt, selectedModel);
      setVariations(prev => [...prev, ...results]);
    } catch (err: any) {
      setError(err.message || 'Failed to generate more components.');
    } finally {
      setIsGeneratingMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F27D26] selection:text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 bg-[#F27D26] blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      {/* Header */}
      <Header />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-12 space-y-16">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]"
          >
            Design at the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F27D26] via-[#FF4E00] to-[#FF8A00] animate-gradient-x">speed of thought.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/50 max-w-2xl mx-auto font-light"
          >
            Describe the component you need. We'll generate three distinct, production-ready Tailwind CSS variations instantly.
          </motion.p>
        </section>

        {/* Input Section */}
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
                <div className="mt-0.5">â</div>
                <p>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Results Section */}
        {variations.length > 0 && !isGenerating && (
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
        )}

        {/* Loading State */}
        {isGenerating && (
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
        )}

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

