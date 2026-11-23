export const RESTAURANT_INFO = {
  name: 'La Grande Boucherie',
  tagline: 'Parisian Art Nouveau Brasserie & Steakhouse',
  description:
    'Polished French restaurant in an expansive Art Nouveau-style space featuring a soaring stained-glass heated atrium, dry-aged butcher cuts, and classic Parisian table service.',
  address: '145 W 53rd St, New York, NY 10019',
  neighborhood: 'Midtown West · Between 6th & 7th Ave',
  plusCode: 'Q279+3M New York, USA',
  phone: '+1 212-510-7714',
  phoneHref: 'tel:+12125107714',
  website: 'boucherieus.com',
  priceRange: '$50–100',
  rating: 4.6,
  reviewCount: 11946,
  hoursSummary: 'Daily · 8:00 AM – 12:00 AM',
  services: ['Dine-in', 'Takeaway', 'No-contact delivery'],
  hospitalityNote: 'LGBTQ+ friendly · Heated year-round atrium',
};

export const IMAGES = {
  heroAtrium: '/src/assets/images/hero_brasserie_atrium_1795428198844.jpg',
  steakFrites: '/src/assets/images/dish_steak_frites_1795428199433.jpg',
  onionSoupEscargot: '/src/assets/images/dish_onion_soup_escargot_1795428198999.jpg',
  desserts: '/src/assets/images/dish_creme_brulee_pastry_1795428199120.jpg',
  cocktails: '/src/assets/images/cocktail_bar_floral_1795428199198.jpg',
};

export type MenuCategoryId = 'starters' | 'mains' | 'brunch' | 'desserts';

