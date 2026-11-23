import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenReserve: () => void;
}

export function Header({ onOpenReserve }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Menu', href: '#menu' },
    { label: 'Atrium', href: '#atrium' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Visit', href: '#visit' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5F4F0]/95 backdrop-blur-md border-b border-[#171412]/10">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#171412] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5C1A22]"
        >
          La Grande Boucherie
        </a>

        {/* Zone 2: Concise single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A433D]"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#171412] border-b border-transparent hover:border-[#8C6A2E] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5C1A22]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary CTA + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenReserve}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-[#F5F4F0] bg-[#5C1A22] hover:bg-[#471319] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C1A22]"
          >
            Reserve a Table
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#171412] hover:bg-[#171412]/5 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#171412]/10 bg-[#F5F4F0] px-5 py-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="block py-2.5 text-base font-medium text-[#171412] border-b border-[#171412]/8"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReserve();
              }}
              className="w-full py-3 px-4 text-sm font-medium text-[#F5F4F0] bg-[#5C1A22] hover:bg-[#471319] transition-colors cursor-pointer"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
