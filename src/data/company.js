/**
 * Single source of truth for all brand and contact details shown on the site.
 * Replace these placeholder values with the real business details before launch.
 */
export const company = {
  name: 'Elegance Events',
  wordmark: 'Elegance',
  wordmarkSuffix: 'Events',
  tagline: 'Events & Celebrations',
  email: 'hello@example.com',
  phone: '+91 00000 00000',
  address: {
    line1: '123 Celebration Avenue, Suite 4',
    line2: 'Your City, Your State 000000',
  },
}

export const companyPhoneHref = `tel:${company.phone.replace(/[^\d+]/g, '')}`
export const companyEmailHref = `mailto:${company.email}`
export const companyAddressText = `${company.address.line1}, ${company.address.line2}`
