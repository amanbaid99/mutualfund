import { site } from '../config/site'

/**
 * Context-specific opening lines. Every CTA on the page passes an intent so the
 * chat arrives pre-written — the visitor only has to press send.
 */
export const whatsappMessages = {
  general:
    `Hi ${site.name}, I found your website and I'd like to know more about investing in mutual funds.`,
  consultation:
    `Hi ${site.name}, I'd like to book a free consultation to discuss my financial goals.`,
  sip:
    `Hi ${site.name}, I want to start a monthly SIP. Could you help me choose the right funds?`,
  lumpsum:
    `Hi ${site.name}, I have a lump sum amount to invest and would like your guidance on where to put it.`,
  goal:
    `Hi ${site.name}, I'm planning for a specific financial goal and would like help working out how much to invest.`,
  review:
    `Hi ${site.name}, I already hold mutual funds and I'd like a review of my existing portfolio.`,
  tax:
    `Hi ${site.name}, I'd like to understand tax-saving (ELSS) mutual fund options before the financial year ends.`,
  nri: `Hi ${site.name}, I'm an NRI and would like to know how I can invest in Indian mutual funds.`,
  verify:
    `Hi ${site.name}, I'd like to confirm your AMFI registration details (${site.credentials.arn}) before we talk.`,
} as const

export type WhatsappIntent = keyof typeof whatsappMessages

/** Extra context appended by the calculators, e.g. the numbers just computed. */
export function whatsappUrl(intent: WhatsappIntent = 'general', extra?: string): string {
  const body = extra ? `${whatsappMessages[intent]}\n\n${extra}` : whatsappMessages[intent]
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(body)}`
}
