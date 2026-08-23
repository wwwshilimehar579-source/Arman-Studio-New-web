import React, { useState } from 'react';
import { soundFx } from '../utils/audio';
import { MessageCircle, Phone, Sparkles, X, ChevronUp, Mail } from 'lucide-react';

interface FloatingContactButtonsProps {
  onOpenBooking: () => void;
}

export const FloatingContactButtons: React.FC<FloatingContactButtonsProps> = ({
  onOpenBooking,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    soundFx.playShutterSound();
    const text = encodeURIComponent(
      "Assalam-o-Alaikum Arman Studio! 📸\n\nI want to inquire about shoot booking and packages (Basic 85K, Standard 135K, Premium 150K).\nPlease share details!"
    );
    window.open(`https://wa.me/923220409615?text=${text}`, '_blank');
  };

  const handleCallClick = () => {
    soundFx.playShutterSound();
    window.location.href = 'tel:+923220409615';
  };

  const handleEmailClick = () => {
    soundFx.playShutterSound();
    window.location.href = 'mailto:armantxt70@gmail.com?subject=Arman%20Studio%20Shoot%20Inquiry';
  };

  const scrollToTop = () => {
    soundFx.playSpinTick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-50 flex flex-col items-end gap-3 select-none">
      
      {/* Expanded Quick Options */}
      {isExpanded && (
        <div className="flex flex-col items-end gap-2.5 mb-1 animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group flex items-center gap-2 px-3 py-2 rounded-full bg-[#151515] border border-white/15 text-white/80 hover:text-white shadow-xl backdrop-blur-md transition-all active:scale-95 text-xs"
          >
            <span className="hidden group-hover:inline text-[10px] uppercase font-mono tracking-wider">Top</span>
            <ChevronUp className="w-4 h-4" />
          </button>

          {/* Quick Booking Modal */}
          <button
            onClick={() => {
              soundFx.playShutterSound();
              setIsExpanded(false);
              onOpenBooking();
            }}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1a1712] border border-[#c5a059]/40 text-[#c5a059] shadow-2xl backdrop-blur-md hover:bg-[#c5a059] hover:text-black transition-all active:scale-95 text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4" />
            <span>Booking Form</span>
          </button>

          {/* Email Option */}
          <button
            onClick={handleEmailClick}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#14121a] border border-[#c5a059]/30 text-[#e6d3a3] shadow-2xl backdrop-blur-md hover:bg-[#c5a059] hover:text-black transition-all active:scale-95 text-xs font-medium font-mono"
            title="Email: armantxt70@gmail.com"
          >
            <Mail className="w-4 h-4 text-[#c5a059] group-hover:text-black" />
            <span>armantxt70@gmail.com</span>
          </button>

          {/* Direct Phone Call Button */}
          <button
            onClick={handleCallClick}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0e1711] border border-[#25D366]/40 text-[#25D366] shadow-2xl backdrop-blur-md hover:bg-[#25D366] hover:text-black transition-all active:scale-95 text-xs font-bold font-mono tracking-wider"
            title="Call 0322-0409615"
          >
            <Phone className="w-4 h-4" />
            <span>Call: 0322-0409615</span>
          </button>
        </div>
      )}

      {/* Main Action Group */}
      <div className="flex items-center gap-2.5">
        
        {/* Direct Call Quick Pill on Desktop */}
        <button
          onClick={handleCallClick}
          aria-label="Call Arman Studio at 0322-0409615"
          className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-full bg-[#121212]/90 border border-white/15 hover:border-[#c5a059] text-white/90 hover:text-white backdrop-blur-xl shadow-2xl transition-all active:scale-95 text-xs font-mono font-medium group"
          title="Direct Phone Call"
        >
          <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <Phone className="w-3.5 h-3.5 text-[#c5a059] group-hover:rotate-12 transition-transform" />
          <span>0322-0409615</span>
        </button>

        {/* Primary WhatsApp Floating Action Button */}
        <button
          id="floating-whatsapp-btn"
          onClick={handleWhatsAppClick}
          aria-label="Chat on WhatsApp"
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#22bf5b] active:scale-95 shadow-[0_0_25px_rgba(37,211,102,0.5)] flex items-center justify-center text-white transition-all transform-gpu hover:scale-105 group"
          title="Chat on WhatsApp (0322-0409615)"
        >
          {/* Pulsing Outer Ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />
          
          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-white group-hover:scale-110 transition-transform" />

          {/* Quick Notification Bubble */}
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#c5a059] text-black text-[9px] font-black uppercase tracking-wider shadow-md">
            Online
          </span>
        </button>
      </div>
    </div>
  );
};
