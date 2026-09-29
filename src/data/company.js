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
  address: {
    line1: '1st Floor, Shop No. 2, Main Road, near Gagan Plaza, above Sky Gold Hair Salon',
    line2: 'Kalpi Bridge Colony, Mahaveer, Morar, Gwalior, Madhya Pradesh 474005',
  },
}

export const companyPhoneHref = `tel:${company.phone.replace(/[^\d+]/g, '')}`
export const companyAddressText = `${company.address.line1}, ${company.address.line2}`
