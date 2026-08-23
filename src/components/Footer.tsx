import React from 'react';
import { Camera, MapPin, Phone, Mail, Instagram, Youtube, Sparkles, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { ArmanLogo } from './ArmanLogo';

interface FooterProps {
  onOpenBooking: () => void;
  onSelectCategory: (cat: string) => void;
  onNavigateSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onSelectCategory,
  onNavigateSection,
}) => {
  return (
    <footer className="bg-[#050505] border-t border-white/10 text-white/50 text-xs sm:text-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <ArmanLogo size="md" />
              <div className="flex items-center gap-2">
                <span className="text-xl font-normal tracking-[0.25em] text-white font-serif-cinzel uppercase">
                  ARMAN
                </span>
                <span className="text-xl font-light tracking-[0.25em] text-[#c5a059] font-serif-cinzel uppercase">
                  STUDIO
                </span>
              </div>
            </div>

            <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              Arman Studio is Pakistan’s premier fine-art photography and cinematic film production house. Specializing in Royal Pakistani Weddings (Barat, Mehndi, Walima), Luxury Commercial Brand Catalogs, Designer Fashion Lookbooks, and Lollywood / OTT Feature Film Productions.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/923220409615"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] hover:text-black border border-[#25D366]/40 text-[#25D366] flex items-center gap-1.5 text-xs font-mono font-bold transition-all"
                title="WhatsApp 0322-0409615"
              >
                <span>WhatsApp: 0322-0409615</span>
              </a>
              <a
                href="tel:+923220409615"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#c5a059] hover:text-black border border-white/10 text-white/80 flex items-center justify-center transition-all"
                title="Direct Phone Call 0322-0409615"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-[#c5a059] font-medium tracking-wider">
              Follow Us: @ArmanStudio
            </p>
          </div>

          {/* Col 3: Shoots & Genres */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white font-serif-cinzel">
              Shooting Genres
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-white/60">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('wedding');
                    onNavigateSection('3d-gallery-stage');
                  }}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Royal Pakistani Weddings
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('product');
                    onNavigateSection('3d-gallery-stage');
                  }}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Luxury Product & Macro
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('model');
                    onNavigateSection('3d-gallery-stage');
                  }}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Pakistani Fashion Lookbooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('movie');
                    onNavigateSection('3d-gallery-stage');
                  }}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Lollywood Cinema & Drama Stills
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Studio Links */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white font-serif-cinzel">
              Studio Exploration
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-white/60">
              <li>
                <button onClick={() => onNavigateSection('3d-gallery-stage')} className="hover:text-[#c5a059] transition-colors">
                  Interactive 3D Carousel
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services-section')} className="hover:text-[#c5a059] transition-colors">
                  Packages & Investment (PKR)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('gear-section')} className="hover:text-[#c5a059] transition-colors">
                  RED & ARRI Cinema Gear
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('testimonials-section')} className="hover:text-[#c5a059] transition-colors">
                  Verified Client Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Studio Address & Contact */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white font-serif-cinzel">
              Studio Locations
            </h4>
            <div className="space-y-2.5 text-xs text-white/60 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>Gulberg III Main Boulevard, Lahore & Clifton Block 4, Karachi</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                <a href="tel:+923220409615" className="hover:text-white transition-colors font-mono font-bold">0322-0409615</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
                <a href="mailto:armantxt70@gmail.com" className="hover:text-white transition-colors truncate font-mono text-[#c5a059]">
                  armantxt70@gmail.com
                </a>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playShutterSound();
                onOpenBooking();
              }}
              className="mt-3 w-full py-3 px-3 rounded-full bg-white/5 hover:bg-[#c5a059] hover:text-black border border-white/10 text-[#c5a059] text-[11px] uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Booking Consultation</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Arman Studio. All rights reserved. Cinematic Photography & Film.</p>
          <div className="flex items-center gap-1 text-[11px] text-white/40 font-serif-classic italic">
            <span>Crafted for timeless visual storytelling with 3D precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
