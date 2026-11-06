import React, { useState } from 'react';
import { Download, Menu, X, Flame, ShieldCheck, Sparkles, Sliders } from 'lucide-react';

interface NavbarProps {
  onOpenDownload: () => void;
  onOpenConfig?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDownload, onOpenConfig }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080808]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-18">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff7a00] to-[#e65100] flex items-center justify-center text-black shadow-lg shadow-[#ff6a00]/20 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 fill-black stroke-black" />
          </div>
          <span className="font-black text-2xl tracking-wider text-white">
            IGNITE<span className="text-[#ff6a00]">.</span>
          </span>
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a 
            href="#features" 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Features
          </a>
          <a 
            href="#hud-studio" 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            HUD Studio
          </a>
          <a 
            href="#fps-boost" 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            FPS Engine
          </a>
          <a 
            href="#mods" 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Mods & Cosmetics
          </a>
          <a 
            href="#faq" 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {onOpenConfig && (
            <button
              onClick={onOpenConfig}
              title="Installer & Executable Settings"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Sliders className="w-3.5 h-3.5 text-[#ff6a00]" />
              <span>.exe Config</span>
            </button>
          )}

          <button
            onClick={onOpenDownload}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#ff6a00] hover:bg-[#ff7b1a] active:bg-[#e65a00] rounded-lg shadow-md shadow-[#ff6a00]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Download .exe</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0c0c0c] px-5 py-5 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-neutral-300">
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded hover:bg-white/5 hover:text-white transition-colors"
            >
              Features
            </a>
            <a 
              href="#hud-studio" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded hover:bg-white/5 hover:text-white transition-colors"
            >
              HUD Studio
            </a>
            <a 
              href="#fps-boost" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded hover:bg-white/5 hover:text-white transition-colors"
            >
              FPS Engine
            </a>
            <a 
              href="#mods" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded hover:bg-white/5 hover:text-white transition-colors"
            >
              Mods & Cosmetics
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded hover:bg-white/5 hover:text-white transition-colors"
            >
              FAQ
            </a>
          </nav>
          
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wider text-black bg-[#ff6a00] hover:bg-[#ff7b1a] rounded-lg shadow-md transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download IgniteClient-Setup.exe</span>
            </button>
            
            {onOpenConfig && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConfig();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 border border-white/10 rounded-lg"
              >
                <Sliders className="w-3.5 h-3.5 text-[#ff6a00]" />
                <span>Installer & Executable Settings</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
