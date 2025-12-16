import React from 'react';
import { Menu, X, Radio } from 'lucide-react';

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'podcasts', label: 'Podcasts' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'studio', label: 'Estúdio PO Labs' },
    { id: 'founder', label: 'Fundador' },
    { id: 'social', label: 'Social' },
    { id: 'awards', label: 'Prêmios' },
  ];

  const newsletterLink = `mailto:podcast1615@gmail.com?subject=${encodeURIComponent("Inscrição na Newsletter PO Labs")}&body=${encodeURIComponent("Olá, gostaria de receber as novidades do 16.15 Studios.")}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center cursor-pointer group" onClick={() => setActiveTab('home')}>
             <div className="w-10 h-10 border border-gold rounded-full flex items-center justify-center mr-3 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all">
                <span className="font-futura font-bold text-gold text-xs">PO</span>
             </div>
            <span className="font-futura font-bold text-xl tracking-wider">16.15 <span className="text-gold">Studios</span></span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeTab === item.id
                      ? 'text-gold scale-110'
                      : 'text-gray-300 hover:text-white hover:scale-105'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
             <a href={newsletterLink} className="bg-gold/10 hover:bg-gold/20 text-gold border border-gold/50 px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all">
                Newsletter
             </a>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};