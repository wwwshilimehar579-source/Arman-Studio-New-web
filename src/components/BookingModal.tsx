import React, { useState } from 'react';
import { BookingFormData, ShootCategory } from '../types';
import { soundFx } from '../utils/audio';
import { 
  X, 
  Sparkles, 
  Send, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Calendar,
  MapPin,
  Camera
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCategory?: ShootCategory | string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedCategory = 'wedding',
}) => {
  const initialCategory = ['wedding', 'product', 'model', 'movie'].includes(preselectedCategory)
    ? (preselectedCategory as BookingFormData['shootType'])
    : 'wedding';

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    email: '',
    shootType: initialCategory,
    eventDate: '',
    location: '',
    budgetRange: '₨ 100,000 - ₨ 250,000',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playShutterSound();
    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    soundFx.playShutterSound();
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Arman Studio! 📸\n\nI want to inquire about a shoot booking:\n- *Name*: ${formData.fullName || 'Client'}\n- *Shoot / Package*: ${formData.shootType.toUpperCase()}\n- *Date*: ${formData.eventDate || 'TBD'}\n- *Location*: ${formData.location || 'Pakistan'}\n- *Budget / Package Choice*: ${formData.budgetRange}\n- *Notes*: ${formData.notes || 'Looking for 3D cinematic photography package'}\n\nPlease share availability & packages!`
    );
    window.open(`https://wa.me/923220409615?text=${text}`, '_blank');
  };

  return (
    <div 
      id="booking-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="booking-modal-card"
        className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] my-auto text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-booking-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#c5a059] text-[11px] font-medium uppercase tracking-[0.3em] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Reserve Your Date</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-classic italic font-normal text-white">
                Booking Shoot with Arman Studio
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light mt-1">
                Tell us about your Pakistani royal wedding, luxury brand catalog, fashion lookbook, or cinematic film project.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-white/70 font-medium mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hamza Malik"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-medium mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0322 0409615 / 0300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-white/70 font-medium mb-1">Shoot Category *</label>
                  <select
                    value={formData.shootType}
                    onChange={(e) => setFormData({ ...formData, shootType: e.target.value as BookingFormData['shootType'] })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111] border border-white/10 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                  >
                    <option value="wedding">Royal Pakistani Wedding (Barat / Mehndi / Walima)</option>
                    <option value="product">Luxury Brand & Commercial Shoot</option>
                    <option value="model">Fashion Lookbook & Model Portfolio</option>
                    <option value="movie">Lollywood Cinema & Drama Production</option>
                    <option value="other">Pre-Wedding / Event Shoot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 font-medium mb-1">Estimated Date</label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111] border border-white/10 text-white focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-white/70 font-medium mb-1">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Lahore / Islamabad / Karachi / Hunza"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#c5a059] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-medium mb-1">Select Package / Budget</label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#111] border border-[#c5a059]/40 text-[#f3e3b6] focus:outline-none focus:border-[#c5a059] transition-colors"
                  >
                    <option value="BASIC PAKISTANI PACKAGE (85K)">BASIC PACKAGE - 85K (₨ 85,000)</option>
                    <option value="STANDARD PAKISTANI PACKAGE (135K)">STANDARD PACKAGE - 135K (₨ 135,000)</option>
                    <option value="PREMIUM PAKISTANI PACKAGE (150K)">PREMIUM PACKAGE - 150K (₨ 150,000)</option>
                    <option value="Custom Luxury Wedding Package (₨ 250K+)">Custom Luxury Wedding (₨ 250K+)</option>
                    <option value="Commercial Product Catalog (₨ 75K+)">Commercial Product Shoot (₨ 75K+)</option>
                    <option value="Fashion / Model Portfolio (₨ 55K+)">Fashion / Model Portfolio (₨ 55K+)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/70 font-medium mb-1">Your Vision / Project Notes</label>
                <textarea
                  rows={2}
                  placeholder="Share details about outfits, lighting style, story themes, or specific dates..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#c5a059] transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  id="submit-booking-form-btn"
                  className="flex-1 py-3.5 px-4 rounded-full bg-[#c5a059] hover:bg-[#d8b56f] text-black font-semibold tracking-[0.15em] uppercase text-xs transition-all shadow-xl shadow-[#c5a059]/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Send Studio Inquiry</span>
                </button>

                <button
                  type="button"
                  id="direct-whatsapp-btn"
                  onClick={handleWhatsAppDirect}
                  className="py-3.5 px-6 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#c5a059] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-serif-cinzel font-bold text-white">
              Inquiry Received, {formData.fullName || 'Esteemed Client'}!
            </h3>

            <p className="text-sm text-white/70 max-w-md mx-auto font-light leading-relaxed">
              Arman and our executive production team will contact you on <span className="text-[#c5a059] font-medium">{formData.phone || 'WhatsApp'}</span> within 2 hours with our comprehensive portfolio PDF and schedule options.
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-white/60 max-w-sm mx-auto space-y-1">
              <div>Shoot: <span className="text-white font-medium capitalize">{formData.shootType}</span></div>
              <div>Estimated Investment: <span className="text-[#c5a059] font-serif-cinzel">{formData.budgetRange}</span></div>
              <div>Studio Reference ID: <span className="text-white font-mono">#ARM-{(Math.random() * 89999 + 10000).toFixed(0)}</span></div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleWhatsAppDirect}
                className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
