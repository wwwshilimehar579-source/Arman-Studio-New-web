import React from 'react';
import { soundFx } from '../utils/audio';
import { ArmanLogo } from './ArmanLogo';
import { 
  Check, 
  Sparkles, 
  Phone, 
  Send, 
  MessageSquare, 
  Plane,
  Camera, 
  Video, 
  BookOpen, 
  Music, 
  Film,
  Award
} from 'lucide-react';

interface FolkPackagesSectionProps {
  onSelectPackage: (packageName: string, price: string) => void;
}

export interface FolkPackage {
  id: string;
  name: string;
  priceTag: string;
  priceNum: string;
  tagline: string;
  isPopular?: boolean;
  borderAccent: string;
  features: {
    text: string;
    isDrone?: boolean;
    isHighlight?: boolean;
  }[];
}

export const FOLK_PACKAGES: FolkPackage[] = [
  {
    id: 'basic-package',
    name: 'BASIC PAKISTANI PACKAGE',
    priceTag: '85K',
    priceNum: '₨ 85,000',
    tagline: 'Essential Wedding Coverage',
    borderAccent: '#c5a059',
    features: [
      { text: 'One Photographer' },
      { text: 'One Videographer' },
      { text: 'One Album' },
      { text: 'Highlight' },
      { text: 'Highlight Song' },
      { text: 'Full Video Coverage' },
      { text: 'Drone Coverage (1 Day)', isDrone: true, isHighlight: true },
    ],
  },
  {
    id: 'standard-package',
    name: 'STANDARD PAKISTANI PACKAGE',
    priceTag: '135K',
    priceNum: '₨ 135,000',
    tagline: 'Most Popular Wedding Production',
    isPopular: true,
    borderAccent: '#e6ca65',
    features: [
      { text: 'Two Photographer' },
      { text: 'Two Videographer' },
      { text: 'One Album' },
      { text: 'Highlight' },
      { text: 'Highlight Song' },
      { text: 'Full Video Coverage' },
      { text: 'Drone Coverage', isDrone: true, isHighlight: true },
    ],
  },
  {
    id: 'premium-package',
    name: 'PREMIUM PAKISTANI PACKAGE',
    priceTag: '150K',
    priceNum: '₨ 150,000',
    tagline: 'Grand Royal Multi-Angle Master',
    borderAccent: '#f3e3b6',
    features: [
      { text: 'Three Photographer' },
      { text: 'Three Videographer' },
      { text: 'Two Albums', isHighlight: true },
      { text: 'Drone Coverage', isDrone: true, isHighlight: true },
      { text: 'Highlight' },
      { text: 'Highlight Song' },
      { text: 'Full Video Coverage' },
    ],
  },
];

