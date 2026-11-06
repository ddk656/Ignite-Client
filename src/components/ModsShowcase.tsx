import React, { useState, useMemo } from 'react';
import { MODS_DATA } from '../data/modsData';
import { ModItem } from '../types';
import { Search, SlidersHorizontal, Check, Zap, Eye, Shield, Wrench, Sparkles } from 'lucide-react';

export const ModsShowcase: React.FC = () => {
  const [mods, setMods] = useState<ModItem[]>(MODS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'pvp' | 'performance' | 'visuals' | 'utility'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle individual mod
  const handleToggleMod = (id: string) => {
    setMods((prev) =>
      prev.map((mod) => (mod.id === id ? { ...mod, enabled: !mod.enabled } : mod))
    );
  };

  // Filtered mods
  const filteredMods = useMemo(() => {
    return mods.filter((mod) => {
      const matchesCategory = selectedCategory === 'all' || mod.category === selectedCategory;
      const matchesSearch =
        mod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [mods, selectedCategory, searchQuery]);

  const activeCount = mods.filter((m) => m.enabled).length;

  return (
    <section id="mods" className="py-20 md:py-28 bg-[#0a0a0a] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold text-[#ff6a00] uppercase tracking-wider">
              Modular Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              60+ Built-In PvP & Visual Mods
            </h2>
            <p className="text-sm sm:text-base text-neutral-300">
              Toggle any module with zero game restarts. Configure custom hotkeys, 
              color schemes, and position coordinates directly via our in-game overlay.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-400 bg-[#121212] px-4 py-2 rounded-xl border border-white/10 self-start md:self-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff6a00]" />
            <span><strong className="text-white">{activeCount}</strong> / {mods.length} Mods Active</span>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 bg-[#121212] border border-white/10 rounded-2xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-[#ff6a00] text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Mods ({mods.length})
            </button>
            <button
              onClick={() => setSelectedCategory('pvp')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'pvp'
                  ? 'bg-[#ff6a00] text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              PvP Combat
            </button>
            <button
              onClick={() => setSelectedCategory('performance')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'performance'
                  ? 'bg-[#ff6a00] text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setSelectedCategory('visuals')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'visuals'
                  ? 'bg-[#ff6a00] text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Visuals & Shaders
            </button>
            <button
              onClick={() => setSelectedCategory('utility')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'utility'
                  ? 'bg-[#ff6a00] text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Utility & Chat
            </button>
          </div>

          {/* Search box */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mods..."
              className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff6a00] transition-colors"
            />
          </div>
        </div>

        {/* Mods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredMods.map((mod) => (
            <div
              key={mod.id}
              className={`p-5 rounded-2xl border transition-all ${
                mod.enabled
                  ? 'bg-[#121212] border-white/15 shadow-lg'
                  : 'bg-[#0e0e0e] border-white/5 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white tracking-wide">{mod.name}</h3>
                    {mod.popular && (
                      <span className="text-[10px] font-mono text-[#ff6a00] bg-[#ff6a00]/10 border border-[#ff6a00]/30 px-1.5 py-0.5 rounded">
                        HOT
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-neutral-400 capitalize">
                    {mod.category} {mod.hotkey && `· Key: [${mod.hotkey}]`}
                  </div>
                </div>

                {/* Interactive Toggle Button */}
                <button
                  onClick={() => handleToggleMod(mod.id)}
                  aria-label={`Toggle ${mod.name}`}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff6a00]/50 ${
                    mod.enabled ? 'bg-[#ff6a00]' : 'bg-neutral-800'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      mod.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <p className="mt-3 text-xs text-neutral-300 leading-relaxed">
                {mod.description}
              </p>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className={`font-medium ${mod.enabled ? 'text-[#ff6a00]' : 'text-neutral-500'}`}>
                  {mod.enabled ? 'Active in Client' : 'Disabled'}
                </span>
                <span className="text-neutral-500 font-mono">0.0% FPS Impact</span>
              </div>
            </div>
          ))}
        </div>

        {filteredMods.length === 0 && (
          <div className="text-center py-12 rounded-2xl bg-[#121212] border border-white/10 space-y-2">
            <p className="text-sm text-neutral-300">No mods found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs text-[#ff6a00] hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
