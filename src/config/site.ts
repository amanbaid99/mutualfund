/**
 * Single source of truth for every personal / business detail on the site.
 * Edit this file to update the whole website — no component changes needed.
 */

export const site = {
  name: 'Aman Baid',
  legalName: 'Aman Rajendra Baid',
  role: 'AMFI Registered Mutual Fund Distributor',
  tagline: 'Mutual fund investing, made simple and accountable.',
  intro:
    'I help individuals and families in Mumbai build wealth through mutual funds, with goal-first planning, transparent advice and zero pressure to invest on day one.',

  /** AMFI / regulatory credentials, taken from the ARN card. */
  credentials: {
    arn: 'ARN-369983',
    euin: 'E708974',
    validFrom: '14 Sep 2026',
    validTo: '09 Sep 2029',
    registeredWith: 'Association of Mutual Funds in India (AMFI)',

    /**
     * NISM certification, the exam an ARN requires.
     * PAN and the NISM enrolment number are deliberately NOT stored here:
     * neither is publicly verifiable and both are sensitive identifiers.
     */
    nismRegistration: 'NISM-202600163647',
    /** Public AMFI page where anyone can independently verify the ARN. */
    verifyUrl: 'https://www.amfiindia.com/locate-your-nearest-mutual-fund-distributor-details',
    amfiHome: 'https://www.amfiindia.com/',
  },

  contact: {
    /** Digits only, with country code — used to build wa.me links. */
    whatsapp: '918898802146',
    /** Human-readable version shown in the UI. */
    phoneDisplay: '+91 88988 02146',
    phoneDial: '+918898802146',
    email: 'amanbaid99@gmail.com',
    /** Kept deliberately coarse: no full residential address on a public site. */
    location: 'Mumbai, Maharashtra, India',
  },

  /** Social / professional links. Empty string = hidden from the UI. */
  socials: {
    linkedin: '',
    instagram: '',
    twitter: '',
  },

  /**
   * Portrait shown in the hero panel, served from `public/`.
   * The hero falls back to a designed credential card if the file is missing
   * or fails to load, so the layout is never broken while it is absent.
   */
  photo: './Amanbaid.jpg',

  /** Rough response-time promise shown next to the CTA. */
  responseTime: 'Usually replies within a few hours',
} as const

export type Site = typeof site
