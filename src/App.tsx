import React, { useState, useMemo, useEffect } from 'react';
import { PHOTO_COLLECTION, STUDIO_SERVICES } from './data/photos';
import { PhotoItem, ShootCategory, StudioService } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryFilter } from './components/CategoryFilter';
import { Carousel3D } from './components/Carousel3D';
import { DirectBookingSection } from './components/DirectBookingSection';
import { FolkPackagesSection } from './components/FolkPackagesSection';
import { PortfolioGrid } from './components/PortfolioGrid';
import { ServicesSection } from './components/ServicesSection';
import { GearSection } from './components/GearSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LightboxModal } from './components/LightboxModal';
import { BookingModal } from './components/BookingModal';
import { FloatingContactButtons } from './components/FloatingContactButtons';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ShootCategory>('all');
  const [activePhotoForLightbox, setActivePhotoForLightbox] = useState<PhotoItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preselectedBookingCategory, setPreselectedBookingCategory] = useState<string>('wedding');

  // Filter photos based on active category
  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') return PHOTO_COLLECTION;
    return PHOTO_COLLECTION.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Compute category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ShootCategory, number> = {
      all: PHOTO_COLLECTION.length,
      wedding: 0,
      product: 0,
      model: 0,
      movie: 0,
    };
    PHOTO_COLLECTION.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, []);

  const categoryLabels: Record<ShootCategory, string> = {
    all: 'All Categories',
    wedding: 'Royal Wedding Shoots',
    product: 'Luxury Product Shoots',
    model: 'Fashion & Model Shoots',
    movie: 'Cinematic Movie Shoots',
  };

  const handleOpenBookingWithCategory = (category: string) => {
    setPreselectedBookingCategory(category);
    setIsBookingOpen(true);
  };

  const handleSelectPackageFromSection = (packageName: string, priceTag: string) => {
    setPreselectedBookingCategory(packageName);
    const bookingEl = document.getElementById('direct-booking-section');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsBookingOpen(true);
    }
  };

  const handleSelectService = (service: StudioService) => {
    setPreselectedBookingCategory(service.category);
    setIsBookingOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#c5a059] selection:text-black flex flex-col relative font-sans overflow-x-hidden">
      {/* Elegant Dark Subtle Radial Glow Overlay */}
      <div className="fixed inset-0 opacity-25 pointer-events-none elegant-vignette" />

      {/* Top Studio Navbar */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Cinematic Studio Hero */}
        <HeroSection
          onExplore3D={() => scrollToSection('3d-gallery-stage')}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* Category Pill Filters */}
        <CategoryFilter
          activeCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          counts={categoryCounts}
        />

        {/* 3D Circular Rotating Carousel (Core Requested Feature) */}
        <Carousel3D
          photos={filteredPhotos}
          onSelectPhoto={(photo) => setActivePhotoForLightbox(photo)}
          selectedCategoryName={categoryLabels[selectedCategory]}
        />

        {/* Dedicated Quick WhatsApp Booking Form Directly Below 3D Gallery */}
        <DirectBookingSection initialPackage={preselectedBookingCategory} />

        {/* Pakistani Folk Packages Section (Basic 85K, Standard 135K, Premium 150K) */}
        <FolkPackagesSection
          onSelectPackage={handleSelectPackageFromSection}
        />

        {/* Masonry / Grid Portfolio Showcase */}
        <PortfolioGrid
          photos={filteredPhotos}
          selectedCategory={selectedCategory}
          onSelectPhoto={(photo) => setActivePhotoForLightbox(photo)}
        />

        {/* Studio Services & Shoot Packages */}
        <ServicesSection
          services={STUDIO_SERVICES}
          onSelectService={handleSelectService}
        />

        {/* Cinema Gear & Equipment */}
        <GearSection />

        {/* Verified Client Reviews */}
        <TestimonialsSection />
      </main>

      {/* Floating Quick Action Contacts (WhatsApp & Call) */}
      <FloatingContactButtons onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Fullscreen Photo Lightbox & EXIF Inspector */}
      <LightboxModal
        photo={activePhotoForLightbox}
        photosList={filteredPhotos}
        onClose={() => setActivePhotoForLightbox(null)}
        onNavigate={(photo) => setActivePhotoForLightbox(photo)}
        onBookShoot={handleOpenBookingWithCategory}
      />

      {/* Shoot Booking & WhatsApp Quote Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedCategory={preselectedBookingCategory}
      />

      {/* Studio Location & Footer */}
      <Footer
        onOpenBooking={() => setIsBookingOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat as ShootCategory)}
        onNavigateSection={scrollToSection}
      />
    </div>
  );
}
