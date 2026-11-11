import React, { useState, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Check, Eye, MessageSquare, ArrowRight, ShieldCheck, Zap, Volume2, Wind } from 'lucide-react';
import { generateWhatsAppQuoteUrl } from '../utils/whatsapp';

export type SpaceCategory = 'commercial' | 'office' | 'living' | 'home';

export interface GalleryPhoto {
  src: string;
  title: string;
  caption: string;
  highlight: string;
}

export interface SpaceDetails {
  id: SpaceCategory;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  recommendedBtu: string;
  idealFor: string;
  specs: {
    label: string;
    value: string;
    icon: 'shield' | 'zap' | 'volume' | 'wind';
  }[];
  photos: GalleryPhoto[];
}

const SPACES: SpaceDetails[] = [
  {
    id: 'commercial',
    name: 'Commercial',
    badge: 'Heavy-Duty & Retail',
    tagline: 'Exterior Condenser Mountings & Industrial Bracketry',
    description:
      'Engineered for maximum reliability under continuous commercial cooling loads. Weather-resistant isolators, heavy-duty cantilever wall brackets mounted to exterior brickwork, and anti-vibration footings designed to withstand Durban coastal salt air.',
    recommendedBtu: '24,000 – 60,000 BTU',
    idealFor: 'Retail shops, restaurants, production facilities & server hubs',
    specs: [
      { label: 'Coil Coating', value: 'Gold-Fin Anti-Corrosion', icon: 'shield' },
      { label: 'Electrical', value: 'Dedicated IP65 Isolator', icon: 'zap' },
      { label: 'Vibration', value: 'Rubber Shock Absorbers', icon: 'volume' },
      { label: 'Mounting', value: 'Galvanised Cantilever Brackets', icon: 'wind' },
    ],
    photos: [
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_12.46.22_0fcc1e0f.jpeg',
        title: 'Commercial AUX Outdoor Condenser',
        caption: 'Cantilever wall mount on exterior red brick facade with clean concealed refrigeration lines.',
        highlight: 'Heavy-duty steel brackets with anti-vibration dampeners.',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_12.46.27_20fbdec1.jpeg',
        title: 'Precision Commercial Facade Fitment',
        caption: 'Firm structural wall mounting elevated above exterior landscaping for optimal airflow.',
        highlight: 'Gold-Fin condenser coil resistant to Durban coastal sea air.',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_12.46.24_e6f96e04.jpeg',
        title: 'Weather-Shielded Electrical & Piping Run',
        caption: 'External conduit and electrical isolator box with UV-resistant trunking.',
        highlight: 'SABS compliant external safety disconnect switch.',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_12.46.23_7159bcf4.jpeg',
        title: 'Commercial Compressor Setup',
        caption: 'Balanced multi-bracket installation built for non-stop summer operation.',
        highlight: 'Eco-friendly R32 refrigerant with high energy efficiency ratio.',
      },
    ],
  },
  {
    id: 'office',
    name: 'Office',
    badge: 'Acoustic & Corporate',
    tagline: 'Suspended Ceiling Flush Fits & Silent Workspaces',
    description:
      'Designed for professional boardrooms, open-plan workspaces, and private offices. Features whisper-quiet inverter technology below 20dB so phone calls and meetings remain undisturbed, with digital LED temperature readouts and concealed conduit wiring.',
    recommendedBtu: '18,000 – 36,000 BTU',
    idealFor: 'Executive suites, corporate open plans, call centres & boardrooms',
    specs: [
      { label: 'Sound Level', value: '19 dB Whisper Operation', icon: 'volume' },
      { label: 'Display', value: 'Hidden Soft-Glow LED', icon: 'wind' },
      { label: 'Efficiency', value: 'A++ Inverter Modulation', icon: 'zap' },
      { label: 'Integration', value: 'Acoustic Grid Alignment', icon: 'shield' },
    ],
    photos: [
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_12.46.26__1__66191514.jpeg',
        title: 'Corporate Office Suspended Ceiling Installation',
        caption: 'AUX high-wall inverter split mounted flush beneath acoustic tile ceiling displaying active 20°C readout.',
        highlight: 'Concealed power supply and clean white conduit integration.',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_12.46.42_f9573593.jpeg',
        title: 'Executive Suite Wide-Angle Fitment',
        caption: 'Even air distribution across office desk banks without cold drafts on staff.',
        highlight: '4-way auto-swing louvres for uniform temperature control.',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_12.46.23__1__d8bf8e7e.jpeg',
        title: 'Office Server & Utility Trunking',
        caption: 'Precision wall penetration with industrial foam seal and clean exterior piping drop.',
        highlight: 'Weather-tight building envelope seal against moisture ingress.',
      },
    ],
  },
  {
    id: 'living',
    name: 'Living Space',
    badge: 'Recreation & Lounges',
    tagline: 'Open-Plan Family Living & Entertainment Areas',
    description:
      'Crafted for high-traffic leisure rooms, games lounges, and modern open-plan living areas. High air-volume throw ensures comfortable cooling across large floor spans without disrupting room decor or artwork.',
    recommendedBtu: '18,000 – 24,000 BTU',
    idealFor: 'Billiard rooms, entertainment lounges, open-plan dining & TV rooms',
    specs: [
      { label: 'Airflow Throw', value: 'Up to 15m Long Reach', icon: 'wind' },
      { label: 'Filtration', value: 'High-Density Dust Filter', icon: 'shield' },
      { label: 'Power Savings', value: 'Up to 65% Inverter Cut', icon: 'zap' },
      { label: 'Aesthetic', value: 'Curved Minimal Profile', icon: 'volume' },
    ],
    photos: [
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_12.46.25__1__bb22a6b2.jpeg',
        title: 'Billiard & Games Lounge High-Wall Fitment',
        caption: 'Sleek white AUX unit mounted gracefully above framed pool ball artwork, providing crisp climate control.',
        highlight: 'Even cooling across open entertainment floor area without hot spots.',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_12.46.26_f9573593.jpeg',
        title: 'Entertainment Lounge Perspective',
        caption: 'Complementary aesthetic blend with interior architectural details and mood lighting.',
        highlight: 'Rapid Turbo-Cool mode chills large entertainment spaces in minutes.',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_12.46.25__2__4cd34c9a.jpeg',
        title: 'Precision Room Line-Set Exit',
        caption: 'Tight tolerance mounting with zero exposed copper wiring or untidy hoses.',
        highlight: 'Gravity condensate drain line directed safely to exterior perimeter.',
      },
    ],
  },
  {
    id: 'home',
    name: 'Home',
    badge: 'Master Bedrooms & Living',
    tagline: 'Master Bedrooms & Dual Multi-Split Condensers',
    description:
      'Engineered for deep sleep and tranquil living spaces. Night mode dims display lights and lowers compressor frequency, while exterior dual-stacked condensers save valuable yard footprint.',
    recommendedBtu: '9,000 – 18,000 BTU',
    idealFor: 'Master bedrooms, nurseries, guest suites & compact apartments',
    specs: [
      { label: 'Night Mode', value: 'Auto-Dim & Silent Fan', icon: 'volume' },
      { label: 'Dual Stack', value: 'Vertical Space Saver', icon: 'shield' },
      { label: 'Eco Refrigerant', value: 'Low GWP R32 Eco Gas', icon: 'wind' },
      { label: 'Efficiency', value: 'Class A+++ Inverter', icon: 'zap' },
    ],
    photos: [
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_12.33.46_802e8a6b.jpeg',
        title: 'Master Bedroom High-Wall Installation',
        caption: 'Placed symmetrically above bedroom window, perfectly framing curtains and venetian blinds.',
        highlight: 'Whisper-quiet sleep curve for uninterrupted night rest.',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_12.33.47_39b8d5ad.jpeg',
        title: 'Dual Vertically-Stacked AUX Condensers',
        caption: 'Space-saving exterior vertical mounting supporting separate bedroom and living zones.',
        highlight: 'Individual isolators and anti-rust gold-fin treatment on both units.',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_12.33.48_f83c967f.jpeg',
        title: 'Bedroom Soft LED Temperature Glow',
        caption: 'Minimalist white high-wall unit glowing softly at 18°C during system test.',
        highlight: 'Integrated dehumidifier mode combating Durban coastal humidity.',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_12.33.48__1__620621f6.jpeg',
        title: 'Heavy-Duty Bracket Alignment Detail',
        caption: 'Close-up of exterior mounting showing stainless fixings and anti-vibration pads.',
        highlight: 'Corrosion-resistant powder-coated steel brackets.',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_12.33.48__2__1983cb3e.jpeg',
        title: 'Clean Bedroom Ceiling Clearance',
        caption: 'Engineered top intake clearance ensuring optimal return airflow and high thermal exchange.',
        highlight: 'Easy-access front panel for monthly homeowner dust-filter washing.',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_12.33.48__3__89992ad6.jpeg',
        title: 'Complete Dual Exterior Condenser Array',
        caption: 'Fully finished exterior installation with insulated copper pairs and clean white electrical trunking.',
        highlight: 'Double safety compliance certificates issued upon commissioning.',
      },
    ],
  },
];

