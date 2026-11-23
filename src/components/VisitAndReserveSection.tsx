import { useState } from 'react';
import { Clock, MapPin, Phone, ExternalLink } from 'lucide-react';
import { POPULAR_TIMES, RESTAURANT_INFO } from '../data/restaurantData';
import { ReservationForm } from './ReservationForm';

interface VisitAndReserveSectionProps {
  preferredSpace?: string;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function VisitAndReserveSection({
  preferredSpace,
}: VisitAndReserveSectionProps) {
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [selectedHourIndex, setSelectedHourIndex] = useState(4); // 6p default

  const daySchedule = POPULAR_TIMES[selectedDay] ?? POPULAR_TIMES.Mon;
  const highlightedSlot = daySchedule[selectedHourIndex] ?? daySchedule[0];

  const mapsDirectionUrl =
    'https://www.google.com/maps/search/?api=1&query=La+Grande+Boucherie+145+W+53rd+St+New+York+NY+10019';

  return (
    <section id="visit" className="py-20 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Midtown Location, Hours & Popular Times */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#7A5B26] mb-2">
                Visit Midtown Manhattan
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#171412]">
                Hours, Directions &amp; Hospitality
              </h2>
            </div>

            <div className="divide-y divide-[#171412]/12 border-t border-b border-[#171412]/12">
              <div className="py-4 flex items-start gap-3.5">
                <MapPin className="w-4 h-4 text-[#7A5B26] mt-1 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#171412]">
                    {RESTAURANT_INFO.address}
                  </p>
                  <p className="text-xs text-[#61584F] mt-0.5">
                    {RESTAURANT_INFO.neighborhood} · Plus Code {RESTAURANT_INFO.plusCode}
                  </p>
                  <a
                    href={mapsDirectionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5C1A22] hover:underline mt-2"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="py-4 flex items-start gap-3.5">
                <Clock className="w-4 h-4 text-[#7A5B26] mt-1 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#171412] tabular-nums">
                    Open Daily · 8:00 AM – 12:00 AM
                  </p>
                  <p className="text-xs text-[#61584F] mt-0.5 tabular-nums">
                    Breakfast 8:00 AM · Lunch 11:30 AM · Happy Hour 4:00–6:00 PM · Dinner
                    until Midnight
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-3.5">
                <Phone className="w-4 h-4 text-[#7A5B26] mt-1 shrink-0" />
                <div>
                  <a
                    href={RESTAURANT_INFO.phoneHref}
                    className="text-sm font-medium text-[#171412] hover:text-[#5C1A22] tabular-nums"
                  >
                    {RESTAURANT_INFO.phone}
                  </a>
                  <p className="text-xs text-[#61584F] mt-0.5">
                    {RESTAURANT_INFO.services.join(' · ')} · {RESTAURANT_INFO.priceRange}{' '}
                    per person
                  </p>
                  <p className="text-xs text-[#61584F] mt-0.5">
                    {RESTAURANT_INFO.hospitalityNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Popular Times Chart */}
            <div className="bg-[#FAF9F6] border border-[#171412]/10 p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium text-[#171412]">Popular Times</h3>
                <span className="text-xs text-[#61584F] tabular-nums">
                  {selectedDay} · {highlightedSlot.hour}
                </span>
              </div>

              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                {DAYS.map((day) => {
                  const isActive = day === selectedDay;
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={`px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-[#171412] text-[#F5F4F0]'
                          : 'text-[#61584F] hover:text-[#171412]'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div
                className="grid grid-cols-6 gap-2 items-end h-24 pt-2"
                role="group"
                aria-label={`Hourly dining traffic for ${selectedDay}`}
              >
                {daySchedule.map((slot, index) => {
                  const isSelected = index === selectedHourIndex;
                  return (
                    <button
                      key={slot.hour}
                      type="button"
                      onClick={() => setSelectedHourIndex(index)}
                      aria-label={`${slot.hour}: ${slot.note}`}
                      className="flex flex-col items-center justify-end h-full gap-1.5 group cursor-pointer"
                    >
                      <div className="w-full flex-1 flex items-end">
                        <div
                          className={`w-full transition-colors ${
                            isSelected
                              ? 'bg-[#5C1A22]'
                              : 'bg-[#171412]/20 group-hover:bg-[#8C6A2E]'
                          }`}
                          style={{ height: `${slot.level}%` }}
                        />
                      </div>
                      <span
                        className={`text-[11px] tabular-nums ${
                          isSelected ? 'font-semibold text-[#171412]' : 'text-[#61584F]'
                        }`}
                      >
                        {slot.hour}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-[#4A433D] pt-2 border-t border-[#171412]/8">
                <span className="font-medium text-[#171412] tabular-nums">
                  {highlightedSlot.hour}:
                </span>{' '}
                {highlightedSlot.note}
              </p>
            </div>
          </div>

          {/* Right Column: Embedded Table Reservation Card */}
          <div className="lg:col-span-7 bg-[#FAF9F6] border border-[#171412]/12 p-6 sm:p-9 space-y-6">
            <div className="border-b border-[#171412]/10 pb-5">
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#7A5B26] mb-1.5">
                Table Reservations
              </p>
              <h3 className="font-display text-3xl font-semibold text-[#171412]">
                Reserve Your Table in the Atrium
              </h3>
              <p className="text-sm text-[#4A433D] mt-1">
                Book breakfast, lunch, happy hour, or evening steakhouse seating directly
                with our Midtown host desk.
              </p>
            </div>

            <ReservationForm initialSpace={preferredSpace} />
          </div>
        </div>
      </div>
    </section>
  );
}
