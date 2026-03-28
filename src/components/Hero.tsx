import React from 'react';
import { motion } from 'motion/react';

export function Hero() {
  return (
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
  );
}
