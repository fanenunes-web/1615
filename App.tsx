import React, { useState, useEffect } from 'react';
import { Play, Mic, Award, ShoppingCart, Mail, Heart, ArrowRight, Instagram, Youtube, User, Globe, MessageSquare, Send, Video, Mic2, Layout, Wifi, CheckCircle, MessageCircle, BarChart3, TrendingUp, Zap, Activity, Eye, Users, ExternalLink } from 'lucide-react';
import IntroGlobe from './components/IntroGlobe';
import { Navigation } from './components/Navigation';
import { PODCASTS, SPONSORS, TESTIMONIALS } from './constants';
import { generateVideoSummary, generateNetworkAnalysis } from './services/geminiService';
import { Podcast } from './types';

// --- Sub-components defined here for simplicity due to file limits ---

const HeroSection = () => (
  <div className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?q=80&w=2070&auto=format&fit=crop" 
        alt="Studio Background" 
        className="w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
    </div>
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-8xl font-futura font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
        PO <span className="text-gold">LABS</span>
      </h1>
      <p className="text-lg md:text-2xl text-gray-300 font-light tracking-widest uppercase mb-12">
        A evolução do Podcast • Marcos 16:15
      </p>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <button className="px-8 py-4 bg-gold hover:bg-yellow-500 text-black font-bold rounded-none skew-x-[-10deg] transition-all transform hover:scale-105">
           <span className="skew-x-[10deg] inline-block">CONHEÇA O ESTÚDIO</span>
        </button>
        <button className="px-8 py-4 border border-white text-white hover:bg-white/10 hover:text-white font-bold rounded-none skew-x-[-10deg] transition-all">
           <span className="skew-x-[10deg] inline-block">NOSSOS CANAIS</span>
        </button>
      </div>
    </div>
    
    {/* Floating elements */}
    <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
       <ArrowRight className="transform rotate-90 text-gold" />
    </div>
  </div>
);

