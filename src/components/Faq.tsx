import { useState } from 'react'
import { site } from '../config/site'
import { Section, SectionHeader, cx } from './ui'
import { ChevronDownIcon } from './Icons'

const faqs = [
  {
    q: 'What does an AMFI registered mutual fund distributor actually do?',
    a: `A distributor is registered with AMFI to help you invest in mutual funds: understanding your goals, recommending schemes, completing KYC and onboarding, executing transactions and reviewing your portfolio over time. My AMFI registration number is ${site.credentials.arn} and my NISM certification is ${site.credentials.nismRegistration}. You can verify the ARN on AMFI's own website.`,
  },
  {
    q: 'What do you charge me?',
    a: 'Nothing. I am paid a trail commission by the asset management company out of the scheme expense ratio, which is disclosed in every scheme information document. I do not charge advisory or planning fees, and I never collect money from clients.',
  },
  {
    q: 'Regular plans or direct plans, and does it matter?',
    a: 'Direct plans have a lower expense ratio because there is no distributor commission built in. Regular plans cost slightly more and that difference is what pays for ongoing service. If you are confident selecting funds, rebalancing and staying invested through a bad market on your own, direct plans are cheaper. If you would rather have someone accountable for those decisions, a regular plan through a distributor is the trade-off you are making. I will explain it honestly either way.',
  },
  {
    q: 'Is my money safe with you?',
    a: 'Your money never comes to me. It moves from your own bank account to the asset management company, and units are held in your name in your own folio. You can log in to the AMC or RTA directly, redeem without my involvement, and remove me as your distributor at any time.',
  },
  {
    q: 'Can you guarantee returns?',
    a: 'No, and neither can anyone else. Mutual fund returns depend on markets and can be negative, particularly over short periods. Anyone who promises you a guaranteed return on a mutual fund is either mistaken or lying. What I can commit to is a plan that matches your timeline and a phone call when you need one.',
  },
  {
    q: 'How much do I need to start?',
    a: 'Most funds allow a SIP from ₹500 a month and a lump sum from ₹5,000. Starting small and raising it as your income grows works better than waiting until you have a large amount.',
  },
  {
    q: 'I already invest somewhere else. Can you still help?',
    a: 'Yes. I can review what you hold, point out overlap and laggards, and tell you what is worth keeping. Moving existing investments to me is optional and there is no pressure to do it.',
  },
  {
    q: 'Can NRIs invest through you?',
    a: 'Yes, on a repatriable basis through an NRE account or non-repatriable through NRO, subject to the rules for your country of residence. US and Canada residents are accepted by only a few AMCs, and I will tell you which ones before you start the paperwork.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="faq" tone="mist">
      <SectionHeader
        eyebrow="Questions"
        title={
          <>
            The Things People
            <br className="hidden sm:block" /> Hesitate to Ask.
          </>
        }
        description="Including the ones a distributor is not supposed to answer honestly."
      />

      <div className="mt-10 divide-y divide-mist-300 border-b border-mist-300">
        {faqs.map((faq, index) => {
          const expanded = open === index
          return (
            <div key={faq.q}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : index)}
                  aria-expanded={expanded}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-base font-medium text-navy-800 sm:text-lg">
                    {faq.q}
                  </span>
                  <ChevronDownIcon
                    className={cx(
                      'mt-0.5 h-5 w-5 shrink-0 text-navy-500 transition-transform duration-300',
                      expanded && 'rotate-180',
                    )}
                  />
                </button>
              </h3>
              <div
                id={`faq-panel-${index}`}
                hidden={!expanded}
                className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-500"
              >
                {faq.a}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
