import React from 'react';
import { Download, Play, ShieldCheck, Zap, Layers, Cpu, ChevronRight, CheckCircle2, Sliders } from 'lucide-react';

interface HeroProps {
  onDownload: () => void;
  onOpenConfig?: () => void;
  clientVersion?: string;
  fileSize?: string;
}

export const Hero: React.FC<HeroProps> = ({ 
  onDownload, 
  onOpenConfig,
  clientVersion = 'v4.5.2', 
  fileSize = '200 KB' 
}) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-[#080808]">
      {/* Background radial orange glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#ff6a00]/12 blur-[140px] pointer-events-none rounded-full" 
        aria-hidden="true"
      />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Subtle unboxed metadata kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
            <span className="text-[#ff6a00]">Ignite Client {clientVersion}</span>
            <span aria-hidden="true">·</span>
            <span>Windows 10 / 11 64-bit</span>
            <span aria-hidden="true">·</span>
            <span>Minecraft 1.8.9 — 1.21.4</span>
          </div>

          {/* Primary Headline with text-wrap: balance */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] [text-wrap:balance]">
            The High-Performance <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#ff7a00]">
              Minecraft Client
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed [text-wrap:balance]">
            Engineered for triple-digit frame rates, sub-millisecond input precision, 
            and over 60 modular PvP enhancements. Built for competitive Bedwars, 
            Survival, and smooth shaders.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onDownload}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider text-black bg-[#ff6a00] hover:bg-[#ff7e1e] active:bg-[#e65a00] rounded-xl shadow-xl shadow-[#ff6a00]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Download className="w-5 h-5 stroke-[2.5]" />
              <span>Download for Windows (.exe)</span>
              <span className="text-xs font-mono font-medium text-black/70 px-2 py-0.5 bg-black/10 rounded">
                {fileSize}
              </span>
            </button>

            <a
              href="#hud-studio"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-neutral-200 hover:text-white bg-neutral-900/90 hover:bg-neutral-800 border border-white/10 rounded-xl transition-all"
            >
              <Play className="w-4 h-4 text-[#ff6a00]" />
              <span>Try Interactive HUD</span>
            </a>
          </div>

          {/* Custom .exe link action */}
          {onOpenConfig && (
            <div className="pt-1">
              <button
                onClick={onOpenConfig}
                className="text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1.5 transition-colors underline decoration-dotted underline-offset-4 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-[#ff6a00]" />
                <span>Want to use your own client .exe? Click here to upload or link it</span>
              </button>
            </div>
          )}

          {/* Trust points */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-neutral-400">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#ff6a00]" />
              Hypixel & MMC Compliant
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-neutral-700">·</span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ff6a00]" />
              Clean VirusTotal Certification
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-neutral-700">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#ff6a00]" />
              Zero Bloatware or Telemetry
            </span>
          </div>
        </div>

        {/* Hero Visual Frame */}
        <div className="mt-12 lg:mt-16 relative mx-auto max-w-5xl">
          <div className="relative rounded-2xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-[#ff6a00]/20 shadow-2xl shadow-black/80">
            {/* Top window chrome */}
            <div className="rounded-t-xl bg-[#121212] px-4 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5555]/80" />
                <div className="w-3 h-3 rounded-full bg-[#ffaa00]/80" />
                <div className="w-3 h-3 rounded-full bg-[#55ff55]/80" />
                <span className="ml-3 text-xs font-mono text-neutral-400">
                  Ignite Client {clientVersion} — Minecraft 1.8.9 (Hypixel Network)
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-[#ff6a00] font-bold">452 FPS</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-300">18ms Ping</span>
              </div>
            </div>

            {/* Game Screen Canvas with fallback */}
            <div className="relative aspect-[16/9] w-full bg-[#111111] overflow-hidden rounded-b-xl group">
              <img
                src="/src/assets/images/hero_minecraft_client_1793995038758.jpg"
                alt="Ignite Minecraft Client high FPS in-game HUD screenshot"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* In-game live HUD interactive overlay simulation */}
              <div className="absolute inset-0 pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
                {/* Top left HUD elements */}
                <div className="flex flex-col gap-2.5 items-start">
                  {/* FPS Widget */}
                  <div className="px-3 py-1.5 bg-black/80 backdrop-blur-sm border border-white/15 rounded text-xs font-mono font-bold tracking-wider text-white shadow-lg">
                    <span className="text-[#ff6a00]">FPS:</span> 452 <span className="text-neutral-400 font-normal">(1% Low: 388)</span>
                  </div>

                  {/* Keystrokes mini */}
                  <div className="space-y-1">
                    <div className="flex justify-center w-24">
                      <div className="w-7 h-7 bg-black/80 border border-white/20 rounded flex items-center justify-center font-mono font-bold text-xs text-white">
                        W
                      </div>
                    </div>
                    <div className="flex gap-1 w-24 justify-center">
                      <div className="w-7 h-7 bg-black/80 border border-white/20 rounded flex items-center justify-center font-mono font-bold text-xs text-white">
                        A
                      </div>
                      <div className="w-7 h-7 bg-[#ff6a00] border border-[#ff8800] rounded flex items-center justify-center font-mono font-bold text-xs text-black shadow-lg shadow-[#ff6a00]/40">
                        S
                      </div>
                      <div className="w-7 h-7 bg-black/80 border border-white/20 rounded flex items-center justify-center font-mono font-bold text-xs text-white">
                        D
                      </div>
                    </div>
                    <div className="flex gap-1 w-24 justify-center">
                      <div className="w-[46px] h-6 bg-[#ff6a00] border border-[#ff8800] rounded flex items-center justify-center font-mono font-bold text-[10px] text-black">
                        LMB 14
                      </div>
                      <div className="w-[46px] h-6 bg-black/80 border border-white/20 rounded flex items-center justify-center font-mono font-bold text-[10px] text-white">
                        RMB 8
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className="w-4 h-4 relative flex items-center justify-center">
                    <div className="w-0.5 h-3.5 bg-[#ff6a00]" />
                    <div className="h-0.5 w-3.5 bg-[#ff6a00] absolute" />
                    <div className="w-1 h-1 bg-white rounded-full absolute" />
                  </div>
                </div>

                {/* Bottom left Coordinates */}
                <div className="flex justify-between items-end">
                  <div className="px-3 py-1.5 bg-black/80 backdrop-blur-sm border border-white/10 rounded text-[11px] font-mono text-neutral-300 space-y-0.5">
                    <div><span className="text-[#ff6a00]">XYZ:</span> 124.5 / 68.0 / -482.1</div>
                    <div><span className="text-neutral-400">Biome:</span> Plains (Day 24)</div>
                  </div>

                  {/* Bottom right quick prompt */}
                  <div className="hidden sm:block px-3 py-1 bg-black/70 backdrop-blur-sm border border-white/10 rounded text-[10px] font-mono text-neutral-400">
                    Press <span className="text-white font-bold">R-SHIFT</span> for Ignite Client Mod Menu
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quantified Proof Metrics Row */}
        <div id="features" className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-xl bg-[#111111] border border-white/10 space-y-1 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
              420+ <span className="text-sm font-sans font-medium text-[#ff6a00]">FPS</span>
            </div>
            <div className="text-xs font-semibold text-neutral-300">Sodium & Lithium Core</div>
            <div className="text-xs text-neutral-500">Up to 3.8x boost over vanilla rendering</div>
          </div>

          <div className="p-5 rounded-xl bg-[#111111] border border-white/10 space-y-1 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
              0.8<span className="text-sm font-sans font-medium text-[#ff6a00]">ms</span>
            </div>
            <div className="text-xs font-semibold text-neutral-300">Hardware Poll Response</div>
            <div className="text-xs text-neutral-500">Raw mouse and keyboard polling pipeline</div>
          </div>

          <div className="p-5 rounded-xl bg-[#111111] border border-white/10 space-y-1 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
              60+ <span className="text-sm font-sans font-medium text-[#ff6a00]">Mods</span>
            </div>
            <div className="text-xs font-semibold text-neutral-300">Fully Unlocked & Free</div>
            <div className="text-xs text-neutral-500">Keystrokes, Armor Status, Zoom, Replay</div>
          </div>

          <div className="p-5 rounded-xl bg-[#111111] border border-white/10 space-y-1 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
              100% <span className="text-sm font-sans font-medium text-[#ff6a00]">Safe</span>
            </div>
            <div className="text-xs font-semibold text-neutral-300">Hypixel Anti-Cheat Certified</div>
            <div className="text-xs text-neutral-500">Zero disallowed macros or packet tampering</div>
          </div>
        </div>
      </div>
    </section>
  );
};
