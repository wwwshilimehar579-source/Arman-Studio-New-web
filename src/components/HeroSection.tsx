import React from 'react';
import { Sparkles, ArrowDown, Camera, Phone, MessageCircle, Award, Star, ShieldCheck, CheckCircle2, Users } from 'lucide-react';
import { soundFx } from '../utils/audio';
import portraitBg from '../assets/images/arman_portrait_bg_1787188030395.jpg';

interface HeroSectionProps {
  onExplore3D: () => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore3D,
  onOpenBooking,
}) => {
  const handleWhatsApp = () => {
    soundFx.playShutterSound();
    const text = encodeURIComponent(
      "Assalam-o-Alaikum Arman Studio! 📸\n\nI want to inquire about Pakistani Packages (Basic 85K, Standard 135K, Premium 150K).\nPlease share details!"
    );
    window.open(`https://wa.me/923220409615?text=${text}`, '_blank');
  };

  const handleCall = () => {
    soundFx.playShutterSound();
    window.location.href = 'tel:+923220409615';
  };

  return (
    <section id="hero" className="relative min-h-[70vh] sm:min-h-[75vh] flex items-center justify-center overflow-hidden pt-8 pb-12">
      {/* Subtle Semi-Transparent Blended Portrait Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Blended Portrait Layer */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={portraitBg}
            alt="Arman Studio Portrait Background"
            referrerPolicy="no-referrer"
            className="w-full max-w-3xl h-[85%] object-cover object-center opacity-25 filter contrast-125 saturate-110 select-none mix-blend-screen transform scale-105 pointer-events-none"
            style={{
              maskImage: 'radial-gradient(circle at 50% 45%, black 25%, rgba(0,0,0,0.6) 55%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black 25%, rgba(0,0,0,0.6) 55%, transparent 75%)',
            }}
          />
        </div>

        {/* Ambient Warm Golden & Dark Vignette Overlays */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-[#c5a059]/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]/90 pointer-events-none" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #222 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Elite Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#c5a059] text-[11px] font-medium uppercase tracking-[0.3em] backdrop-blur-md mb-5 animate-in fade-in zoom-in-95 duration-500">
          <Award className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Cinematography & Fine-Art Photography</span>
        </div>

        {/* Studio Heading & Poetic Italic Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-classic italic font-normal tracking-tight text-white drop-shadow-2xl mb-2">
          Arman Studio
        </h2>

        {/* Subtitle / Gold Tracking Eyebrow */}
        <p className="text-[#c5a059] text-xs sm:text-sm uppercase tracking-[0.35em] sm:tracking-[0.45em] opacity-90 font-medium">
          Professional Videographer & Photographer
        </p>

        {/* Narrative Description */}
        <p className="max-w-2xl mx-auto mt-4 text-xs sm:text-sm md:text-base text-white/70 font-light leading-relaxed tracking-wide">
          Specializing in authentic Pakistani wedding movements, luxury celebrations, brand lookbooks, drone cinematography, and cinematic feature films.
        </p>

        {/* Interactive CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            id="hero-explore-3d-btn"
            onClick={() => {
              soundFx.playShutterSound();
              onExplore3D();
            }}
            className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#c5a059] hover:bg-[#d8b56f] text-black font-extrabold text-[11px] sm:text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-[#c5a059]/20 active:scale-95 flex items-center gap-2 group"
          >
            <Camera className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
            <span>Explore 3D Gallery</span>
          </button>

          <button
            id="hero-whatsapp-btn"
            onClick={handleWhatsApp}
            className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#25D366]/20 active:scale-95 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>WhatsApp (0322-0409615)</span>
          </button>

          <button
            id="hero-call-btn"
            onClick={handleCall}
            className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 text-white font-semibold text-[11px] sm:text-xs uppercase tracking-wider transition-all backdrop-blur-md active:scale-95 flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Call Now</span>
          </button>
        </div>

        {/* Quick Highlights Counters with Hairline Borders matching Screenshot */}
        <div className="mt-10 sm:mt-14 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-white/80">
          
          {/* Card 1: Customer Reviews 1.K + 5 Stars */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center text-center hover:border-[#c5a059]/40 transition-colors">
            <span className="text-xl sm:text-2xl font-bold text-[#c5a059] font-serif-cinzel tracking-wider">1.K+</span>
            <div className="flex items-center justify-center gap-0.5 my-1 text-[#e6ca65]" aria-label="5 Star Rating">
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-white/60 font-medium">Customer Reviews</p>
          </div>

          {/* Card 2: Customer Contacts 2.3K */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center text-center hover:border-white/20 transition-colors">
            <span className="text-xl sm:text-2xl font-bold text-white font-serif-cinzel tracking-wider">2.3K+</span>
            <p className="text-[10px] uppercase tracking-widest text-white/60 font-medium mt-1">Customer Contacts</p>
          </div>

          {/* Card 3: Government Registered & Verified ID */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center text-center hover:border-[#25D366]/30 transition-colors">
            <span className="text-base sm:text-lg font-bold text-white font-serif-cinzel tracking-wider leading-tight flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0" />
              <span>Govt. Registered</span>
            </span>
            <p className="text-[10px] uppercase tracking-widest text-[#25D366]/90 font-medium mt-1">Verified Studio ID</p>
          </div>

          {/* Card 4: Data Full Trust & Security Guarantee */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center text-center hover:border-[#c5a059]/40 transition-colors">
            <span className="text-base sm:text-lg font-bold text-[#c5a059] font-serif-cinzel tracking-wider leading-tight flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>100% Data Trust</span>
            </span>
            <p className="text-[10px] uppercase tracking-widest text-white/60 font-medium mt-1">Full Security Guarantee</p>
          </div>
        </div>

        {/* Scroll Cue with Gold Hairline Accent */}
        <div className="mt-8 flex flex-col items-center justify-center">
          <button
            onClick={onExplore3D}
            className="text-white/40 hover:text-[#c5a059] transition-colors flex flex-col items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] font-sans"
          >
            <span>Enter 3D Showcase</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#c5a059]" />
          </button>
        </div>
      </div>
    </section>
  );
};