export const FolkPackagesSection: React.FC<FolkPackagesSectionProps> = ({
  onSelectPackage,
}) => {
  const handleWhatsAppBooking = (pkg: FolkPackage) => {
    soundFx.playShutterSound();
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Arman Studio! 📸\n\nI am interested in booking the *${pkg.name} (${pkg.priceTag} - ${pkg.priceNum})*.\n\nCould you please share date availability and process?\nContact Number: 0322-0409615`
    );
    window.open(`https://wa.me/923220409615?text=${text}`, '_blank');
  };

  const handleDirectCall = () => {
    soundFx.playShutterSound();
    window.location.href = 'tel:+923220409615';
  };

  return (
    <section id="folk-packages-section" className="py-16 sm:py-24 bg-[#0a0a0a] border-t border-white/10 relative z-10 overflow-hidden">
      {/* Background Decorative Pattern & Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c5a059]/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Studio Top Calligraphy Brand Header from Screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="flex flex-col items-center justify-center mb-3">
            <ArmanLogo size="lg" className="mb-3" />
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif-cinzel font-bold tracking-[0.25em] text-[#c5a059] uppercase">
              Arman Studio
            </h3>
            <div className="inline-flex items-center gap-2 mt-2 px-4 py-1 rounded-full bg-white/5 border border-white/15 text-white/90 text-xs sm:text-sm font-mono tracking-widest">
              <Phone className="w-3.5 h-3.5 text-[#25D366]" />
              <a href="tel:+923220409615" className="hover:text-[#c5a059] transition-colors font-bold">
                0322-0409615
              </a>
            </div>
          </div>

          {/* Golden Badge Banner from Screenshot */}
          <div className="inline-block my-4 px-6 sm:px-10 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-[#8c6d32] via-[#e6ca65] to-[#8c6d32] text-black font-extrabold text-xs sm:text-base md:text-lg uppercase tracking-[0.2em] shadow-2xl drop-shadow-md">
            PROFESSIONAL VIDEOGRAPHER AND PHOTOGRAPHER
          </div>

          <p className="text-white/60 text-xs sm:text-sm font-light max-w-2xl mx-auto mt-2">
            Authentic Pakistani celebrations, cinematic wedding storytelling, and master drone cinematography.
          </p>
        </div>

        {/* 3 Package Cards Matching Screenshot Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {FOLK_PACKAGES.map((pkg) => {
            return (
              <div
                key={pkg.id}
                id={`folk-package-${pkg.id}`}
                className={`relative rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 transform-gpu hover:-translate-y-1 shadow-2xl p-[3px] ${
                  pkg.isPopular
                    ? 'bg-gradient-to-b from-[#f3e3b6] via-[#c5a059] to-[#8c6d32] shadow-[0_0_40px_rgba(197,160,89,0.35)] scale-102 sm:-translate-y-2'
                    : 'bg-gradient-to-b from-[#443820] via-white/10 to-[#1e1a12] hover:border-[#c5a059]'
                }`}
              >
                {/* Folk Traditional Border Pattern Simulation */}
                <div className="relative w-full h-full rounded-[22px] bg-[#12100d] overflow-hidden flex flex-col justify-between p-5 sm:p-6 lg:p-7">
                  
                  {/* Card Header */}
                  <div>
                    {pkg.isPopular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-[#8c6d32] to-[#e6ca65] text-black text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow-md">
                        ★ Most Popular Choice
                      </div>
                    )}

                    <div className="text-center pt-2 pb-4 border-b border-[#c5a059]/20">
                      <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white/90 font-serif-cinzel min-h-[36px] flex items-center justify-center text-center">
                        {pkg.name}
                      </h4>

                      {/* Big Price Tag */}
                      <div className="my-4 inline-block px-7 py-2.5 rounded-2xl bg-gradient-to-b from-[#e6ca65] to-[#a38035] text-black shadow-lg">
                        <span className="text-3xl sm:text-4xl font-black tracking-tight font-serif-cinzel">
                          {pkg.priceTag}
                        </span>
                        <span className="block text-[10px] uppercase font-bold tracking-widest text-black/80">
                          ({pkg.priceNum})
                        </span>
                      </div>
                    </div>

                    {/* Features List matching the screenshot exactly */}
                    <div className="py-5 space-y-3">
                      {pkg.features.map((feat, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-3 text-xs sm:text-sm ${
                            feat.isHighlight
                              ? 'text-white font-semibold'
                              : 'text-white/80 font-normal'
                          }`}
                        >
                          {feat.isDrone ? (
                            <div className="w-5 h-5 rounded-full bg-[#c5a059]/30 text-[#e6ca65] flex items-center justify-center shrink-0">
                              <Plane className="w-3.5 h-3.5 transform -rotate-45" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}

                          <span className={feat.isDrone ? 'text-[#f3e3b6] font-bold' : ''}>
                            {feat.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                    {/* Actions & BOOKING Button */}
                    <div className="pt-4 border-t border-white/10 space-y-2.5">
                      <button
                        id={`book-now-pkg-btn-${pkg.id}`}
                        onClick={() => handleWhatsAppBooking(pkg)}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#d8b56f] via-[#c5a059] to-[#b38c40] hover:from-[#f3e3b6] hover:to-[#c5a059] active:scale-95 text-black font-extrabold text-xs sm:text-sm uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4 text-black fill-black" />
                        <span>BOOKING</span>
                      </button>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        onClick={() => onSelectPackage(pkg.name, pkg.priceTag)}
                        className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-[10px] uppercase font-medium tracking-wider transition-colors text-center"
                      >
                        Fill Form
                      </button>
                      <button
                        onClick={handleDirectCall}
                        className="px-3 py-2 rounded-xl bg-white/5 hover:bg-[#25D366]/20 border border-white/10 text-[#25D366] text-[10px] uppercase font-semibold tracking-wider transition-colors flex items-center gap-1"
                        title="Call 0322-0409615"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner from Screenshot */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#8c6d32]/90 via-[#e6ca65] to-[#8c6d32]/90 text-black shadow-2xl text-center space-y-2">
            <p className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wide">
              FILM MAKING EDITING: <span className="font-medium normal-case">Cinematic storytelling, every nuance perfectly rendered.</span>
            </p>
            <p className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wide">
              WEDDING MOVEMENT: <span className="font-medium normal-case">Capturing the authentic rhythm of every celebration.</span>
            </p>
          </div>

          {/* Social Follow from Screenshot */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs sm:text-sm font-medium tracking-wider">
              <span>Follow Us:</span>
              <span className="font-bold text-[#c5a059]">@ArmanStudio</span>
              <span className="text-white/40">•</span>
              <a href="tel:+923220409615" className="text-[#25D366] font-bold hover:underline flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> 0322-0409615
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