export interface MenuItem {
  id: string;
  category: MenuCategoryId;
  name: string;
  frenchSubtitle: string;
  description: string;
  price: number;
  note?: string;
  pairing?: string;
  takeawayEligible: boolean;
}

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  serviceHours: string;
  featureImage: string;
  featureCaption: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'starters',
    label: "Hors d'Oeuvres & Raw Bar",
    serviceHours: '11:30 AM – Midnight',
    featureImage: IMAGES.onionSoupEscargot,
    featureCaption: 'Soupe à l’Oignon Gratinée & Escargots de Bourgogne',
  },
  {
    id: 'mains',
    label: "Butcher's Cuts & Mains",
    serviceHours: '11:30 AM – Midnight',
    featureImage: IMAGES.steakFrites,
    featureCaption: 'Prime Dry-Aged Rib-Eye Steak Frites with Au Poivre Sauce',
  },
  {
    id: 'brunch',
    label: 'Morning & Brunch',
    serviceHours: '8:00 AM – 3:00 PM',
    featureImage: IMAGES.heroAtrium,
    featureCaption: 'Morning sunlight beneath the heated stained-glass atrium',
  },
  {
    id: 'desserts',
    label: 'Patisserie & Cocktails',
    serviceHours: 'All Day · Happy Hour 4:00 – 6:00 PM',
    featureImage: IMAGES.desserts,
    featureCaption: 'Torched Vanilla Bean Crème Brûlée & Praline Paris-Brest',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // Starters & Raw Bar
  {
    id: 'french-onion-soup',
    category: 'starters',
    name: 'French Onion Soup with Melted Cheese',
    frenchSubtitle: 'Soupe à l’Oignon Gratinée',
    description:
      'Caramelized sweet onions simmered in rich veal jus, sourdough crouton, and bubbling cave-aged Gruyère crust.',
    price: 22,
    note: 'House Signature · 350+ guest mentions',
    pairing: 'Côtes du Rhône, Saint-Cosme',
    takeawayEligible: true,
  },
  {
    id: 'escargot',
    category: 'starters',
    name: 'Escargots de Bourgogne',
    frenchSubtitle: 'Half-Dozen Burgundy Snails',
    description:
      'Roasted in sizzling garlic, shallot, and flat-leaf parsley Pernod butter with warm country baguette.',
    price: 24,
    note: 'House Signature · 265+ guest mentions',
    pairing: 'Chablis Premier Cru, Domaine William Fèvre',
    takeawayEligible: true,
  },
  {
    id: 'steak-tartare',
    category: 'starters',
    name: 'Steak Tartare',
    frenchSubtitle: 'Tartare de Boeuf Classique',
    description:
      'Hand-cut prime beef tenderloin seasoned tableside with capers, shallots, Dijon, quail egg yolk, and toasted brioche.',
    price: 29,
    note: 'Prepared to Order',
    pairing: 'Sancerre Rosé, Domaine Vacheron',
    takeawayEligible: false,
  },
  {
    id: 'tuna-carpaccio',
    category: 'starters',
    name: 'Yellowfin Tuna Carpaccio',
    frenchSubtitle: 'Carpaccio de Thon Rouge',
    description:
      'Thinly sliced sushi-grade yellowfin dressed with Meyer lemon olive oil, crispy shallots, avocado mousse, and micro herbs.',
    price: 27,
    note: 'Popular Choice',
    pairing: 'Champagne Brut Réserve, Billecart-Salmon',
    takeawayEligible: false,
  },
  {
    id: 'fresh-oysters',
    category: 'starters',
    name: 'Fresh East & West Coast Oysters',
    frenchSubtitle: 'Huîtres Fraîches (Half Dozen)',
    description:
      'Chilled over crushed ice with shallot champagne mignonette, grated fresh horseradish, and charred lemon.',
    price: 26,
    note: 'Raw Bar · Daily Selection',
    pairing: 'Muscadet Sèvre et Maine',
    takeawayEligible: false,
  },

  // Mains & Butcher's Cuts
  {
    id: 'steak-frites',
    category: 'mains',
    name: 'Steak Frites',
    frenchSubtitle: 'Bavette ou Onglet Grillé',
    description:
      'Char-grilled prime hanger steak sliced with crisp hand-cut pommes frites, watercress, and classic sauce au poivre.',
    price: 46,
    note: 'House Signature · 182+ guest mentions',
    pairing: 'Bordeaux Margaux, Château Labégorce',
    takeawayEligible: true,
  },
  {
    id: 'rib-eye-steak',
    category: 'mains',
    name: 'Prime Dry-Aged Rib-Eye Steak',
    frenchSubtitle: 'Côte de Boeuf Sans Os (16 oz)',
    description:
      'Dry-aged 35 days in our butcher room, seared over hardwood embers with bone marrow herb butter and crispy shallots.',
    price: 74,
    note: "Butcher's Reserve",
    pairing: 'Pauillac, Réserve de la Comtesse',
    takeawayEligible: true,
  },
  {
    id: 'sirloin-steak',
    category: 'mains',
    name: 'Prime New York Sirloin Steak',
    frenchSubtitle: 'Contre-Filet Grillé (14 oz)',
    description:
      'Center-cut prime sirloin finished with roasted garlic, thyme, and choice of Béarnaise or Bordelaise reduction.',
    price: 62,
    note: 'Dry-Aged 28 Days',
    pairing: 'Châteauneuf-du-Pape, Château de Beaucastel',
    takeawayEligible: true,
  },
  {
    id: 'beef-bourguignon',
    category: 'mains',
    name: 'Beef Bourguignon',
    frenchSubtitle: 'Boeuf Bourguignon Traditionnel',
    description:
      'Slow-braised beef short rib simmered in a balanced Pinot Noir red wine reduction with pearl onions, lardons, and creamed potatoes.',
    price: 44,
    note: 'Guest Favorite',
    pairing: 'Gevrey-Chambertin, Louis Jadot',
    takeawayEligible: true,
  },

  // Morning & Brunch
  {
    id: 'omelette-au-choix',
    category: 'brunch',
    name: 'Omelette Au Choix',
    frenchSubtitle: 'Fine Herb French Omelette',
    description:
      'Tender pasture-raised three-egg rolled omelette with choice of Gruyère, wild mushrooms, smoked salmon, or jambon de Paris.',
    price: 25,
    note: 'Popular Morning Dish · Served from 8 AM',
    pairing: 'Freshly Pressed Café Crème',
    takeawayEligible: true,
  },
  {
    id: 'eggs-benedict',
    category: 'brunch',
    name: 'Eggs Benedict à la Boucherie',
    frenchSubtitle: 'Oeufs Bénédicte sur Brioche',
    description:
      'Poached organic eggs on toasted butter brioche with Parisian ham or smoked Atlantic salmon and warm tarragon Hollandaise.',
    price: 28,
    note: 'Morning & Weekend Brunch',
    pairing: 'Bellini au Pêche Blanche',
    takeawayEligible: true,
  },
  {
    id: 'warm-bread-basket',
    category: 'brunch',
    name: 'Artisanal Viennoiserie & Bread Service',
    frenchSubtitle: 'Panier de Boulangerie',
    description:
      'Warm country sourdough, flaky butter croissants, and pain au chocolat served with cultured Normandy butter and preserves.',
    price: 16,
    note: 'Baked Fresh Every Morning',
    pairing: 'Single-Origin Espresso',
    takeawayEligible: true,
  },

  // Patisserie & Cocktails
  {
    id: 'creme-brulee',
    category: 'desserts',
    name: 'Crème Brûlée',
    frenchSubtitle: 'Vanille de Madagascar',
    description:
      'Silky Madagascar vanilla bean custard beneath a crackling caramelized raw cane sugar crust.',
    price: 18,
    note: 'Popular Dessert',
    pairing: 'Sauternes, Château Rieussec',
    takeawayEligible: true,
  },
  {
    id: 'paris-brest',
    category: 'desserts',
    name: 'Paris-Brest',
    frenchSubtitle: 'Pâte à Choux & Praliné Noisette',
    description:
      'Crisp choux pastry crown piped with whipped Piedmont hazelnut praline mousseline and toasted slivered almonds.',
    price: 19,
    note: 'Popular Dessert',
    pairing: 'Hennessy X.O. Digestif',
    takeawayEligible: true,
  },
  {
    id: 'chocolate-profiteroles',
    category: 'desserts',
    name: 'Chocolate Profiteroles with Cream Filling',
    frenchSubtitle: 'Profiteroles au Chocolat Valrhona',
    description:
      'Warm choux puffs filled with Madagascar vanilla bean crème glacée and finished tableside with hot 70% Valrhona fudge.',
    price: 20,
    note: 'Served Tableside',
    pairing: '20-Year Tawny Port',
    takeawayEligible: false,
  },
  {
    id: 'floral-pomegranate-cocktail',
    category: 'desserts',
    name: 'Jardin de Grenade Cocktail',
    frenchSubtitle: 'Floral Botanical Coupe',
    description:
      'French botanical gin, pressed ruby pomegranate, elderflower liqueur, fresh lime, and edible violet blossom garnish.',
    price: 23,
    note: 'Happy Hour Feature · 4:00 – 6:00 PM',
    pairing: 'Crafted at the Belle Époque Bar',
    takeawayEligible: false,
  },
];

