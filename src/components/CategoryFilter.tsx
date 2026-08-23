import React from 'react';
import { ShootCategory } from '../types';
import { soundFx } from '../utils/audio';
import { 
  Sparkles, 
  HeartHandshake, 
  Package, 
  Camera, 
  Film 
} from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: ShootCategory;
  onSelectCategory: (cat: ShootCategory) => void;
  counts: Record<ShootCategory, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  counts,
}) => {
  const categories: { id: ShootCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: 'All Portfolios', icon: Sparkles },
    { id: 'wedding', label: 'Wedding Shoot', icon: HeartHandshake },
    { id: 'product', label: 'Product Shoot', icon: Package },
    { id: 'model', label: 'Model Shoot', icon: Camera },
    { id: 'movie', label: 'Movie Shoot', icon: Film },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 relative z-10">
      {/* Scrollable pill container on mobile, centered flex on desktop */}
      <div className="flex items-center sm:justify-center gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              id={`filter-tab-${cat.id}`}
              onClick={() => {
                soundFx.playSpinTick();
                onSelectCategory(cat.id);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] font-medium whitespace-nowrap transition-all duration-300 active:scale-95 ${
                isActive
                  ? 'bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20 font-semibold ring-1 ring-[#c5a059]'
                  : 'bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#c5a059]'}`} />
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-white/50'
                }`}
              >
                {counts[cat.id] || 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
