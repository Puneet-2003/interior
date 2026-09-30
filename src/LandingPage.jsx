import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { TrustStrip } from './components/TrustStrip'
import { Services } from './components/Services'
import { EventCategories } from './components/EventCategories'
import { Packages } from './components/Packages'
import { Destinations } from './components/Destinations'
import { Honeymoon } from './components/Honeymoon'
import { About } from './components/About'
import { Stories } from './components/Stories'
import { Functions } from './components/Functions'
import { CaseStudy } from './components/CaseStudy'
import { Process } from './components/Process'
import { Testimonials } from './components/Testimonials'
import { InstagramStrip } from './components/InstagramStrip'
import { Faq } from './components/Faq'
import { FinalCta } from './components/FinalCta'
import { Inquiry } from './components/Inquiry'
import { ContactFooter } from './components/ContactFooter'
import { MobileCta } from './components/MobileCta'

export function LandingPage() {
  return (
    <div className="min-h-svh bg-cream font-sans text-ink antialiased">
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <EventCategories />
        <Packages />
        <Destinations />
        <Honeymoon />
        <About />
        <Stories />
        <Functions />
        <CaseStudy />
        <Process />
        <Testimonials />
        <InstagramStrip />
        <Faq />
        <FinalCta />
        <Inquiry />
      </main>
      <ContactFooter />
      <MobileCta />
    </div>
  )
}
