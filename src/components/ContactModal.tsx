import React, { useState } from 'react';
import { X, Send, Mail, CheckCircle2, MessageSquare, Building2, User, AlertCircle } from 'lucide-react';
import { sanitizeTextInput, isValidEmail } from '../utils/security';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Guest Pitch',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const safeName = sanitizeTextInput(formData.name, 80);
    const safeEmail = sanitizeTextInput(formData.email, 120);
    const safeMessage = sanitizeTextInput(formData.message, 2000);

    if (!safeName || safeName.length < 2) {
      setValidationError('Please enter a valid name (at least 2 characters).');
      return;
    }

    if (!isValidEmail(safeEmail)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    if (!safeMessage || safeMessage.length < 5) {
      setValidationError('Please enter a message of at least 5 characters.');
      return;
    }

    // Update with sanitized data and confirm submission
    setFormData({
      ...formData,
      name: safeName,
      email: safeEmail,
      message: safeMessage,
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#111111] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D4FF00]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4FF00]">
                DIRECT INQUIRY
              </span>
            </div>

            <h3 className="font-heading text-2xl font-black text-white">
              Connect with Archit Jain
            </h3>
            <p className="text-neutral-400 text-sm mt-1 mb-6">
              For keynote speaking invitations, guest nominations, or brand collaborations.
            </p>

            {validationError && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-500/50 flex items-center gap-2 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 text-red-400 flex-none" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1.5">
                  Your Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    maxLength={80}
                    value={formData.name}
                    onChange={(e) => {
                      setValidationError(null);
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    placeholder="e.g. Vikramaditya"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    maxLength={120}
                    value={formData.email}
                    onChange={(e) => {
                      setValidationError(null);
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    placeholder="you@domain.com"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1.5">
                  Inquiry Nature
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] transition-colors"
                >
                  <option value="Guest Pitch">Guest Pitch / Nomination</option>
                  <option value="Speaking Keynote">Keynote / College Invitation (IIT/BITS)</option>
                  <option value="Sponsorship">Brand Sponsorship & OTT Integration</option>
                  <option value="Press">Media / Press Interview</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1.5">
                  Message / Brief
                </label>
                <textarea
                  rows={3}
                  required
                  maxLength={2000}
                  value={formData.message}
                  onChange={(e) => {
                    setValidationError(null);
                    setFormData({ ...formData, message: e.target.value });
                  }}
                  placeholder="Share details regarding your proposal or topic..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#D4FF00] hover:bg-[#bbf000] text-black font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(212,255,0,0.3)] mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Inquiry</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#D4FF00]/15 text-[#D4FF00] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-heading text-xl font-bold text-white">
              Inquiry Received!
            </h4>
            <p className="text-sm text-neutral-300 max-w-sm mx-auto">
              Thank you, {formData.name}. Archit's team will review your message regarding "{formData.type}".
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-semibold transition-colors"
              >
                Back to Podcast
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