const PodcastGrid = ({ onSelect }: { onSelect: (id: string) => void }) => (
  <section className="py-24 bg-black relative">
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
            className="group relative h-[400px] overflow-hidden rounded-xl cursor-pointer border border-gray-800 hover:border-gold/50 transition-all duration-500 bg-gray-900"
            onClick={() => onSelect(podcast.id)}
          >
            {/* Background Image (blurred) */}
            <img 
              src={podcast.image} 
              alt={podcast.name} 
              className="absolute inset-0 w-full h-full object-cover blur-xl opacity-20 transition-opacity duration-500"
            />
            
            {/* Main Logo Image - Centered and Contained to respect logo aspect ratios */}
            <div className="absolute inset-0 flex items-center justify-center p-8 pb-32 transition-transform duration-500 group-hover:scale-105">
                <img 
                  src={podcast.image} 
                  alt={`${podcast.name} Logo`}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  onError={(e) => {
                    // Fallback to placeholder if local image missing
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${podcast.name}&background=random&size=400`;
                  }}
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-xs font-bold px-2 py-1 bg-gold text-black uppercase mb-3 inline-block shadow-lg">{podcast.category}</span>
              <h3 className="text-2xl font-bold font-futura mb-2 text-white group-hover:text-gold transition-colors drop-shadow-md">{podcast.name}</h3>
              <p className="text-gray-300 text-sm line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity duration-500 mb-4">{podcast.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-400 opacity-80 group-hover:opacity-100 transition-opacity delay-200">
                <span className="flex items-center gap-1"><User size={14} /> {podcast.host}</span>
                <span className="flex items-center gap-1"><Youtube size={14} /> {podcast.subscribers}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PodcastDetail = ({ podcast, onBack }: { podcast: Podcast; onBack: () => void }) => {
  const [summary, setSummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    // Simulate fetching latest video and summarizing
    const fetchLatest = async () => {
      setLoadingSummary(true);
      // In real app, fetch from YouTube API here.
      // Mocking a delay
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
      <button onClick={onBack} className="fixed top-24 left-4 z-50 flex items-center gap-2 text-white bg-black/50 px-4 py-2 rounded-full hover:bg-gold hover:text-black transition-all">
        ← Voltar
      </button>

      {/* Hero Header */}
      <div className="relative h-[60vh]">
        <img src={podcast.image} className="w-full h-full object-cover opacity-20 blur-sm fixed top-0 left-0 -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/80 to-black"></div>
        <div className="absolute bottom-0 w-full p-8 md:p-16 max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
          <div className="w-48 h-48 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.2)] border border-gray-800 bg-black shrink-0 hidden md:block">
             <img src={podcast.image} className="w-full h-full object-contain" />
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
        
        {/* Left: Stats & Awards */}
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

        {/* Center: Latest Content & AI Summary */}
        <div className="lg:col-span-2 space-y-12">
           
           {/* AI Feature */}
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

           {/* Host Column */}
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

           {/* Shop Teaser */}
           <div className="mt-12 border-t border-gray-800 pt-12">
              <h3 className="text-2xl font-bold mb-6">Loja & Comunidade {podcast.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 
                 {/* Produto 1: Caneca */}
                 <div className="bg-gray-900 rounded-lg p-4 group hover:bg-gray-800 transition-colors cursor-pointer border border-transparent hover:border-gold/30">
                    <div className="aspect-square bg-gray-800 rounded mb-3 overflow-hidden relative">
                        <img 
                            src={`caneca-${podcast.id}.png`} 
                            alt="Caneca Oficial"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (!target.src.includes('caneca.png')) {
                                   target.src = "caneca.png"; // Fallback to generic local
                                } else {
                                   target.src = "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=400"; // Fallback to web
                                }
                            }}
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Oficial</div>
                    </div>
                    <div className="font-bold text-sm">Caneca {podcast.name}</div>
                    <div className="text-gold mt-1 font-mono">R$ 29,19</div>
                 </div>

                 {/* Produto 2: Camiseta */}
                 <div className="bg-gray-900 rounded-lg p-4 group hover:bg-gray-800 transition-colors cursor-pointer border border-transparent hover:border-gold/30">
                    <div className="aspect-square bg-gray-800 rounded mb-3 overflow-hidden relative">
                        <img 
                            src={`camiseta-${podcast.id}.png`} 
                            alt="Camiseta Collection"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (!target.src.includes('camiseta.png')) {
                                   target.src = "camiseta.png"; 
                                } else {
                                   target.src = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400";
                                }
                            }}
                        />
                    </div>
                    <div className="font-bold text-sm">Camiseta Collection</div>
                    <div className="text-gold mt-1 font-mono">R$ 50,00</div>
                 </div>

                 {/* Produto 3: Whatsapp / Grupo - CLICÁVEL */}
                 <a 
                    href={`https://wa.me/5511975557317?text=Olá, gostaria de entrar no grupo do ${podcast.name}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-gray-900 rounded-lg p-4 group hover:bg-gray-800 transition-all cursor-pointer border border-green-900 hover:border-green-500 relative"
                 >
                    <div className="aspect-square bg-gray-800 rounded mb-3 overflow-hidden relative flex items-center justify-center">
                        {/* 
                           LÓGICA DE IMAGEM: 
                           Usa whatsapp.png (genérico) ou whatsapp-{id}.png se existir
                        */}
                         <img 
                            src={`whatsapp-${podcast.id}.png`} 
                            alt={`Grupo ${podcast.name}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform absolute inset-0" 
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (!target.src.includes('whatsapp.png')) {
                                   target.src = "whatsapp.png"; 
                                } else {
                                   // Fallback se não tiver imagem local
                                   target.src = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop"; 
                                }
                            }}
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

// --- ANALYTICS PAGE ---
const AnalyticsPage = () => {
    const [aiInsight, setAiInsight] = useState("Aguardando fluxo de dados...");
    const [loading, setLoading] = useState(true);

    // Helpers to parse the rough view strings (e.g., "481.156" or "10k+")
    const parseViews = (str: string) => {
        const clean = str.toLowerCase().replace(/[^0-9.k]/g, '');
        if (clean.includes('k')) return parseFloat(clean) * 1000;
        return parseFloat(clean.replace(/\./g, '')) || 0;
    };

    const totalViews = PODCASTS.reduce((acc, curr) => acc + parseViews(curr.views), 0);
    const topPodcasts = [...PODCASTS].sort((a, b) => parseViews(b.views) - parseViews(a.views)).slice(0, 5);

    useEffect(() => {
        const getAnalysis = async () => {
            setLoading(true);
            // Construct a data summary for the AI
            const dataSummary = PODCASTS.map(p => `${p.name} (${p.category}): ${p.views} views, ${p.subscribers} subs.`).join('\n');
            
            const insight = await generateNetworkAnalysis(dataSummary);
            setAiInsight(insight);
            setLoading(false);
        };
        getAnalysis();
    }, []);

    return (
        <div className="min-h-screen pt-24 px-4 pb-12 bg-[#050505]">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                             <span className="text-red-500 font-mono text-xs uppercase tracking-widest">Live Connection</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-futura font-bold text-white">NETWORK <span className="text-gold">INTELLIGENCE</span></h1>
                    </div>
                    <div className="hidden md:block text-right">
                        <div className="text-gray-500 font-mono text-xs">SYSTEM STATUS</div>
                        <div className="text-green-500 font-bold font-mono">ONLINE // V.2.5</div>
                    </div>
                </header>

                {/* KPI ROW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="glass-panel p-6 rounded-xl border-l-4 border-gold relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Eye size={48} />
                        </div>
                        <div className="text-gray-400 text-xs font-mono mb-2 uppercase tracking-widest">Alcance Total (Views)</div>
                        <div className="text-4xl font-mono font-bold text-white">{totalViews.toLocaleString('pt-BR')}</div>
                        <div className="text-green-500 text-xs mt-2 flex items-center gap-1">
                            <TrendingUp size={12} /> +12.5% vs. mês anterior
                        </div>
                    </div>
                    <div className="glass-panel p-6 rounded-xl border-l-4 border-blue-500 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Users size={48} />
                        </div>
                        <div className="text-gray-400 text-xs font-mono mb-2 uppercase tracking-widest">Canais Ativos</div>
                        <div className="text-4xl font-mono font-bold text-white">{PODCASTS.length}</div>
                        <div className="text-blue-400 text-xs mt-2 flex items-center gap-1">
                            <Activity size={12} /> 100% Uptime
                        </div>
                    </div>
                    <div className="glass-panel p-6 rounded-xl border-l-4 border-purple-500 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Zap size={48} />
                        </div>
                        <div className="text-gray-400 text-xs font-mono mb-2 uppercase tracking-widest">Impacto Estimado</div>
                        <div className="text-4xl font-mono font-bold text-white">4.2M</div>
                         <div className="text-purple-400 text-xs mt-2 flex items-center gap-1">
                            Impressões mensais
                        </div>
                    </div>
                </div>

                {/* MAIN DASHBOARD */}
                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Left: Performance Graph */}
                    <div className="lg:col-span-2 glass-panel p-8 rounded-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold flex items-center gap-2"><BarChart3 size={20} className="text-gold"/> Top Performance</h3>
                            <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">Últimos 30 dias</span>
                        </div>
                        <div className="space-y-6">
                            {topPodcasts.map((p, i) => {
                                const percentage = (parseViews(p.views) / parseViews(topPodcasts[0].views)) * 100;
                                return (
                                    <div key={p.id}>
                                        <div className="flex justify-between mb-2 text-sm">
                                            <span className="font-bold text-gray-300">{p.name}</span>
                                            <span className="font-mono text-gold">{p.views}</span>
                                        </div>
                                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-gold to-yellow-600 transition-all duration-1000 ease-out"
                                                style={{ width: `${percentage}%`, animationDelay: `${i * 100}ms` }}
                                            ></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Right: AI Core */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        
                        {/* AI Insight Card */}
                        <div className="glass-panel p-6 rounded-2xl border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-blue-400 font-mono text-sm tracking-widest flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                    GEMINI CORE ANALYTICS
                                </h3>
                                <div className="text-[10px] text-gray-500 border border-gray-800 px-1 rounded">V2.5 FLASH</div>
                            </div>
                            
                            <div className="min-h-[140px] font-mono text-sm leading-relaxed text-gray-300 relative">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center h-full gap-2 opacity-50">
                                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-xs">Processando dados da rede...</span>
                                    </div>
                                ) : (
                                    <p className="animate-fade-in typing-effect">{aiInsight}</p>
                                )}
                            </div>
                        </div>

                        {/* Live Ticker */}
                        <div className="flex-1 glass-panel p-6 rounded-2xl">
                            <h3 className="font-bold text-sm text-gray-400 mb-4 uppercase tracking-widest">Live Activity</h3>
                            <div className="space-y-4 overflow-hidden relative h-[200px]">
                                {[1,2,3,4,5].map((_, i) => (
                                    <div key={i} className="flex gap-3 items-start animate-float" style={{ animationDelay: `${i * 1.5}s`, opacity: 0.7 }}>
                                        <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center shrink-0">
                                            <User size={14} className="text-gray-500" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-300">Nova inscrição em <span className="text-gold font-bold">{PODCASTS[i % PODCASTS.length].name}</span></div>
                                            <div className="text-[10px] text-gray-600">Há {i * 12 + 2} segundos • Via YouTube</div>
                                        </div>
                                    </div>
                                ))}
                                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#111] to-transparent pointer-events-none"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

const FounderPage = () => {
   const [imgError, setImgError] = useState(false);

   return (
      <div className="min-h-screen pt-24 pb-12 px-4 max-w-5xl mx-auto flex flex-col items-center">
         {/* Updated container: Removed explicit border to accommodate the new logo-style image with its own border */}
         <div className="w-72 h-72 rounded-full overflow-hidden mb-8 shadow-[0_0_50px_rgba(212,175,55,0.3)] bg-black relative group transition-transform duration-500 hover:scale-105 border-4 border-gold/20">
            {!imgError ? (
               <img 
                  src="founder.jpg?v=3" 
                  alt="Rafael Soares" 
                  className="w-full h-full object-cover" 
                  onError={() => setImgError(true)}
               />
            ) : (
               <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-400 p-4 text-center">
                  <User size={48} className="mb-2 text-gold" />
                  <span className="text-xs">
                     Foto não encontrada.<br/>
                     Salve o novo arquivo como<br/>
                     <strong className="text-white">founder.jpg</strong>
                  </span>
               </div>
            )}
            {/* Subtle glow instead of overlay for clarity */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none rounded-full"></div>
         </div>
         <h1 className="text-4xl md:text-6xl font-futura font-bold text-center mb-2">RAFAEL SOARES</h1>
         <a href="https://instagram.com/rsoares16.15" className="text-gold hover:text-white transition-colors text-xl mb-12">@rsoares16.15</a>
         
         <div className="grid md:grid-cols-2 gap-12 w-full">
            <div className="glass-panel p-8 rounded-2xl">
               <h3 className="text-2xl font-bold mb-4">Propósito</h3>
               <p className="text-gray-300 leading-relaxed text-lg italic">
                  "Meu coração pulsa por pessoas. Acredito profundamente que todo sonho carrega um potencial divino, e minha missão vai além da técnica: é sobre estender a mão, potencializar vidas e acelerar sonhos. O PO Labs é a ferramenta, mas o objetivo final é ver pessoas transformadas e propósitos realizados."
               </p>
            </div>
            <div className="glass-panel p-8 rounded-2xl">
               <h3 className="text-2xl font-bold mb-4">Legado</h3>
               <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-2"><div className="w-2 h-2 mt-2 bg-gold rounded-full"></div>Potencializador de Sonhos e Vidas</li>
                  <li className="flex items-start gap-2"><div className="w-2 h-2 mt-2 bg-gold rounded-full"></div>Idealizador de Projetos com Impacto Social</li>
                  <li className="flex items-start gap-2"><div className="w-2 h-2 mt-2 bg-gold rounded-full"></div>Estrategista focado em Pessoas e Resultados</li>
                  <li className="flex items-start gap-2"><div className="w-2 h-2 mt-2 bg-gold rounded-full"></div>Fundador do 16.15 Studios</li>
               </ul>
            </div>
         </div>
      </div>
   );
};

const SocialPage = () => (
   <div className="min-h-screen pt-24 px-4 bg-gradient-to-b from-blue-900/20 to-black">
      <div className="max-w-6xl mx-auto">
         <div className="text-center mb-16">
            <Heart className="w-20 h-20 text-red-500 mx-auto mb-6 animate-pulse" />
            <h1 className="text-5xl font-bold mb-4">Compartilhadores de Sorriso</h1>
            <p className="text-xl text-gray-300">Instituto 16.15</p>
         </div>

         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-6">
               <h2 className="text-3xl font-bold">Nossa Missão Social</h2>
               <p className="text-gray-300 leading-relaxed text-lg">
                  Muito além dos microfones e câmeras, nossa verdadeira missão é tocar vidas. Através do Instituto 16.15 e do projeto Compartilhadores de Sorriso, levamos apoio, dignidade e esperança para comunidades vulneráveis.
               </p>
               <div className="flex gap-4">
                  <a href="https://www.instagram.com/instituto16.15" target="_blank" className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                     Conheça o Instituto
                  </a>
                  <button className="border border-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                     Quero Ajudar
                  </button>
               </div>
            </div>
            <div className="order-1 md:order-2">
               <div className="grid grid-cols-2 gap-4">
                  <img src="https://picsum.photos/400/500?random=20" className="rounded-2xl transform translate-y-8" />
                  <img src="https://picsum.photos/400/500?random=21" className="rounded-2xl" />
               </div>
            </div>
         </div>
      </div>
   </div>
);

const AwardsPage = () => (
   <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto">
      <h1 className="text-5xl font-futura text-center mb-16">HALL OF <span className="text-gold">FAME</span></h1>
      
      <div className="grid md:grid-cols-2 gap-16">
         <div>
            <h2 className="text-3xl font-bold mb-8 border-b border-gray-800 pb-4">Conquistas 2024</h2>
            <div className="space-y-6">
               {PODCASTS.filter(p => p.awards.some(a => a.year === '2024')).map(p => (
                  <div key={p.id} className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                     <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                        <img src={p.image} className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <div className="text-gold font-bold">{p.awards.find(a => a.year === '2024')?.position} Lugar</div>
                        <div className="font-bold text-xl">{p.name}</div>
                        <div className="text-gray-400 text-sm">{p.awards.find(a => a.year === '2024')?.category}</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div>
            <h2 className="text-3xl font-bold mb-8 border-b border-gray-800 pb-4">Conquistas 2025</h2>
            <div className="space-y-6">
               {PODCASTS.filter(p => p.awards.some(a => a.year === '2025')).map(p => (
                  <div key={p.id} className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                     <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                        <img src={p.image} className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <div className="text-gold font-bold">{p.awards.find(a => a.year === '2025')?.position} Lugar</div>
                        <div className="font-bold text-xl">{p.name}</div>
                        <div className="text-gray-400 text-sm">{p.awards.find(a => a.year === '2025')?.category}</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   </div>
);

const StudioPage = () => (
  <div className="min-h-screen pt-20 bg-black">
    {/* Hero */}
    <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-futura font-bold mb-6">PO <span className="text-gold">LABS</span></h1>
            <p className="text-xl text-gray-300 tracking-widest uppercase">Estrutura de Cinema para o seu Podcast</p>
        </div>
    </div>

    {/* Features */}
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

    {/* Detail Section */}
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
                 <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" className="relative rounded-2xl border border-gray-700 shadow-2xl z-10" alt="Studio Interior" />
            </div>
        </div>
    </div>

    {/* CTA WhatsApp */}
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

const Footer = () => {
   const [visits, setVisits] = useState(10000);

   useEffect(() => {
      const stored = localStorage.getItem('site_visits');
      let current = stored ? parseInt(stored) : 10000;
      if (current < 10000) current = 10000;
      const newCount = current + 1;
      localStorage.setItem('site_visits', newCount.toString());
      setVisits(newCount);
   }, []);

   return (
      <footer className="bg-black border-t border-gray-900 pt-16 pb-8">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
               <h2 className="text-3xl font-futura font-bold text-white mb-6">PO <span className="text-gold">LABS</span></h2>
               <p className="text-gray-400 max-w-md mb-8">
                  Estrutura personalizada, tecnologia de ponta e propósito inabalável. O lugar onde grandes histórias ganham vida.
               </p>
               <div className="flex gap-4">
                  <Instagram className="text-gray-400 hover:text-white cursor-pointer" />
                  <Youtube className="text-gray-400 hover:text-white cursor-pointer" />
                  <Mail className="text-gray-400 hover:text-white cursor-pointer" />
               </div>
            </div>
            
            <div>
               <h3 className="font-bold text-white mb-4">Menu</h3>
               <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-gold">Home</a></li>
                  <li><a href="#" className="hover:text-gold">Podcasts</a></li>
                  <li><a href="#" className="hover:text-gold">Loja</a></li>
                  <li><a href="#" className="hover:text-gold">Contato</a></li>
               </ul>
            </div>

            <div id="newsletter">
               <h3 className="font-bold text-white mb-4">Newsletter</h3>
               <p className="text-xs text-gray-500 mb-4">Receba novidades mensais.</p>
               <div className="flex">
                  <input type="email" placeholder="Seu e-mail" className="bg-gray-900 border border-gray-800 rounded-l px-4 py-2 text-sm w-full focus:outline-none focus:border-gold" />
                  <button className="bg-gold text-black px-4 py-2 rounded-r font-bold hover:bg-yellow-500">OK</button>
               </div>
            </div>
         </div>
         
         {/* Sponsors */}
         <div className="max-w-7xl mx-auto px-4 border-t border-gray-900 pt-8">
            <p className="text-center text-gray-600 text-xs uppercase tracking-widest mb-6">Nossos Parceiros</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {SPONSORS.map((sponsor, i) => (
                  <span key={i} className="text-lg font-bold text-gray-500">{sponsor.name}</span>
               ))}
            </div>
         </div>
         
         <div className="flex flex-col items-center justify-center mt-12 border-t border-gray-900/50 pt-8">
            <div className="text-center text-gray-700 text-xs mb-4">
               © 2025 16.15 Studios. Todos os direitos reservados. podcast1615@gmail.com
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/30 rounded-full border border-gray-800/50">
               <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
               </div>
               <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                  <span className="text-gold font-bold text-sm mr-1">{visits.toLocaleString('pt-BR')}</span> Acessos
               </span>
            </div>
         </div>
      </footer>
   );
};

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPodcastId, setSelectedPodcastId] = useState<string | null>(null);

  const handlePodcastSelect = (id: string) => {
    setSelectedPodcastId(id);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-gold selection:text-black">
      {showIntro && <IntroGlobe onComplete={() => setShowIntro(false)} />}
      
      {!showIntro && (
        <div className="animate-fade-in">
          <Navigation 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setSelectedPodcastId(null);
              window.scrollTo(0, 0);
            }} 
          />
          
          <main>
            {selectedPodcastId ? (
               <PodcastDetail 
                 podcast={PODCASTS.find(p => p.id === selectedPodcastId)!} 
                 onBack={() => setSelectedPodcastId(null)} 
               />
            ) : (
               <>
                  {activeTab === 'home' && (
                     <>
                        <HeroSection />
                        <PodcastGrid onSelect={handlePodcastSelect} />
                        <div className="max-w-7xl mx-auto px-4 py-24">
                          <h2 className="text-4xl font-futura font-bold text-center mb-16 text-white">DEPOIMENTOS</h2>
                          <div className="grid md:grid-cols-3 gap-8">
                            {TESTIMONIALS.map((t) => (
                              <div key={t.id} className="glass-panel p-8 rounded-xl relative">
                                <div className="text-gold text-4xl font-serif absolute top-4 left-4">"</div>
                                <p className="text-gray-300 italic mb-6 relative z-10">{t.text}</p>
                                <div>
                                  <div className="font-bold text-white">{t.author}</div>
                                  <div className="text-xs text-gray-500">{t.role}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                     </>
                  )}
                  {activeTab === 'podcasts' && <PodcastGrid onSelect={handlePodcastSelect} />}
                  {activeTab === 'analytics' && <AnalyticsPage />}
                  {activeTab === 'studio' && <StudioPage />}
                  {activeTab === 'founder' && <FounderPage />}
                  {activeTab === 'social' && <SocialPage />}
                  {activeTab === 'awards' && <AwardsPage />}
               </>
            )}
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;