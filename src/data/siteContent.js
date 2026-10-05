/**
 * Commercial content for the homepage, kept in one editable place.
 *
 * Rules for editing:
 * - Set `price` / `startingPrice` only with real, verified numbers (null = not quoted online).
 * - `placeholder: true` marks sample content that must be replaced with real project data.
 * - Images reuse the existing Cloudinary assets already shown on the site.
 */

import { image } from './image'

const IMG = {
  wedding: image.weddingBanner,
  festive: image.festive,
  haldi: image.haldi,
  decor: image.decor,
  phere: image.phere,
  florals: image.florals,
  talambralu: image.talambralu,
  photography: image.photography,
  entry: image.entry,
  stage: image.stage,
  couple: image.couple,
}

export const services = [
  {
    title: 'Wedding Planning',
    text: 'Complete planning and management of your wedding, from the first idea to the final farewell.',
    image: IMG.phere,
  },
  {
    title: 'Wedding Decoration',
    text: 'Themes, florals, lighting and stage décor designed around your story.',
    image: IMG.haldi,
  },
  {
    title: 'Destination Weddings',
    text: 'Venue, travel, stay and full event management at India’s most beautiful destinations.',
    image: IMG.florals,
  },
  {
    title: 'Birthday & Anniversary Events',
    text: 'Milestone celebrations styled with warmth, detail and personal touches.',
    image: IMG.festive,
  },
  {
    title: 'Corporate Events',
    text: 'Conferences, launches, award nights and team events, professionally produced.',
    image: IMG.stage,
  },
  {
    title: 'Engagement & Pre-Wedding',
    text: 'Haldi, mehndi, sangeet, cocktail and engagement functions, beautifully coordinated.',
    image: IMG.talambralu,
  },
  {
    title: 'Artist Management & Entertainment',
    text: 'Bollywood star artists, TV performers, foreign (Russian) artists, live performers and special entries.',
    image: IMG.entry,
  },
  {
    title: 'Honeymoon Packages',
    text: 'Curated romantic getaways to begin your forever, planned end to end.',
    image: IMG.couple,
  },
]

export const eventCategories = [
  {
    title: 'Weddings',
    items: [
      'Traditional Wedding',
      'Luxury Wedding',
      'Destination Wedding',
      'Intimate Wedding',
      'Artist Management',
      'Bollywood Star Artists',
      'Television Performers',
      'Foreign (Russian) Artists',
    ],
  },
  {
    title: 'Wedding Functions',
    items: ['Haldi', 'Mehndi', 'Sangeet', 'Engagement', 'Cocktail', 'Varmala', 'Reception'],
  },
  {
    title: 'Celebrations',
    items: ['Birthday', 'Anniversary', 'Baby Shower', 'Retirement', 'Housewarming'],
  },
  {
    title: 'Corporate',
    items: ['Corporate Events', 'Product Launch', 'Conference', 'Award Ceremony', 'Team Events'],
  },
]

export const packages = [
  {
    name: 'Silver Celebration',
    tier: 'Silver',
    startingPrice: null,
    features: ['Basic decoration', 'Stage setup', 'Basic lighting', 'Event coordination', 'One function'],
  },
  {
    name: 'Gold Celebration',
    tier: 'Gold',
    startingPrice: null,
    features: [
      'Premium decoration',
      'Stage + entry setup',
      'Lighting design',
      'Photography',
      'Entertainment',
      'Event coordination',
    ],
    featured: true,
  },
  {
    name: 'Luxury Celebration',
    tier: 'Luxury',
    startingPrice: null,
    features: [
      'Luxury décor',
      'Complete event planning',
      'Premium production',
      'Guest management',
      'Entertainment',
      'Photography & video',
      'Dedicated event manager',
    ],
  },
]

export const destinations = [
  { name: 'Goa', text: 'Beachside pheras and sunset receptions by the Arabian Sea.', image: IMG.florals },
  { name: 'Udaipur', text: 'Royal palaces and lakeside venues for a regal celebration.', image: IMG.phere },
  { name: 'Jaipur', text: 'Heritage havelis and pink-city grandeur for your big day.', image: IMG.wedding },
  { name: 'Rishikesh', text: 'Serene riverside vows in the foothills of the Himalayas.', image: IMG.festive },
  { name: 'Jaisalmer', text: 'Golden desert forts and starlit celebrations in the dunes.', image: IMG.stage },
  { name: 'Jim Corbett', text: 'Forest resorts and open-air functions surrounded by nature.', image: IMG.decor },
]

