import React, { useEffect, useState } from 'react';
import { Globe, Radio } from 'lucide-react';

interface IntroProps {
  onComplete: () => void;
}

const IntroGlobe: React.FC<IntroProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 1000); // Allow fade out transition
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (fadeOut && window.getComputedStyle(document.body).opacity === '0') return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative">
        {/* Abstract Globe Representation */}
        <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border border-blue-500/20 shadow-[0_0_100px_rgba(37,99,235,0.2)] flex items-center justify-center relative overflow-hidden animate-pulse-slow">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover opacity-40 animate-spin-slow rounded-full"></div>
          
          {/* Emission Waves */}
          <div className="absolute inset-0 border-2 border-gold/30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-0 border border-white/10 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
          
          <Globe className="w-24 h-24 text-white/80 relative z-10" />
        </div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center z-20">
             <div className="flex justify-center items-center gap-2 mb-4">
                <Radio className="text-gold animate-pulse" />
                <span className="text-xs uppercase tracking-[0.5em] text-gold">Transmitindo para o mundo</span>
             </div>
        </div>
      </div>

      <h1 className="mt-12 text-4xl md:text-6xl font-futura font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600 tracking-wider">
        16.15 STUDIOS
      </h1>
      <p className="mt-4 text-gray-400 font-sans tracking-widest text-sm uppercase">PO Labs</p>
    </div>
  );
};

export default IntroGlobe;
