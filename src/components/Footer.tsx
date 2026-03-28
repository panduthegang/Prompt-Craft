import React from 'react';
import { motion } from 'motion/react';
import { Aperture } from 'lucide-react';

export function Footer() {
  return (
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
  );
}
