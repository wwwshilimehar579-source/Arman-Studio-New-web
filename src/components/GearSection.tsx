import React from 'react';
import { GEAR_INVENTORY } from '../data/photos';
import { Camera, Aperture, Sun, Plane, ShieldCheck, Film } from 'lucide-react';

export const GearSection: React.FC = () => {
  const getGearIcon = (cat: string) => {
    switch (cat) {
      case 'camera': return Camera;
      case 'lens': return Aperture;
      case 'lighting': return Sun;
      default: return Plane;
    }
  };

  return (
    <section id="gear-section" className="py-16 sm:py-24 bg-[#050505] border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#c5a059] text-[11px] font-medium uppercase tracking-[0.3em] mb-3">
            <Film className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Behind The Lens • Studio Technology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-classic italic font-normal tracking-tight text-white">
            Cinema-Grade Camera Rig & Lenses
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-3 font-light max-w-xl mx-auto">
            We operate industry-standard cinema and medium-format equipment to guarantee Hollywood visual fidelity.
          </p>
        </div>

        {/* Gear Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GEAR_INVENTORY.map((gear) => {
            const Icon = getGearIcon(gear.category);

            return (
              <div
                key={gear.id}
                id={`gear-item-${gear.id}`}
                className="bg-white/[0.02] border border-white/10 hover:border-[#c5a059]/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#c5a059]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white/5 text-[#c5a059] border border-white/10">
                      {gear.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white font-serif-cinzel tracking-wide group-hover:text-[#c5a059] transition-colors">
                    {gear.name}
                  </h3>

                  <p className="text-xs text-white/60 font-light mt-2 leading-relaxed">
                    {gear.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 block mb-1">
                    KEY CAPABILITY
                  </span>
                  <p className="text-xs text-white/80 font-serif-cinzel font-medium">
                    {gear.specs}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Production Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white font-serif-cinzel tracking-wide">Dual-Camera Redundancy & Instant RAW Cloud Backup</h4>
              <p className="text-xs text-white/60 font-light">Every shoot is recorded to dual high-speed CFexpress cards with zero data loss guarantee.</p>
            </div>
          </div>
          <span className="text-xs text-[#c5a059] bg-[#c5a059]/10 px-3.5 py-1.5 rounded-full border border-[#c5a059]/30 whitespace-nowrap uppercase tracking-wider font-medium">
            100% Data Security
          </span>
        </div>
      </div>
    </section>
  );
};
