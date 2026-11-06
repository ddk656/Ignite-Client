import React from 'react';
import { Flame, Download, Github, Twitter, Disc as Discord, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenDownload: () => void;
  onOpenConfig?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownload, onOpenConfig }) => {
  return (
    <footer className="bg-[#060606] border-t border-white/10 pt-16 pb-24 md:pb-16 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5 text-white font-bold text-xl group">
              <div className="w-7 h-7 rounded-lg bg-[#ff6a00] flex items-center justify-center text-black">
                <Flame className="w-4 h-4 fill-black stroke-black" />
              </div>
              <span className="tracking-wider">
                IGNITE<span className="text-[#ff6a00]">.</span>
              </span>
            </a>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              The high-performance, modular Minecraft client engineered for PvP combat, 
              cinematic visuals, and triple-digit framerate boosts across 1.8.9 through 1.21.4.
            </p>
            <div className="flex items-center gap-4 text-neutral-400">
              <button 
                onClick={onOpenDownload}
                className="hover:text-white transition-colors"
                title="Download Installer"
              >
                Windows .exe
              </button>
              <span>·</span>
              <a href="#hud-studio" className="hover:text-white transition-colors">
                HUD Customizer
              </a>
              <span>·</span>
              <a href="#mods" className="hover:text-white transition-colors">
                Mods Locker
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Client Features
                </a>
              </li>
              <li>
                <a href="#hud-studio" className="hover:text-white transition-colors">
                  Interactive HUD Studio
                </a>
              </li>
              <li>
                <a href="#fps-boost" className="hover:text-white transition-colors">
                  FPS Performance Engine
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ & Installation
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Legal & Community</h4>
            <p className="text-[11px] text-neutral-400 leading-normal">
              Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenDownload}
                className="px-3.5 py-1.5 text-xs font-bold text-black bg-[#ff6a00] hover:bg-[#ff7b1a] rounded-lg transition-colors cursor-pointer"
              >
                Download .exe
              </button>
              {onOpenConfig && (
                <button
                  onClick={onOpenConfig}
                  className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white bg-neutral-900 border border-white/10 rounded-lg cursor-pointer"
                >
                  File Config
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quiet copyright bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            © {new Date().getFullYear()} Ignite Client Team. Open Source & Free for all players.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ff6a00]" />
              Hypixel & FairPlay Verified
            </span>
            <span>·</span>
            <span>Windows x64 Native</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