export const honeymoonPackages = [
  { name: 'Goa', duration: null, startingPrice: null, text: 'Beaches, shacks and slow sunsets for two.', image: IMG.florals },
  { name: 'Kashmir', duration: null, startingPrice: null, text: 'Houseboats, valleys and snow-kissed views.', image: IMG.phere },
  { name: 'Manali', duration: null, startingPrice: null, text: 'Mountain air, cafés and cosy stays.', image: IMG.festive },
  { name: 'Bali', duration: null, startingPrice: null, text: 'Temples, beaches and private pool villas.', image: IMG.stage },
  { name: 'Maldives', duration: null, startingPrice: null, text: 'Overwater villas and turquoise lagoons.', image: IMG.wedding },
  { name: 'Dubai', duration: null, startingPrice: null, text: 'Skyline dinners, desert safaris and luxury malls.', image: IMG.decor },
]

/** Placeholder case study — replace with a real project when details are available. */
export const caseStudy = {
  placeholder: true,
  title: 'Royal Wedding — Udaipur',
  image: IMG.phere,
  stats: [
    { value: '350', label: 'Guests' },
    { value: '4', label: 'Functions' },
    { value: '3', label: 'Days' },
  ],
  scope: ['Venue', 'Décor', 'Guest Management', 'Entertainment', 'Accommodation', 'Transportation'],
}

export const processSteps = [
  {
    title: 'Tell Us Your Vision',
    text: 'Share your date, location, event type and requirements.',
  },
  {
    title: 'Get Your Customized Plan',
    text: 'We prepare the event concept and a clear quotation.',
  },
  {
    title: 'Finalize the Details',
    text: 'Select décor, venue, entertainment, travel and other services.',
  },
  {
    title: 'We Manage Everything',
    text: 'Our team coordinates the event and every vendor.',
  },
  {
    title: 'Enjoy Your Celebration',
    text: 'You enjoy the moment while we manage the execution.',
  },
]

export const faqs = [
  {
    q: 'How much does wedding planning cost?',
    a: 'Every wedding is different, so we prepare a customized quotation after understanding your functions, guest count and requirements. Share your details and we will send a clear estimate.',
  },
  {
    q: 'Do you provide destination wedding planning?',
    a: 'Yes. We plan destination weddings including venue selection, décor, guest travel, accommodation and on-ground coordination.',
  },
  {
    q: 'Do you provide decoration separately?',
    a: 'Yes. You can book decoration as a standalone service for any function — haldi, mehndi, wedding, reception or any celebration.',
  },
  {
    q: 'Can I customize a package?',
    a: 'Absolutely. Our Silver, Gold and Luxury packages are starting points — every package is tailored to your needs and budget.',
  },
  {
    q: 'Do you provide hotel and travel arrangements?',
    a: 'Yes, we arrange guest travel, transportation and hotel bookings, especially for destination weddings and outstation guests.',
  },
  {
    q: 'How early should I book?',
    a: 'For weddings we recommend booking 3–6 months in advance; for smaller functions, a few weeks is usually enough. Dates in the wedding season fill quickly.',
  },
  {
    q: 'Do you handle multiple wedding functions?',
    a: 'Yes — engagement, haldi, mehndi, sangeet, wedding, varmala and reception can all be managed together by one team.',
  },
  {
    q: 'Can you plan events outside Gwalior?',
    a: 'Yes. We are based in Gwalior and plan events across nearby cities and popular wedding destinations in India.',
  },
  {
    q: 'Do you provide photography and videography?',
    a: 'Yes, professional photography and videography can be included in your package or booked separately.',
  },
  {
    q: 'How do I get a quotation?',
    a: 'Fill the enquiry form, WhatsApp us, or call — share your event details and we will get back with a customized quotation.',
  },
]

export const heroPoints = [
  'Complete Event Planning',
  'Destination Weddings',
  'Premium Decoration',
  'Travel & Honeymoon Packages',
]