export interface DiningSpace {
  id: string;
  name: string;
  subtitle: string;
  capacity: string;
  atmosphere: string;
  highlights: string[];
  image: string;
}

export const DINING_SPACES: DiningSpace[] = [
  {
    id: 'atrium',
    name: 'The Heated Atrium',
    subtitle: 'Soaring Stained-Glass Conservatory',
    capacity: 'Up to 160 seated guests',
    atmosphere:
      'Our centerpiece Art Nouveau gallery beneath a heated vaulted glass skylight, surrounded by wrought-iron balconies, lush palms, and warm brass chandeliers.',
    highlights: [
      'Heated year-round climate control',
      'Natural daylight & evening candlelit ambiance',
      'Ideal for brunch, date night, and theatre dining',
    ],
    image: IMAGES.heroAtrium,
  },
  {
    id: 'dining-hall',
    name: 'Main Brasserie Hall',
    subtitle: 'Carved Mahogany & Mosaic Tilework',
    capacity: 'Up to 110 seated guests',
    atmosphere:
      'Anchored by white-linen bistro tables, tufted leather banquettes, antique Parisian mirrors, and direct sightlines to our dry-aging butcher display.',
    highlights: [
      'Classic Parisian brasserie bustle',
      'Adjacent to the open kitchen pass',
      'Full breakfast, lunch & dinner service',
    ],
    image: IMAGES.steakFrites,
  },
  {
    id: 'bar',
    name: 'The Belle Époque Bar',
    subtitle: 'Aged Brass Counter & Apothecary Cellar',
    capacity: '32 bar & lounge seats',
    atmosphere:
      'An expansive zinc and aged-brass bar featuring absinthe fountains, rare French brandies, and signature botanical cocktails poured until midnight.',
    highlights: [
      'Daily Happy Hour from 4:00 PM – 6:00 PM',
      'Walk-in raw bar & oyster service',
      'Full à la carte dining menu available',
    ],
    image: IMAGES.cocktails,
  },
  {
    id: 'mezzanine',
    name: 'Private Mezzanine Salons',
    subtitle: 'Upper Balcony Overlooking the Atrium',
    capacity: '14 to 65 private guests',
    atmosphere:
      'Elevated private and semi-private salons framed by intricate wrought-iron railings, bespoke sommelier pairings, and dedicated service captains.',
    highlights: [
      'Custom prix-fixe French menus',
      'Dedicated sommelier wine curation',
      'Private reception & seated banquet layouts',
    ],
    image: IMAGES.onionSoupEscargot,
  },
];

