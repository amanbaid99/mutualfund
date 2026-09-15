import { site } from '../config/site'
import { Button, Eyebrow, Section } from './ui'
import { CheckIcon } from './Icons'

const beliefs = [
  'Goals first, products second',
  'Plain English, never jargon',
  'You keep full control of your money',
  'Honest about what I earn',
]

export function About() {
  return (
    <Section id="about">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>About</Eyebrow>
        <h2 className="mt-4 font-display text-3xl leading-[1.14] font-medium text-balance text-navy-800 sm:text-[2.6rem]">
          Built to Make Investing More Accessible
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-pretty text-slate-500">
          I am {site.legalName}, an AMFI registered mutual fund distributor based in Mumbai,
          holding {site.credentials.arn}. I work with salaried professionals, business owners and
          families who want to invest properly but do not want to decode fund factsheets on their
          own. My job is simple: understand where you are going, map the funds that get you there,
          and stay on the phone with you through every market that tests your nerve.
        </p>
      </div>

      <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
        {beliefs.map((belief) => (
          <li
            key={belief}
            className="flex items-center gap-3 rounded-btn bg-mist-100 px-5 py-4 text-sm font-medium text-navy-800"
          >
            <CheckIcon className="h-4 w-4 shrink-0 text-navy-500" />
            {belief}
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <Button href="#credentials" variant="navy">
          See my credentials
        </Button>
      </div>

      {/* Transparency note: how a distributor is actually paid. Stating this
          up front is the single biggest trust lever on a page like this. */}
      <p className="mx-auto mt-12 max-w-2xl border-t border-mist-200 pt-8 text-center text-xs leading-relaxed text-slate-400">
        <span className="font-semibold text-slate-500">How I get paid:</span> you pay me nothing.
        As a distributor I receive a trail commission from the asset management company out of the
        scheme&rsquo;s expense ratio, which is disclosed in every scheme document. I do not charge
        advisory fees and I never ask clients to transfer money to me.
      </p>
    </Section>
  )
}
