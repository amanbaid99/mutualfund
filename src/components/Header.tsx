import { useEffect, useState } from 'react'
import { site } from '../config/site'
import { cx, WhatsAppButton } from './ui'
import { CloseIcon, MenuIcon } from './Icons'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#calculators', label: 'Calculators' },
  { href: '#credentials', label: 'Credentials' },
  { href: '#about', label: 'About' },
  { href: '#faq', label: 'FAQ' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent the page behind the mobile menu from scrolling while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition duration-300',
        scrolled || open
          ? 'border-b border-mist-200 bg-white/90 backdrop-blur-lg'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-6 lg:px-8">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="wordmark text-2xl leading-none sm:text-[1.75rem]"
        >
          AMAN&nbsp;BAID
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="micro text-navy-700 transition hover:text-navy-500"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={`tel:${site.contact.phoneDial}`}
            className="micro hidden rounded-btn bg-mist-100 px-4 py-2.5 text-navy-800 transition hover:bg-mist-200 sm:inline-flex"
          >
            Call
          </a>
          <WhatsAppButton
            intent="consultation"
            label="Get in touch"
            size="sm"
            className="hidden sm:inline-flex"
          />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-btn border border-mist-200 text-navy-800 transition hover:bg-mist-100 lg:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-mist-200 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-6" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-mist-100 py-4 text-base font-medium text-navy-800 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <WhatsAppButton
              intent="consultation"
              label="Get in touch on WhatsApp"
              variant="whatsapp"
              className="mt-4 mb-2 w-full"
            />
          </nav>
        </div>
      )}
    </header>
  )
}
