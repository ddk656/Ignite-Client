import React, { useState, useEffect, useRef } from 'react';
import { MousePointer, Eye, Move, RefreshCw, Palette, Sparkles, Check, Crosshair as CrosshairIcon, Shield, Compass, Activity } from 'lucide-react';

export const HudStudio: React.FC = () => {
  // HUD toggles
  const [showKeystrokes, setShowKeystrokes] = useState(true);
  const [showCps, setShowCps] = useState(true);
  const [showArmor, setShowArmor] = useState(true);
  const [showCoords, setShowCoords] = useState(true);
  const [showPing, setShowPing] = useState(true);
  const [crosshairStyle, setCrosshairStyle] = useState<'cross' | 'dot' | 'circle' | 'diamond'>('cross');
  const [hudTheme, setHudTheme] = useState<'orange' | 'white' | 'dark'>('orange');

  // Keystrokes state (W, A, S, D, Space, LMB, RMB)
  const [activeKeys, setActiveKeys] = useState<{ [key: string]: boolean }>({});
  
  // CPS Click test state
  const [clickCount, setClickCount] = useState(0);
  const [cps, setCps] = useState(0);
  const [maxCps, setMaxCps] = useState(0);
  const clickTimestamps = useRef<number[]>([]);

  // Listen to physical keyboard presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', ' ', 'shift'].includes(key)) {
        setActiveKeys((prev) => ({ ...prev, [key === ' ' ? 'space' : key]: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', ' ', 'shift'].includes(key)) {
        setActiveKeys((prev) => ({ ...prev, [key === ' ' ? 'space' : key]: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle manual click / CPS tracker
  const handleCpsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const now = performance.now();
    clickTimestamps.current.push(now);

    // Keep clicks from the last 1000ms
    const recent = clickTimestamps.current.filter((t) => now - t <= 1000);
    clickTimestamps.current = recent;
    const currentCps = recent.length;
    setCps(currentCps);
    if (currentCps > maxCps) setMaxCps(currentCps);
    setClickCount((prev) => prev + 1);

    // Flash LMB keystroke
    setActiveKeys((prev) => ({ ...prev, lmb: true }));
    setTimeout(() => {
      setActiveKeys((prev) => ({ ...prev, lmb: false }));
    }, 90);
  };

  const handleRmbClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveKeys((prev) => ({ ...prev, rmb: true }));
    setTimeout(() => {
      setActiveKeys((prev) => ({ ...prev, rmb: false }));
    }, 90);
  };

  // Theme helper classes
  const getThemeClasses = () => {
    switch (hudTheme) {
      case 'orange':
        return {
          bg: 'bg-black/85 backdrop-blur-sm border-white/15',
          activeBg: 'bg-[#ff6a00] text-black border-[#ff8800] shadow-md shadow-[#ff6a00]/40',
          accentText: 'text-[#ff6a00]',
          border: 'border-white/10',
        };
      case 'white':
        return {
          bg: 'bg-black/85 backdrop-blur-sm border-white/20',
          activeBg: 'bg-white text-black border-white shadow-md shadow-white/30',
          accentText: 'text-white',
          border: 'border-white/20',
        };
      case 'dark':
        return {
          bg: 'bg-[#121212]/95 border-neutral-800',
          activeBg: 'bg-neutral-700 text-white border-neutral-600',
          accentText: 'text-neutral-300',
          border: 'border-neutral-800',
        };
    }
  };

  const themeStyle = getThemeClasses();

  return (
    <section id="hud-studio" className="py-20 md:py-28 bg-[#0a0a0a] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold text-[#ff6a00] uppercase tracking-wider">
              Interactive In-Game Sandbox
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Precision HUD Customizer
            </h2>
            <p className="text-sm sm:text-base text-neutral-300">
              Customize every module with zero FPS impact. Test keystrokes using your keyboard,
              click the CPS tester below, and preview real-time combat telemetry.
            </p>
          </div>

          {/* Theme selector tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-[#121212] border border-white/10 rounded-xl self-start md:self-auto">
            <span className="text-xs font-medium text-neutral-400 pl-2 pr-1 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#ff6a00]" /> HUD Color:
            </span>
            <button
              onClick={() => setHudTheme('orange')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                hudTheme === 'orange'
                  ? 'bg-[#ff6a00] text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Ignite Orange
            </button>
            <button
              onClick={() => setHudTheme('white')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                hudTheme === 'white'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Stark White
            </button>
            <button
              onClick={() => setHudTheme('dark')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                hudTheme === 'dark'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Stealth Dark
            </button>
          </div>
        </div>

        {/* HUD Interactive Playground Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls & Module Toggles (1 Col) */}
          <div className="lg:col-span-1 space-y-4">
            <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <SlidersIcon className="w-4 h-4 text-[#ff6a00]" />
                Active Modules
              </h3>

              <div className="space-y-3">
                <label className="flex items-center justify-between text-xs text-neutral-300 font-medium cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff6a00]" />
                    Keystrokes (WASD)
                  </span>
                  <input
                    type="checkbox"
                    checked={showKeystrokes}
                    onChange={(e) => setShowKeystrokes(e.target.checked)}
                    className="accent-[#ff6a00] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between text-xs text-neutral-300 font-medium cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff6a00]" />
                    CPS Clicks Monitor
                  </span>
                  <input
                    type="checkbox"
                    checked={showCps}
                    onChange={(e) => setShowCps(e.target.checked)}
                    className="accent-[#ff6a00] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between text-xs text-neutral-300 font-medium cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <span className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#ff6a00]" />
                    Armor Durability HUD
                  </span>
                  <input
                    type="checkbox"
                    checked={showArmor}
                    onChange={(e) => setShowArmor(e.target.checked)}
                    className="accent-[#ff6a00] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between text-xs text-neutral-300 font-medium cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <span className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#ff6a00]" />
                    Coordinates & Biome
                  </span>
                  <input
                    type="checkbox"
                    checked={showCoords}
                    onChange={(e) => setShowCoords(e.target.checked)}
                    className="accent-[#ff6a00] w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between text-xs text-neutral-300 font-medium cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <span className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-[#ff6a00]" />
                    FPS & Ping Meter
                  </span>
                  <input
                    type="checkbox"
                    checked={showPing}
                    onChange={(e) => setShowPing(e.target.checked)}
                    className="accent-[#ff6a00] w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>

              {/* Crosshair Selector */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="text-xs font-semibold text-neutral-400">Crosshair Shape:</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['cross', 'dot', 'circle', 'diamond'] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => setCrosshairStyle(style)}
                      className={`p-2 rounded-lg text-xs font-mono font-bold capitalize transition-colors ${
                        crosshairStyle === style
                          ? 'bg-[#ff6a00] text-black'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* CPS Click Tester button */}
              <div className="pt-3 border-t border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">CPS Click Tester</span>
                  <span className="font-mono text-[#ff6a00] font-bold">Peak: {maxCps} CPS</span>
                </div>
                <button
                  onClick={handleCpsClick}
                  onContextMenu={handleRmbClick}
                  className="w-full py-4 px-4 bg-gradient-to-r from-[#ff6a00]/20 via-[#ff6a00]/30 to-[#ff6a00]/20 hover:from-[#ff6a00]/30 hover:to-[#ff6a00]/40 border border-[#ff6a00]/50 rounded-xl text-center transition-all transform active:scale-95 cursor-pointer select-none group"
                >
                  <div className="text-lg font-black font-mono text-white group-hover:text-[#ff8800]">
                    {cps} <span className="text-xs font-sans font-medium text-neutral-400">CPS</span>
                  </div>
                  <div className="text-[11px] text-neutral-300">
                    Click repeatedly (LMB or RMB)
                  </div>
                </button>
                <div className="text-[11px] text-neutral-500 text-center font-mono">
                  Total Clicks: {clickCount}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Screen Viewport (3 Cols) */}
          <div className="lg:col-span-3">
            <div className="relative aspect-[16/9] w-full rounded-2xl bg-black border border-white/15 overflow-hidden shadow-2xl">
              {/* Minecraft Arena Background */}
              <img
                src="/src/assets/images/minecraft_pvp_arena_1793995040647.jpg"
                alt="Minecraft PvP Arena In-Game View"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />

              {/* Dark subtle vignette scrim */}
              <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

              {/* Interactive In-Game HUD overlay */}
              <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between pointer-events-none select-none">
                {/* Top Section */}
                <div className="flex items-start justify-between">
                  {/* Top Left: FPS & Ping */}
                  {showPing && (
                    <div className="space-y-1.5">
                      <div className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold shadow-lg flex items-center gap-2 ${themeStyle.bg}`}>
                        <span className={themeStyle.accentText}>FPS:</span>
                        <span className="text-white">480</span>
                        <span className="text-neutral-500 font-normal">|</span>
                        <span className="text-neutral-300">14ms Ping</span>
                      </div>
                      {showCps && (
                        <div className={`px-3 py-1 rounded-lg border text-xs font-mono font-bold shadow-lg flex items-center gap-2 ${themeStyle.bg}`}>
                          <span className={themeStyle.accentText}>CPS:</span>
                          <span className="text-white">{cps}</span>
                          <span className="text-neutral-400 font-normal">LMB</span>
                          <span className="text-neutral-500">·</span>
                          <span className="text-white">{activeKeys.rmb ? 8 : 0}</span>
                          <span className="text-neutral-400 font-normal">RMB</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Top Right: Armor Durability */}
                  {showArmor && (
                    <div className={`p-2.5 rounded-xl border shadow-lg flex flex-col gap-1 text-[11px] font-mono ${themeStyle.bg}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">Helmet:</span>
                        <span className="text-neutral-300">328/363</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">Chest:</span>
                        <span className="text-neutral-300">492/528</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">Legs:</span>
                        <span className="text-neutral-300">440/495</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">Boots:</span>
                        <span className="text-neutral-300">385/429</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Center: Customizable Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  {crosshairStyle === 'cross' && (
                    <div className="w-5 h-5 relative flex items-center justify-center">
                      <div className="w-0.5 h-4 bg-[#ff6a00] shadow-[0_0_6px_#ff6a00]" />
                      <div className="h-0.5 w-4 bg-[#ff6a00] absolute shadow-[0_0_6px_#ff6a00]" />
                      <div className="w-1 h-1 bg-white rounded-full absolute" />
                    </div>
                  )}
                  {crosshairStyle === 'dot' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff6a00] border border-white shadow-[0_0_8px_#ff6a00]" />
                  )}
                  {crosshairStyle === 'circle' && (
                    <div className="w-4 h-4 rounded-full border-2 border-[#ff6a00] flex items-center justify-center shadow-[0_0_6px_#ff6a00]">
                      <div className="w-1 h-1 bg-white rounded-full" />
                    </div>
                  )}
                  {crosshairStyle === 'diamond' && (
                    <div className="w-3.5 h-3.5 rotate-45 border-2 border-[#ff6a00] flex items-center justify-center shadow-[0_0_6px_#ff6a00]">
                      <div className="w-1 h-1 bg-white" />
                    </div>
                  )}
                </div>

                {/* Bottom Section */}
                <div className="flex items-end justify-between">
                  {/* Bottom Left: Coordinates */}
                  {showCoords && (
                    <div className={`px-3.5 py-2 rounded-xl border shadow-lg font-mono text-xs ${themeStyle.bg}`}>
                      <div className="font-bold text-white">
                        <span className={themeStyle.accentText}>XYZ:</span> 482.4 / 64.0 / -102.8
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        Facing: South (Yaw: 180.2, Pitch: -2.4)
                      </div>
                    </div>
                  )}

                  {/* Bottom Right: Keystrokes Box (interactive with keyboard/clicks) */}
                  {showKeystrokes && (
                    <div className="flex flex-col items-center gap-1">
                      {/* W Key */}
                      <div
                        className={`w-9 h-9 rounded-lg border font-mono font-bold text-xs flex items-center justify-center transition-all ${
                          activeKeys.w ? themeStyle.activeBg : `${themeStyle.bg} text-white`
                        }`}
                      >
                        W
                      </div>

                      {/* A S D Keys */}
                      <div className="flex gap-1">
                        <div
                          className={`w-9 h-9 rounded-lg border font-mono font-bold text-xs flex items-center justify-center transition-all ${
                            activeKeys.a ? themeStyle.activeBg : `${themeStyle.bg} text-white`
                          }`}
                        >
                          A
                        </div>
                        <div
                          className={`w-9 h-9 rounded-lg border font-mono font-bold text-xs flex items-center justify-center transition-all ${
                            activeKeys.s ? themeStyle.activeBg : `${themeStyle.bg} text-white`
                          }`}
                        >
                          S
                        </div>
                        <div
                          className={`w-9 h-9 rounded-lg border font-mono font-bold text-xs flex items-center justify-center transition-all ${
                            activeKeys.d ? themeStyle.activeBg : `${themeStyle.bg} text-white`
                          }`}
                        >
                          D
                        </div>
                      </div>

                      {/* LMB / RMB */}
                      <div className="flex gap-1">
                        <div
                          className={`w-[56px] h-7 rounded-lg border font-mono font-bold text-[10px] flex items-center justify-center transition-all ${
                            activeKeys.lmb ? themeStyle.activeBg : `${themeStyle.bg} text-neutral-300`
                          }`}
                        >
                          LMB {cps}
                        </div>
                        <div
                          className={`w-[56px] h-7 rounded-lg border font-mono font-bold text-[10px] flex items-center justify-center transition-all ${
                            activeKeys.rmb ? themeStyle.activeBg : `${themeStyle.bg} text-neutral-300`
                          }`}
                        >
                          RMB 0
                        </div>
                      </div>

                      {/* SPACE */}
                      <div
                        className={`w-[116px] h-5 rounded-lg border font-mono font-bold text-[9px] flex items-center justify-center tracking-widest transition-all ${
                          activeKeys.space ? themeStyle.activeBg : `${themeStyle.bg} text-neutral-400`
                        }`}
                      >
                        —————
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Hint below screen */}
            <div className="mt-3 flex items-center justify-between text-xs text-neutral-400 px-1">
              <span>Press physical WASD keys on your keyboard to test live responsiveness</span>
              <span className="text-[#ff6a00] font-medium">100% Client-Side Rendered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Simple inline sliders icon for header
const SlidersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);
