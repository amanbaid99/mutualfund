import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { Credentials } from './components/Credentials'
import { Calculators } from './components/calculators'
import { Process } from './components/Process'
import { Faq } from './components/Faq'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { WhatsAppFloat } from './components/WhatsAppFloat'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-btn focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <About />
        <Services />
        <Credentials />
        <Calculators />
        <Process />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
