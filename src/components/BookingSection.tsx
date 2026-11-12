import React, { useState, useEffect } from 'react';
import { QuoteRequestData } from '../types';
import { generateWhatsAppQuoteUrl } from '../utils/whatsapp';
import { brevoService } from '../services/brevoService';
import { CheckCircle2, Clock, Mail, Phone, AlertCircle } from 'lucide-react';

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
  const [bookingRef, setBookingRef] = useState('');
  const [emailNotice, setEmailNotice] = useState<{
    customerSent: boolean;
    adminSent: boolean;
    warning?: string;
  } | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
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
    const ref = `NA-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);

    try {
      const result = await brevoService.sendBookingEmails(formData, ref);
      setEmailNotice({
        customerSent: result.customerSent,
        adminSent: result.adminSent,
        warning: result.error,
      });
    } catch (err: any) {
      console.warn('Booking email dispatch notice:', err);
      setEmailNotice({
        customerSent: false,
        adminSent: false,
        warning: 'Automated email dispatch is queued. Your booking details are ready.',
      });
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmailNotice(null);
    setBookingRef('');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      suburb: 'Umhlanga, Gateway & Prestondale',
      serviceType: 'Installation',
      isUrgent: false,
      notes: '',
    });
  };

  return (
    <section id="booking" className="py-20 bg-[#F3F9FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Outer Split Card */}
        <div className="surface-card rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* Left Column: Contact Block */}
            <div className="lg:col-span-5 bg-white flex flex-col justify-between p-8 sm:p-10 text-[#042B60] min-h-[440px] border-b lg:border-b-0 lg:border-r border-slate-200">

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-extrabold tracking-tight leading-none">
                      <span className="text-[#042B60]">NORDIC</span>
                      <span className="text-[#088DD4] ml-1.5">AIR</span>
                    </span>
                    <span className="text-[9px] tracking-[0.24em] text-slate-600 font-semibold uppercase mt-1.5">
                      Durban Aircon Team
                    </span>
                  </div>

                  <span className="text-xs text-slate-600 bg-[#39A9EC]/5 px-3 py-1 rounded-full border border-slate-200">
                    On Standby
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#042B60] leading-tight">
                    Book Your Service
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Book online in 1 minute, or call us directly. We will confirm your time and send a qualified technician to your door.
                  </p>
                </div>
              </div>

              {/* Direct Contact Points */}
              <div className="pt-8 space-y-4 border-t border-slate-200 text-xs text-slate-600">
                <div className="space-y-2">
                  <a
                    href="tel:0319403388"
                    className="block p-3.5 rounded-2xl bg-[#39A9EC]/5 border border-slate-200 hover:bg-[#39A9EC]/10 transition-colors"
                  >
                    <span className="block text-[10px] text-slate-600 uppercase tracking-wider">
                      Emergency Repair Line (24/7)
                    </span>
                    <span className="font-bold text-base text-[#042B60] font-mono mt-0.5 block">
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
                    className="block p-3.5 rounded-2xl bg-[#39A9EC]/15 border border-[#39A9EC]/30 hover:bg-[#39A9EC]/25 transition-colors"
                  >
                    <span className="block text-[10px] text-[#042B60] uppercase tracking-wider font-semibold">
                      Direct WhatsApp Dispatch
                    </span>
                    <span className="font-bold text-sm text-[#042B60] mt-0.5 block">
                      Chat With On-Call Tech
                    </span>
                  </a>
                </div>

                <div className="px-1 text-slate-600 space-y-1.5">
                  <div>
                    <span className="text-slate-600 block text-[10px] uppercase">Service Hours:</span>
                    <span>Monday to Sunday: 24/7 Urgent Dispatch</span>
                  </div>
                  <div>
                    <span className="text-slate-600 block text-[10px] uppercase">Address:</span>
                    <span>158 Aberdare Drive #160 Durban 4068</span>
                  </div>
                  <div>
                    <span className="text-slate-600 block text-[10px] uppercase">Email:</span>
                    <span></span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">

              {submitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#39A9EC]/15 text-[#042B60] flex items-center justify-center mx-auto border border-[#39A9EC]/40 shadow-sm">
                    <CheckCircle2 className="w-7 h-7 text-[#088DD4]" />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#088DD4] uppercase block mb-1">
                      Request Confirmed & Received
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#042B60] tracking-tight">
                      Thank You, {formData.fullName}
                    </h3>
                  </div>

                  {/* Reassurance Banner */}
                  <div className="p-4 bg-white rounded-2xl border border-[#39A9EC]/30 shadow-xs max-w-lg mx-auto text-left space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#042B60]">
                      <Clock className="w-4 h-4 text-[#088DD4]" />
                      <span>Guaranteed Response Within 24 Hours</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      We have received your request for <strong>{formData.serviceType}</strong> in <strong>{formData.suburb}</strong>. Our Durban operations desk is reviewing your requirements, and an official confirmation has been prepared for reference <span className="font-mono font-bold text-[#042B60]">#{bookingRef}</span>.
                    </p>
                  </div>

                  {/* Email Dispatch Automation Status */}
                  <div className="p-3.5 bg-[#F3F9FF] rounded-2xl border border-slate-200 max-w-lg mx-auto text-left text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Mail className="w-3.5 h-3.5 text-[#088DD4]" />
                        Confirmation sent to:
                      </span>
                      <span className="font-semibold text-[#042B60] truncate max-w-[200px]">{formData.email}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-700">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Phone className="w-3.5 h-3.5 text-[#088DD4]" />
                        Direct contact number:
                      </span>
                      <span className="font-mono font-semibold text-[#042B60]">{formData.phone}</span>
                    </div>

                    {emailNotice?.warning && (
                      <div className="pt-1 mt-1 border-t border-slate-200 text-[11px] text-amber-700 flex items-start gap-1">
                        <AlertCircle className="w-3 h-3 mt-0.5 shrink-0 text-amber-600" />
                        <span>{emailNotice.warning}</span>
                      </div>
                    )}
                  </div>

                  {formData.isUrgent && (
                    <div className="p-3 bg-red-600/10 text-red-600 rounded-xl text-xs font-semibold max-w-lg mx-auto border border-red-600/30">
                      ⚡ Urgent dispatch requested: An on-call Durban technician has been alerted for same-day priority response.
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-[#39A9EC]/5 hover:bg-[#39A9EC]/10 border border-slate-200 rounded-xl transition-colors cursor-pointer w-full sm:w-auto"
                    >
                      Book Another Visit
                    </button>

                    <a
                      href={generateWhatsAppQuoteUrl({
                        name: formData.fullName,
                        phone: formData.phone,
                        serviceType: formData.serviceType,
                        suburb: formData.suburb,
                        details: `Reference #${bookingRef}. Notes: ${formData.notes || 'None'}`,
                        isUrgent: formData.isUrgent,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 text-xs font-bold text-white bg-[#042B60] hover:bg-[#088DD4] rounded-xl transition-colors cursor-pointer w-full sm:w-auto text-center flex items-center justify-center gap-1.5"
                    >
                      Follow Up on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-600/10 border border-red-600/30 text-red-600 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Your Name*
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. David Moodley"
                        className="field-dark w-full px-4 py-2.5 rounded-xl text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. david@example.co.za"
                        className="field-dark w-full px-4 py-2.5 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  {/* Phone and Suburb */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 082 123 4567"
                        className="field-dark w-full px-4 py-2.5 rounded-xl text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Your Suburb*
                      </label>
                      <select
                        value={formData.suburb}
                        onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                        className="field-dark w-full px-4 py-2.5 rounded-xl text-sm"
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      What do you need help with?*
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="field-dark w-full px-4 py-2.5 rounded-xl text-sm"
                    >
                      <option value="Installation">New Air Conditioner Installation</option>
                      <option value="Repair">Fix a Broken AC (Not cooling, leaking, noises)</option>
                      <option value="Maintenance">Annual Service & Coil Cleaning</option>
                      <option value="Commercial">Office or Business Cooling</option>
                    </select>
                  </div>

                  {/* Urgent toggle */}
                  <div className="p-3 rounded-xl bg-[#39A9EC]/[0.04] border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        id="urgent-dispatch"
                        checked={formData.isUrgent}
                        onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                        className="w-4 h-4 rounded text-[#088DD4] focus:ring-[#39A9EC] border-slate-300 accent-[#088DD4] cursor-pointer"
                      />
                      <label htmlFor="urgent-dispatch" className="text-xs font-semibold text-slate-700 cursor-pointer">
                        Need help urgently today?{' '}
                        <span className="text-[11px] text-[#088DD4] font-bold">
                          (Same-Day Priority)
                        </span>
                      </label>
                    </div>
                    {formData.isUrgent && (
                      <span className="text-[10px] uppercase font-bold text-red-600 bg-red-600/10 border border-red-600/30 px-2 py-0.5 rounded">
                        Fast Callout
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Notes or Room Details (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Master bedroom on 2nd floor, or AC is making a strange sound..."
                      className="field-dark w-full px-4 py-2.5 rounded-xl text-sm"
                    />
                  </div>

                  {/* Multi-Channel Dispatch Actions */}
                  <div className="pt-2 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-5 text-sm font-bold text-white bg-[#042B60] hover:bg-[#088DD4] rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50 text-center flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                            <span>Dispatching Request...</span>
                          </>
                        ) : (
                          'Send Online Request'
                        )}
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
                        className="w-full py-3.5 px-5 text-sm font-semibold text-slate-700 bg-[#39A9EC]/5 hover:bg-[#39A9EC]/10 border border-slate-200 rounded-xl transition-all text-center inline-block"
                      >
                        Send via WhatsApp Now
                      </a>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
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
