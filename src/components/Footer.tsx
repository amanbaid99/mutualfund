import { site } from '../config/site'

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Calculators', href: '#calculators' },
      { label: 'Credentials', href: '#credentials' },
      { label: 'How it works', href: '#process' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Verify & Learn',
    links: [
      { label: 'AMFI distributor lookup', href: site.credentials.verifyUrl },
      { label: 'AMFI India', href: site.credentials.amfiHome },
      { label: 'SEBI', href: 'https://www.sebi.gov.in/' },
      { label: 'SEBI SCORES (complaints)', href: 'https://scores.sebi.gov.in/' },
      { label: 'AMFI investor education', href: 'https://www.amfiindia.com/investor-corner' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-mist-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <p className="wordmark text-5xl leading-none sm:text-6xl lg:text-7xl">AMAN&nbsp;BAID</p>
            <p className="micro mt-4 text-slate-400">
              {site.role} &middot; {site.credentials.arn}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-500">
              {site.contact.location} &middot; {site.contact.phoneDisplay}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="micro text-navy-800">{column.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => {
                    const external = link.href.startsWith('http')
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          {...(external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className="text-sm text-slate-500 transition hover:text-navy-800"
                        >
                          {link.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Statutory disclaimer. Required on any mutual fund distributor site. */}
        <div className="mt-14 border-t border-mist-200 pt-8">
          <p className="micro text-navy-800">Statutory disclosure</p>
          <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-400">
            <p>
              <span className="font-semibold text-slate-500">
                Mutual fund investments are subject to market risks. Read all scheme related
                documents carefully.
              </span>{' '}
              Past performance is not indicative of future returns. The value of investments can go
              down as well as up, and you may get back less than you invested.
            </p>
            <p>
              {site.legalName} is an AMFI registered Mutual Fund Distributor holding{' '}
              {site.credentials.arn} (EUIN {site.credentials.euin}), valid from{' '}
              {site.credentials.validFrom} to {site.credentials.validTo}. Registration with AMFI
              is not a guarantee of performance and does not amount to an endorsement by AMFI or
              SEBI.
            </p>
            <p>
              This website is for information only. It is not investment advice, a research report,
              or an offer to buy or sell any security. Nothing here accounts for your individual
              circumstances. Calculator outputs are illustrations based on the assumptions you
              enter, not guarantees or projections of returns. Please consult a qualified
              professional and read the scheme information documents before investing.
            </p>
            <p>
              I do not accept payments from investors. Never transfer money to any individual for a
              mutual fund investment. All payments must be made directly to the asset management
              company from your own bank account.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-mist-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.7rem] text-slate-400">
            &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="text-[0.7rem] text-slate-400">
            {site.credentials.arn} &middot; EUIN {site.credentials.euin}
          </p>
        </div>
      </div>
    </footer>
  )
}
