import React from 'react';
import { StudioService } from '../types';
import { soundFx } from '../utils/audio';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  HeartHandshake, 
  Package, 
  Camera, 
  Film 
} from 'lucide-react';

interface ServicesSectionProps {
  services: StudioService[];
  onSelectService: (service: StudioService) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectService,
}) => {
  const getIcon = (cat: string) => {
    switch (cat) {
      case 'wedding': return HeartHandshake;
      case 'product': return Package;
      case 'model': return Camera;
      default: return Film;
    }
  };

  return (
    <section id="services-section" className="py-16 sm:py-24 bg-[#080808] border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#c5a059] text-[11px] font-medium uppercase tracking-[0.3em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Signature Studio Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-classic italic font-normal tracking-tight text-white">
            Crafted for Extraordinary Stories
          </h2>
          <p className="text-white/60 text-xs sm:text-sm md:text-base mt-3 font-light max-w-xl mx-auto">
            From regal destination weddings and luxury commercial products to high-fashion lookbooks and Bollywood movie sets.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((serv) => {
            const Icon = getIcon(serv.category);

            return (
              <div
                key={serv.id}
                id={`service-card-${serv.id}`}
                className="group relative bg-white/[0.02] border border-white/10 hover:border-[#c5a059]/40 rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl"
              >
                {/* Background Subtle Gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#c5a059]/10 transition-colors" />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#c5a059]">
                      <Icon className="w-5 h-5" />
                    </div>
                    {serv.highlight && (
                      <span className="px-3 py-1 rounded-full text-[10px] uppercase font-semibold bg-[#c5a059] text-black tracking-wider">
                        Most Booked
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-serif-cinzel font-bold text-white tracking-wide">
                    {serv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#c5a059] font-medium tracking-wide mt-1">
                    {serv.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-white/60 font-light mt-3 leading-relaxed">
                    {serv.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="mt-6 space-y-2.5">
                    <span className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em] block">
                      Included in Package:
                    </span>
                    {serv.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70 font-light">
                        <div className="w-4 h-4 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Pricing & CTA */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest block">
                      Investment Starting At
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-white font-serif-cinzel">
                      {serv.startingPrice}
                    </span>
                  </div>

                  <button
                    id={`book-service-btn-${serv.id}`}
                    onClick={() => {
                      soundFx.playShutterSound();
                      onSelectService(serv);
                    }}
                    className="py-2.5 px-5 rounded-full bg-white/5 hover:bg-[#c5a059] hover:text-black border border-white/15 hover:border-[#c5a059] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group/btn active:scale-95"
                  >
                    <span>Request Shoot Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
