import { Section, SectionHeader } from './ui'

const steps = [
  {
    title: 'We talk',
    body: 'A call or a WhatsApp chat. What you earn, what you owe, what you are saving for and how you react when markets fall.',
  },
  {
    title: 'You get a plan',
    body: 'Goals, amounts, timelines and a specific fund mix, written down. You will understand why each fund is there before anything is bought.',
  },
  {
    title: 'You invest, directly',
    body: 'KYC and onboarding handled by me. Money moves from your bank account straight to the AMC. Units are held in your name.',
  },
  {
    title: 'We review, twice a year',
    body: 'A check-in on progress and any rebalancing. Plus a call from me whenever the market is doing something that makes people do silly things.',
  },
]

export function Process() {
  return (
    <Section id="process">
      <SectionHeader
        eyebrow="How it works"
        title={
          <>
            Four Steps, No
            <br className="hidden sm:block" /> Paperwork Ambush.
          </>
        }
        description="Most people stall because they do not know what happens after they say yes. Here is the whole thing."
      />

      {/*
        A connected timeline rather than four separate cards, so the steps read
        as one sequence. Each step draws its own connector to the next one, so
        the line stops at the last dot instead of running off the edge, and the
        spacing stays correct whatever the grid gap is. The connector is
        vertical on phones and horizontal from lg up; at sm the grid is two
        columns, where a connector would imply the wrong reading order, so it
        is hidden there.
      */}
      <ol className="relative mt-12 grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, index) => (
          <li key={step.title} className="relative pl-10 sm:pl-0 lg:pt-9">
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute top-3 -bottom-9 left-[9px] w-px bg-mist-300 sm:hidden lg:top-[9px] lg:-right-8 lg:bottom-auto lg:left-0 lg:block lg:h-px lg:w-auto"
              />
            )}

            {/* Rendered after the connector so its white disc masks the line. */}
            <span
              aria-hidden="true"
              className="absolute top-1 left-0 grid h-[19px] w-[19px] place-items-center rounded-full bg-white sm:hidden lg:top-0 lg:grid"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-navy-800" />
            </span>

            <span className="font-display block text-3xl leading-none font-light text-navy-400">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-4 text-lg font-medium text-navy-800">{step.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{step.body}</p>
          </li>
        ))}
      </ol>

    </Section>
  )
}
