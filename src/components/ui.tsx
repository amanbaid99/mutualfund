import type { ReactNode } from 'react'
import { WhatsAppIcon } from './Icons'
import { whatsappUrl, type WhatsappIntent } from '../lib/whatsapp'

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export function Section({
  id,
  children,
  className,
  tone = 'white',
}: {
  id?: string
  children: ReactNode
  className?: string
  tone?: 'white' | 'mist' | 'navy'
}) {
  const tones = {
    white: 'bg-white',
    mist: 'bg-mist-50',
    navy: 'bg-navy-900 text-mist-200',
  } as const

  return (
    <section id={id} className={cx('scroll-mt-24 py-20 sm:py-28', tones[tone], className)}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={cx('micro', dark ? 'text-navy-400' : 'text-slate-400')}>{children}</p>
  )
}

/**
 * The reference's signature section header: eyebrow + two-line heading on the
 * left, supporting paragraph pushed right, closed by a hairline rule.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  dark,
  rule = true,
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  dark?: boolean
  rule?: boolean
}) {
  return (
    <div className={cx(rule && 'border-b pb-8', dark ? 'border-white/12' : 'border-mist-200')}>
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-12">
        <div>
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
          <h2
            className={cx(
              'mt-3 max-w-xl text-3xl leading-[1.12] font-medium text-balance sm:text-[2.6rem]',
              dark && 'text-white',
            )}
          >
            {title}
          </h2>
        </div>
        {description && (
          <p
            className={cx(
              'max-w-md text-sm leading-relaxed text-pretty lg:pb-2',
              dark ? 'text-navy-400' : 'text-slate-500',
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export function Card({
  children,
  className,
  hover,
}: {
  children: ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <div
      className={cx(
        'rounded-card bg-mist-100 p-6',
        hover && 'transition duration-300 hover:-translate-y-1 hover:bg-mist-200/70',
        className,
      )}
    >
      {children}
    </div>
  )
}

type ButtonVariant = 'navy' | 'ghost' | 'whatsapp' | 'light'
type ButtonSize = 'sm' | 'md' | 'lg'

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2.5 gap-2',
  md: 'px-6 py-3 gap-2.5',
  lg: 'px-8 py-4 gap-2.5',
}

const buttonVariants: Record<ButtonVariant, string> = {
  navy: 'bg-navy-800 text-white hover:bg-navy-700',
  ghost: 'bg-mist-100 text-navy-800 hover:bg-mist-200',
  light: 'bg-white text-navy-800 hover:bg-mist-100',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-dark',
}

const buttonBase =
  'micro inline-flex items-center justify-center rounded-btn transition duration-200 hover:-translate-y-px active:translate-y-0'

export function Button({
  children,
  href,
  onClick,
  variant = 'navy',
  size = 'md',
  className,
  type = 'button',
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  type?: 'button' | 'submit'
}) {
  const classes = cx(buttonBase, buttonSizes[size], buttonVariants[variant], className)
  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}

/**
 * The primary conversion element. Every instance carries an `intent` so the
 * WhatsApp draft matches what the visitor was reading when they clicked.
 */
export function WhatsAppButton({
  intent = 'general',
  extra,
  label = 'Connect on WhatsApp',
  size = 'md',
  variant = 'navy',
  className,
}: {
  intent?: WhatsappIntent
  extra?: string
  label?: string
  size?: ButtonSize
  variant?: ButtonVariant
  className?: string
}) {
  return (
    <a
      href={whatsappUrl(intent, extra)}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        buttonBase,
        buttonSizes[size],
        buttonVariants[variant],
        variant === 'whatsapp' && 'shadow-lg shadow-whatsapp/25',
        className,
      )}
    >
      <WhatsAppIcon className={size === 'lg' ? 'h-4.5 w-4.5' : 'h-4 w-4'} />
      {label}
    </a>
  )
}

/** Big number over a small grey label, divided by hairlines. */
export function StatStrip({
  items,
  className,
}: {
  items: ReadonlyArray<{ value: string; label: string }>
  className?: string
}) {
  return (
    <dl className={cx('grid grid-cols-2 sm:grid-cols-3', className)}>
      {items.map((item, index) => (
        <div
          key={item.label}
          className={cx(
            'px-5 py-4',
            index > 0 && 'sm:border-l sm:border-navy-800/12',
            index % 2 === 1 && 'border-l border-navy-800/12 sm:border-l',
          )}
        >
          <dt className="sr-only">{item.label}</dt>
          <dd>
            <span className="font-display block text-xl font-semibold text-navy-800 sm:text-2xl">
              {item.value}
            </span>
            <span className="mt-0.5 block text-xs text-slate-500">{item.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function Stars({ className }: { className?: string }) {
  return (
    <div className={cx('flex gap-0.5 text-gold-400', className)} aria-label="5 out of 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
          <path d="M10 1.8l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L2.2 7.5l5.4-.8L10 1.8z" />
        </svg>
      ))}
    </div>
  )
}
