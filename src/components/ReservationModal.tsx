import { X } from 'lucide-react';
import { ReservationForm } from './ReservationForm';

interface ReservationModalProps {
  isOpen: boolean;
  initialSpace?: string;
  onClose: () => void;
}

export function ReservationModal({
  isOpen,
  initialSpace,
  onClose,
}: ReservationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Reserve a table at La Grande Boucherie"
    >
      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#F5F4F0] text-[#171412] border border-[#171412]/15 p-6 sm:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4 border-b border-[#171412]/10 pb-4">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#7A5B26]">
              145 W 53rd St · New York
            </p>
            <h2 className="font-display text-3xl font-semibold text-[#171412] mt-1">
              Reserve a Table
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close reservation dialog"
            className="w-10 h-10 flex items-center justify-center hover:bg-[#171412]/5 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ReservationForm initialSpace={initialSpace} onSuccessClose={onClose} />
      </div>
    </div>
  );
}
