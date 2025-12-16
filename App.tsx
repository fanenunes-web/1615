import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Mic, Award, ShoppingCart, Mail, Heart, ArrowRight, Instagram, Youtube, User, Globe, MessageSquare, Send, Video, Mic2, Layout, Wifi, CheckCircle, MessageCircle, BarChart3, TrendingUp, Zap, Activity, Eye, Users, ExternalLink, AlertCircle, Scissors, Film, Bell, Briefcase, Target, Rocket, HandHeart, Smile, FileText, PieChart, Radio, RefreshCw, ArrowUp, Smartphone, Monitor, Tv, Tablet, UserPlus, Share2 } from 'lucide-react';
import IntroGlobe from './components/IntroGlobe';
import { Navigation } from './components/Navigation';
import { PODCASTS, SPONSORS, TESTIMONIALS } from './constants';
import { generateVideoSummary, generateNetworkAnalysis } from './services/geminiService';
import { Podcast } from './types';

// --- UTILS & SMALL COMPONENTS ---

// Scroll Progress Bar Component
const ScrollProgress = () => {
    const [scrollWidth, setScrollWidth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollWidth(progress);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 h-1 bg-gold z-[60] transition-all duration-100 ease-out" style={{ width: `${scrollWidth}%` }}></div>
    );
};

// Scroll To Top Button
const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <button 
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all duration-500 transform hover:scale-110 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        >
            <ArrowUp size={24} strokeWidth={3} />
        </button>
    );
};

// --- Sub-components defined here for simplicity due to file limits ---

interface HeroProps {
    onNavigate: (tab: string) => void;
}

const HeroSection: React.FC<HeroProps> = ({ onNavigate }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        setMousePos({
            x: (e.clientX / window.innerWidth - 0.5) * 20, // -10 to 10px
            y: (e.clientY / window.innerHeight - 0.5) * 20  // -10 to 10px
        });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Parallax Background */}
        <div 
          className="w-full h-full bg-cover bg-center opacity-30 transition-transform duration-100 ease-out scale-110"
          style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?q=80&w=2070&auto=format&fit=crop')`,
              transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px) scale(1.1)` 
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>
      <div 
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
      >
        <h1 className="text-5xl md:text-8xl font-futura font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
          PO <span className="text-gold">LABS</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 font-light tracking-widest uppercase mb-12">
          A evolução do Podcast • Marcos 16:15
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button 
              onClick={() => onNavigate('studio')}
              className="px-8 py-4 bg-gold hover:bg-yellow-500 text-black font-bold rounded-none skew-x-[-10deg] transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
             <span className="skew-x-[10deg] inline-block">CONHEÇA O ESTÚDIO</span>
          </button>
          <button 
              onClick={() => {
                  onNavigate('podcasts');
                  const grid = document.getElementById('podcast-grid');
                  if (grid) grid.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border border-white text-white hover:bg-white/10 hover:text-white font-bold rounded-none skew-x-[-10deg] transition-all"
          >
             <span className="skew-x-[10deg] inline-block">NOSSOS CANAIS</span>
          </button>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce cursor-pointer" onClick={() => {
           const grid = document.getElementById('podcast-grid');
           if (grid) grid.scrollIntoView({ behavior: 'smooth' });
      }}>
         <ArrowRight className="transform rotate-90 text-gold" />
      </div>
    </div>
  );
};

// --- SMART IMAGE COMPONENT ---
interface SmartImageProps {
    src: string;
    alt: string;
    className?: string;
    fallbackName?: string;
}

const SmartImage: React.FC<SmartImageProps> = ({ src, alt, className, fallbackName }) => {
    const lastDotIndex = src.lastIndexOf('.');
    const baseName = lastDotIndex !== -1 ? src.substring(0, lastDotIndex) : src;
    
    // Updated Candidate list to be more robust including lowercase
    const candidatePaths = [
        src,
        `${baseName}.png`,
        `${baseName}.PNG`,
        `${baseName}.jpg`,
        `${baseName}.JPG`,
        `${baseName}.jpeg`,
        `${baseName}.JPEG`,
        // Lowercase base name variations for case-sensitive environments
        `${baseName.toLowerCase()}.png`,
        `${baseName.toLowerCase()}.jpg`,
        `${baseName.toLowerCase()}.jpeg`,
        ...(fallbackName ? [`https://ui-avatars.com/api/?name=${fallbackName}&background=random&size=400`] : [])
    ];

    const [currentPathIndex, setCurrentPathIndex] = useState(0);

    const handleError = () => {
        if (currentPathIndex < candidatePaths.length - 1) {
            setCurrentPathIndex(prev => prev + 1);
        }
    };

    return (
        <img 
            src={candidatePaths[currentPathIndex]} 
            alt={alt} 
            className={className}
            onError={handleError}
            loading="lazy"
        />
    );
};

