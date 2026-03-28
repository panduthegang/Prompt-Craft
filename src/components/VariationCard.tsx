import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Eye, Code2, Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ComponentVariation } from '../services/gemini';
import { cn } from '../lib/utils';

export function VariationCard({ variation, index }: { variation: ComponentVariation; index: number }) {
  const [view, setView] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(variation.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Inject Tailwind, React, and Babel into the iframe for preview
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
              <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
              <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
              <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
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
              <div id="root"></div>
              <script type="text/babel" data-type="module">
                ${variation.code}
                
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(<GeneratedComponent />);
              </script>
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
              language="jsx"
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
