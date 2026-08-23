import React from 'react';
import { PhotoItem, ShootCategory } from '../types';
import { soundFx } from '../utils/audio';
import { Maximize2, MapPin, Sparkles, Tag } from 'lucide-react';

interface PortfolioGridProps {
  photos: PhotoItem[];
  selectedCategory: ShootCategory;
  onSelectPhoto: (photo: PhotoItem) => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  photos,
  selectedCategory,
  onSelectPhoto,
}) => {
  return (
    <section id="portfolio-grid" className="py-16 sm:py-24 bg-[#050505] border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-medium text-[#c5a059] uppercase tracking-[0.3em] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Portfolio Archive</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-classic italic font-normal text-white tracking-tight">
              Selected Works & Case Studies
            </h2>
          </div>
          <span className="text-xs text-white/40 font-mono tracking-wider">
            SHOWING {photos.length} CAPTURES {selectedCategory !== 'all' ? `IN ${selectedCategory.toUpperCase()}` : ''}
          </span>
        </div>

        {/* Responsive Gallery Grid with Clean Framing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {photos.map((photo) => (
            <div
              key={photo.id}
              id={`grid-photo-${photo.id}`}
              onClick={() => {
                soundFx.playShutterSound();
                onSelectPhoto(photo);
              }}
              className="group cursor-pointer border border-white/15 hover:border-white/40 bg-[#0d0d0d] shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:scale-[1.01] transition-all duration-300 flex flex-col rounded-sm overflow-hidden"
            >
              {/* Card Inner */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#111]">
                <img
                  src={photo.thumbnailUrl}
                  srcSet={`${photo.thumbnailUrl} 400w, ${photo.imageUrl} 1200w`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Top Category Tag */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold tracking-widest uppercase bg-black/70 backdrop-blur-md text-[#c5a059] border border-white/20">
                    {photo.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#c5a059] group-hover:text-black transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                  <p className="text-[10px] text-[#c5a059] uppercase tracking-[0.2em] font-medium line-clamp-1">
                    {photo.clientOrProject}
                  </p>
                  <h3 className="text-sm sm:text-base font-bold font-serif-cinzel tracking-wide text-white line-clamp-1 group-hover:text-[#c5a059] transition-colors mt-0.5">
                    {photo.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/60 mt-1">
                    <MapPin className="w-3 h-3 text-[#c5a059] shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-white/10">
                    {photo.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/50">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
