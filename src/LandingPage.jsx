import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Functions } from './components/Functions'
import { Stories } from './components/Stories'
import { Testimonials } from './components/Testimonials'
import { Inquiry } from './components/Inquiry'
import { ContactFooter } from './components/ContactFooter'

export function LandingPage() {
  return (
    <div className="min-h-svh bg-cream font-sans text-ink antialiased">
      <Header />
      <main>
        <Hero />
        <About />
        <Functions />
        <Stories />
        <Testimonials />
        <Inquiry />
      </main>
      <ContactFooter />
    </div>
  )
}
