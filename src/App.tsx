import React, { useState } from 'react';
import { enhancePrompt, generateComponents, ComponentVariation } from './services/gemini';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { BackgroundEffects } from './components/BackgroundEffects';
import { PromptInput } from './components/PromptInput';
import { ResultsSection } from './components/ResultsSection';
import { LoadingState } from './components/LoadingState';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingMore, setIsGeneratingMore] = useState(false);
  const [variations, setVariations] = useState<ComponentVariation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState('gemini-3-flash-preview');

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
      <BackgroundEffects />
      <Header />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-12 space-y-16">
        <Hero />
        
        <PromptInput 
          prompt={prompt}
          setPrompt={setPrompt}
          isEnhancing={isEnhancing}
          isGenerating={isGenerating}
          handleEnhance={handleEnhance}
          handleGenerate={handleGenerate}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          error={error}
        />

        <ResultsSection 
          variations={variations}
          isGenerating={isGenerating}
          isGeneratingMore={isGeneratingMore}
          handleGenerateMore={handleGenerateMore}
        />

        <LoadingState isGenerating={isGenerating} />

        <Footer />
      </main>
    </div>
  );
}

