import React from 'react';
import { Download, Flame } from 'lucide-react';

interface MobileStickyBarProps {
  onDownload: () => void;
  fileName?: string;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ 
  onDownload, 
  fileName = 'IgniteClient-Setup.exe' 
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0c]/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 h-14 flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-2 truncate pr-2">
        <div className="w-6 h-6 rounded bg-[#ff6a00] flex items-center justify-center shrink-0">
          <Flame className="w-3.5 h-3.5 fill-black stroke-black" />
        </div>
        <div className="truncate">
          <div className="text-xs font-bold text-white leading-tight truncate">
            Ignite Client <span className="text-[#ff6a00]">.exe</span>
          </div>
          <div className="text-[10px] text-neutral-400 font-mono leading-tight">
            Free · Windows x64
          </div>
        </div>
      </div>

      <button
        onClick={onDownload}
        className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#ff6a00] hover:bg-[#ff7b1a] rounded-lg shadow-md shrink-0 cursor-pointer"
      >
        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Download</span>
      </button>
    </div>
  );
};
