/**
 * Single source of truth for all brand and contact details shown on the site.
 * Replace these placeholder values with the real business details before launch.
 */
export const company = {
  name: 'Dream City Event Gwalior',
  wordmark: 'Dream City',
  wordmarkSuffix: 'Event Gwalior',
  tagline: 'Events & Celebrations',
  phone: '+91 88276 88283',
  instagram: '', // e.g. 'https://instagram.com/yourhandle' — hidden until the real account is added
  address: {
    line1: '1st Floor, Shop No. 2, Main Road, near Gagan Plaza, above Sky Gold Hair Salon',
    line2: 'Kalpi Bridge Colony, Mahaveer, Morar, Gwalior, Madhya Pradesh 474005',
  },
}

export const companyPhoneHref = `tel:${company.phone.replace(/[^\d+]/g, '')}`
export const companyAddressText = `${company.address.line1}, ${company.address.line2}`
export const whatsappHref = `https://wa.me/${String(import.meta.env.VITE_PHONE_NUMBER ?? '').replace(/[^\d]/g, '')}`
