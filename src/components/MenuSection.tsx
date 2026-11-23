import { useState } from 'react';
import { Minus, Plus, ShoppingBag, Wine, X, Check } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuCategoryId,
  MenuItem,
} from '../data/restaurantData';
import { ResilientImage } from './ResilientImage';

interface BagItem {
  item: MenuItem;
  quantity: number;
}

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('starters');
  const [serviceMode, setServiceMode] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [expandedPairingId, setExpandedPairingId] = useState<string | null>(null);
  const [bag, setBag] = useState<Record<string, BagItem>>({});
  const [bagOpen, setBagOpen] = useState(false);
  const [fulfillmentType, setFulfillmentType] = useState<'takeaway' | 'delivery'>('takeaway');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderError, setOrderError] = useState('');
  const [orderConfirmedId, setOrderConfirmedId] = useState<string | null>(null);

  const currentCategory =
    MENU_CATEGORIES.find((c) => c.id === activeCategory) ?? MENU_CATEGORIES[0];

  const visibleItems = MENU_ITEMS.filter((item) => {
    if (item.category !== activeCategory) return false;
    if (serviceMode === 'takeaway') return item.takeawayEligible;
    return true;
  });

  const bagEntries = Object.values(bag);
  const totalBagCount = bagEntries.reduce((sum, entry) => sum + entry.quantity, 0);
  const bagSubtotal = bagEntries.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );

  const addToBag = (item: MenuItem) => {
    setOrderConfirmedId(null);
    setBag((prev) => {
      const existing = prev[item.id];
      return {
        ...prev,
        [item.id]: {
          item,
          quantity: existing ? existing.quantity + 1 : 1,
        },
      };
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setBag((prev) => {
      const existing = prev[itemId];
      if (!existing) return prev;
      const nextQty = existing.quantity + delta;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return {
        ...prev,
        [itemId]: { ...existing, quantity: nextQty },
      };
    });
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError('');

    if (!customerName.trim()) {
      setOrderError('Please enter your name for the order.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 7) {
      setOrderError('Please enter a valid contact phone number.');
      return;
    }
    if (fulfillmentType === 'delivery' && !deliveryAddress.trim()) {
      setOrderError('Please enter a Midtown or Manhattan delivery address.');
      return;
    }

    const code = `LGB-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderConfirmedId(code);
    setBag({});
  };

  return (
    <section id="menu" className="py-20 sm:py-24 border-b border-[#171412]/10">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header + Service Switch */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#171412]/12">
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#7A5B26] mb-2">
              La Carte &amp; Service
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#171412] text-balance">
              Classic Parisian Fare from Morning Café to Midnight Steakhouse
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Interactive Service Mode Switch */}
            <div
              role="group"
              aria-label="Menu service mode"
              className="inline-flex items-center p-1 bg-[#E9E6DE] border border-[#171412]/10"
            >
              <button
                type="button"
                onClick={() => setServiceMode('dine-in')}
                className={`px-4 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  serviceMode === 'dine-in'
                    ? 'bg-[#171412] text-[#F5F4F0]'
                    : 'text-[#4A433D] hover:text-[#171412]'
                }`}
              >
                Dine-In Menu
              </button>
              <button
                type="button"
                onClick={() => setServiceMode('takeaway')}
                className={`px-4 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  serviceMode === 'takeaway'
                    ? 'bg-[#171412] text-[#F5F4F0]'
                    : 'text-[#4A433D] hover:text-[#171412]'
                }`}
              >
                Takeaway &amp; Delivery
              </button>
            </div>

            {totalBagCount > 0 && (
              <button
                type="button"
                onClick={() => setBagOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium bg-[#5C1A22] text-[#F5F4F0] hover:bg-[#471319] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="tabular-nums">Order Bag ({totalBagCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Menu categories"
          className="flex items-center gap-2 overflow-x-auto py-6 border-b border-[#171412]/10"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-[#171412] text-[#F5F4F0] border-[#171412]'
                    : 'bg-transparent text-[#4A433D] border-[#171412]/15 hover:border-[#171412]/40 hover:text-[#171412]'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Asymmetric 2-Column Menu Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-10 items-start">
          {/* Left Sticky Feature Photo */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="aspect-[4/3] overflow-hidden bg-[#1C1815] border border-[#171412]/10">
              <ResilientImage
                src={currentCategory.featureImage}
                alt={currentCategory.featureCaption}
                fallbackTitle={currentCategory.label}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>

            <div className="flex items-baseline justify-between gap-4 pt-1">
              <p className="font-display text-xl font-medium text-[#171412]">
                {currentCategory.featureCaption}
              </p>
              <span className="text-xs text-[#61584F] whitespace-nowrap shrink-0 tabular-nums">
                {currentCategory.serviceHours}
              </span>
            </div>

            <p className="text-sm text-[#4A433D] leading-relaxed">
              {serviceMode === 'dine-in'
                ? 'Prepared to order in our open French brasserie kitchen. Select any dish below to view our sommelier wine or apéritif pairing.'
                : 'Available for Midtown pickup or no-contact delivery. Dishes requiring tableside assembly are reserved for dine-in service.'}
            </p>
          </div>

          {/* Right Parisian Menu Ledger */}
          <div className="lg:col-span-7 divide-y divide-[#171412]/12 border-t border-b border-[#171412]/12">
            {visibleItems.map((item) => {
              const inBagQty = bag[item.id]?.quantity ?? 0;
              const isPairingOpen = expandedPairingId === item.id;

              return (
                <article key={item.id} className="py-6 first:pt-5 last:pb-5">
                  <div className="flex items-start justify-between gap-6">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                        <h3 className="font-display text-2xl font-semibold text-[#171412]">
                          {item.name}
                        </h3>
                        <span className="text-sm italic font-display text-[#6B6258]">
                          {item.frenchSubtitle}
                        </span>
                      </div>

                      {item.note && (
                        <p className="text-xs font-medium text-[#7A5B26] tracking-wide">
                          {item.note}
                        </p>
                      )}

                      <p className="text-sm sm:text-[15px] text-[#4A433D] leading-relaxed max-w-xl pt-0.5">
                        {item.description}
                      </p>
                    </div>

                    <div className="text-right shrink-0 space-y-2">
                      <div className="font-display text-2xl font-semibold text-[#171412] tabular-nums">
                        ${item.price}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Footer Row per Dish */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    {item.pairing ? (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedPairingId(isPairingOpen ? null : item.id)
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5C1A22] hover:text-[#3A0E14] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Wine className="w-3.5 h-3.5" />
                        <span>
                          {isPairingOpen ? 'Hide Sommelier Note' : 'Sommelier Pairing'}
                        </span>
                      </button>
                    ) : (
                      <span />
                    )}

                    {serviceMode === 'takeaway' && (
                      <div className="flex items-center gap-2">
                        {inBagQty > 0 ? (
                          <div className="inline-flex items-center border border-[#171412]/20 bg-[#FAF9F6]">
                            <button
                              type="button"
                              aria-label={`Remove one ${item.name}`}
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center text-[#171412] hover:bg-[#171412]/5 cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-medium tabular-nums">
                              {inBagQty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Add one ${item.name}`}
                              onClick={() => addToBag(item)}
                              className="w-8 h-8 flex items-center justify-center text-[#171412] hover:bg-[#171412]/5 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addToBag(item)}
                            className="px-3.5 py-1.5 text-xs font-medium border border-[#171412] text-[#171412] hover:bg-[#171412] hover:text-[#F5F4F0] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Add to Order
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {isPairingOpen && item.pairing && (
                    <div className="mt-3 pt-3 border-t border-[#171412]/8 text-xs text-[#4A433D]">
                      <span className="font-medium text-[#171412]">Recommended Pour:</span>{' '}
                      {item.pairing}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Takeaway & No-Contact Delivery Drawer */}
      {bagOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label="Takeaway and delivery order bag"
        >
          <div className="w-full max-w-md bg-[#F5F4F0] text-[#171412] h-full flex flex-col border-l border-[#171412]/15">
            <div className="px-6 py-5 border-b border-[#171412]/10 flex items-center justify-between">
              <div>
                <h3 className="font-display text-2xl font-semibold">Your Takeaway Order</h3>
                <p className="text-xs text-[#61584F] mt-0.5">
                  145 W 53rd St · Kitchen Pickup or No-Contact Delivery
                </p>
              </div>
              <button
                type="button"
                onClick={() => setBagOpen(false)}
                aria-label="Close order bag"
                className="w-10 h-10 flex items-center justify-center hover:bg-[#171412]/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {orderConfirmedId ? (
                <div className="border border-[#171412]/15 bg-[#FAF9F6] p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#23533A] font-medium text-sm">
                    <Check className="w-4 h-4" />
                    <span>Order Confirmed · {orderConfirmedId}</span>
                  </div>
                  <p className="text-sm text-[#4A433D] leading-relaxed">
                    Thank you, {customerName}. Our Midtown kitchen has received your{' '}
                    {fulfillmentType === 'delivery'
                      ? 'no-contact delivery'
                      : 'takeaway pickup'}{' '}
                    request and will text updates to{' '}
                    <span className="tabular-nums font-medium text-[#171412]">
                      {customerPhone}
                    </span>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setOrderConfirmedId(null);
                      setBagOpen(false);
                    }}
                    className="mt-2 px-4 py-2 text-xs font-medium bg-[#171412] text-[#F5F4F0] cursor-pointer"
                  >
                    Return to Menu
                  </button>
                </div>
              ) : bagEntries.length === 0 ? (
                <p className="text-sm text-[#61584F]">
                  Your takeaway bag is currently empty. Switch to Takeaway &amp; Delivery on
                  the menu to add dishes.
                </p>
              ) : (
                <>
                  {/* Fulfillment Mode Toggle */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFulfillmentType('takeaway')}
                      className={`py-2.5 px-3 text-xs font-medium border cursor-pointer ${
                        fulfillmentType === 'takeaway'
                          ? 'bg-[#171412] text-[#F5F4F0] border-[#171412]'
                          : 'bg-transparent text-[#4A433D] border-[#171412]/20'
                      }`}
                    >
                      Takeaway Pickup (20 min)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFulfillmentType('delivery')}
                      className={`py-2.5 px-3 text-xs font-medium border cursor-pointer ${
                        fulfillmentType === 'delivery'
                          ? 'bg-[#171412] text-[#F5F4F0] border-[#171412]'
                          : 'bg-transparent text-[#4A433D] border-[#171412]/20'
                      }`}
                    >
                      No-Contact Delivery
                    </button>
                  </div>

                  {/* Line Items */}
                  <div className="divide-y divide-[#171412]/10 border-t border-b border-[#171412]/10">
                    {bagEntries.map(({ item, quantity }) => (
                      <div
                        key={item.id}
                        className="py-3.5 flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#171412] truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#61584F] tabular-nums">
                            ${item.price} each
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="inline-flex items-center border border-[#171412]/20">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              aria-label={`Decrease ${item.name}`}
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#171412]/5 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs tabular-nums">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => addToBag(item)}
                              aria-label={`Increase ${item.name}`}
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#171412]/5 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="w-12 text-right text-sm font-medium tabular-nums">
                            ${item.price * quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Guest Checkout Fields */}
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="bag-name"
                        className="block text-xs font-medium text-[#4A433D] mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        id="bag-name"
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Claire Laurent"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#171412]/20 focus:outline-none focus:border-[#5C1A22]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="bag-phone"
                        className="block text-xs font-medium text-[#4A433D] mb-1"
                      >
                        Mobile Phone
                      </label>
                      <input
                        id="bag-phone"
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="(212) 555-0148"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#171412]/20 focus:outline-none focus:border-[#5C1A22]"
                      />
                    </div>
                    {fulfillmentType === 'delivery' && (
                      <div>
                        <label
                          htmlFor="bag-address"
                          className="block text-xs font-medium text-[#4A433D] mb-1"
                        >
                          Manhattan Drop-off Address
                        </label>
                        <input
                          id="bag-address"
                          type="text"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="Street, Suite / Apt, Leave with doorman"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#171412]/20 focus:outline-none focus:border-[#5C1A22]"
                        />
                      </div>
                    )}

                    {orderError && (
                      <p className="text-xs font-medium text-[#8F1D2C]">{orderError}</p>
                    )}

                    <div className="pt-2 border-t border-[#171412]/10 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#4A433D]">Estimated Subtotal</span>
                        <span className="font-semibold text-base tabular-nums">
                          ${bagSubtotal}
                        </span>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 px-4 text-sm font-medium bg-[#5C1A22] text-[#F5F4F0] hover:bg-[#471319] transition-colors cursor-pointer"
                      >
                        Place {fulfillmentType === 'delivery' ? 'Delivery' : 'Takeaway'} Order
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
