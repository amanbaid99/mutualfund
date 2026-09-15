import { useState } from 'react'
import { Section, SectionHeader, cx } from '../ui'
import { SipCalculator } from './SipCalculator'
import { LumpsumCalculator } from './LumpsumCalculator'
import { GoalCalculator } from './GoalCalculator'
import { SwpCalculator } from './SwpCalculator'
import { RetirementCalculator } from './RetirementCalculator'

const tabs = [
  { id: 'sip', label: 'SIP', blurb: 'What a monthly investment grows into.', Component: SipCalculator },
  {
    id: 'goal',
    label: 'Goal',
    blurb: 'What you must invest each month to reach a number.',
    Component: GoalCalculator,
  },
  {
    id: 'lumpsum',
    label: 'Lump sum',
    blurb: 'What a one-time investment grows into.',
    Component: LumpsumCalculator,
  },
  {
    id: 'retirement',
    label: 'Retirement',
    blurb: 'The corpus your retirement actually needs.',
    Component: RetirementCalculator,
  },
  {
    id: 'swp',
    label: 'SWP',
    blurb: 'How long a corpus lasts once you start withdrawing.',
    Component: SwpCalculator,
  },
] as const

export function Calculators() {
  const [active, setActive] = useState<(typeof tabs)[number]['id']>('sip')
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0]
  const Active = current.Component

  return (
    <Section id="calculators" tone="mist">
      <SectionHeader
        eyebrow="Calculators"
        title={
          <>
            Run the Numbers
            <br className="hidden sm:block" /> Before You Commit.
          </>
        }
        description="Free, no sign-up, nothing stored. Work out your own figures first, then send them to me on WhatsApp and we start the conversation from real numbers."
      />

      <div
        role="tablist"
        aria-label="Calculators"
        className="mt-8 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={cx(
              'micro shrink-0 rounded-btn px-5 py-3 transition',
              active === tab.id
                ? 'bg-navy-800 text-white'
                : 'bg-white text-navy-700 ring-1 ring-mist-300 hover:bg-mist-200',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <p className="mt-4 mb-5 text-sm text-slate-500">{current.blurb}</p>

      <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
        {/* Keying on the tab id resets each calculator's inputs when switched. */}
        <Active key={active} />
      </div>

      <p className="mt-6 text-xs leading-relaxed text-slate-400">
        These calculators are illustrations, not projections. They assume a constant rate of
        return, which no mutual fund delivers in reality. Actual returns vary with the market and
        may be negative. Figures exclude exit loads, stamp duty and taxes.
      </p>
    </Section>
  )
}
