import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustMetrics } from './components/TrustMetrics';
import { AboutSection } from './components/AboutSection';
import { NavyFeatures } from './components/NavyFeatures';
import { ServicesSection } from './components/ServicesSection';
import { CaseStudies } from './components/CaseStudies';
import { ServiceAreas } from './components/ServiceAreas';
import { EnergyEstimator } from './components/EnergyEstimator';
import { BrandsSection } from './components/BrandsSection';
import { BookingSection } from './components/BookingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedService, setSelectedService] = useState('Installation');
  const [selectedSuburb, setSelectedSuburb] = useState('Umhlanga');
  const [quoteNotes, setQuoteNotes] = useState('');

  const scrollToBooking = (service?: string, suburb?: string, notes?: string) => {
    if (service) setSelectedService(service);
    if (suburb) setSelectedSuburb(suburb);
    if (notes) setQuoteNotes(notes);

    const bookingElem = document.getElementById('booking');
    if (bookingElem) {
      bookingElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEmergencyClick = () => {
    setSelectedService('Repair');
    setQuoteNotes('URGENT EMERGENCY: Need immediate technician dispatch for cooling failure in Durban.');
    scrollToBooking('Repair');
  };

  const handleAreaSelect = (areaName: string) => {
    setSelectedSuburb(areaName);
    scrollToBooking(undefined, areaName);
  };

  const handlePreFillBooking = (details: { service: string; notes: string }) => {
    setSelectedService(details.service);
    setQuoteNotes(details.notes);
    scrollToBooking(details.service, undefined, details.notes);
  };

  const handleSelectCaseStudy = (title: string, suburbFullName: string) => {
    setSelectedService('Installation');
    setSelectedSuburb(suburbFullName);
    const noteText = `Interested in setup: ${title} (${suburbFullName})`;
    setQuoteNotes(noteText);
    scrollToBooking('Installation', suburbFullName, noteText);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0A1322] font-sans antialiased selection:bg-[#1B5299] selection:text-white">
      {/* Top Navigation */}
      <Navbar onOpenBooking={(s) => scrollToBooking(s)} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section with Compact Sizing Tool */}
        <Hero
          onOpenBooking={(s, notes) => scrollToBooking(s, undefined, notes)}
          onEmergencyClick={handleEmergencyClick}
        />

        {/* 2. Trust Metrics Strip */}
        <TrustMetrics />

        {/* 3. Durban Climate Engineering & About Section */}
        <AboutSection onOpenBooking={(s) => scrollToBooking(s)} />

        {/* 4. Dark Navy 4-Feature Banner */}
        <NavyFeatures />

        {/* 5. Services & Solutions Grid with Residential / Commercial Toggles */}
        <ServicesSection onBookService={(s) => scrollToBooking(s)} />

        {/* 6. Real Durban Installation Case Studies & Proof */}
        <CaseStudies onRequestSetup={handleSelectCaseStudy} />

        {/* 7. Durban Service Area Map & Interactive Suburb Selector */}
        <ServiceAreas onSelectArea={handleAreaSelect} />

        {/* 7. Interactive Room Sizing & Inverter Energy Calculator */}
        <EnergyEstimator onPreFillBooking={handlePreFillBooking} />

        {/* 8. Authorized Brand Partnerships */}
        <BrandsSection />

        {/* 9. Interactive Booking Engine & Instant Estimate */}
        <BookingSection
          initialService={selectedService}
          initialSuburb={selectedSuburb}
          initialNotes={quoteNotes}
        />

        {/* 10. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
