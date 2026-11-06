import React, { useState } from 'react';
import { COSMETICS_DATA } from '../data/modsData';
import { CosmeticItem } from '../types';
import { Sparkles, Shield, Flame, Check, ChevronRight } from 'lucide-react';

export const CosmeticsLocker: React.FC = () => {
  const [selectedCosmetic, setSelectedCosmetic] = useState<CosmeticItem>(COSMETICS_DATA[0]);
  const [equippedIds, setEquippedIds] = useState<string[]>(['ignite-ember']);

  const toggleEquip = (id: string) => {
    setEquippedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isEquipped = equippedIds.includes(selectedCosmetic.id);

  return (
    <section className="py-20 md:py-28 bg-[#080808] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold text-[#ff6a00] uppercase tracking-wider">
              Cosmetic Wardrobe
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Signature Capes & Wings
            </h2>
            <p className="text-sm sm:text-base text-neutral-300">
              Stand out in every lobby with high-resolution animated cloaks, 
              dragon wings, and player accessories rendered directly on your skin.
            </p>
          </div>
          <div className="text-xs font-mono text-neutral-400">
            Visible to all Ignite & OptiFine users globally
          </div>
        </div>

        {/* Locker Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Cosmetics List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {COSMETICS_DATA.map((item) => {
              const isSelected = selectedCosmetic.id === item.id;
              const equipped = equippedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCosmetic(item)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#141414] border-[#ff6a00] shadow-lg shadow-[#ff6a00]/10'
                      : 'bg-[#0e0e0e] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Visual Color swatch indicator */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${item.previewColor} 0%, ${item.secondaryColor} 100%)`,
                      }}
                    >
                      <Flame className="w-5 h-5 text-white drop-shadow" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{item.name}</h4>
                        <span className="text-[10px] font-mono text-[#ff6a00] uppercase">
                          {item.rarity}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 capitalize">{item.type} · Free</p>
                    </div>
                  </div>

                  {equipped && (
                    <span className="text-xs font-mono font-bold text-white bg-white/10 px-2 py-1 rounded">
                      EQUIPPED
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive 3D Cosmetic Preview Canvas (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#111111] border border-white/10 relative overflow-hidden flex flex-col items-center justify-center text-center shadow-2xl min-h-[420px]">
              {/* Radial back light matching the cosmetic */}
              <div
                className="absolute inset-0 opacity-20 blur-3xl transition-all duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${selectedCosmetic.previewColor} 0%, transparent 70%)`,
                }}
              />

              {/* Voxel stylized Cape Presentation */}
              <div className="relative z-10 space-y-6 flex flex-col items-center">
                {/* Simulated Cape Card with 3D shadow and fold animation */}
                <div className="relative group">
                  <div
                    className="w-40 h-64 rounded-xl border-2 border-white/20 shadow-2xl transition-transform duration-500 flex flex-col justify-between p-4 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(180deg, ${selectedCosmetic.secondaryColor} 0%, ${selectedCosmetic.previewColor} 100%)`,
                      boxShadow: `0 20px 40px -10px ${selectedCosmetic.previewColor}66`,
                    }}
                  >
                    {/* Cape Top Bar */}
                    <div className="w-full flex justify-between items-center text-[10px] font-mono text-white/70">
                      <span>IGNITE</span>
                      <span>CAPE</span>
                    </div>

                    {/* Cape Icon in Center */}
                    <div className="my-auto flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-xl bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                        <Flame className="w-10 h-10 text-white fill-white" />
                      </div>
                      <div className="mt-2 text-xs font-black font-mono tracking-widest text-white drop-shadow-md uppercase">
                        {selectedCosmetic.name.split(' ')[0]}
                      </div>
                    </div>

                    {/* Bottom pattern indicator */}
                    <div className="w-full text-center text-[9px] font-mono text-black font-bold uppercase bg-white/90 rounded py-0.5">
                      64x32 HD Canvas
                    </div>
                  </div>
                </div>

                {/* Cosmetic Details */}
                <div className="space-y-2 max-w-sm">
                  <h3 className="text-xl font-bold text-white">{selectedCosmetic.name}</h3>
                  <p className="text-xs text-neutral-300">{selectedCosmetic.pattern}</p>
                </div>

                {/* Action button */}
                <button
                  onClick={() => toggleEquip(selectedCosmetic.id)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    isEquipped
                      ? 'bg-neutral-800 text-white hover:bg-neutral-700'
                      : 'bg-[#ff6a00] text-black hover:bg-[#ff7b1a] shadow-lg shadow-[#ff6a00]/30'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{isEquipped ? 'Unequip Cosmetic' : 'Equip on Minecraft Skin'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
