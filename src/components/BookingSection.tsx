import React, { useState, useEffect } from 'react';
import { QuoteRequestData } from '../types';
import { generateWhatsAppQuoteUrl } from '../utils/whatsapp';

interface BookingSectionProps {
  initialService?: string;
  initialSuburb?: string;
  initialNotes?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  initialService = 'Installation',
  initialSuburb = 'Umhlanga',
  initialNotes = '',
}) => {
  const [formData, setFormData] = useState<QuoteRequestData>({
    fullName: '',
    email: '',
    phone: '',
    suburb: initialSuburb,
    serviceType: initialService,
    isUrgent: false,
    notes: initialNotes,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceType: initialService }));
    }
    if (initialSuburb) {
      setFormData((prev) => ({ ...prev, suburb: initialSuburb }));
    }
    if (initialNotes) {
      setFormData((prev) => ({ ...prev, notes: initialNotes }));
    }
  }, [initialService, initialSuburb, initialNotes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMsg('Please enter your contact phone number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      suburb: 'Umhlanga',
      serviceType: 'Installation',
      isUrgent: false,
      notes: '',
    });
  };

  return (
    <section id="booking" className="py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Outer Split Card (NO icons, NO emojis, NO prices) */}
        <div className="neo-card rounded-3xl bg-white shadow-xl overflow-hidden border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Clean Dark Navy Contact Block */}
            <div className="lg:col-span-5 bg-[#0A1322] flex flex-col justify-between p-8 sm:p-10 text-white min-h-[440px] border-b lg:border-b-0 lg:border-r border-white/10">
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/aistudio/nordic-logo_9359fca8.jpeg"
                      alt="Nordic Air"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#D32626]/40 shadow-sm"
                    />
                    <div>
                      <span className="text-xs font-bold text-sky-300 font-mono tracking-wider uppercase block">
                        DURBAN AIRCON TEAM
                      </span>
                      <span className="text-[10px] text-white/70">
                        Licensed & Guaranteed
                      </span>
                    </div>
                  </div>

                  <span className="text-xs text-white/90 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    On Standby
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                    Book Your Service
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    Book online in 1 minute, or call us directly. We will confirm your time and send a qualified technician to your door.
                  </p>
                </div>
              </div>

              {/* Direct Contact Points (Text only) */}
              <div className="pt-8 space-y-4 border-t border-white/10 text-xs text-slate-300">
                <div className="space-y-2">
                  <a
                    href="tel:0319403388"
                    className="block p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">
                      Emergency Repair Line (24/7)
                    </span>
                    <span className="font-bold text-base text-white font-mono mt-0.5 block">
                      031 940 3388
                    </span>
                  </a>

                  <a
                    href={generateWhatsAppQuoteUrl({
                      serviceType: formData.serviceType,
                      suburb: formData.suburb,
                      details: formData.notes,
                      isUrgent: formData.isUrgent,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3.5 rounded-2xl bg-[#1B5299]/25 border border-[#1B5299]/40 hover:bg-[#1B5299]/35 transition-colors"
                  >
                    <span className="block text-[10px] text-sky-300 uppercase tracking-wider font-semibold">
                      Direct WhatsApp Dispatch
                    </span>
                    <span className="font-bold text-sm text-white mt-0.5 block">
                      Chat With On-Call Tech
                    </span>
                  </a>
                </div>

                <div className="px-1 text-slate-300 space-y-1.5">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Service Hours:</span>
                    <span>Monday to Sunday: 24/7 Urgent Dispatch</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Address:</span>
                    <span>Umhlanga Ridge, Greater Durban</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Email:</span>
                    <span>service@nordicair.co.za</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Clean Form (No Icons, No Emojis, No Prices) */}
            <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
              
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 font-bold text-lg flex items-center justify-center mx-auto">
                    OK
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Thank You, {formData.fullName}
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    We received your request. Reference{' '}
                    <span className="font-mono font-semibold text-[#1B5299]">#NA-{Math.floor(1000 + Math.random() * 9000)}</span>.
                    Our team will call you at{' '}
                    <span className="font-mono font-semibold text-slate-900">{formData.phone}</span> shortly to confirm your booking.
                  </p>
                  
                  {formData.isUrgent && (
                    <div className="p-3 bg-red-50 text-[#D32626] rounded-xl text-xs font-semibold max-w-md mx-auto border border-red-200">
                      Urgent dispatch requested: An on-call Durban technician has been notified.
                    </div>
                  )}

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer w-full sm:w-auto"
                    >
                      Book Another Visit
                    </button>

                    <a
                      href={generateWhatsAppQuoteUrl({
                        name: formData.fullName,
                        phone: formData.phone,
                        serviceType: formData.serviceType,
                        suburb: formData.suburb,
                        details: `Reference #NA-confirmed. Notes: ${formData.notes || 'None'}`,
                        isUrgent: formData.isUrgent,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1B5299] hover:bg-[#153e74] rounded-xl transition-colors cursor-pointer w-full sm:w-auto text-center"
                    >
                      Follow Up on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Name*
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. David Moodley"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B5299] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. david@example.co.za"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B5299] transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone and Suburb */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 082 123 4567"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B5299] transition-all font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Suburb*
                      </label>
                      <select
                        value={formData.suburb}
                        onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B5299] transition-all"
                      >
                        <optgroup label="North Coast & Northern Suburbs">
                          <option value="Umhlanga, Gateway & Prestondale">Umhlanga, Gateway & Prestondale</option>
                          <option value="Durban North, Virginia & Beachwood">Durban North, Virginia & Beachwood</option>
                          <option value="La Lucia & Glenashley">La Lucia & Glenashley</option>
                          <option value="Ballito, Salt Rock & Simbithi">Ballito, Salt Rock & Simbithi</option>
                          <option value="Phoenix, Mount Edgecombe & Cornubia">Phoenix, Mount Edgecombe & Cornubia</option>
                          <option value="Tongaat, Verulam & Umdloti">Tongaat, Verulam & Umdloti</option>
                        </optgroup>
                        <optgroup label="Central Metro & Berea">
                          <option value="Morningside, Windermere & Stamford Hill">Morningside, Windermere & Stamford Hill</option>
                          <option value="Berea, Musgrave & Overport">Berea, Musgrave & Overport</option>
                          <option value="Glenwood, Umbilo & Bulwer">Glenwood, Umbilo & Bulwer</option>
                          <option value="Durban CBD & Point Waterfront">Durban CBD & Point Waterfront</option>
                          <option value="Reservoir Hills, Clare Estate & Sydenham">Reservoir Hills, Clare Estate & Sydenham</option>
                        </optgroup>
                        <optgroup label="Highway & West">
                          <option value="Westville & Cowies Hill">Westville & Cowies Hill</option>
                          <option value="Pinetown, New Germany & Sarnia">Pinetown, New Germany & Sarnia</option>
                          <option value="Kloof, Gillitts & Winston Park">Kloof, Gillitts & Winston Park</option>
                          <option value="Hillcrest, Waterfall & Botha’s Hill">Hillcrest, Waterfall & Botha’s Hill</option>
                          <option value="Queensburgh, Malvern & Escombe">Queensburgh, Malvern & Escombe</option>
                        </optgroup>
                        <optgroup label="South Coast & Southern Suburbs">
                          <option value="Bluff, Brighton Beach & Wentworth">Bluff, Brighton Beach & Wentworth</option>
                          <option value="Amanzimtoti, Warner Beach & Doonside">Amanzimtoti, Warner Beach & Doonside</option>
                          <option value="Chatsworth, Havenside & Mobeni Heights">Chatsworth, Havenside & Mobeni Heights</option>
                          <option value="Yellowwood Park, Montclair & Woodlands">Yellowwood Park, Montclair & Woodlands</option>
                        </optgroup>
                        <optgroup label="Inland & Greater Durban Communities">
                          <option value="Umlazi, Isipingo & Prospecton">Umlazi, Isipingo & Prospecton</option>
                          <option value="KwaMashu, Inanda & Ntuzuma">KwaMashu, Inanda & Ntuzuma</option>
                          <option value="Other Durban Area">Other Durban Area</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  {/* Service dropdown */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      What do you need help with?*
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B5299] transition-all"
                    >
                      <option value="Installation">New Air Conditioner Installation</option>
                      <option value="Repair">Fix a Broken AC (Not cooling, leaking, noises)</option>
                      <option value="Maintenance">Annual Service & Coil Cleaning</option>
                      <option value="Commercial">Office or Business Cooling</option>
                    </select>
                  </div>

                  {/* Urgent toggle */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        id="urgent-dispatch"
                        checked={formData.isUrgent}
                        onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                        className="w-4 h-4 rounded text-[#D32626] focus:ring-[#D32626] border-slate-300 accent-[#D32626] cursor-pointer"
                      />
                      <label htmlFor="urgent-dispatch" className="text-xs font-semibold text-slate-800 cursor-pointer">
                        Need help urgently today?{' '}
                        <span className="text-[11px] text-[#D32626] font-bold">
                          (Same-Day Priority)
                        </span>
                      </label>
                    </div>
                    {formData.isUrgent && (
                      <span className="text-[10px] uppercase font-bold text-[#D32626] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                        Fast Callout
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Notes or Room Details (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Master bedroom on 2nd floor, or AC is making a strange sound..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B5299] transition-all"
                    />
                  </div>

                  {/* Multi-Channel Dispatch Actions */}
                  <div className="pt-2 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-5 text-sm font-semibold text-white bg-[#1B5299] hover:bg-[#153e74] rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50 text-center"
                      >
                        {loading ? 'Sending...' : 'Send Online Request'}
                      </button>

                      <a
                        href={generateWhatsAppQuoteUrl({
                          name: formData.fullName,
                          phone: formData.phone,
                          serviceType: formData.serviceType,
                          suburb: formData.suburb,
                          details: formData.notes,
                          isUrgent: formData.isUrgent,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-5 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all text-center inline-block"
                      >
                        Send via WhatsApp Now
                      </a>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>Free written quotation · No obligations</span>
                      <span>Durban team on standby</span>
                    </div>
                  </div>

                </form>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
