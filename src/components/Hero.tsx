import { useState } from 'react'
import { site } from '../config/site'
import { StatStrip, WhatsAppButton } from './ui'
import { ShieldCheckIcon } from './Icons'

const heroStats = [
  { value: site.credentials.arn.replace('ARN-', ''), label: 'AMFI registration' },
  { value: 'NISM', label: 'Certified' },
  { value: '₹0', label: 'You pay me nothing' },
]

export function Hero() {
  return (
    <div id="top" className="bg-white pt-24 sm:pt-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="animate-fade-up rounded-panel bg-gradient-to-br from-haze-200 via-haze-100 to-mist-100 p-6 sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <HeroVisual />

            <div>
              <p className="micro flex items-center gap-2 text-navy-600">
                <ShieldCheckIcon className="h-4 w-4" />
                AMFI Registered Distributor
              </p>

              <h1 className="mt-5 font-display text-[2.15rem] leading-[1.1] font-medium text-balance text-navy-800 sm:text-5xl lg:text-[3.25rem]">
                Invest Smarter.
                <br />
                Build Wealth with
                <br />
                Confidence.
              </h1>

              <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-pretty text-slate-600">
                {site.intro}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppButton
                  intent="consultation"
                  label="Message me"
                  size="lg"
                  className="w-full sm:w-auto"
                />
                <a
                  href="#calculators"
                  className="micro inline-flex w-full items-center justify-center rounded-btn border border-navy-800/15 px-8 py-4 whitespace-nowrap text-navy-800 transition hover:-translate-y-px hover:bg-white/70 sm:w-auto"
                >
                  Try the calculators
                </a>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                {site.responseTime} &middot; No obligation, no sales pitch.
              </p>

              <StatStrip
                items={heroStats}
                className="mt-9 -ml-5 border-t border-navy-800/10 pt-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Renders the portrait when one is present, with the ARN badged over it.
 * If the file is missing or fails to load it falls back to a designed
 * credential card, so the panel is never a broken image.
 */
function HeroVisual() {
  const [photoFailed, setPhotoFailed] = useState(false)

  if (site.photo && !photoFailed) {
    return (
      <div className="relative overflow-hidden rounded-card bg-mist-200">
        <img
          src={site.photo}
          srcSet={`${site.photoSmall} 640w, ${site.photo} 1200w`}
          sizes="(min-width: 1024px) 550px, 100vw"
          alt={`${site.legalName}, ${site.role}`}
          width={1200}
          height={1500}
          // The hero portrait is the largest paint on the page, so it is
          // fetched eagerly at high priority rather than lazily.
          fetchPriority="high"
          decoding="async"
          onError={() => setPhotoFailed(true)}
          className="aspect-4/5 h-full w-full object-cover"
        />

        {/* Credential badge, so the portrait still carries the proof. */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-[0.7rem] bg-navy-900/85 px-5 py-4 text-white backdrop-blur-sm">
          <span>
            <span className="block text-sm font-semibold">{site.legalName}</span>
            <span className="micro mt-0.5 block text-navy-400">{site.role}</span>
          </span>
          <span className="shrink-0 text-right">
            <span className="block font-mono text-sm font-semibold">
              {site.credentials.arn}
            </span>
            <a
              href={site.credentials.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="micro mt-0.5 block text-gold-400 hover:underline"
            >
              Verify
            </a>
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
      <div className="rounded-card bg-white/70 p-1.5 shadow-lift backdrop-blur-sm">
        <div className="rounded-[0.7rem] bg-navy-800 px-7 py-8 text-white sm:px-9 sm:py-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="micro text-navy-400">Association of Mutual Funds in India</p>
              <p className="mt-2 font-display text-lg font-medium">
                Registered Mutual Fund Distributor
              </p>
            </div>
            <ShieldCheckIcon className="h-6 w-6 shrink-0 text-gold-400" />
          </div>

          <dl className="mt-8 space-y-4 border-t border-white/12 pt-6">
            <CardRow label="Name" value={site.legalName} />
            <CardRow label="ARN" value={site.credentials.arn} mono />
            <CardRow label="EUIN" value={site.credentials.euin} mono />
            <CardRow label="Valid till" value={site.credentials.validTo} />
          </dl>
        </div>
      </div>

      <a
        href={site.credentials.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="micro mt-3 flex items-center justify-center rounded-btn bg-white/70 px-4 py-3 text-navy-700 transition hover:bg-white"
      >
        Verify this ARN on amfiindia.com
      </a>
    </div>
  )
}

function CardRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="micro text-navy-400">{label}</dt>
      <dd
        className={
          mono
            ? 'text-right font-mono text-sm font-semibold tracking-tight text-white'
            : 'text-right text-sm font-medium text-white'
        }
      >
        {value}
      </dd>
    </div>
  )
}
