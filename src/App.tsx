import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Wand2, Loader2, Code2, Eye, Copy, Check, LayoutTemplate, RefreshCw, Aperture, Hexagon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { enhancePrompt, generateComponents, ComponentVariation } from './services/gemini';
import { cn } from './lib/utils';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [variations, setVariations] = useState<ComponentVariation[]>([]);
  const [error, setError] = useState<string | null>(null);

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
      const results = await generateComponents(prompt);
      setVariations(results);
    } catch (err: any) {
      setError(err.message || 'Failed to generate components.');
    } finally {
      setIsGenerating(false);
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
        <section className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            {/* Spinning Border Wrapper */}
            <div className="relative p-[1px] rounded-[2rem] overflow-hidden bg-white/10 shadow-2xl">
              {/* Spinning gradient */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#F27D26_360deg)] animate-[spin_3s_linear_infinite] opacity-100"></div>
              
              {/* Inner Content */}
              <div className="relative bg-[#0A0A0A]/90 backdrop-blur-2xl rounded-[31px] p-3 flex flex-col">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your component... (e.g., 'A modern pricing card with a popular badge, dark mode, and a call to action button')"
                  className="w-full h-40 bg-transparent text-white placeholder:text-white/30 resize-none outline-none p-5 text-lg custom-scrollbar"
                />
                
                <div className="flex items-center justify-between p-2 mt-2 bg-black/40 rounded-2xl border border-white/5">
                  <button
                    onClick={handleEnhance}
                    disabled={isEnhancing || !prompt.trim() || isGenerating}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isEnhancing ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-[#F27D26]" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-[#F27D26]" />
                    )}
                    {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
                  </button>

                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim() || isEnhancing}
                    className="group/btn relative flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-black bg-white hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
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
            </div>
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
        <footer className="relative z-10 py-12 mt-10 flex flex-col items-center justify-center">
          {/* Subtle gradient separator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          <motion.a
            href="https://harshrathod-portfolio.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-2.5 px-6 py-3 rounded-full bg-black/40 border border-white/5 hover:border-[#F27D26]/40 transition-all duration-500 overflow-hidden backdrop-blur-md shadow-[0_0_0_rgba(242,125,38,0)] hover:shadow-[0_0_20px_rgba(242,125,38,0.15)]"
          >
            {/* Glowing background on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F27D26]/0 via-[#F27D26]/10 to-[#FF4E00]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shine sweep effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>
            
            <span className="text-sm text-white/40 font-medium relative z-10 group-hover:text-white/60 transition-colors flex items-center gap-1.5">
              Crafted with <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-[#F27D26]">❤</motion.span> by
            </span>
            
            <div className="relative z-10 flex items-center h-6 w-[115px]">
              {/* Revealed Text */}
              <motion.div
                animate={{ 
                  clipPath: [
                    'inset(0 100% 0 0)', 
                    'inset(0 100% 0 0)', 
                    'inset(0 0% 0 0)', 
                    'inset(0 0% 0 0)', 
                    'inset(0 0% 0 0)', 
                    'inset(0 100% 0 0)', 
                    'inset(0 100% 0 0)'
                  ] 
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  times: [0, 0.05, 0.3, 0.35, 0.8, 0.85, 1],
                  ease: "easeInOut"
                }}
                className="absolute inset-0 flex items-center"
              >
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F27D26] to-[#FF4E00] whitespace-nowrap">
                  Harsh Rathod
                </span>
              </motion.div>

              {/* Rolling Wheel */}
              <motion.div
                animate={{ 
                  left: ['0%', '0%', '100%', '100%', '100%', '0%', '0%'], 
                  rotate: [0, 0, 360, 360, 360, 0, 0],
                  opacity: [0, 1, 1, 0, 0, 0, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  times: [0, 0.05, 0.3, 0.35, 0.8, 0.85, 1],
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 -translate-y-1/2 -ml-2.5"
              >
                <Aperture className="w-5 h-5 text-[#F27D26]" />
              </motion.div>
            </div>
          </motion.a>
        </footer>
      </main>
    </div>
  );
}

function VariationCard({ variation, index }: { variation: ComponentVariation; index: number }) {
  const [view, setView] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(variation.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Inject Tailwind into the iframe for preview
  useEffect(() => {
    if (view === 'preview' && iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                body { margin: 0; padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f8fafc; color: #0f172a; }
                /* Custom scrollbar for iframe */
                ::-webkit-scrollbar { width: 8px; height: 8px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
              </style>
            </head>
            <body>
              ${variation.code}
            </body>
          </html>
        `);
        doc.close();
      }
    }
  }, [variation.code, view]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
      className="bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px]"
    >
      {/* Card Header */}
      <div className="px-6 py-5 border-b border-white/10 flex flex-col gap-4 bg-[#111]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono text-[#F27D26] bg-[#F27D26]/10 px-2 py-0.5 rounded">0{index + 1}</span>
            <h3 className="text-lg font-semibold truncate">{variation.title}</h3>
          </div>
          <p className="text-sm text-white/60 line-clamp-2">{variation.description}</p>
        </div>
        
        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setView('preview')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                view === 'preview' ? "bg-white text-black shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              onClick={() => setView('code')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                view === 'code' ? "bg-white text-black shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <Code2 className="w-3.5 h-3.5" />
              Code
            </button>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="relative flex-1 bg-[#050505] overflow-hidden">
        {view === 'preview' ? (
          <div className="absolute inset-0 w-full h-full bg-white">
            <iframe
              ref={iframeRef}
              title={`Preview ${variation.title}`}
              className="w-full h-full border-none"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        ) : (
          <div className="absolute inset-0 overflow-auto custom-scrollbar">
            <div className="sticky top-4 right-4 z-10 flex justify-end mb-[-2rem] pointer-events-none">
              <button
                onClick={handleCopy}
                className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium backdrop-blur-md border border-white/10 transition-all mr-4"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <SyntaxHighlighter
              language="html"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '2rem',
                background: 'transparent',
                fontSize: '13px',
                lineHeight: '1.6',
                minHeight: '100%',
              }}
              wrapLines={true}
              wrapLongLines={true}
            >
              {variation.code}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </motion.div>
  );
}

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}|:"<>?~`-=[]\\\',./';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize) + 1;
    let drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#F27D26';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    let lastDrawTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const render = (time: number) => {
      if (time - lastDrawTime > interval) {
        draw();
        lastDrawTime = time;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 opacity-40" />;
};

function SkeletonCard({ index }: { index: number }) {
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
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-6 h-6 text-[#F27D26] animate-spin" />
            <span className="text-sm font-mono text-[#F27D26] animate-pulse">Writing code...</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