const PodcastGrid = ({ onSelect }: { onSelect: (id: string) => void }) => (
  <section id="podcast-grid" className="py-24 bg-black relative">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-16">
         <h2 className="text-4xl font-futura font-bold text-white border-l-4 border-gold pl-6">NOSSOS <span className="text-gold">ORIGINAIS</span></h2>
         <div className="hidden md:flex gap-2 text-sm text-gray-400">
            <span>2024</span>
            <span className="text-gold">•</span>
            <span>2025 Collection</span>
         </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PODCASTS.map((podcast) => (
          <div 
            key={podcast.id} 
            className="group relative h-[450px] overflow-hidden rounded-xl cursor-pointer border border-gray-800 hover:border-gray-600 transition-all duration-500 bg-gray-900 shadow-2xl"
            onClick={() => onSelect(podcast.id)}
          >
            <div 
               className="absolute inset-0 w-full h-full bg-cover bg-center blur-2xl opacity-10 transition-opacity duration-500 group-hover:opacity-20"
               style={{ backgroundImage: `url('${podcast.image}')` }}
               onError={(e) => (e.currentTarget.style.display = 'none')}
            ></div>
            
            <div className="absolute inset-0 flex items-center justify-center pb-24 transition-all duration-500">
                <div 
                    className="absolute w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                    style={{ backgroundColor: podcast.themeColor }}
                ></div>

                <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-gray-800 group-hover:border-white/20 shadow-2xl relative z-10 bg-black flex items-center justify-center transform group-hover:scale-105 transition-all duration-500">
                    <SmartImage 
                        src={podcast.image}
                        alt={`${podcast.name} Logo`}
                        className="w-full h-full object-cover"
                        fallbackName={podcast.name}
                    />
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent opacity-90"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 border-t border-gray-800/50 bg-black/40 backdrop-blur-sm">
              <span className="text-xs font-bold px-2 py-1 bg-gold text-black uppercase mb-3 inline-block shadow-lg">{podcast.category}</span>
              <h3 className="text-2xl font-bold font-futura mb-2 text-white group-hover:text-gold transition-colors drop-shadow-md">{podcast.name}</h3>
              <p className="text-gray-300 text-sm line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity duration-500 mb-4">{podcast.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-400 opacity-80 group-hover:opacity-100 transition-opacity delay-200">
                <span className="flex items-center gap-1"><User size={14} /> {podcast.host.split(' ')[0]}...</span>
                <span className="flex items-center gap-1"><Youtube size={14} /> {podcast.subscribers}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ShareStoryCTA = () => (
  <div className="py-24 bg-gradient-to-b from-black to-gray-900 border-t border-gray-800">
    <div className="max-w-5xl mx-auto px-4">
      <div className="glass-panel p-12 rounded-3xl border border-gold/30 text-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-gold/10 rounded-full blur-[50px]"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
             <Mic2 size={32} className="text-gold" />
          </div>

          <h2 className="text-3xl md:text-5xl font-futura font-bold text-white mb-6">
            SUA HISTÓRIA <span className="text-gold">PRECISA SER OUVIDA</span>
          </h2>

          <p className="text-gray-300 max-w-2xl text-lg mb-8 leading-relaxed">
            Você viveu algo transformador? Superou um grande desafio? Ou tem uma expertise única para compartilhar?
            Nossos microfones estão abertos para vozes que inspiram.
          </p>

          <a
            href="https://wa.me/5511975557317?text=Olá! Gostaria de contar minha história em um dos podcasts do 16.15 Studios."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-gold text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            <MessageCircle size={24} />
            Quero Contar Minha História
          </a>

          <p className="mt-6 text-gray-500 text-xs uppercase tracking-widest">
            Entre em contato com a produção
          </p>
        </div>
      </div>
    </div>
  </div>
);

const StrategicPartnersSection = () => (
    <div className="py-24 bg-brand-panel relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Nosso Ecossistema</span>
                <h2 className="text-4xl md:text-5xl font-futura font-bold text-white">
                    PATROCINADORES <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">OFICIAIS</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {SPONSORS.map((sponsor, index) => (
                    <div 
                        key={index} 
                        className="glass-panel p-8 rounded-xl flex flex-col items-center justify-center gap-4 border border-gray-800 hover:border-gold/50 hover:bg-white/5 transition-all duration-500 group"
                    >
                        <div className="w-24 h-24 bg-black/50 rounded-full p-3 flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-shadow">
                            <SmartImage 
                                src={sponsor.logoUrl} 
                                alt={sponsor.name} 
                                className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                fallbackName={sponsor.name}
                            />
                        </div>
                        <span className="font-futura font-bold text-lg text-gray-300 group-hover:text-gold transition-colors uppercase text-center tracking-wider">
                            {sponsor.name}
                        </span>
                        
                        {sponsor.phone && (
                            <a 
                                href={`https://wa.me/${sponsor.phone}?text=Olá, vi a marca de vocês no site do 16.15 Studios.`} 
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold px-6 py-2 rounded-full transition-all transform hover:scale-105 shadow-[0_0_10px_rgba(37,211,102,0.3)] mt-2"
                            >
                                <MessageCircle size={16} />
                                Falar no WhatsApp
                            </a>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <p className="text-gray-500 text-sm mb-4">Sua marca pode estar aqui.</p>
                <a 
                    href="https://wa.me/5511975557317?text=Quero ser um patrocinador" 
                    target="_blank" 
                    className="inline-flex items-center gap-2 text-gold hover:text-white border-b border-gold hover:border-white transition-all pb-1 font-bold text-xs uppercase tracking-widest"
                >
                    Seja um Patrocinador <ArrowRight size={12} />
                </a>
            </div>
        </div>
    </div>
);

// --- Shop Image Component with Smart Extension Hunt ---
interface ShopImageProps {
    type: 'caneca' | 'camiseta' | 'whatsapp';
    podcastId: string;
    alt: string;
    fallbackUrl: string;
}

const ShopImage: React.FC<ShopImageProps> = ({ type, podcastId, alt, fallbackUrl }) => {
    // Define candidate paths with extensive variations to catch all file naming cases
    const candidatePaths = useMemo(() => [
        // 1. Standard Hyphenated ID (most common expected format)
        `${type}-${podcastId}.png`,
        `${type}-${podcastId}.jpg`,
        `${type}-${podcastId}.jpeg`,
        
        // 2. Double extension (often a user save error: file.png.png)
        `${type}-${podcastId}.png.png`, 
        `${type}-${podcastId}.jpg.jpg`,

        // 3. Underscore ID (alternative format)
        `${type}_${podcastId}.png`,
        `${type}_${podcastId}.jpg`,
        
        // 4. Generic Type (fallback to category image)
        `${type}.png`,
        `${type}.jpg`,
        `${type}.jpeg`,
        
        // 5. Generic Type with Double Extension
        `${type}.png.png`,

        // 6. Capitalized Generic (e.g., Caneca.png)
        `${type.charAt(0).toUpperCase() + type.slice(1)}.png`,
        `${type.charAt(0).toUpperCase() + type.slice(1)}.jpg`,

        // 7. Product Prefix (e.g., product_caneca.png)
        `product_${type}.png`,
        `product_${type}.jpg`,

        // 8. Last Resort External Fallback
        fallbackUrl
    ], [type, podcastId, fallbackUrl]);

    const [currentPathIndex, setCurrentPathIndex] = useState(0);

    const handleError = () => {
        const failedPath = candidatePaths[currentPathIndex];
        // console.warn(`[ShopImage] Failed: ${failedPath}`); // Uncomment for debug
        
        const nextIndex = currentPathIndex + 1;
        if (nextIndex < candidatePaths.length) {
            setCurrentPathIndex(nextIndex);
        }
    };

    return (
        <div className="relative w-full h-full bg-gray-800">
            <img 
                src={candidatePaths[currentPathIndex]}
                alt={alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                onError={handleError}
                loading="lazy"
            />
            {currentPathIndex >= candidatePaths.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-1 text-center border-t border-red-500/50 z-10">
                     <div className="text-[9px] text-red-400 font-mono leading-tight flex flex-col items-center">
                        <span className="flex items-center gap-1"><AlertCircle size={8} /> IMG N/A</span>
                     </div>
                </div>
            )}
        </div>
    );
};

const PodcastDetail = ({ podcast, onBack }: { podcast: Podcast; onBack: () => void }) => {
  const [summary, setSummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    const fetchLatest = async () => {
      setLoadingSummary(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockTitle = `Novo Episódio: O Futuro de ${podcast.category}`;
      const genSummary = await generateVideoSummary(mockTitle, podcast.name);
      setSummary(genSummary);
      setLoadingSummary(false);
    };
    fetchLatest();
  }, [podcast]);

  return (
    <div className="min-h-screen bg-black pt-20 animate-fade-in">
      <button 
        onClick={onBack} 
        className="fixed top-24 left-4 z-50 flex items-center gap-2 text-white bg-black/60 backdrop-blur-md px-6 py-3 rounded-full hover:bg-gold hover:text-black transition-all border border-white/10 shadow-lg group"
      >
        <ArrowRight className="transform rotate-180 group-hover:-translate-x-1 transition-transform" size={18} /> 
        <span className="font-bold">Voltar</span>
      </button>

      {/* Hero Header */}
      <div className="relative h-[60vh]">
        <div 
           className="w-full h-full bg-cover bg-center opacity-20 blur-sm fixed top-0 left-0 -z-10"
           style={{ backgroundImage: `url('${podcast.image}')` }} 
           onError={(e) => (e.currentTarget.style.display = 'none')}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/80 to-black"></div>
        <div className="absolute bottom-0 w-full p-8 md:p-16 max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.3)] border-4 border-gray-800 bg-black shrink-0 hidden md:block group hover:border-gold/50 transition-colors">
             <SmartImage 
                src={podcast.image}
                alt={`${podcast.name} Logo`}
                className="w-full h-full object-cover"
                fallbackName={podcast.name}
             />
          </div>
          <div>
              <h1 className="text-5xl md:text-7xl font-futura font-bold text-white mb-4 drop-shadow-lg" style={{ color: podcast.themeColor }}>{podcast.name}</h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">{podcast.description}</p>
              
              <div className="flex gap-4 mt-8">
                <a href={podcast.youtubeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <Play fill="currentColor" /> Assistir no YouTube
                </a>
                {podcast.id === '1615' && (
                  <a 
                    href="https://wa.me/5511975557317?text=Oração"
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 border border-gold text-gold hover:bg-gold hover:text-black px-6 py-3 rounded-lg font-bold transition-all"
                  >
                    <Heart size={20} /> Pedido de Oração
                  </a>
                )}
              </div>
          </div>
        </div>
      </div>

      {/* Content Columns */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="space-y-8">
           <div className="glass-panel p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gold"><Globe size={20}/> Impacto</h3>
              <div className="space-y-4">
                 {podcast.stats.map((stat, i) => (
                   <div key={i} className="flex justify-between border-b border-gray-800 pb-2">
                      <span className="text-gray-400">{stat.label}</span>
                      <span className="font-mono font-bold">{stat.value}</span>
                   </div>
                 ))}
                 <div className="flex justify-between pt-2">
                    <span className="text-gray-400">Views Totais</span>
                    <span className="font-mono font-bold text-white">{podcast.views}</span>
                 </div>
              </div>
           </div>

           {podcast.awards.length > 0 && (
             <div className="glass-panel p-6 rounded-xl border-gold/20">
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gold"><Award size={20}/> Premiações</h3>
               {podcast.awards.map((award, i) => (
                 <div key={i} className="mb-4 last:mb-0">
                    <div className="text-xs text-gray-500">{award.year}</div>
                    <div className="font-bold text-lg">{award.position} Lugar - {award.category}</div>
                    <div className="text-sm text-gray-400">{award.title}</div>
                 </div>
               ))}
               <a href="https://premiompb.com.br/" target="_blank" className="text-xs text-gold underline mt-4 block">Ver site oficial do prêmio</a>
             </div>
           )}
        </div>

        <div className="lg:col-span-2 space-y-12">
           <div className="border border-gray-800 bg-gray-900/50 p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Mic size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                 Último Episódio <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">AI POWERED</span>
              </h3>
              
              {loadingSummary ? (
                 <div className="h-24 flex items-center justify-center text-gold animate-pulse">Gerando resumo com Gemini AI...</div>
              ) : (
                 <div className="space-y-4">
                    <p className="text-lg italic text-gray-300">"{summary}"</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                       <span>Resumo gerado automaticamente</span>
                    </div>
                 </div>
              )}
           </div>

           <div className="prose prose-invert max-w-none">
              <h3 className="text-2xl font-bold text-gold mb-4">Coluna do Host: {podcast.host}</h3>
              <p className="text-gray-300 leading-relaxed">
                 Bem-vindos ao nosso espaço digital. Aqui na 16.15 Studios, acreditamos que cada voz tem o poder de ecoar pela eternidade. 
                 Neste projeto, buscamos trazer não apenas entretenimento, mas transformação. Fiquem ligados nas novidades desta temporada!
              </p>
              <div className="mt-6 flex items-center gap-4">
                 <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${podcast.host}&background=random`} alt={podcast.host} />
                 </div>
                 <div>
                    <div className="font-bold">{podcast.host}</div>
                    <div className="text-sm text-gray-500">Host & Creator</div>
                 </div>
              </div>
           </div>

           <div className="mt-12 border-t border-gray-800 pt-12">
              <h3 className="text-2xl font-bold mb-6">Loja & Comunidade {podcast.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <a 
                    href={`https://wa.me/5511975557317?text=${encodeURIComponent(`Olá! Gostaria de comprar a Caneca do ${podcast.name}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gray-900 rounded-lg p-4 group hover:bg-gray-800 transition-colors cursor-pointer border border-transparent hover:border-gold/30 block"
                 >
                    <div className="aspect-square bg-gray-800 rounded mb-3 overflow-hidden relative">
                        <ShopImage 
                            type="caneca" 
                            podcastId={podcast.id} 
                            alt={`Caneca ${podcast.name}`}
                            fallbackUrl="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=400"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Oficial</div>
                    </div>
                    <div className="font-bold text-sm text-white">Caneca {podcast.name}</div>
                    <div className="text-gold mt-1 font-mono">R$ 29,19</div>
                 </a>

                 <a 
                    href={`https://wa.me/5511975557317?text=${encodeURIComponent(`Olá! Gostaria de comprar a Camiseta Collection do ${podcast.name}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gray-900 rounded-lg p-4 group hover:bg-gray-800 transition-colors cursor-pointer border border-transparent hover:border-gold/30 block"
                 >
                    <div className="aspect-square bg-gray-800 rounded mb-3 overflow-hidden relative">
                        <ShopImage 
                            type="camiseta" 
                            podcastId={podcast.id} 
                            alt={`Camiseta ${podcast.name}`}
                            fallbackUrl="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400"
                        />
                    </div>
                    <div className="font-bold text-sm text-white">Camiseta Collection</div>
                    <div className="text-gold mt-1 font-mono">R$ 50,00</div>
                 </a>

                 <a 
                    href={`https://wa.me/5511975557317?text=${encodeURIComponent(`Olá, gostaria de entrar no grupo do ${podcast.name}`)}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-gray-900 rounded-lg p-4 group hover:bg-gray-800 transition-all cursor-pointer border border-green-900 hover:border-green-500 relative block"
                 >
                    <div className="aspect-square bg-gray-800 rounded mb-3 overflow-hidden relative flex items-center justify-center">
                        <ShopImage 
                            type="whatsapp" 
                            podcastId={podcast.id} 
                            alt={`Grupo ${podcast.name}`}
                            fallbackUrl="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors pointer-events-none flex items-center justify-center">
                            <ExternalLink size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                         <div className="font-bold text-sm text-white">Grupo {podcast.name}</div>
                         <MessageCircle size={16} className="text-green-500" />
                    </div>
                    <div className="text-green-400 mt-1 font-mono font-bold text-xs uppercase tracking-wider">Acesso Gratuito</div>
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const StudioPage = () => {
    const editTeam = [
        { name: "Natalia Gomes", role: "Head de Edição", insta: "@ntpgomes" },
        { name: "Thays Jurado", role: "Editora Criativa", insta: "@thaysjurado" },
        { name: "Pedro Ariel", role: "Filmmaker & Editor", insta: "@pedrofotografo2" }
    ];

    const studioSponsors = [
        { name: "EKK Brindes", phone: "5511985749584", file: "logo-EKK.png" },
        { name: "M&F Soluções", phone: "5511961241771", file: "logo-M&F.png" },
        { name: "SOS Associados", phone: "5511975557317", file: "logo-Sos.png" },
        { name: "Orsegups", phone: "5519983070434", file: "logo-Orsegups.png" }
    ];

    return (
        <div className="min-h-screen pt-20 bg-black">
            <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black"></div>
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-futura font-bold mb-6">PO <span className="text-gold">LABS</span></h1>
                    <p className="text-xl text-gray-300 tracking-widest uppercase">O Futuro da Sua Produção Começa Aqui</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="glass-panel p-6 rounded-xl border-t border-gold/30 hover:border-gold transition-colors group">
                        <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                            <Video className="text-gold" size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Imagem 4K</h3>
                        <p className="text-gray-400 text-sm">Câmeras de cinema digital para uma qualidade de imagem cristalina e cinematográfica.</p>
                    </div>
                    <div className="glass-panel p-6 rounded-xl border-t border-gold/30 hover:border-gold transition-colors group">
                        <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                            <Mic2 className="text-gold" size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Áudio Premium</h3>
                        <p className="text-gray-400 text-sm">Microfones Shure e processamento de áudio em tempo real para voz limpa e presente.</p>
                    </div>
                    <div className="glass-panel p-6 rounded-xl border-t border-gold/30 hover:border-gold transition-colors group">
                        <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                            <Layout className="text-gold" size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Cenografia</h3>
                        <p className="text-gray-400 text-sm">Cenários modulares e personalizados que refletem a identidade única do seu projeto.</p>
                    </div>
                    <div className="glass-panel p-6 rounded-xl border-t border-gold/30 hover:border-gold transition-colors group">
                        <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                            <Wifi className="text-gold" size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Streaming</h3>
                        <p className="text-gray-400 text-sm">Transmissão ao vivo com baixa latência e integração multi-plataforma simultânea.</p>
                    </div>
                </div>
            </div>

            <div className="py-16 bg-black border-y border-gray-900">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-futura font-bold text-white mb-2">PARCEIROS <span className="text-gold">ESTRATÉGICOS</span></h2>
                        <p className="text-gray-400 text-sm">Empresas que confiam e impulsionam nossa estrutura.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {studioSponsors.map((sponsor, idx) => (
                           <div key={idx} className="glass-panel p-8 rounded-xl flex flex-col items-center justify-center gap-6 group hover:border-gold/50 transition-all">
                               <div className="w-32 h-32 bg-white/5 rounded-full p-4 flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-shadow">
                                    <SmartImage 
                                        src={sponsor.file} 
                                        alt={sponsor.name} 
                                        className="w-full h-full object-contain"
                                        fallbackName={sponsor.name}
                                    />
                               </div>
                               <div className="text-center">
                                    <h3 className="font-bold text-xl text-white mb-3">{sponsor.name}</h3>
                                    <a 
                                        href={`https://wa.me/${sponsor.phone}?text=Olá, vi a marca de vocês no site da PO Labs.`} 
                                        target="_blank"
                                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-bold px-6 py-3 rounded-full transition-colors shadow-[0_0_10px_rgba(37,211,102,0.2)] transform hover:scale-105"
                                    >
                                        <MessageCircle size={18} />
                                        WhatsApp
                                    </a>
                               </div>
                           </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-gray-900/30 py-24 border-b border-gray-900">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                         <h2 className="text-3xl md:text-5xl font-futura font-bold mb-4">SQUAD DE <span className="text-gold">EDIÇÃO</span></h2>
                         <p className="text-gray-400">Os gênios da pós-produção que transformam brutos em obras de arte.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {editTeam.map((member, i) => (
                            <div key={i} className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center group hover:border-gold/50 transition-colors">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-700 mb-6 group-hover:border-gold transition-colors">
                                     <img src={`https://ui-avatars.com/api/?name=${member.name}&background=111&color=D4AF37`} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <div className="text-sm text-gold mb-4 uppercase tracking-widest">{member.role}</div>
                                <a href={`https://instagram.com/${member.insta.replace('@', '')}`} target="_blank" className="text-gray-500 hover:text-white flex items-center gap-1 text-sm transition-colors">
                                    <Instagram size={14} /> {member.insta}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-24 max-w-5xl mx-auto px-4">
                <div className="text-center mb-16">
                    <Scissors className="w-16 h-16 text-gold mx-auto mb-6" />
                    <h2 className="text-3xl md:text-5xl font-futura font-bold mb-4">PACOTES DE <span className="text-gold">CORTES</span></h2>
                    <p className="text-gray-400">Viralize seu conteúdo com edição profissional dinâmica.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="glass-panel p-8 rounded-2xl border border-gray-800 transition-transform duration-300 hover:-translate-y-2">
                        <div className="text-gray-400 font-bold tracking-widest uppercase mb-4">Corte Avulso</div>
                        <div className="text-4xl font-bold text-white mb-6">R$ 50,00<span className="text-lg font-normal text-gray-500">/unid</span></div>
                        <ul className="space-y-4 mb-8 text-gray-300">
                             <li className="flex gap-3"><CheckCircle size={18} className="text-gray-600" /> Edição Dinâmica</li>
                             <li className="flex gap-3"><CheckCircle size={18} className="text-gray-600" /> Legendas Automáticas</li>
                             <li className="flex gap-3"><CheckCircle size={18} className="text-gray-600" /> Formato Vertical (Reels/TikTok)</li>
                        </ul>
                        <a href="https://wa.me/5511975557317?text=Gostaria%20de%20saber%20mais%20sobre%20o%20corte%20avulso" target="_blank" className="block w-full text-center py-3 border border-gray-600 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                            Contratar
                        </a>
                    </div>

                    <div className="glass-panel p-8 rounded-2xl border border-gold relative transform md:scale-105 bg-gray-900/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:-translate-y-2">
                        <div className="absolute top-0 right-0 bg-gold text-black font-bold text-xs px-3 py-1 rounded-bl-lg uppercase">Melhor Escolha</div>
                        <div className="text-gold font-bold tracking-widest uppercase mb-4">Pack Promo</div>
                        <div className="text-5xl font-bold text-white mb-2">R$ 200,00</div>
                        <div className="text-sm text-gray-400 mb-6">Pacote com 5 Cortes (R$ 40/unid)</div>
                        
                        <ul className="space-y-4 mb-8 text-white">
                             <li className="flex gap-3"><CheckCircle size={18} className="text-gold" /> 5 Cortes Profissionais</li>
                             <li className="flex gap-3"><CheckCircle size={18} className="text-gold" /> Legendas Criativas</li>
                             <li className="flex gap-3"><CheckCircle size={18} className="text-gold" /> Color Grading Básico</li>
                             <li className="flex gap-3"><CheckCircle size={18} className="text-gold" /> Entrega Prioritária</li>
                        </ul>
                        <a 
                            href="https://wa.me/5511975557317?text=quero%20a%20promoção%20de%20cortes" 
                            target="_blank" 
                            className="flex items-center justify-center gap-2 w-full py-4 bg-gold text-black rounded-lg font-bold hover:bg-yellow-500 transition-colors shadow-lg shadow-gold/20"
                        >
                            <MessageCircle size={20} />
                            Quero a Promoção
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-brand-panel py-24 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-futura font-bold mb-6">O PADRÃO <span className="text-gold">16.15</span></h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            O PO Labs (P=16, O=15) nasceu da necessidade de elevar o nível das produções digitais. Não somos apenas um estúdio de aluguel; somos parceiros estratégicos na construção da sua autoridade digital.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-gray-300">
                                <CheckCircle className="text-gold" size={18} /> Produção e Edição completa
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <CheckCircle className="text-gold" size={18} /> Consultoria de Conteúdo
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <CheckCircle className="text-gold" size={18} /> Gestão de Cortes e Social Media
                            </li>
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gold blur-[100px] opacity-20"></div>
                        <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop" className="relative rounded-2xl border border-gray-700 shadow-2xl z-10" alt="Studio Interior" />
                    </div>
                </div>
            </div>

            <div className="py-24 text-center px-4">
                <h2 className="text-3xl font-bold mb-8">Pronto para elevar o nível?</h2>
                <a 
                    href="https://wa.me/5511975557317" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                >
                    <MessageCircle size={24} />
                    Agendar Visita via WhatsApp
                </a>
                <p className="mt-4 text-gray-500 text-sm">Ou ligue: +55 11 97555-7317</p>
            </div>
        </div>
    );
};

const AnalyticsPage = () => {
    const [analysis, setAnalysis] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState<Array<{id: number, text: string, time: string, icon: any, color: string}>>([]);

    useEffect(() => {
        const fetchAnalysis = async () => {
            setLoading(true);
            const dataSummary = PODCASTS.map(p => 
                `- ${p.name} (${p.category}): ${p.subscribers} subs, ${p.views} views. Público: ${p.stats.find(s => s.label.includes('Masc') || s.label.includes('Fem'))?.value || 'N/A'}`
            ).join('\n');
            
            const result = await generateNetworkAnalysis(dataSummary);
            setAnalysis(result);
            setLoading(false);
        };
        fetchAnalysis();

        // Live notification logic
        const actions = [
            { text: 'ganhou um novo inscrito', icon: UserPlus, color: 'text-green-500' },
            { text: 'teve um pico de visualizações', icon: TrendingUp, color: 'text-blue-500' },
            { text: 'recebeu um novo comentário', icon: MessageCircle, color: 'text-gold' },
            { text: 'foi compartilhado', icon: Share2, color: 'text-purple-500' }
        ];

        // Initial population
        const initial = Array.from({length: 3}).map((_, i) => {
             const p = PODCASTS[Math.floor(Math.random() * PODCASTS.length)];
             const a = actions[Math.floor(Math.random() * actions.length)];
             return {
                 id: Date.now() - i * 1000,
                 text: `${p.name} ${a.text}`,
                 time: `${i + 2} min atrás`,
                 icon: a.icon,
                 color: a.color
             }
        });
        setNotifications(initial);

        const interval = setInterval(() => {
            const p = PODCASTS[Math.floor(Math.random() * PODCASTS.length)];
            const a = actions[Math.floor(Math.random() * actions.length)];
            const newNotif = {
                 id: Date.now(),
                 text: `${p.name} ${a.text}`,
                 time: 'Há instantes',
                 icon: a.icon,
                 color: a.color
            };
            setNotifications(prev => [newNotif, ...prev].slice(0, 6));
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const parseViews = (str: string) => {
        if (!str) return 0;
        const clean = str.toLowerCase().replace(/[^0-9.k]/g, '');
        if (clean.includes('k')) {
            return parseFloat(clean.replace('k', '')) * 1000;
        }
        return parseFloat(clean.replace(/\./g, '')) || 0;
    };

    const totalViews = PODCASTS.reduce((acc, curr) => acc + parseViews(curr.views), 0);
    const totalSubs = PODCASTS.reduce((acc, curr) => {
        const sub = curr.subscribers.toLowerCase().replace(/[^0-9.k]/g, '');
        let val = 0;
        if(sub.includes('k')) val = parseFloat(sub) * 1000;
        else val = parseFloat(sub.replace(/\./g, ''));
        return acc + (isNaN(val) ? 0 : val);
    }, 0);

    const monthLabels = React.useMemo(() => {
        const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        const today = new Date();
        const months = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            months.push(monthNames[d.getMonth()]);
        }
        return months;
    }, []);

    const engagementData = [42, 58, 51, 75, 84, 92]; // Data simulating growth

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-4 animate-fade-in">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 border-b border-gray-800 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                         <div className="flex items-center gap-2 mb-3">
                             <div className="px-2 py-0.5 bg-gold/20 text-gold border border-gold/30 text-[10px] font-bold uppercase tracking-widest rounded flex items-center gap-2">
                                 <Radio size={10} className="animate-pulse"/> Live Data
                             </div>
                        </div>
                         <h1 className="text-4xl md:text-6xl font-futura font-bold text-white mb-2">NETWORK <span className="text-gold">ANALYTICS</span></h1>
                         <p className="text-gray-400 max-w-2xl">Inteligência de dados aplicada: Métricas de crescimento, retenção e perfil demográfico do ecossistema 16.15 Studios.</p>
                    </div>
                    <button className="bg-gray-900 border border-gray-700 hover:border-gold text-white px-4 py-2 rounded flex items-center gap-2 transition-colors text-sm">
                        <FileText size={16} /> Download Report (PDF)
                    </button>
                </header>

                {/* KPI CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="glass-panel p-6 rounded-xl border-l-4 border-gold group hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <div className="text-gray-400 text-xs uppercase tracking-widest font-bold">Alcance Total</div>
                            <Eye className="text-gold opacity-50 group-hover:opacity-100 transition-opacity" size={20} />
                        </div>
                        <div className="text-3xl font-mono font-bold text-white mb-1">{(totalViews / 1000000).toFixed(2)}M+</div>
                        <div className="text-xs text-green-500 flex items-center gap-1"><ArrowUp size={10} /> +12% este mês</div>
                    </div>

                    <div className="glass-panel p-6 rounded-xl border-l-4 border-blue-500 group hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <div className="text-gray-400 text-xs uppercase tracking-widest font-bold">Inscritos Rede</div>
                            <Users className="text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" size={20} />
                        </div>
                        <div className="text-3xl font-mono font-bold text-white mb-1">{(totalSubs / 1000).toFixed(1)}K+</div>
                         <div className="text-xs text-green-500 flex items-center gap-1"><ArrowUp size={10} /> +5.4% este mês</div>
                    </div>

                    <div className="glass-panel p-6 rounded-xl border-l-4 border-purple-500 group hover:bg-white/5 transition-colors">
                         <div className="flex justify-between items-start mb-2">
                            <div className="text-gray-400 text-xs uppercase tracking-widest font-bold">Retenção Média</div>
                            <Activity className="text-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" size={20} />
                        </div>
                         <div className="text-3xl font-mono font-bold text-white mb-1">68%</div>
                         <div className="text-xs text-gray-500">Avg. Watch Time: 18min</div>
                    </div>

                    <div className="glass-panel p-6 rounded-xl border-l-4 border-green-500 group hover:bg-white/5 transition-colors">
                         <div className="flex justify-between items-start mb-2">
                            <div className="text-gray-400 text-xs uppercase tracking-widest font-bold">Canais Ativos</div>
                            <Radio className="text-green-500 opacity-50 group-hover:opacity-100 transition-opacity" size={20} />
                        </div>
                         <div className="text-3xl font-mono font-bold text-white mb-1">{PODCASTS.length}</div>
                         <div className="text-xs text-gray-500">3 Nichos Principais</div>
                    </div>
                </div>

                {/* AI REPORT AND LIVE FEED */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2 glass-panel p-8 rounded-2xl border border-gray-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Zap size={150} />
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
                            <h3 className="text-xl font-bold font-futura">EXECUTIVE AI REPORT</h3>
                        </div>
                        
                        {loading ? (
                            <div className="space-y-4 animate-pulse">
                                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-800 rounded w-full"></div>
                                <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                            </div>
                        ) : (
                            <p className="text-lg text-gray-300 leading-relaxed font-light border-l-2 border-gold pl-6 italic">
                                "{analysis}"
                            </p>
                        )}
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-gray-800 flex flex-col h-full">
                         <h3 className="font-bold mb-4 flex items-center gap-2"><Radio size={18} className="text-red-500 animate-pulse"/> Atividade em Tempo Real</h3>
                         <div className="space-y-4 overflow-hidden relative flex-1">
                             {notifications.map((n) => (
                                 <div key={n.id} className="flex gap-3 items-start animate-fade-in-down border-b border-gray-800/50 pb-2 last:border-0">
                                     <div className={`mt-1 ${n.color}`}><n.icon size={14} /></div>
                                     <div>
                                         <p className="text-xs text-gray-300 leading-tight">{n.text}</p>
                                         <span className="text-[10px] text-gray-500 font-mono">{n.time}</span>
                                     </div>
                                 </div>
                             ))}
                             {notifications.length === 0 && <div className="text-gray-500 text-xs italic">Aguardando atualizações...</div>}
                         </div>
                    </div>
                </div>

                {/* DEMOGRAPHICS & DEVICES SECTION */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Demographics */}
                    <div className="glass-panel p-8 rounded-2xl border border-gray-800">
                        <h3 className="font-bold mb-6 flex items-center gap-2"><Users size={20} className="text-gold"/> Perfil Demográfico</h3>
                        
                        <div className="mb-8">
                             <div className="flex justify-between mb-2 text-sm text-gray-400">
                                <span>Gênero</span>
                             </div>
                             <div className="h-4 bg-gray-800 rounded-full overflow-hidden flex relative">
                                 <div className="h-full bg-blue-600 w-[65%]"></div>
                                 <div className="h-full bg-pink-600 w-[35%]"></div>
                             </div>
                             <div className="flex justify-between mt-2 text-xs font-mono">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-600"></div> 65% Masculino</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-pink-600"></div> 35% Feminino</span>
                             </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-4 text-sm text-gray-400">
                                <span>Faixa Etária Predominante</span>
                            </div>
                            <div className="flex items-end gap-2 h-32">
                                <div className="flex-1 bg-gray-800 rounded-t hover:bg-gold/50 transition-colors relative group" style={{height: '15%'}}>
                                     <span className="absolute -top-6 w-full text-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">15%</span>
                                     <span className="absolute bottom-2 w-full text-center text-[10px] text-gray-500">18-24</span>
                                </div>
                                <div className="flex-1 bg-gold rounded-t hover:bg-gold/80 transition-colors relative group" style={{height: '45%'}}>
                                     <span className="absolute -top-6 w-full text-center text-xs text-gold font-bold">45%</span>
                                     <span className="absolute bottom-2 w-full text-center text-[10px] text-black font-bold">25-34</span>
                                </div>
                                <div className="flex-1 bg-gray-700 rounded-t hover:bg-gold/50 transition-colors relative group" style={{height: '30%'}}>
                                     <span className="absolute -top-6 w-full text-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">30%</span>
                                     <span className="absolute bottom-2 w-full text-center text-[10px] text-gray-500">35-44</span>
                                </div>
                                <div className="flex-1 bg-gray-800 rounded-t hover:bg-gold/50 transition-colors relative group" style={{height: '10%'}}>
                                     <span className="absolute -top-6 w-full text-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">10%</span>
                                     <span className="absolute bottom-2 w-full text-center text-[10px] text-gray-500">45+</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Devices & Engagement */}
                    <div className="glass-panel p-8 rounded-2xl border border-gray-800">
                        <h3 className="font-bold mb-6 flex items-center gap-2"><Smartphone size={20} className="text-gold"/> Dispositivos & Plataforma</h3>
                        
                        <div className="flex items-center justify-around mb-8">
                             <div className="relative w-32 h-32 rounded-full border-8 border-gray-800 flex items-center justify-center" style={{background: 'conic-gradient(#D4AF37 0% 70%, #3b82f6 70% 90%, #22c55e 90% 100%)'}}>
                                 <div className="absolute w-24 h-24 bg-[#0a0a0a] rounded-full"></div>
                                 <span className="relative z-10 font-bold text-white">Device</span>
                             </div>
                             <div className="space-y-2 text-sm">
                                 <div className="flex items-center gap-2"><Smartphone size={14} className="text-gold"/> Mobile (70%)</div>
                                 <div className="flex items-center gap-2"><Monitor size={14} className="text-blue-500"/> Desktop (20%)</div>
                                 <div className="flex items-center gap-2"><Tv size={14} className="text-green-500"/> Smart TV (10%)</div>
                             </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs text-gray-500 uppercase font-bold tracking-widest">Engajamento Mensal (Últimos 6 meses)</h4>
                            <div className="flex gap-2 h-24 items-end mb-2">
                                {engagementData.map((h, i) => {
                                    const isCurrentMonth = i === engagementData.length - 1;
                                    return (
                                        <div key={i} className="flex-1 flex flex-col justify-end group relative h-full">
                                            <div 
                                                className={`w-full rounded-t-sm transition-all duration-500 relative ${isCurrentMonth ? 'bg-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-gray-800 hover:bg-gray-700'}`} 
                                                style={{height: `${h}%`}}
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                    {h}k Views
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-500 uppercase font-mono font-bold">
                                {monthLabels.map((m, i) => (
                                    <span key={i} className={i === monthLabels.length - 1 ? 'text-gold' : ''}>{m}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* DETAILED TABLE */}
                <div className="glass-panel rounded-2xl border border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center">
                        <h3 className="font-bold flex items-center gap-2"><BarChart3 size={18} className="text-blue-500"/> Performance Detalhada por Canal</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-black uppercase tracking-wider text-xs font-bold text-gray-500">
                                <tr>
                                    <th className="p-4">Canal</th>
                                    <th className="p-4">Categoria</th>
                                    <th className="p-4">Subs</th>
                                    <th className="p-4">Views Totais</th>
                                    <th className="p-4 text-center">Taxa Engaj.</th>
                                    <th className="p-4 text-center">Tendência</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {PODCASTS.map((p) => {
                                    // Simulation logic for trends
                                    const isTrending = Math.random() > 0.5;
                                    const engagementRate = (Math.random() * (8 - 3) + 3).toFixed(1);

                                    return (
                                        <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-4 font-bold text-white flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden border border-gray-700">
                                                    <SmartImage src={p.image} alt={p.name} className="w-full h-full object-cover" fallbackName={p.name} />
                                                </div>
                                                {p.name}
                                            </td>
                                            <td className="p-4"><span className="bg-gray-800 px-2 py-1 rounded text-xs border border-gray-700">{p.category}</span></td>
                                            <td className="p-4 font-mono">{p.subscribers}</td>
                                            <td className="p-4 font-mono text-white">{p.views}</td>
                                            <td className="p-4 text-center">
                                                <div className="w-full bg-gray-800 rounded-full h-1.5 mt-1 overflow-hidden">
                                                    <div className="bg-gold h-full" style={{width: `${parseFloat(engagementRate) * 10}%`}}></div>
                                                </div>
                                                <span className="text-xs mt-1 block">{engagementRate}%</span>
                                            </td>
                                            <td className="p-4 text-center">
                                                {isTrending ? 
                                                    <TrendingUp size={16} className="text-green-500 mx-auto" /> : 
                                                    <div className="w-2 h-0.5 bg-gray-500 mx-auto"></div>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-600 uppercase tracking-widest">Dados atualizados em tempo real via API 16.15 Studios</p>
                </div>
            </div>
        </div>
    );
};

const FounderPage = () => {
   return (
      <div className="min-h-screen pt-20 pb-12 bg-black relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

         <div className="max-w-7xl mx-auto px-4 relative z-10 pt-8">
             <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                 <div className="w-full md:w-1/2 relative group">
                     <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10"></div>
                        <SmartImage 
                            src="founder.png" 
                            alt="Rafael Soares" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            fallbackName="Rafael Soares"
                        />
                     </div>
                     <div className="absolute -bottom-6 -right-6 bg-gold text-black p-6 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.3)] hidden md:block transform group-hover:translate-y-2 transition-transform">
                        <div className="font-futura font-bold text-3xl leading-none">CEO</div>
                        <div className="text-xs uppercase tracking-widest font-bold opacity-80 mt-1">& Founder</div>
                     </div>
                 </div>

                 <div className="w-full md:w-1/2 space-y-8">
                     <div>
                        <h2 className="text-gold font-mono text-sm tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                           <div className="w-8 h-[1px] bg-gold"></div>
                           The Visionary
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-futura font-bold leading-none text-white mb-2">
                           RAFAEL <br/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">SOARES</span>
                        </h1>
                     </div>

                     <div className="border-l-4 border-gold pl-6 py-2">
                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light italic">
                           "O 16.15 Studios não é apenas uma produtora; é um <span className="text-white font-bold">ecossistema de influência</span> de alta performance. Construímos pontes entre marcas visionárias e audiências leais."
                        </p>
                     </div>

                     <p className="text-gray-400 leading-relaxed">
                        Com uma trajetória marcada pela inovação e pelo impacto social, Rafael Soares transformou o 16.15 Studios em referência no mercado de áudio digital. Sua expertise vai além da técnica: ele desenha estratégias que convertem ouvintes em comunidades e conteúdo em retorno sobre investimento (ROI).
                     </p>

                     <div className="flex gap-4 pt-4">
                        <a href="https://instagram.com/rsoares16.15" target="_blank" className="bg-gold text-black px-8 py-3 rounded font-bold uppercase tracking-wider hover:bg-yellow-500 transition-colors flex items-center gap-2">
                           <Briefcase size={18} /> Conectar
                        </a>
                        <button className="border border-gray-700 hover:border-white text-gray-300 hover:text-white px-8 py-3 rounded font-bold uppercase tracking-wider transition-colors">
                           Ver Press Kit
                        </button>
                     </div>
                 </div>
             </div>

             <div className="grid md:grid-cols-3 gap-6 mb-24">
                 <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
                     <Target className="w-10 h-10 text-gold mb-6 group-hover:scale-110 transition-transform" />
                     <h3 className="text-xl font-bold text-white mb-3">Visão Estratégica</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">
                        Entendemos o algoritmo, mas focamos em pessoas. Criamos narrativas que retêm atenção e geram autoridade instantânea para sua marca.
                     </p>
                 </div>
                 <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
                     <Rocket className="w-10 h-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                     <h3 className="text-xl font-bold text-white mb-3">Aceleração de Negócios</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">
                        Nossos podcasts não são apenas programas; são ferramentas de vendas e networking. Sua empresa inserida em conversas que moldam o mercado.
                     </p>
                 </div>
                 <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
                     <TrendingUp className="w-10 h-10 text-green-500 mb-6 group-hover:scale-110 transition-transform" />
                     <h3 className="text-xl font-bold text-white mb-3">ROI & Impacto</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">
                        Números auditáveis e engajamento real. Transformamos views em leads qualificados e brand awareness em valor de mercado.
                     </p>
                 </div>
             </div>

             <div className="mb-12 border-l-4 border-gold pl-6 py-4 max-w-4xl mx-auto space-y-6">
                 <h3 className="text-gold font-bold mb-4 uppercase tracking-widest text-sm">Nossas Raízes</h3>
                 <p className="text-lg text-gray-300 leading-relaxed">
                    Tudo começou em um momento de clareza e esforço: uma caminhada de 21km e uma conversa decisiva com <span className="text-white font-bold">Fabio Gato</span>. Foi ali que a semente do nosso podcast, o 16.15, foi plantada.
                 </p>
                 <p className="text-lg text-gray-300 leading-relaxed">
                    A jornada inaugural começou de forma colaborativa e modesta: em um espaço simples, ao lado da Padaria Líder, na Vila Ede, reunindo 12 visionários que abraçaram o projeto.
                 </p>
                 <p className="text-lg text-gray-300 leading-relaxed">
                    Após dois anos, o projeto se ramificou em um movimento de crescimento: 11 amigos permaneceram no local de origem para erguer o promissor <strong>Do Alto Podcast</strong>.
                 </p>
                 <p className="text-lg text-gray-300 leading-relaxed">
                    Enquanto isso, o 16.15 podcast evoluía e se transformava no que é hoje: o <span className="text-gold font-bold">P.O LABS Estúdios</span>. Essa evolução foi marcada pela entrada estratégica dos sócios <span className="text-white">Bruno Vesentini</span> e <span className="text-white">Emerson Leão</span>, que se juntaram ao nosso fundador, <span className="text-white">Rafael Soares</span>. Juntos, eles guiaram o estúdio em uma expansão geográfica e profissional, passando por Alphaville e Berrini, até se estabelecerem no Bosque da Saúde.
                 </p>
                 <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 mt-6">
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                        <span className="text-gold font-bold block mb-2 uppercase text-sm tracking-wider">O Resultado</span>
                        Hoje, o P.O LABS é um hub de produção robusto, com <span className="text-white font-bold">9 podcasts originais</span> e uma rede de <span className="text-white font-bold">19 podcasts parceiros</span>.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed italic border-t border-gray-800 pt-4 mt-4">
                        "Este espaço é a nossa homenagem: Ele existe para honrar cada pessoa, cada parceria, e cada passo que ajudou a pavimentar a nossa trajetória até nos tornarmos o estúdio que somos hoje."
                    </p>
                 </div>
             </div>

             <div className="mb-24 relative group rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <SmartImage 
                    src="team-1615.jpeg" 
                    alt="Equipe 16.15" 
                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
                    fallbackName="Equipe 16.15"
                />
                <div className="absolute bottom-4 right-6 z-20">
                    <span className="text-gold/50 text-xs font-futura tracking-[0.5em] uppercase">The Squad</span>
                </div>
             </div>
         </div>
      </div>
   );
};

const SocialPage = () => (
   <div className="min-h-screen pt-24 px-4 bg-gradient-to-b from-blue-950/20 to-black">
      <div className="max-w-6xl mx-auto">
         <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-[80px]"></div>
            <HandHeart className="w-20 h-20 text-gold mx-auto mb-6 relative z-10" />
            <h1 className="text-4xl md:text-5xl font-futura font-bold mb-4">RESPONSABILIDADE SOCIAL & <span className="text-gold">IMPACTO</span></h1>
            <p className="text-xl text-gray-300">Instituto 16.15 • Compartilhadores de Sorriso</p>
         </div>

         <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1 space-y-8">
               <div className="border-l-4 border-gold pl-6">
                  <h2 className="text-2xl font-bold mb-4 text-white">Transformando Vidas, Construindo o Futuro.</h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    O 16.15 Studios acredita que o sucesso corporativo deve caminhar junto com o desenvolvimento humano. Através do nosso Instituto, conectamos recursos a quem precisa, criando um ciclo virtuoso de prosperidade e dignidade.
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-4 my-8">
                  <div className="glass-panel p-4 rounded-xl text-center">
                      <div className="text-3xl font-bold text-gold mb-1">5k+</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest">Cestas Básicas</div>
                  </div>
                  <div className="glass-panel p-4 rounded-xl text-center">
                      <div className="text-3xl font-bold text-blue-500 mb-1">12</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest">Comunidades</div>
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                     href="https://wa.me/5511975557317?text=Olá! Gostaria de saber como posso apoiar o Instituto 16.15." 
                     target="_blank" 
                     rel="noreferrer"
                     className="bg-gold hover:bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
                  >
                     <Smile size={20} />
                     Quero Ajudar
                  </a>
                  <a href="https://www.instagram.com/instituto16.15" target="_blank" className="border border-gray-700 hover:border-white hover:bg-white/5 px-8 py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                     <Instagram size={20} />
                     Ver Projetos
                  </a>
               </div>
            </div>
            
            <div className="order-1 md:order-2 relative group">
                <div className="absolute inset-0 bg-gold/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <img 
                     src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop" 
                     className="rounded-2xl transform translate-y-8 shadow-2xl border border-gray-800" 
                     alt="Comunidade unida"
                  />
                  <img 
                     src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop" 
                     className="rounded-2xl shadow-2xl border border-gray-800" 
                     alt="Ação social"
                  />
               </div>
            </div>
         </div>

         <div className="glass-panel p-12 rounded-3xl text-center border border-gray-800 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <Briefcase size={120} />
             </div>
             <h3 className="text-2xl font-bold mb-4">Parceria Corporativa & ESG</h3>
             <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                Sua empresa pode ser um agente de transformação. Alinhe sua marca aos valores de responsabilidade social e impacte positivamente o ecossistema.
             </p>
             <button className="text-gold border-b border-gold pb-1 hover:text-white hover:border-white transition-colors uppercase tracking-widest text-sm font-bold">
                Solicitar Apresentação Institucional
             </button>
         </div>
      </div>
   </div>
);

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPodcastId, setSelectedPodcastId] = useState<string | null>(null);

  const selectedPodcast = useMemo(() => 
    PODCASTS.find(p => p.id === selectedPodcastId), 
  [selectedPodcastId]);

  const handlePodcastSelect = (id: string) => {
    setSelectedPodcastId(id);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedPodcastId(null);
  };

  const handleNavigate = (tab: string) => {
      setActiveTab(tab);
      setSelectedPodcastId(null);
      window.scrollTo(0,0);
  }

  if (showIntro) {
      return <IntroGlobe onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-gold selection:text-black">
      <ScrollProgress />
      
      {!selectedPodcastId && (
        <Navigation activeTab={activeTab} setActiveTab={handleNavigate} />
      )}

      <main>
        {selectedPodcastId && selectedPodcast ? (
           <PodcastDetail podcast={selectedPodcast} onBack={handleBack} />
        ) : (
           <>
              {activeTab === 'home' && (
                  <>
                    <HeroSection onNavigate={handleNavigate} />
                    <PodcastGrid onSelect={handlePodcastSelect} />
                    <StrategicPartnersSection />
                    <ShareStoryCTA />
                  </>
              )}
              {activeTab === 'podcasts' && (
                  <div className="pt-20">
                    <PodcastGrid onSelect={handlePodcastSelect} />
                  </div>
              )}
              {activeTab === 'studio' && <StudioPage />}
              {activeTab === 'analytics' && <AnalyticsPage />}
              {activeTab === 'founder' && <FounderPage />}
              {activeTab === 'social' && <SocialPage />}
              {activeTab === 'awards' && (
                    <div className="pt-24 min-h-screen bg-black text-white px-4 pb-12">
                         <div className="max-w-7xl mx-auto">
                             <div className="text-center mb-16 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-[80px]"></div>
                                <Award className="w-16 h-16 text-gold mx-auto mb-6 relative z-10" />
                                <h1 className="text-4xl md:text-5xl font-futura font-bold mb-4 relative z-10">HALL OF <span className="text-gold">FAME</span></h1>
                                <p className="text-gray-400 relative z-10">Reconhecimento da excelência em conteúdo digital.</p>
                             </div>
                             
                             <div className="grid gap-8">
                                {PODCASTS.filter(p => p.awards.length > 0).map(p => (
                                    <div key={p.id} className="glass-panel p-8 rounded-2xl border border-gray-800 flex flex-col md:flex-row gap-8 items-center hover:border-gold/30 transition-colors">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gold/30 shrink-0 bg-black">
                                            <SmartImage src={p.image} alt={p.name} className="w-full h-full object-cover" fallbackName={p.name} />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <h2 className="text-2xl font-bold mb-4 text-white">{p.name}</h2>
                                            <div className="grid gap-4">
                                                {p.awards.map((a, i) => (
                                                    <div key={i} className="bg-white/5 p-4 rounded-lg flex items-center justify-between border-l-4 border-gold">
                                                        <div>
                                                            <div className="font-bold text-lg text-gold">{a.position} Lugar</div>
                                                            <div className="text-gray-300">{a.title}</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-sm font-bold bg-gray-800 px-2 py-1 rounded text-white">{a.year}</div>
                                                            <div className="text-xs text-gray-500 mt-1 uppercase">{a.category}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                             </div>
                         </div>
                     </div>
              )}
           </>
        )}
      </main>

      <ScrollToTop />
      
      {!selectedPodcastId && (
        <footer className="bg-black py-12 border-t border-gray-900 text-center relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 border border-gold rounded-full flex items-center justify-center">
                    <span className="font-futura font-bold text-gold text-[10px]">PO</span>
                </div>
                <span className="font-futura font-bold tracking-wider text-gray-500">16.15 STUDIOS</span>
            </div>
            <p className="text-gray-600 text-xs">© 2025 PO Labs. Todos os direitos reservados.</p>
        </footer>
      )}
    </div>
  );
};

export default App;