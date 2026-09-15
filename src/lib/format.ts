const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

/** ₹12,34,567 — Indian digit grouping, no paise. */
export function formatINR(value: number): string {
  if (!Number.isFinite(value)) return '-'
  return inr.format(Math.round(value))
}

/** Compact Indian units: 1.2 Cr / 45.3 L / 90.0 K. Used on charts and big numbers. */
export function formatCompactINR(value: number): string {
  if (!Number.isFinite(value)) return '-'
  const abs = Math.abs(value)
  if (abs >= 1e7) return `₹${(value / 1e7).toFixed(2)} Cr`
  if (abs >= 1e5) return `₹${(value / 1e5).toFixed(2)} L`
  if (abs >= 1e3) return `₹${(value / 1e3).toFixed(1)} K`
  return `₹${Math.round(value)}`
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '-'
  return new Intl.NumberFormat('en-IN').format(Math.round(value))
}

/** Parses user text back to a number, tolerating commas, spaces and ₹. */
export function parseNumberInput(raw: string): number {
  const cleaned = raw.replace(/[^0-9.]/g, '')
  const n = Number.parseFloat(cleaned)
  return Number.isFinite(n) ? n : 0
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