export interface GuestReview {
  id: string;
  author: string;
  credentials: string;
  rating: number;
  date: string;
  topics: string[];
  title: string;
  excerpt: string;
}

export const REVIEW_TOPICS = [
  { id: 'all', label: 'All Reviews', count: 11946 },
  { id: 'french-onion-soup', label: 'French Onion Soup', count: 350 },
  { id: 'escargot', label: 'Escargot', count: 265 },
  { id: 'steak-frites', label: 'Steak Frites', count: 182 },
  { id: 'happy-hour', label: 'Happy Hour', count: 101 },
];

export const RATING_BREAKDOWN = [
  { stars: 5, percent: 76 },
  { stars: 4, percent: 15 },
  { stars: 3, percent: 5 },
  { stars: 2, percent: 2 },
  { stars: 1, percent: 2 },
];

export const INITIAL_REVIEWS: GuestReview[] = [
  {
    id: 'rev-1',
    author: 'Eva Mestdagh',
    credentials: 'Local Guide · 28 reviews · 175 photos',
    rating: 5,
    date: '6 days ago',
    topics: ['french-onion-soup', 'escargot', 'steak-frites'],
    title: 'Fantastic French dining in a stunning Art Deco setting',
    excerpt:
      'We had a wonderful evening at La Grande Boucherie. The food was truly exquisite, offering authentic, high-quality French cuisine. The French onion soup and escargot set the tone, followed by perfectly cooked steak frites and attentive service.',
  },
  {
    id: 'rev-2',
    author: 'Christine — Foodie',
    credentials: 'Local Guide · 206 reviews · 1,519 photos',
    rating: 5,
    date: '2 weeks ago',
    topics: ['french-onion-soup', 'steak-frites'],
    title: 'Grand Parisian decor and impeccable lunch service',
    excerpt:
      'The Parisian decor was stunning and grand. The service was impeccable and professional. We came here for lunch and the food was authentic and perfectly cooked. We had the beef bourguignon simmered in a rich balanced red wine reduction.',
  },
  {
    id: 'rev-3',
    author: 'Luis Canuto',
    credentials: 'Local Guide · 366 reviews · 432 photos',
    rating: 5,
    date: 'a week ago',
    topics: ['happy-hour', 'escargot'],
    title: 'A breathtaking heated atrium find in Midtown Manhattan',
    excerpt:
      "La Grande Boucherie is simply stunning. The moment you walk in, you're impressed by the beauty of the place—the soaring ironwork architecture, the gorgeous heated courtyard, and floral cocktails during happy hour.",
  },
];