interface WorkGalleryProps {
  onSelectSpace?: (spaceName: string, btu: string) => void;
}

export const WorkGallery: React.FC<WorkGalleryProps> = ({ onSelectSpace }) => {
  const [activeCategory, setActiveCategory] = useState<SpaceCategory>('commercial');
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [previewModalSrc, setPreviewModalSrc] = useState<string | null>(null);

  const activeSpace = SPACES.find((s) => s.id === activeCategory) || SPACES[0];
  const photos = activeSpace.photos;
  const currentPhoto = photos[photoIndex] || photos[0];

  const handleCategoryChange = (cat: SpaceCategory) => {
    setActiveCategory(cat);
    setPhotoIndex(0);
  };

  const handlePrev = useCallback(() => {
    setPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [photos.length]);

  const handleRequestSpace = () => {
    if (onSelectSpace) {
      onSelectSpace(activeSpace.name, activeSpace.recommendedBtu);
    } else {
      const bookingElem = document.getElementById('booking');
      if (bookingElem) {
        bookingElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const whatsAppPhotoUrl = generateWhatsAppQuoteUrl({
    serviceType: 'Installation',
    suburb: 'Durban Metro',
    details: `Inquiring about ${activeSpace.name} space setup (${activeSpace.recommendedBtu}). Reference photo: ${currentPhoto.title}`,
    isUrgent: false,
  });

  return (
    <section id="work-gallery" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0284C7]/10 border border-[#0284C7]/25 text-[#0369A1] text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse" />
              <span>Real Work Gallery &amp; Product Spaces</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#042B60] tracking-tight">
              Real Durban Installations Across Every Space
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Browse genuine photographs from our recent South African installations. Explore tailored inverter solutions for commercial properties, corporate offices, recreational living spaces, and family homes.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 font-semibold text-slate-700">
              16 Real Photos
            </span>
            <span>·</span>
            <span>Zero Stock Renders</span>
          </div>
        </div>

        {/* Space Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200 pb-4">
          {SPACES.map((space) => {
            const isActive = space.id === activeCategory;
            return (
              <button
                key={space.id}
                onClick={() => handleCategoryChange(space.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/20 scale-[1.02]'
                    : 'bg-slate-50 text-slate-600 hover:bg-[#0284C7]/10 hover:text-[#0369A1] border border-slate-200'
                }`}
              >
                <span>{space.name}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {space.photos.length} photos
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Slider with Thumbnails */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Primary Featured Image Frame */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xl group">
              <img
                src={currentPhoto.src}
                alt={currentPhoto.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Gradient Scrim for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-[#0284C7] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {activeSpace.badge}
                </span>
                <span className="bg-slate-900/70 backdrop-blur-md text-white/90 text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/20">
                  {photoIndex + 1} of {photos.length}
                </span>
              </div>

              {/* Expand / Zoom Button */}
              <button
                type="button"
                onClick={() => setPreviewModalSrc(currentPhoto.src)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-[#0284C7] transition-colors cursor-pointer"
                title="Enlarge Photo"
                aria-label="Enlarge installation photo"
              >
                <Eye size={16} />
              </button>

              {/* Left / Right Nav Arrows */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-800 flex items-center justify-center hover:bg-white hover:scale-105 transition-all shadow-md cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-800 flex items-center justify-center hover:bg-white hover:scale-105 transition-all shadow-md cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>

              {/* Bottom Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-1">
                  {currentPhoto.title}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-xl">
                  {currentPhoto.caption}
                </p>
                <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#38BDF8] bg-sky-950/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-sky-400/30">
                  <Check size={13} className="text-[#38BDF8]" />
                  <span>{currentPhoto.highlight}</span>
                </div>
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {photos.map((photo, idx) => {
                const isSelected = idx === photoIndex;
                return (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setPhotoIndex(idx)}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0284C7] ring-2 ring-[#0284C7]/30 shadow-md scale-[1.03]'
                        : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-sky-300'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#0284C7]/15 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-500">
                Want this exact clean finish for your space?
              </span>
              <a
                href={whatsAppPhotoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors"
              >
                <MessageSquare size={14} />
                <span>Send this photo on WhatsApp for instant quote</span>
              </a>
            </div>

          </div>

          {/* Right Column: Space Specifications & Product Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="bg-[#F8FBFF] rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
              
              {/* Space Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0284C7] bg-[#0284C7]/10 px-2.5 py-1 rounded-md">
                    {activeSpace.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    Recommended: {activeSpace.recommendedBtu}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#042B60] tracking-tight">
                  {activeSpace.tagline}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  {activeSpace.description}
                </p>
              </div>

              {/* Best Suited For Callout */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Ideal For This Space
                  </span>
                  <span className="block text-xs font-semibold text-[#042B60] mt-0.5">
                    {activeSpace.idealFor}
                  </span>
                </div>
              </div>

              {/* Space Technical Specifications */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                  Space Engineering Specs
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {activeSpace.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-1">
                        {spec.icon === 'shield' && <ShieldCheck size={13} className="text-[#0284C7]" />}
                        {spec.icon === 'zap' && <Zap size={13} className="text-[#0284C7]" />}
                        {spec.icon === 'volume' && <Volume2 size={13} className="text-[#0284C7]" />}
                        {spec.icon === 'wind' && <Wind size={13} className="text-[#0284C7]" />}
                        <span>{spec.label}</span>
                      </div>
                      <span className="text-xs font-bold font-mono text-[#042B60]">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleRequestSpace}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>Request Quote For This Space</span>
                  <ArrowRight size={15} />
                </button>

                <a
                  href={whatsAppPhotoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare size={15} className="text-[#0284C7]" />
                  <span>WhatsApp Technician</span>
                </a>
              </div>

              {/* Trust Callout */}
              <div className="text-[11px] text-slate-500 text-center border-t border-slate-200 pt-3">
                Includes free on-site measuring, pipe sizing &amp; written quote. No hidden costs.
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Photo Modal Preview */}
      {previewModalSrc && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewModalSrc(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewModalSrc}
              alt="Enlarged installation detail"
              className="w-full h-auto max-h-[85vh] object-contain"
            />
            <button
              type="button"
              onClick={() => setPreviewModalSrc(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
