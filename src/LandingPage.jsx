import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { HowItWorks } from './components/HowItWorks'
import { Gallery } from './components/Gallery'
import { ContactFooter } from './components/ContactFooter'

export function LandingPage() {
  return (
    <div className="min-h-svh bg-[#0a0a0a] font-sans text-zinc-100 antialiased">
      <Header />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Gallery />
      </main>
      <ContactFooter />
    </div>
  )
}
