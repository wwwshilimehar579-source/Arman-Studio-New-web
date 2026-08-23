import React, { useEffect } from 'react';
import { PhotoItem } from '../types';
import { soundFx } from '../utils/audio';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Sliders, 
  MapPin, 
  Calendar, 
  Tag, 
  Sparkles,
  Share2
} from 'lucide-react';

interface LightboxModalProps {
  photo: PhotoItem | null;
  photosList: PhotoItem[];
  onClose: () => void;
  onNavigate: (photo: PhotoItem) => void;
  onBookShoot: (category: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  photosList,
  onClose,
  onNavigate,
  onBookShoot,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        const currentIndex = photosList.findIndex((p) => p.id === photo.id);
        const prevIndex = (currentIndex - 1 + photosList.length) % photosList.length;
        soundFx.playShutterSound();
        onNavigate(photosList[prevIndex]);
      }
      if (e.key === 'ArrowRight') {
        const currentIndex = photosList.findIndex((p) => p.id === photo.id);
        const nextIndex = (currentIndex + 1) % photosList.length;
        soundFx.playShutterSound();
        onNavigate(photosList[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, photosList, onClose, onNavigate]);

  if (!photo) return null;

  const currentIndex = photosList.findIndex((p) => p.id === photo.id);
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + photosList.length) % photosList.length;
    soundFx.playShutterSound();
    onNavigate(photosList[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % photosList.length;
    soundFx.playShutterSound();
    onNavigate(photosList[nextIndex]);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${photo.title} — Arman Studio`,
        text: `Check out this shot: ${photo.title} by Arman Studio`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div 
      id="lightbox-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Action Bar */}
      <div className="fixed top-3 left-3 right-3 sm:top-5 sm:left-6 sm:right-6 flex items-center justify-between z-50 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-black/80 border border-white/10 px-4 py-1.5 rounded-full text-xs text-white/80 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
          <span className="font-medium text-white font-serif-cinzel tracking-wider">Arman Studio Cinema Vault</span>
          <span className="text-white/40 font-mono">[{currentIndex + 1}/{photosList.length}]</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            className="w-10 h-10 rounded-full bg-black/80 border border-white/10 hover:border-white/30 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
            title="Share Photo"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            id="close-lightbox-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-black/80 border border-white/10 hover:bg-[#c5a059] hover:text-black text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Lightbox Card Frame */}
      <div 
        id="lightbox-content-card"
        className="relative w-full max-w-6xl my-auto bg-[#0a0a0a] border border-white/15 rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col lg:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: High-Definition Photography Frame with Crisp White Border */}
        <div className="relative flex-1 bg-black flex items-center justify-center p-3 sm:p-6 min-h-[300px] sm:min-h-[420px] lg:min-h-[550px] overflow-hidden group">
          {/* Crisp White Photo Border Container */}
          <div className="relative max-h-[75vh] w-auto rounded p-1 sm:p-1.5 bg-white shadow-2xl overflow-hidden transition-all duration-300">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              loading="lazy"
              decoding="async"
              className="max-h-[70vh] w-full object-contain select-none"
            />
          </div>

          {/* Prev/Next Overlay Buttons */}
          <button
            id="lightbox-prev-btn"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-[#c5a059] hover:text-black text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all active:scale-90 opacity-90 sm:opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            id="lightbox-next-btn"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-[#c5a059] hover:text-black text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all active:scale-90 opacity-90 sm:opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Right Side: EXIF & Shoot Story Inspector Panel */}
        <div className="w-full lg:w-[380px] xl:w-[420px] bg-[#0d0d0d] border-t lg:border-t-0 lg:border-l border-white/10 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto max-h-[45vh] lg:max-h-[85vh]">
          <div className="space-y-4">
            {/* Category & Client Badge */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-[#c5a059]">
                {photo.categoryLabel}
              </span>
              <span className="text-xs text-white/40 font-mono">
                {photo.dateOrYear}
              </span>
            </div>

            {/* Shoot Title & Subtitle */}
            <div>
              <h2 className="text-xl sm:text-2xl font-serif-cinzel font-bold text-white tracking-wide">
                {photo.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/60 font-light mt-0.5">
                {photo.subtitle}
              </p>
            </div>

            {/* Metadata Badges (Location & Client) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/[0.02] border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span className="truncate">{photo.location}</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/[0.02] border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span className="truncate">{photo.clientOrProject}</span>
              </div>
            </div>

            {/* Behind the Shot Story */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/40">
                Behind The Shot
              </span>
              <p className="text-xs sm:text-sm text-white/70 font-serif-classic italic leading-relaxed bg-white/[0.02] p-3.5 rounded-xl border border-white/10">
                "{photo.story}"
              </p>
            </div>

            {/* EXIF Data Grid */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#c5a059] uppercase tracking-wider">
                <Sliders className="w-3.5 h-3.5" />
                <span>EXIF Shooting Metadata</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10">
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider">CAMERA</span>
                  <span className="text-white truncate block font-medium mt-0.5">{photo.exif.camera}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10">
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider">LENS</span>
                  <span className="text-white truncate block font-medium mt-0.5">{photo.exif.lens}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10">
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider">APERTURE & SHUTTER</span>
                  <span className="text-[#c5a059] font-serif-cinzel font-semibold mt-0.5 block">{photo.exif.aperture} • {photo.exif.shutter}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10">
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider">ISO & FOCAL</span>
                  <span className="text-white font-medium mt-0.5 block">ISO {photo.exif.iso} • {photo.exif.focalLength}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {photo.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/50 border border-white/10"
                >
                  <Tag className="w-2.5 h-2.5 text-[#c5a059]" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Book Similar Shoot CTA */}
          <div className="pt-5 mt-4 border-t border-white/10">
            <button
              id="book-this-style-btn"
              onClick={() => {
                soundFx.playShutterSound();
                onClose();
                onBookShoot(photo.category);
              }}
              className="w-full py-3.5 px-4 rounded-full bg-[#c5a059] hover:bg-[#d8b56f] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-[#c5a059]/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Booking in This Style</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
