import { image, images } from './image'

/**
 * SEO-optimized default client testimonials for Dream City Events Gwalior.
 * Incorporates primary local & pan-India search keywords naturally in client reviews,
 * event titles, and service tags while also supporting custom owner-added testimonials
 * via testimonialStore.
 */
export const defaultTestimonials = [
  {
    id: 'testimonial-gwalior-royal-wedding',
    names: 'Aarav & Ananya Sharma',
    event: 'Royal Wedding Planning & Mandap Decor — City Centre, Gwalior',
    keywordTag: 'Best Wedding Planner in Gwalior',
    date: 'February 2026 • Gwalior, MP',
    rating: 5,
    imageUrl: images.testimonials?.[0] || image.phere,
    quote:
      'Hiring Dream City Events Gwalior was the best decision we made for our wedding. Truly the best wedding planner in Gwalior! From the royal phere mandap decoration and imported floral stage decor in City Centre Gwalior to seamless guest hospitality and grand varmala entry, their event management team handled all four functions effortlessly.',
  },
  {
    id: 'testimonial-udaipur-destination-wedding',
    names: 'Vikramaditya & Roshni Tomar',
    event: 'Luxury Palace Destination Wedding — Udaipur (From Gwalior)',
    keywordTag: 'Destination Wedding Planner',
    date: 'January 2026 • Udaipur & Gwalior',
    rating: 5,
    imageUrl: images.testimonials?.[1] || image.weddingBanner,
    quote:
      'We wanted a royal destination wedding in Udaipur planned right from our hometown Gwalior, and Dream City Events delivered beyond our wildest dreams. As a premier destination wedding planner, they managed palace venue booking, luxury guest accommodation, travel logistics, and breathtaking wedding decoration with zero stress for our families.',
  },
  {
    id: 'testimonial-artist-management-sangeet',
    names: 'Kabir & Meera Rathore',
    event: 'Grand Sangeet, Cocktail & Celebrity Artist Night — Morar, Gwalior',
    keywordTag: 'Artist Management Gwalior',
    date: 'December 2025 • Morar, Gwalior',
    rating: 5,
    imageUrl: images.testimonials?.[2] || image.entry,
    quote:
      'For our Sangeet and cocktail night in Morar, Gwalior, Dream City Events arranged top-tier artist management including a live Bollywood star singer, television anchor, and foreign Russian performers. The concert-grade sound, intelligent stage lighting, and royal couple entry made it the most talked-about celebration in Gwalior!',
  },
  {
    id: 'testimonial-haldi-mehndi-decorators',
    names: 'Siddharth & Pooja Gupta',
    event: 'Haldi, Mehndi & Ring Ceremony Decoration — Lashkar, Gwalior',
    keywordTag: 'Wedding Decorators Morar Gwalior',
    date: 'November 2025 • Lashkar, Gwalior',
    rating: 5,
    imageUrl: images.testimonials?.[3] || image.haldi,
    quote:
      'If you are looking for the most creative wedding decorators in Morar and Lashkar Gwalior, look no further than Dream City Events. Our Phoolon Ki Holi Haldi setup, vibrant Bohemian Mehndi lounge, and engagement stage decoration in Gwalior looked straight out of a luxury magazine within our customized Gold wedding package.',
  },
  {
    id: 'testimonial-corporate-event-management',
    names: 'Rajeshwar Scindia & Horizon Group',
    event: 'Annual Corporate Conference & Award Gala — Gwalior',
    keywordTag: 'Corporate Event Management Gwalior',
    date: 'October 2025 • Gwalior, MP',
    rating: 5,
    imageUrl: images.testimonials?.[4] || image.stage,
    quote:
      'Dream City Events is hands-down the most professional corporate event management company in Gwalior. They executed our 400-delegate annual business summit, product launch LED stage fabrication, audiovisual production, and VIP gala catering with military precision and refined luxury.',
  },
  {
    id: 'testimonial-reception-honeymoon-package',
    names: 'Dr. Prateek & Neha Bhadoria',
    event: 'Grand Reception Stage Decor & Maldives Honeymoon — Thatipur, Gwalior',
    keywordTag: 'Stage Decoration & Honeymoon Packages Gwalior',
    date: 'March 2026 • Thatipur, Gwalior',
    rating: 5,
    imageUrl: images.testimonials?.[5] || image.couple,
    quote:
      'From our grand wedding reception stage decoration and cinematic wedding photography in Thatipur, Gwalior to our curated romantic honeymoon package in the Maldives, Dream City Events Gwalior took care of every single detail under one roof. Transparent pricing, warm hospitality, and 10/10 event management!',
  },
]

/** @deprecated use testimonialStore */
export const testimonials = defaultTestimonials
