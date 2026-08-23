import React from 'react';
import { CLIENT_REVIEWS } from '../data/photos';
import { Star, Quote, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials-section" className="py-16 sm:py-24 bg-[#080808] border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#c5a059] text-[11px] font-medium uppercase tracking-[0.3em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Client Praise & Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-classic italic font-normal tracking-tight text-white">
            Trusted by Royalty, Brands & Directors
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-3 font-light max-w-xl mx-auto">
            Read how Arman Studio delivered cinematic excellence for clients across India & internationally.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CLIENT_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              id={`review-${rev.id}`}
              className="bg-white/[0.02] border border-white/10 hover:border-[#c5a059]/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative group transition-all shadow-xl"
            >
              <Quote className="absolute top-6 right-6 w-7 h-7 text-white/10 group-hover:text-[#c5a059]/30 transition-colors" />

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-white/80 font-serif-classic italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              {/* Client Info */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.clientName}
                  loading="lazy"
                  className="w-11 h-11 rounded-full object-cover border border-[#c5a059]"
                />
                <div>
                  <h4 className="text-sm font-medium text-white font-serif-cinzel tracking-wide">
                    {rev.clientName}
                  </h4>
                  <p className="text-[11px] text-[#c5a059] font-medium">
                    {rev.roleOrOccasion}
                  </p>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider font-light">
                    {rev.date} • {rev.projectTag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
