import React, { useState } from 'react';
import { soundFx } from '../utils/audio';
import { ArmanLogo } from './ArmanLogo';
import { 
  Camera, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Sparkles, 
  Phone,
  Film,
  MessageCircle,
  Mail
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onNavigateSection,
}) => {
  const [isMuted, setIsMuted] = useState(soundFx.isMuted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    soundFx.isMuted = !soundFx.isMuted;
    setIsMuted(soundFx.isMuted);
    if (!soundFx.isMuted) {
      soundFx.playShutterSound();
    }
  };

  const handleNavClick = (id: string) => {
    soundFx.playSpinTick();
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  const handleDirectWhatsApp = () => {
    soundFx.playShutterSound();
    const text = encodeURIComponent(
      "Assalam-o-Alaikum Arman Studio! 📸\n\nI want to inquire about shoot booking and packages.\nPlease share details!"
    );
    window.open(`https://wa.me/923220409615?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-22 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group"
        >
          <ArmanLogo size="md" className="group-hover:scale-105 transition-transform duration-300" />
          <div className="flex flex-col">
            <h1 className="text-base sm:text-2xl font-light tracking-[0.25em] sm:tracking-[0.3em] uppercase leading-none font-serif-cinzel text-white">
              Arman <span className="text-[#c5a059] font-medium">Studio</span>
            </h1>
            <span className="text-[8px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.5em] uppercase opacity-50 mt-1 font-sans">
              0322-0409615 • Lahore
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-white/70">
          <button
            onClick={() => handleNavClick('3d-gallery-stage')}
            className="hover:text-[#c5a059] transition-colors py-1 hover:border-b hover:border-[#c5a059]"
          >
            3D Carousel
          </button>
          <button
            onClick={() => handleNavClick('direct-booking-section')}
            className="hover:text-[#c5a059] transition-colors py-1 text-[#c5a059] font-semibold"
          >
            Quick Booking
          </button>
          <button
            onClick={() => handleNavClick('folk-packages-section')}
            className="hover:text-[#c5a059] transition-colors py-1 hover:border-b hover:border-[#c5a059]"
          >
            Packages (85K-150K)
          </button>
          <button
            onClick={() => handleNavClick('portfolio-grid')}
            className="hover:text-[#c5a059] transition-colors py-1 hover:border-b hover:border-[#c5a059]"
          >
            Portfolio
          </button>
          <button
            onClick={() => handleNavClick('gear-section')}
            className="hover:text-[#c5a059] transition-colors py-1 hover:border-b hover:border-[#c5a059]"
          >
            Gear
          </button>
        </nav>

        {/* Action Controls, Phone, WhatsApp & Sound Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Direct Call Button in Navbar */}
          <a
            href="tel:+923220409615"
            onClick={() => soundFx.playShutterSound()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/40 text-[#25D366] text-[11px] font-mono font-bold tracking-wider transition-all"
            title="Direct Phone Call: 0322-0409615"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">0322-0409615</span>
            <span className="md:hidden">Call</span>
          </a>

          {/* Quick WhatsApp Navbar CTA */}
          <button
            onClick={handleDirectWhatsApp}
            aria-label="Direct WhatsApp Chat"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/40 flex items-center justify-center transition-all active:scale-90"
            title="Chat on WhatsApp (0322-0409615)"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </button>

          {/* Shutter Sound FX Toggle */}
          <button
            id="sound-fx-toggle-btn"
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute camera sounds' : 'Mute camera sounds'}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all ${
              !isMuted
                ? 'bg-[#c5a059]/10 border-[#c5a059] text-[#c5a059]'
                : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/30'
            }`}
            title={!isMuted ? 'Camera Sound Enabled' : 'Sound Muted'}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Booking CTA Button */}
          <button
            id="navbar-book-shoot-btn"
            onClick={() => {
              soundFx.playShutterSound();
              onOpenBooking();
            }}
            className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#c5a059] hover:bg-[#d8b56f] text-black font-bold text-[10px] sm:text-xs uppercase tracking-[0.15em] transition-all shadow-md shadow-[#c5a059]/20 active:scale-95 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Booking</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 text-white/70 flex items-center justify-center hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0a] border-b border-white/10 px-6 py-6 space-y-3 text-[11px] uppercase tracking-[0.2em] font-medium text-white/80 animate-in slide-in-from-top-3 duration-200">
          <button
            onClick={() => handleNavClick('3d-gallery-stage')}
            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/5 hover:text-[#c5a059] flex items-center justify-between"
          >
            <span>3D Circular Gallery</span>
            <Film className="w-4 h-4 text-[#c5a059]" />
          </button>
          <button
            onClick={() => handleNavClick('direct-booking-section')}
            className="w-full text-left px-3 py-2.5 rounded-lg bg-[#c5a059]/10 text-[#c5a059] font-bold flex items-center justify-between"
          >
            <span>Quick WhatsApp Booking</span>
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
          </button>
          <button
            onClick={() => handleNavClick('folk-packages-section')}
            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/5 hover:text-[#c5a059] flex items-center justify-between"
          >
            <span>Pakistani Packages (85K - 150K)</span>
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
          </button>
          <button
            onClick={() => handleNavClick('portfolio-grid')}
            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/5 hover:text-[#c5a059] flex items-center justify-between"
          >
            <span>Portfolio Archive</span>
            <Camera className="w-4 h-4 text-[#c5a059]" />
          </button>
          <button
            onClick={() => handleNavClick('gear-section')}
            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/5 hover:text-[#c5a059]"
          >
            Cinema Gear & Equipment
          </button>
          <button
            onClick={() => handleNavClick('testimonials-section')}
            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/5 hover:text-[#c5a059]"
          >
            Client Reviews & Stories
          </button>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[10px] tracking-wider text-white/60">
              <span>Direct Phone Call:</span>
              <a href="tel:+923220409615" className="text-[#25D366] font-bold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> 0322-0409615
              </a>
            </div>
            <div className="flex items-center justify-between text-[10px] tracking-wider text-white/60">
              <span>Official Email:</span>
              <a href="mailto:armantxt70@gmail.com" className="text-[#c5a059] font-mono font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> armantxt70@gmail.com
              </a>
            </div>
            <button
              onClick={handleDirectWhatsApp}
              className="w-full py-2.5 rounded-xl bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mt-1"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
