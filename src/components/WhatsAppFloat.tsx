import { useEffect, useState } from 'react'
import { whatsappUrl } from '../lib/whatsapp'
import { WhatsAppIcon } from './Icons'
import { cx } from './ui'

/**
 * Sticky WhatsApp action. It stays out of the way until the visitor has read
 * past the hero, then expands to a labelled pill on larger screens.
 */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={whatsappUrl('general')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cx(
        'fixed right-5 bottom-5 z-40 flex items-center gap-2.5 rounded-full bg-whatsapp px-4 py-4 text-white shadow-lg shadow-whatsapp/35 transition-all duration-300 hover:bg-whatsapp-dark sm:px-5',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
      )}
      style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="micro hidden sm:inline">Chat with me</span>
    </a>
  )
}
