import type { ReactNode } from 'react'
import { formatINR } from '../../lib/format'
import { WhatsAppButton } from '../ui'
import type { WhatsappIntent } from '../../lib/whatsapp'

/** Chart colours, kept in one place so every calculator reads identically. */
export const CHART = {
  invested: '#8998b5',
  gain: '#2c3a54',
  investedClass: 'bg-navy-400',
  gainClass: 'bg-navy-800',
} as const

export function DonutSplit({ invested, gain }: { invested: number; gain: number }) {
  const total = Math.max(invested, 0) + Math.max(gain, 0)
  const gainShare = total > 0 ? Math.max(gain, 0) / total : 0

  // Hand-drawn SVG ring: one stroked circle per slice, sized by dash offset.
  // A chart library for a single donut would cost ~400 kB of JavaScript.
  const radius = 42
  const circumference = 2 * Math.PI * radius

  return (
    <div className="relative mx-auto h-44 w-44">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={CHART.invested}
          strokeWidth="14"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={CHART.gain}
          strokeWidth="14"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - gainShare)}
          strokeLinecap="butt"
          className="transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 grid place-content-center text-center">
        <span className="font-display text-2xl font-semibold text-navy-800">
          {Math.round(gainShare * 100)}%
        </span>
        <span className="mt-0.5 text-[0.68rem] text-slate-400">is returns</span>
      </div>
    </div>
  )
}

/**
 * Shared results shell: a headline figure, a breakdown, and a WhatsApp CTA
 * that carries the numbers the visitor just produced into the chat.
 */
export function ResultPanel({
  headlineLabel,
  headline,
  children,
  chart,
  intent,
  whatsappSummary,
  footnote,
}: {
  headlineLabel: string
  headline: number
  children: ReactNode
  chart?: ReactNode
  intent: WhatsappIntent
  whatsappSummary: string
  footnote?: ReactNode
}) {
  return (
    <div className="flex h-full flex-col">
      {chart}

      <div className="mt-4 rounded-btn bg-navy-800 px-5 py-5 text-center">
        <p className="micro text-navy-400">{headlineLabel}</p>
        <p className="font-display mt-1.5 text-3xl font-semibold tracking-tight text-white tabular-nums sm:text-[2.1rem]">
          {formatINR(headline)}
        </p>
      </div>

      <div className="mt-2">{children}</div>

      <div className="mt-auto pt-6">
        <WhatsAppButton
          intent={intent}
          extra={whatsappSummary}
          label="Discuss these numbers"
          variant="whatsapp"
          className="w-full"
        />
        <p className="mt-3 text-center text-[0.7rem] leading-relaxed text-slate-400">
          {footnote ?? 'Your numbers are sent along, so we can start from here.'}
        </p>
      </div>
    </div>
  )
}
