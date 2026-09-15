import { useEffect, useRef, useState } from 'react'
import { site } from '../config/site'
import { cx } from './ui'
import { CheckIcon } from './Icons'

const CopyIcon = (props: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="9" y="9" width="11.5" height="11.5" rx="2" />
    <path d="M5.5 15H4.5a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1H14a1 1 0 0 1 1 1v1" />
  </svg>
)

/**
 * Copies the ARN so a visitor can paste it straight into AMFI's search box
 * instead of retyping a six digit number from another tab.
 *
 * AMFI's lookup is a server-rendered form, so we cannot prefill it from a URL.
 * Copy-then-paste is the reliable alternative.
 */
export function CopyArn({
  value = site.credentials.arn,
  className,
  variant = 'dark',
}: {
  value?: string
  className?: string
  variant?: 'dark' | 'light'
}) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Older browsers, and any context where the async clipboard is blocked.
      const field = document.createElement('textarea')
      field.value = value
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      try {
        document.execCommand('copy')
      } catch {
        return
      } finally {
        document.body.removeChild(field)
      }
    }

    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={copy}
      // Announces the change to screen readers without moving focus.
      aria-live="polite"
      className={cx(
        'micro inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3 transition',
        variant === 'dark'
          ? 'border border-white/20 text-white hover:bg-white/10'
          : 'bg-mist-100 text-navy-800 hover:bg-mist-200',
        className,
      )}
    >
      {copied ? (
        <>
          <CheckIcon className="h-3.5 w-3.5" />
          Copied {value}
        </>
      ) : (
        <>
          <CopyIcon className="h-3.5 w-3.5" />
          Copy ARN
        </>
      )}
    </button>
  )
}
