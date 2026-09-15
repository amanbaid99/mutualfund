import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

/** All icons share one 24x24 stroked grid so they stay visually consistent. */
function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export const WhatsAppIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.13-.28-.2-.57-.35Z" />
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.25-4.38c0-4.54 3.7-8.23 8.24-8.23a8.19 8.19 0 0 1 8.22 8.24c0 4.54-3.69 8.23-8.23 8.23Z" />
  </svg>
)

export const ShieldCheckIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.4 7.5 9.5 4.3-1.1 7.5-5 7.5-9.5V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </Base>
)

export const CalculatorIcon = (props: IconProps) => (
  <Base {...props}>
    <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
    <path d="M8.5 6.5h7M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h3.5" />
  </Base>
)

export const TargetIcon = (props: IconProps) => (
  <Base {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </Base>
)

export const TrendingUpIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="m3 16 5.5-5.5 3.5 3.5L21 5" />
    <path d="M15 5h6v6" />
  </Base>
)

export const UsersIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M16.5 20v-1.5a4 4 0 0 0-4-4h-5a4 4 0 0 0-4 4V20" />
    <circle cx="10" cy="7" r="3.25" />
    <path d="M20.5 20v-1.5a4 4 0 0 0-3-3.87M16 4.13a3.25 3.25 0 0 1 0 5.74" />
  </Base>
)

export const PiggyIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M17.5 8.5c1.6 1 2.5 2.6 2.5 4.4 0 1.5-.7 2.9-1.8 3.9V19a1 1 0 0 1-1 1h-1.4a1 1 0 0 1-1-.8l-.1-.6a9.5 9.5 0 0 1-3.4 0l-.1.6a1 1 0 0 1-1 .8H8.8a1 1 0 0 1-1-1v-2.2A5.6 5.6 0 0 1 6 13.4C6 9.9 9.1 7 13 7h4.5Z" />
    <path d="M6.2 10.7 4.4 9.4a1 1 0 0 0-1.6.8v2a1 1 0 0 0 1.3 1l1.5-.5M15.5 11h.01M13 7a3 3 0 0 0-3-3" />
  </Base>
)

export const FileTextIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M14 2.5H7.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7l-4.5-4.5Z" />
    <path d="M14 2.5V7h4.5M9 12.5h6M9 16h6M9 9h2" />
  </Base>
)

export const GlobeIcon = (props: IconProps) => (
  <Base {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.5 9h17M3.5 15h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </Base>
)

export const CheckIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Base>
)

export const ArrowRightIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Base>
)

export const ExternalLinkIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M13.5 4.5H19.5V10.5M19.5 4.5 11 13" />
    <path d="M18 14.5v4a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
  </Base>
)

export const ChevronDownIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="m6 9.5 6 6 6-6" />
  </Base>
)

export const MenuIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
)

export const CloseIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M6 6 18 18M18 6 6 18" />
  </Base>
)

export const MailIcon = (props: IconProps) => (
  <Base {...props}>
    <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Base>
)

export const PhoneIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
  </Base>
)

export const PinIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.75" />
  </Base>
)

export const ClockIcon = (props: IconProps) => (
  <Base {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </Base>
)

export const SparkleIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9 12 3.5Z" />
    <path d="M18.5 3v3M20 4.5h-3" />
  </Base>
)
