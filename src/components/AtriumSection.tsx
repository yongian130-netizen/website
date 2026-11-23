import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { DINING_SPACES } from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

interface AtriumSectionProps {
  onReserveSpace: (spaceName: string) => void;
}

export function AtriumSection({ onReserveSpace }: AtriumSectionProps) {
  const [selectedSpaceId, setSelectedSpaceId] = useState(DINING_SPACES[0].id);

  const activeSpace =
    DINING_SPACES.find((space) => space.id === selectedSpaceId) ?? DINING_SPACES[0];

  return (
    <section id="atrium" className="py-20 sm:py-24 bg-[#141210] text-[#F5F4F0]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/12">
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#C5A059] mb-2">
              Architecture &amp; Dining Spaces
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F5F4F0] text-balance">
              Inside Our Expansive Art Nouveau Heated Atrium
            </h2>
          </div>

          <p className="text-sm text-[#CFC8BE] max-w-md leading-relaxed">
            Designed in homage to Belle Époque Paris, our Midtown flagship pairs soaring
            wrought-iron arches and stained glass with year-round climate comfort.
          </p>
        </div>

        {/* Interactive Space Selector Tabs */}
        <div
          role="tablist"
          aria-label="Dining spaces"
          className="flex items-center gap-2 overflow-x-auto py-6 border-b border-white/10"
        >
          {DINING_SPACES.map((space) => {
            const isActive = space.id === selectedSpaceId;
            return (
              <button
                key={space.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setSelectedSpaceId(space.id)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-[#C5A059] text-[#141210] border-[#C5A059]'
                    : 'bg-transparent text-[#CFC8BE] border-white/15 hover:border-white/40 hover:text-white'
                }`}
              >
                {space.name}
              </button>
            );
          })}
        </div>

        {/* 2-Column Balanced Split with items-stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-10 items-stretch">
          <div className="lg:col-span-7 min-h-[320px] sm:min-h-[400px] lg:min-h-[460px] overflow-hidden border border-white/12 bg-[#1C1815]">
            <ResilientImage
              src={activeSpace.image}
              alt={`${activeSpace.name} at La Grande Boucherie`}
              fallbackTitle={activeSpace.name}
              className="w-full h-full lg:h-full object-cover"
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between border border-white/12 bg-[#1A1714] p-7 sm:p-9">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#C5A059]">
                  {activeSpace.subtitle}
                </p>
                <h3 className="font-display text-3xl font-semibold text-[#F5F4F0] mt-1">
                  {activeSpace.name}
                </h3>
                <p className="text-xs text-[#B8B0A4] mt-1 tabular-nums">
                  {activeSpace.capacity}
                </p>
              </div>

              <p className="text-sm sm:text-[15px] text-[#DED8CE] leading-relaxed">
                {activeSpace.atmosphere}
              </p>

              <ul className="space-y-2.5 pt-2 border-t border-white/10">
                {activeSpace.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-sm text-[#CFC8BE] flex items-baseline gap-2.5"
                  >
                    <span className="text-[#C5A059]" aria-hidden="true">
                      —
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10">
              <button
                type="button"
                onClick={() => onReserveSpace(activeSpace.name)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-medium bg-[#F5F4F0] text-[#141210] hover:bg-[#E4DFD4] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Reserve {activeSpace.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
