import React, { useState } from 'react';
import { Zap, Cpu, MemoryStick, Layers, Gauge, CheckCircle2, ArrowRight } from 'lucide-react';

export const PerformanceSection: React.FC = () => {
  const [activeEngine, setActiveEngine] = useState<'ignite' | 'vanilla'>('ignite');

  return (
    <section id="fps-boost" className="py-20 md:py-28 bg-[#080808] relative overflow-hidden">
      {/* Background flare */}
      <div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#ff6a00]/8 blur-[160px] pointer-events-none rounded-full" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold text-[#ff6a00] uppercase tracking-wider">
            Engine Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineered for Maximum Frame Rates
          </h2>
          <p className="text-sm sm:text-base text-neutral-300">
            Minecraft's legacy renderer was built in 2011. Ignite replaces the entire pipeline
            with modern multithreaded Vulkan/OpenGL bindings, aggressive entity culling, and zero-stutter memory management.
          </p>
        </div>

        {/* Benchmark Interactive Comparison Box */}
        <div className="rounded-2xl bg-[#111111] border border-white/10 p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h3 className="text-lg font-bold text-white">
                Benchmark Comparison (1080p · Max Settings · 32 Chunks)
              </h3>
              <p className="text-xs text-neutral-400">
                Tested on RTX 3060 / AMD Ryzen 5 5600X in a 100-player Hypixel Bedwars lobby
              </p>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center gap-1.5 p-1 bg-black rounded-xl border border-white/10 self-start sm:self-auto">
              <button
                onClick={() => setActiveEngine('ignite')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeEngine === 'ignite'
                    ? 'bg-[#ff6a00] text-black shadow-md shadow-[#ff6a00]/30'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Ignite Client Engine
              </button>
              <button
                onClick={() => setActiveEngine('vanilla')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeEngine === 'vanilla'
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Vanilla Minecraft 1.21
              </button>
            </div>
          </div>

          {/* Metric Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* FPS Metric */}
            <div className={`p-5 rounded-xl border transition-all ${
              activeEngine === 'ignite' 
                ? 'bg-black/60 border-[#ff6a00]/40 shadow-lg shadow-[#ff6a00]/10' 
                : 'bg-black/30 border-white/5'
            }`}>
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Average FPS
              </div>
              <div className="mt-2 text-3xl font-black font-mono text-white flex items-baseline gap-2">
                {activeEngine === 'ignite' ? (
                  <>
                    <span className="text-[#ff6a00]">448</span>
                    <span className="text-xs text-emerald-400 font-sans font-bold">+380%</span>
                  </>
                ) : (
                  <span className="text-neutral-400">94</span>
                )}
              </div>
              <div className="mt-2 text-xs text-neutral-400">
                {activeEngine === 'ignite'
                  ? 'Fluid motion even in dense team fights'
                  : 'Noticeable frame pacing jitter in lobbies'}
              </div>
            </div>

            {/* 1% Lows */}
            <div className={`p-5 rounded-xl border transition-all ${
              activeEngine === 'ignite' 
                ? 'bg-black/60 border-[#ff6a00]/40 shadow-lg shadow-[#ff6a00]/10' 
                : 'bg-black/30 border-white/5'
            }`}>
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                1% Lows (Stutter Floor)
              </div>
              <div className="mt-2 text-3xl font-black font-mono text-white flex items-baseline gap-2">
                {activeEngine === 'ignite' ? (
                  <>
                    <span className="text-[#ff6a00]">292</span>
                    <span className="text-xs text-emerald-400 font-sans font-bold">+780%</span>
                  </>
                ) : (
                  <span className="text-neutral-400">33</span>
                )}
              </div>
              <div className="mt-2 text-xs text-neutral-400">
                {activeEngine === 'ignite'
                  ? 'Consistent frametimes prevent missed sword hits'
                  : 'Stutter spikes during rapid mouse flicking'}
              </div>
            </div>

            {/* Frame Latency */}
            <div className={`p-5 rounded-xl border transition-all ${
              activeEngine === 'ignite' 
                ? 'bg-black/60 border-[#ff6a00]/40 shadow-lg shadow-[#ff6a00]/10' 
                : 'bg-black/30 border-white/5'
            }`}>
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Frame Render Time
              </div>
              <div className="mt-2 text-3xl font-black font-mono text-white flex items-baseline gap-2">
                {activeEngine === 'ignite' ? (
                  <>
                    <span className="text-[#ff6a00]">2.2ms</span>
                    <span className="text-xs text-emerald-400 font-sans font-bold">-86%</span>
                  </>
                ) : (
                  <span className="text-neutral-400">15.8ms</span>
                )}
              </div>
              <div className="mt-2 text-xs text-neutral-400">
                Sub-millisecond frame buffer latency for instant reactions
              </div>
            </div>

            {/* RAM Allocation */}
            <div className={`p-5 rounded-xl border transition-all ${
              activeEngine === 'ignite' 
                ? 'bg-black/60 border-[#ff6a00]/40 shadow-lg shadow-[#ff6a00]/10' 
                : 'bg-black/30 border-white/5'
            }`}>
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                RAM Footprint
              </div>
              <div className="mt-2 text-3xl font-black font-mono text-white flex items-baseline gap-2">
                {activeEngine === 'ignite' ? (
                  <>
                    <span className="text-[#ff6a00]">1.2 GB</span>
                    <span className="text-xs text-emerald-400 font-sans font-bold">-68%</span>
                  </>
                ) : (
                  <span className="text-neutral-400">3.8 GB</span>
                )}
              </div>
              <div className="mt-2 text-xs text-neutral-400">
                Runs effortlessly on budget laptops and 8GB rigs
              </div>
            </div>
          </div>
        </div>

        {/* 4 Architectural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff6a00]/15 flex items-center justify-center text-[#ff6a00]">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Multithreaded Chunks</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Splits world tessellation across all available CPU threads so moving into ungenerated terrain never causes frame drops.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff6a00]/15 flex items-center justify-center text-[#ff6a00]">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Aggressive Entity Culling</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Prevents the GPU from processing players, nameplates, and chest tile entities obscured behind walls or floors.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff6a00]/15 flex items-center justify-center text-[#ff6a00]">
              <MemoryStick className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Zero Memory Leak GC</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Optimized generational garbage collection parameters designed to avoid 1-second lag spikes during intense PvP matches.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff6a00]/15 flex items-center justify-center text-[#ff6a00]">
              <Gauge className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Raw Polling Engine</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Bypasses Windows OS mouse smoothing and acceleration for 1:1 raw hardware tracking when aiming and jitter clicking.
            </p>
          </div>
        </div>

        {/* Launcher preview frame */}
        <div className="rounded-2xl bg-[#111111] border border-white/10 p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="text-xs font-semibold text-[#ff6a00] uppercase tracking-wider">
              Ignite Hub Launcher
            </div>
            <h3 className="text-2xl font-bold text-white">
              One-Click Launch. Instant Profiles.
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Our standalone Windows launcher automatically syncs mods, updates your Java runtime,
              and allows 1-click toggling between competitive 1.8.9 PvP profiles and modern 1.21.4 survival realms.
            </p>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ff6a00]" />
                Auto-detects official Microsoft/Mojang accounts securely
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ff6a00]" />
                Bundled OpenJDK 21 64-bit with custom ZGC flags
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ff6a00]" />
                Cloud profile backups & auto-updating mod packs
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/2 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="/src/assets/images/client_launcher_interface_1793995041530.jpg"
              alt="Ignite Hub Minecraft Client Launcher Interface"
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
