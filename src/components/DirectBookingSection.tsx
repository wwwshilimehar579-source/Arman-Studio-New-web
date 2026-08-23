import React, { useState } from 'react';
import { soundFx } from '../utils/audio';
import { 
  Send, 
  Phone, 
  Calendar, 
  User, 
  Sparkles, 
  Tag, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  MessageCircle,
  Clock,
  ShieldCheck,
  Mail
} from 'lucide-react';

interface DirectBookingSectionProps {
  initialPackage?: string;
}

export const DirectBookingSection: React.FC<DirectBookingSectionProps> = ({
  initialPackage = 'Basic Pakistani Package (85K)',
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('Pakistani Wedding (Barat / Mehndi / Walima)');
  const [packageChoice, setPackageChoice] = useState(initialPackage);
  const [cityLocation, setCityLocation] = useState('Lahore');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playShutterSound();

    const formattedMessage = 
`*Assalam-o-Alaikum Arman Studio!* 📸✨
*NEW EVENT BOOKING INQUIRY*

👤 *Client Name:* ${fullName || 'Valued Client'}
📱 *Contact / WhatsApp:* ${phone || 'Not provided'}
📅 *Event Date:* ${eventDate || 'To be decided'}
🎉 *Event / Function Type:* ${eventType}
📦 *Chosen Package:* ${packageChoice}
📍 *City / Location:* ${cityLocation || 'Pakistan'}
📝 *Special Requirements:* ${notes || 'Looking for 3D cinematic photography and videography coverage.'}

_Please confirm availability and booking procedure. Thank you!_`;

    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/923220409615?text=${encodedText}`;
    
    setIsSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 400);
  };

  const handleDirectCall = () => {
    soundFx.playShutterSound();
    window.location.href = 'tel:+923220409615';
  };

  return (
    <section id="direct-booking-section" className="py-10 sm:py-14 bg-gradient-to-b from-[#050505] via-[#0c0a07] to-[#080808] relative z-20 border-t border-b border-[#c5a059]/20">
      {/* Background Subtle Accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#c5a059]/5 rounded-full blur-[130px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Compact Title Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-[11px] font-semibold uppercase tracking-[0.25em] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Booking Concierge</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif-cinzel font-bold text-white tracking-wide">
            Booking Shoot with <span className="text-[#c5a059]">Arman Studio</span>
          </h3>
          <p className="text-white/60 text-xs sm:text-sm font-light mt-1 max-w-lg mx-auto">
            Fill the form below — all details will be sent directly to our official WhatsApp at <strong className="text-white font-mono">0322-0409615</strong> for immediate confirmation.
          </p>
        </div>

        {/* Clean, High-Contrast Booking Card Form */}
        <div className="bg-[#11100e]/95 border border-[#c5a059]/30 rounded-3xl p-5 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          {/* Ornate Gold Border Line Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />

          <form onSubmit={handleSubmitWhatsApp} className="space-y-4 sm:space-y-5">
            
            {/* Row 1: Full Name & WhatsApp Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Full Name (Apna Naam) *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shahmeer Malik / Areeba Khan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp / Mobile Number *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300 1234567 / 0322 0409615"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition-all"
                />
              </div>
            </div>

            {/* Row 2: Event Date & Event Function Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Event Date (Event Ki Tareekh) *</span>
                </label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181614] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#c5a059] transition-all cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Event / Shoot Type (Kis Cheez Ka Event) *</span>
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181614] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#c5a059] transition-all"
                >
                  <option value="Pakistani Wedding (Barat / Mehndi / Walima)">Royal Pakistani Wedding (Barat / Mehndi / Walima)</option>
                  <option value="Mehndi / Mayun / Dholki Festivity">Mehndi / Mayun / Dholki Festivity</option>
                  <option value="Barat & Nikah Ceremony">Barat & Nikah Ceremony</option>
                  <option value="Walima Reception">Grand Walima Reception</option>
                  <option value="Pre-Wedding / Couple Shoot">Pre-Wedding / Couple Outdoor Shoot</option>
                  <option value="Luxury Brand & Product Shoot">Commercial Brand & Product Catalog</option>
                  <option value="Fashion Lookbook / Model Portfolio">Fashion Lookbook & Model Portfolio</option>
                  <option value="Cinematic Drama / Lollywood Stills">Film, Drama & Music Video Production</option>
                  <option value="Birthday / Family Celebration">Birthday / Family Event</option>
                </select>
              </div>
            </div>

            {/* Row 3: Package Selection & City Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Select Package (Package Chunein)</span>
                </label>
                <select
                  value={packageChoice}
                  onChange={(e) => setPackageChoice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181614] border border-[#c5a059]/40 text-[#f3e3b6] font-medium text-xs sm:text-sm focus:outline-none focus:border-[#c5a059] transition-all"
                >
                  <option value="BASIC PAKISTANI PACKAGE (85K)">BASIC PAKISTANI PACKAGE - 85K (₨ 85,000)</option>
                  <option value="STANDARD PAKISTANI PACKAGE (135K)">STANDARD PAKISTANI PACKAGE - 135K (₨ 135,000)</option>
                  <option value="PREMIUM PAKISTANI PACKAGE (150K)">PREMIUM PAKISTANI PACKAGE - 150K (₨ 150,000)</option>
                  <option value="Custom Luxury Wedding Package">Custom Luxury Wedding Package</option>
                  <option value="Commercial Product Shoot Package">Commercial Product Shoot Package</option>
                  <option value="Fashion / Model Portfolio Package">Fashion Lookbook Package</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>City / Location (Shehar)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lahore, Karachi, Islamabad, Multan, Rawalpindi"
                  value={cityLocation}
                  onChange={(e) => setCityLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-[#c5a059] transition-all"
                />
              </div>
            </div>

            {/* Row 4: Notes / Details */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Special Instructions / Event Details (Tafseelat)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Mention number of guests, venue, timing, drone requirements, or song choices..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none focus:border-[#c5a059] transition-all resize-none"
              />
            </div>

            {/* Buttons: Send to WhatsApp + Direct Call */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                id="direct-booking-whatsapp-btn"
                className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4 fill-black text-black" />
                <span>Send Booking to WhatsApp (0322-0409615)</span>
              </button>

              <button
                type="button"
                id="direct-booking-call-btn"
                onClick={handleDirectCall}
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-[#c5a059] hover:text-black border border-white/20 hover:border-[#c5a059] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#c5a059] group-hover:text-black" />
                <span>Direct Call</span>
              </button>
            </div>

            {/* Trust Badges & Contact Info */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-[10px] text-white/50">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#c5a059]" /> Quick WhatsApp Reply (Under 15 Mins)
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#25D366]" /> Official Number: 0322-0409615
              </span>
              <a href="mailto:armantxt70@gmail.com" className="flex items-center gap-1 text-[#c5a059] hover:underline font-mono">
                <Mail className="w-3 h-3 text-[#c5a059]" /> armantxt70@gmail.com
              </a>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#c5a059]" /> 100% Date Reservation Guarantee
              </span>
            </div>

            {isSubmitted && (
              <div className="p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] text-xs text-center font-medium animate-in fade-in">
                ✓ Opening WhatsApp with your event details! You can also reach us at 0322-0409615.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
