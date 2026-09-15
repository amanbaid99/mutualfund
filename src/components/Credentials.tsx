import { site } from '../config/site'
import { Button, Section, SectionHeader } from './ui'
import { CheckIcon, ExternalLinkIcon, ShieldCheckIcon } from './Icons'

const registryFacts = [
  { label: 'Registered name', value: site.legalName },
  { label: 'AMFI registration number', value: site.credentials.arn },
  { label: 'EUIN', value: site.credentials.euin },
  { label: 'Valid from', value: site.credentials.validFrom },
  { label: 'Valid until', value: site.credentials.validTo },
  { label: 'Registered with', value: 'AMFI, per SEBI regulatory guidelines' },
]

const safeguards = [
  'Money moves from your bank to the AMC, never through me',
  'Units are held in your name, in your folio',
  'You can redeem any time, directly with the AMC or RTA',
  'KYC done through SEBI registered KRAs',
  'EUIN recorded on every transaction I execute',
  'You can change or remove your distributor whenever you want',
]

export function Credentials() {
  return (
    <Section id="credentials">
      <SectionHeader
        eyebrow="Credentials & Safety"
        title={
          <>
            Check Me Out Before
            <br className="hidden sm:block" /> You Trust Me.
          </>
        }
        description="Do not take my word for any of this. Every detail below is on a public register you can search yourself, in under a minute."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        {/* The verifiable record. */}
        <div className="rounded-card bg-navy-800 p-8 text-white sm:p-10">
          <div className="flex items-center gap-2.5">
            <ShieldCheckIcon className="h-5 w-5 text-gold-400" />
            <p className="micro text-navy-400">Official registration</p>
          </div>

          <dl className="mt-8 divide-y divide-white/10">
            {registryFacts.map((fact) => (
              <div key={fact.label} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-xs text-navy-400">{fact.label}</dt>
                <dd className="text-right text-sm font-medium text-white">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
            <Button href={site.credentials.verifyUrl} variant="light" className="w-full sm:w-auto">
              Verify on AMFI
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </Button>
            <a
              href={site.credentials.amfiHome}
              target="_blank"
              rel="noopener noreferrer"
              className="micro inline-flex w-full items-center justify-center gap-2 rounded-btn border border-white/20 px-6 py-3 text-white transition hover:bg-white/10 sm:w-auto"
            >
              About AMFI
            </a>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-navy-400">
            Search <span className="font-semibold text-white">{site.credentials.arn}</span> on the
            AMFI distributor lookup to see this record on AMFI&rsquo;s own website.
          </p>
        </div>

        {/* What that registration actually protects. */}
        <div className="rounded-card bg-mist-100 p-8 sm:p-10">
          <p className="micro text-slate-400">Your money, your control</p>
          <h3 className="mt-3 font-display text-2xl leading-snug font-medium text-navy-800">
            A distributor never touches your money.
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            This is the part most people are never told. Here is exactly how the arrangement
            works, and what it means for your risk.
          </p>

          <ul className="mt-7 space-y-3.5">
            {safeguards.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-navy-700">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-navy-500" />
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-8 rounded-btn border border-mist-300 bg-white px-5 py-4 text-xs leading-relaxed text-slate-500">
            <span className="font-semibold text-navy-700">Never</span> transfer money to me, to any
            personal account, or to anyone promising guaranteed mutual fund returns. All
            investments go directly to the asset management company from your own bank account.
          </p>
        </div>
      </div>
    </Section>
  )
}