export interface HourlyBusyness {
  hour: string;
  level: number; // 0 to 100
  note: string;
}

export const POPULAR_TIMES: Record<string, HourlyBusyness[]> = {
  Mon: [
    { hour: '8a', level: 24, note: 'Quiet morning café & omelette service' },
    { hour: '10a', level: 32, note: 'Leisurely brunch in the atrium' },
    { hour: '12p', level: 68, note: 'Midtown business lunch crowd' },
    { hour: '3p', level: 38, note: 'Relaxed afternoon patisserie' },
    { hour: '6p', level: 82, note: 'Lively dinner & pre-theatre rush' },
    { hour: '9p', level: 64, note: 'Evening dining & cocktails' },
  ],
  Tue: [
    { hour: '8a', level: 22, note: 'Quiet morning breakfast' },
    { hour: '10a', level: 30, note: 'Calm atrium seating' },
    { hour: '12p', level: 74, note: 'Peak Midtown lunch' },
    { hour: '3p', level: 35, note: 'No wait for tables' },
    { hour: '6p', level: 85, note: 'Busy dinner service' },
    { hour: '9p', level: 68, note: 'Vibrant late dining' },
  ],
  Wed: [
    { hour: '8a', level: 25, note: 'Morning coffee & viennoiserie' },
    { hour: '10a', level: 36, note: 'Comfortable seating' },
    { hour: '12p', level: 78, note: 'Popular lunch hour' },
    { hour: '3p', level: 42, note: 'Early happy hour arrivals' },
    { hour: '6p', level: 88, note: 'Broadway matinee & dinner peak' },
    { hour: '9p', level: 72, note: 'Lively evening bar' },
  ],
  Thu: [
    { hour: '8a', level: 26, note: 'Morning breakfast from 8 AM' },
    { hour: '10a', level: 38, note: 'Calm morning atrium' },
    { hour: '12p', level: 80, note: 'Active lunch service' },
    { hour: '3p', level: 48, note: 'Pre-happy hour crowd' },
    { hour: '6p', level: 92, note: 'High demand · Reserve ahead' },
    { hour: '9p', level: 78, note: 'Bustling late dinner' },
  ],
  Fri: [
    { hour: '8a', level: 28, note: 'Fresh pastries & omelettes' },
    { hour: '10a', level: 44, note: 'Warm atrium seating' },
    { hour: '12p', level: 84, note: 'Full lunch room' },
    { hour: '3p', level: 54, note: 'Early weekend celebrations' },
    { hour: '6p', level: 98, note: 'Peak Friday evening · Book early' },
    { hour: '9p', level: 88, note: 'Vibrant late-night brasserie' },
  ],
  Sat: [
    { hour: '8a', level: 34, note: 'Early weekend breakfast' },
    { hour: '10a', level: 72, note: 'Popular Parisian brunch' },
    { hour: '12p', level: 92, note: 'Peak weekend brunch' },
    { hour: '3p', level: 65, note: 'Afternoon oysters & wine' },
    { hour: '6p', level: 100, note: 'Peak Saturday dinner · Reserve ahead' },
    { hour: '9p', level: 90, note: 'Full evening atrium' },
  ],
  Sun: [
    { hour: '8a', level: 30, note: 'Peaceful Sunday morning' },
    { hour: '10a', level: 76, note: 'Signature Sunday brunch' },
    { hour: '12p', level: 94, note: 'Lively atrium brunch' },
    { hour: '3p', level: 62, note: 'Afternoon champagne & dessert' },
    { hour: '6p', level: 84, note: 'Warm Sunday supper' },
    { hour: '9p', level: 58, note: 'Relaxed late dinner' },
  ],
};
