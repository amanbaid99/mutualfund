import { Section, SectionHeader } from './ui'
import {
  FileTextIcon,
  PiggyIcon,
  ShieldCheckIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersIcon,
} from './Icons'
import { whatsappUrl, type WhatsappIntent } from '../lib/whatsapp'
import type { ComponentType, SVGProps } from 'react'

type Service = {
  title: string
  description: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  intent: WhatsappIntent
}

const services: Service[] = [
  {
    title: 'SIP Planning',
    description:
      'A monthly investment plan sized to your income and goal, in funds picked for your horizon and not for a sales target.',
    icon: TrendingUpIcon,
    intent: 'sip',
  },
  {
    title: 'Goal Based Investing',
    description:
      'A house, a child’s education, a sabbatical. Each goal gets its own bucket, its own timeline and its own fund mix.',
    icon: TargetIcon,
    intent: 'goal',
  },
  {
    title: 'Lump Sum Deployment',
    description:
      'Bonus, maturity proceeds or a property sale deployed in tranches so you are not betting everything on one day’s market level.',
    icon: PiggyIcon,
    intent: 'lumpsum',
  },
  {
    title: 'Portfolio Review',
    description:
      'A clear read on what you already hold: overlap, laggards, exit loads and tax, with a written plan for what to keep and what to move.',
    icon: FileTextIcon,
    intent: 'review',
  },
  {
    title: 'Tax Saving (ELSS)',
    description:
      'Section 80C planning that actually compounds, instead of a last-week-of-March scramble into whatever is available.',
    icon: ShieldCheckIcon,
    intent: 'tax',
  },
  {
    title: 'Retirement & SWP',
    description:
      'Build the corpus while you earn, then convert it into a monthly withdrawal plan that outlasts you.',
    icon: UsersIcon,
    intent: 'consultation',
  },
]

export function Services() {
  return (
    <Section id="services" tone="mist">
      <SectionHeader
        eyebrow="What I do"
        title={
          <>
            Investing Made Simpler,
            <br className="hidden sm:block" /> Clearer and Accountable.
          </>
        }
        description="Everything you need to invest with confidence, from your first SIP to a retirement withdrawal plan, handled by one person who picks up the phone."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <a
            key={service.title}
            href={whatsappUrl(service.intent)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-card bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="grid h-11 w-11 place-items-center rounded-btn bg-mist-100 text-navy-700 transition group-hover:bg-navy-800 group-hover:text-white">
              <service.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-6 text-lg font-medium text-navy-800">{service.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
              {service.description}
            </p>
            <span className="micro mt-auto pt-6 text-navy-500 transition group-hover:text-navy-800">
              Ask about this &rarr;
            </span>
          </a>
        ))}
      </div>
    </Section>
  )
}
