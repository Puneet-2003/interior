import { company, companyPhoneHref, whatsappHref } from '../data/company'

/** Sticky bottom action bar for mobile — always one tap from converting. */
export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-cream-deep bg-cream/95 backdrop-blur-md lg:hidden">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat with Dream City Events Gwalior on WhatsApp"
        className="flex items-center justify-center gap-2 bg-rose-dust py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-cream"
      >
        WhatsApp
      </a>
      <a
        href={companyPhoneHref}
        aria-label={`Call Dream City Events Gwalior at ${company.phone}`}
        className="flex items-center justify-center gap-2 border-x border-cream-deep py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink"
      >
        Call
      </a>
      <a
        href="#contact"
        aria-label="Request a customized event quotation from Dream City Events"
        className="flex items-center justify-center gap-2 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-rose-dust"
      >
        Get Quote
      </a>
    </div>
  )
}
