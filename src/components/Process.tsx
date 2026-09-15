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

      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="rounded-card bg-mist-100 p-7">
            <span className="font-display text-3xl font-light text-navy-400">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-5 text-lg font-medium text-navy-800">{step.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
