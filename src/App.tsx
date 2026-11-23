import { useState } from 'react';
import { ArrowDownRight, Star } from 'lucide-react';
import { Header } from './components/Header';
import { ResilientImage } from './components/ResilientImage';
import { MenuSection } from './components/MenuSection';
import { AtriumSection } from './components/AtriumSection';
import { ReviewsSection } from './components/ReviewsSection';
import { VisitAndReserveSection } from './components/VisitAndReserveSection';
import { ReservationModal } from './components/ReservationModal';
import { IMAGES, RESTAURANT_INFO } from './data/restaurantData';

export default function App() {
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<string>('The Heated Atrium');

  const handleOpenReserve = (spaceName?: string) => {
    if (spaceName) {
      setSelectedSpace(spaceName);
    }
    setReserveModalOpen(true);
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#F5F4F0] text-[#171412]">
      <Header onOpenReserve={() => handleOpenReserve()} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-[#141210] text-[#F5F4F0]">
          <div className="relative min-h-[540px] lg:min-h-[620px] flex items-end">
            <ResilientImage
              src={IMAGES.heroAtrium}
              alt="La Grande Boucherie Art Nouveau heated stained-glass atrium in Midtown Manhattan"
              fallbackTitle="La Grande Boucherie — Heated Atrium"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#141210]/90 via-[#141210]/45 to-[#141210]/25"
              aria-hidden="true"
            />

            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
              <div className="max-w-2xl space-y-5">
                <p className="text-xs sm:text-sm font-medium tracking-[0.14em] uppercase text-[#E0C284]">
                  145 West 53rd Street · Midtown Manhattan
                </p>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold leading-[1.06] tracking-tight text-[#F5F4F0] text-balance">
                  A Parisian Art Nouveau Brasserie Beneath a Heated Glass Atrium
                </h1>

                <p className="text-base sm:text-lg text-[#E6DFD3] leading-relaxed max-w-xl">
                  {RESTAURANT_INFO.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenReserve('The Heated Atrium')}
                    className="px-7 py-3.5 text-sm font-medium bg-[#F5F4F0] text-[#141210] hover:bg-[#E4DFD4] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Reserve a Table
                  </button>

                  <a
                    href="#menu"
                    className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-[#F5F4F0] border border-white/30 hover:border-white hover:bg-white/10 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Explore La Carte</span>
                    <ArrowDownRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Column Architectural Fact Strip */}
          <div className="border-t border-white/15 bg-[#181512]">
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="py-5 sm:pr-6 border-b lg:border-b-0 border-white/12">
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-semibold text-[#F5F4F0] tabular-nums">
                    {RESTAURANT_INFO.rating.toFixed(1)}
                  </span>
                  <Star className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                </div>
                <p className="text-xs text-[#C7BFAF] mt-1 tabular-nums">
                  {RESTAURANT_INFO.reviewCount.toLocaleString()} Guest Reviews
                </p>
              </div>

              <div className="py-5 sm:pl-6 lg:px-6 border-b lg:border-b-0 sm:border-l border-white/12">
                <p className="font-display text-2xl font-semibold text-[#F5F4F0] tabular-nums">
                  Opens 8:00 AM
                </p>
                <p className="text-xs text-[#C7BFAF] mt-1">
                  Breakfast, Lunch, Happy Hour &amp; Dinner
                </p>
              </div>

              <div className="py-5 sm:pr-6 lg:px-6 border-b sm:border-b-0 lg:border-l border-white/12">
                <p className="font-display text-2xl font-semibold text-[#F5F4F0] tabular-nums">
                  {RESTAURANT_INFO.priceRange}
                </p>
                <p className="text-xs text-[#C7BFAF] mt-1">
                  Dine-In · Takeaway · No-Contact Delivery
                </p>
              </div>

              <div className="py-5 sm:pl-6 lg:pl-6 sm:border-l border-white/12">
                <p className="font-display text-2xl font-semibold text-[#F5F4F0]">
                  Midtown West
                </p>
                <p className="text-xs text-[#C7BFAF] mt-1">
                  {RESTAURANT_INFO.hospitalityNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Showcase & Takeaway Drawer */}
        <MenuSection />

        {/* Art Nouveau Atrium & Dining Spaces */}
        <AtriumSection onReserveSpace={(space) => handleOpenReserve(space)} />

        {/* Guest Reviews & Impressions */}
        <ReviewsSection />

        {/* Hours, Popular Times & Direct Reservation */}
        <VisitAndReserveSection preferredSpace={selectedSpace} />
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="bg-[#141210] text-[#C7BFAF] border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-1.5">
            <p className="font-display text-2xl font-semibold text-[#F5F4F0]">
              {RESTAURANT_INFO.name}
            </p>
            <p className="text-xs text-[#A89F91]">
              {RESTAURANT_INFO.address} · {RESTAURANT_INFO.phone} ·{' '}
              {RESTAURANT_INFO.hoursSummary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a href="#menu" className="hover:text-[#F5F4F0] transition-colors">
              Menu
            </a>
            <a href="#atrium" className="hover:text-[#F5F4F0] transition-colors">
              Heated Atrium
            </a>
            <a href="#reviews" className="hover:text-[#F5F4F0] transition-colors">
              Reviews
            </a>
            <a href="#visit" className="hover:text-[#F5F4F0] transition-colors">
              Hours &amp; Directions
            </a>
            <button
              type="button"
              onClick={() => handleOpenReserve()}
              className="text-[#E0C284] hover:text-[#F5F4F0] transition-colors cursor-pointer"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      </footer>

      <ReservationModal
        isOpen={reserveModalOpen}
        initialSpace={selectedSpace}
        onClose={() => setReserveModalOpen(false)}
      />
    </div>
  );
}
