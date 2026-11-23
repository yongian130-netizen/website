import { useEffect, useState } from 'react';
import { Calendar, Check, Clock, Users } from 'lucide-react';
import { DINING_SPACES } from '../data/restaurantData';

interface ReservationFormProps {
  initialSpace?: string;
  onSuccessClose?: () => void;
}

const SERVICE_PERIODS = [
  {
    id: 'breakfast',
    label: 'Breakfast',
    times: ['8:00 AM', '8:45 AM', '9:30 AM', '10:30 AM'],
  },
  {
    id: 'lunch',
    label: 'Lunch',
    times: ['12:00 PM', '12:45 PM', '1:30 PM', '2:15 PM'],
  },
  {
    id: 'happy-hour',
    label: 'Happy Hour',
    times: ['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'],
  },
  {
    id: 'dinner',
    label: 'Dinner',
    times: ['6:00 PM', '6:45 PM', '7:30 PM', '8:15 PM', '9:00 PM'],
  },
] as const;

export function ReservationForm({
  initialSpace,
  onSuccessClose,
}: ReservationFormProps) {
  const [partySize, setPartySize] = useState('2 Guests');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [periodId, setPeriodId] = useState<(typeof SERVICE_PERIODS)[number]['id']>('dinner');
  const [selectedTime, setSelectedTime] = useState('7:30 PM');
  const [seatingSpace, setSeatingSpace] = useState(
    initialSpace || DINING_SPACES[0].name
  );
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);

  useEffect(() => {
    if (initialSpace) {
      setSeatingSpace(initialSpace);
    }
  }, [initialSpace]);

  const activePeriod =
    SERVICE_PERIODS.find((p) => p.id === periodId) ?? SERVICE_PERIODS[3];

  const handlePeriodChange = (newId: (typeof SERVICE_PERIODS)[number]['id']) => {
    setPeriodId(newId);
    const period = SERVICE_PERIODS.find((p) => p.id === newId);
    if (period) {
      setSelectedTime(period.times[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!guestName.trim()) {
      setErrorMessage('Please enter your full name for the host stand.');
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail.trim());
    if (!emailValid) {
      setErrorMessage('Please enter a valid email address for confirmation.');
      return;
    }

    if (guestPhone.replace(/\D/g, '').length < 7) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }

    setConfirmationCode(`RES-${Math.floor(10000 + Math.random() * 90000)}`);
  };

  if (confirmationCode) {
    return (
      <div className="bg-[#FAF9F6] border border-[#171412]/12 p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2 text-sm font-medium text-[#23533A]">
          <Check className="w-4 h-4" />
          <span>Table Confirmed · Reference {confirmationCode}</span>
        </div>

        <div>
          <h3 className="font-display text-3xl font-semibold text-[#171412]">
            Nous avons hâte de vous accueillir
          </h3>
          <p className="text-sm text-[#4A433D] mt-1">
            A reservation confirmation has been sent to{' '}
            <span className="font-medium text-[#171412]">{guestEmail}</span>.
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-4 py-4 border-t border-b border-[#171412]/10 text-sm">
          <div>
            <dt className="text-xs text-[#61584F]">Guest Name</dt>
            <dd className="font-medium text-[#171412] mt-0.5">{guestName}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#61584F]">Party Size</dt>
            <dd className="font-medium text-[#171412] mt-0.5 tabular-nums">{partySize}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#61584F]">Date &amp; Time</dt>
            <dd className="font-medium text-[#171412] mt-0.5 tabular-nums">
              {date} · {selectedTime}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#61584F]">Seating Preference</dt>
            <dd className="font-medium text-[#171412] mt-0.5">{seatingSpace}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setConfirmationCode(null)}
            className="px-4 py-2.5 text-xs font-medium border border-[#171412]/25 text-[#171412] hover:bg-[#171412]/5 cursor-pointer"
          >
            Modify Reservation
          </button>
          {onSuccessClose && (
            <button
              type="button"
              onClick={onSuccessClose}
              className="px-5 py-2.5 text-xs font-medium bg-[#171412] text-[#F5F4F0] hover:bg-[#2B2520] cursor-pointer"
            >
              Done
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Party, Date, Seating */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div>
          <label
            htmlFor="res-party"
            className="flex items-center gap-1.5 text-xs font-medium text-[#4A433D] mb-1.5"
          >
            <Users className="w-3.5 h-3.5 text-[#7A5B26]" />
            <span>Party Size</span>
          </label>
          <select
            id="res-party"
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-[#FAF9F6] border border-[#171412]/20 text-[#171412] focus:outline-none focus:border-[#5C1A22] tabular-nums cursor-pointer"
          >
            {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6 Guests', '8 Guests', '10+ Private Salon'].map(
              (option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label
            htmlFor="res-date"
            className="flex items-center gap-1.5 text-xs font-medium text-[#4A433D] mb-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-[#7A5B26]" />
            <span>Date</span>
          </label>
          <input
            id="res-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-[#FAF9F6] border border-[#171412]/20 text-[#171412] focus:outline-none focus:border-[#5C1A22] tabular-nums"
          />
        </div>

        <div>
          <label
            htmlFor="res-space"
            className="flex items-center gap-1.5 text-xs font-medium text-[#4A433D] mb-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-[#7A5B26]" />
            <span>Dining Area</span>
          </label>
          <select
            id="res-space"
            value={seatingSpace}
            onChange={(e) => setSeatingSpace(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-[#FAF9F6] border border-[#171412]/20 text-[#171412] focus:outline-none focus:border-[#5C1A22] cursor-pointer"
          >
            {DINING_SPACES.map((space) => (
              <option key={space.id} value={space.name}>
                {space.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Service Period & Time Slots */}
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-2">
          {SERVICE_PERIODS.map((period) => {
            const isActive = period.id === periodId;
            return (
              <button
                key={period.id}
                type="button"
                onClick={() => handlePeriodChange(period.id)}
                className={`px-3 py-1.5 text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#171412] text-[#F5F4F0] border-[#171412]'
                    : 'bg-transparent text-[#4A433D] border-[#171412]/15 hover:border-[#171412]/40'
                }`}
              >
                {period.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          {activePeriod.times.map((time) => {
            const isSelected = time === selectedTime;
            return (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`px-3.5 py-2 text-xs font-medium border tabular-nums transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#5C1A22] text-[#F5F4F0] border-[#5C1A22]'
                    : 'bg-[#FAF9F6] text-[#171412] border-[#171412]/20 hover:border-[#5C1A22]'
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        <div className="sm:col-span-2">
          <label
            htmlFor="res-name"
            className="block text-xs font-medium text-[#4A433D] mb-1"
          >
            Guest Full Name
          </label>
          <input
            id="res-name"
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Camille Delacroix"
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#171412]/20 focus:outline-none focus:border-[#5C1A22]"
          />
        </div>

        <div>
          <label
            htmlFor="res-email"
            className="block text-xs font-medium text-[#4A433D] mb-1"
          >
            Email Address
          </label>
          <input
            id="res-email"
            type="email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            placeholder="guest@example.com"
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#171412]/20 focus:outline-none focus:border-[#5C1A22]"
          />
        </div>

        <div>
          <label
            htmlFor="res-phone"
            className="block text-xs font-medium text-[#4A433D] mb-1"
          >
            Phone Number
          </label>
          <input
            id="res-phone"
            type="tel"
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            placeholder="(212) 555-0192"
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#171412]/20 focus:outline-none focus:border-[#5C1A22]"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="res-notes"
            className="block text-xs font-medium text-[#4A433D] mb-1"
          >
            Dietary Notes or Occasion (Optional)
          </label>
          <input
            id="res-notes"
            type="text"
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            placeholder="Anniversary table, pre-theatre seating, or allergies"
            className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#171412]/20 focus:outline-none focus:border-[#5C1A22]"
          />
        </div>
      </div>

      {errorMessage && (
        <p className="text-xs font-medium text-[#8F1D2C]">{errorMessage}</p>
      )}

      <button
        type="submit"
        className="w-full py-3.5 px-6 text-sm font-medium bg-[#5C1A22] text-[#F5F4F0] hover:bg-[#471319] transition-colors cursor-pointer"
      >
        Confirm Table Reservation
      </button>
    </form>
  );
}
