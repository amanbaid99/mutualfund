import { site } from '../config/site'
import { Section, WhatsAppButton } from './ui'
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from './Icons'

const channels = [
  { icon: PhoneIcon, label: 'Phone', value: site.contact.phoneDisplay, href: `tel:${site.contact.phoneDial}` },
  { icon: MailIcon, label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
  { icon: PinIcon, label: 'Based in', value: site.contact.location },
  { icon: ClockIcon, label: 'Response time', value: site.responseTime },
]

export function Contact() {
  return (
    <Section id="contact">
      <div className="overflow-hidden rounded-panel bg-gradient-to-br from-haze-200 via-haze-100 to-mist-100">
        <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:p-16">
          <div>
            <h2 className="font-display text-3xl leading-[1.12] font-medium text-balance text-navy-800 sm:text-[2.6rem]">
              Your Financial Future
              <br className="hidden sm:block" /> Starts Today.
            </h2>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-slate-600">
              One message is all it takes. Tell me what you are saving for and I will tell you
              honestly whether mutual funds are even the right answer for it.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton
                intent="consultation"
                label="Message me on WhatsApp"
                size="lg"
                variant="whatsapp"
                className="w-full sm:w-auto"
              />
              <a
                href={`tel:${site.contact.phoneDial}`}
                className="micro inline-flex w-full items-center justify-center rounded-btn border border-navy-800/15 px-8 py-4 text-navy-800 transition hover:-translate-y-px hover:bg-white/70 sm:w-auto"
              >
                Call instead
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              No forms, no lead capture, no follow-up spam. Your message goes straight to my phone.
            </p>
          </div>

          <dl className="grid gap-3 self-center sm:grid-cols-2 lg:grid-cols-1">
            {channels.map((channel) => {
              const content = (
                <>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-btn bg-mist-100 text-navy-700">
                    <channel.icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0">
                    <dt className="text-[0.7rem] text-slate-400">{channel.label}</dt>
                    <dd className="truncate text-sm font-medium text-navy-800">{channel.value}</dd>
                  </span>
                </>
              )

              return channel.href ? (
                <a
                  key={channel.label}
                  href={channel.href}
                  className="flex items-center gap-4 rounded-card bg-white/80 px-5 py-4 transition hover:bg-white"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={channel.label}
                  className="flex items-center gap-4 rounded-card bg-white/80 px-5 py-4"
                >
                  {content}
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </Section>
  )
}
