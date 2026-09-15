/**
 * Mutual-fund maths used by the calculators.
 *
 * Conventions (the same ones AMFI / AMC calculators use):
 *  - SIP instalments are invested at the START of each month, so every
 *    instalment earns a full month of growth (the trailing `(1 + i)` term).
 *  - Annual return `r` is converted to a monthly rate as r / 12, not
 *    (1+r)^(1/12) - 1, matching industry calculators.
 *  - SWP withdrawals happen at the END of each month, after that month's growth.
 */

export type YearPoint = {
  year: number
  invested: number
  value: number
  gain: number
}

export type SipResult = {
  invested: number
  value: number
  gain: number
  series: YearPoint[]
}

const monthlyRate = (annualPct: number) => annualPct / 100 / 12

/** Plain SIP: a fixed amount every month for `years` years. */
export function sip(monthly: number, annualPct: number, years: number): SipResult {
  return stepUpSip(monthly, annualPct, years, 0)
}

/**
 * Step-up (top-up) SIP: the instalment rises by `stepUpPct` every 12 months.
 * Passing 0 gives an ordinary SIP, which is why `sip()` just delegates here.
 */
export function stepUpSip(
  monthly: number,
  annualPct: number,
  years: number,
  stepUpPct: number,
): SipResult {
  const i = monthlyRate(annualPct)
  const months = Math.round(years * 12)
  const series: YearPoint[] = [{ year: 0, invested: 0, value: 0, gain: 0 }]

  let value = 0
  let invested = 0
  let instalment = monthly

  for (let m = 1; m <= months; m += 1) {
    // Step the instalment up at the start of each new investment year.
    if (m > 1 && (m - 1) % 12 === 0) instalment *= 1 + stepUpPct / 100

    value = (value + instalment) * (1 + i)
    invested += instalment

    if (m % 12 === 0) {
      series.push({ year: m / 12, invested, value, gain: value - invested })
    }
  }

  // Keep a final point for non-whole-year tenures so the chart ends at the total.
  if (months % 12 !== 0) {
    series.push({ year: years, invested, value, gain: value - invested })
  }

  return { invested, value, gain: value - invested, series }
}

/** One-time investment compounded annually. */
export function lumpsum(amount: number, annualPct: number, years: number): SipResult {
  const r = annualPct / 100
  const series: YearPoint[] = []

  for (let y = 0; y <= Math.ceil(years); y += 1) {
    const t = Math.min(y, years)
    const value = amount * Math.pow(1 + r, t)
    series.push({ year: t, invested: amount, value, gain: value - amount })
  }

  const value = amount * Math.pow(1 + r, years)
  return { invested: amount, value, gain: value - amount, series }
}

/** Monthly SIP needed to reach `target` — the inverse of `sip()`. */
export function sipForGoal(target: number, annualPct: number, years: number): number {
  const i = monthlyRate(annualPct)
  const n = Math.round(years * 12)
  if (n <= 0) return 0
  if (i === 0) return target / n
  const factor = ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
  return target / factor
}

/** Lump sum needed today to reach `target`. */
export function lumpsumForGoal(target: number, annualPct: number, years: number): number {
  return target / Math.pow(1 + annualPct / 100, years)
}

export type SwpResult = {
  /** Total actually withdrawn (stops early if the corpus runs out). */
  withdrawn: number
  /** Corpus left at the end of the tenure. */
  balance: number
  /** Month index at which the corpus hit zero, or null if it survived. */
  exhaustedAtMonth: number | null
  series: YearPoint[]
}

/**
 * Systematic Withdrawal Plan: draw `monthly` from `corpus` for `years`,
 * with the remaining balance still invested at `annualPct`.
 */
export function swp(
  corpus: number,
  monthly: number,
  annualPct: number,
  years: number,
): SwpResult {
  const i = monthlyRate(annualPct)
  const months = Math.round(years * 12)
  const series: YearPoint[] = [{ year: 0, invested: 0, value: corpus, gain: 0 }]

  let balance = corpus
  let withdrawn = 0
  let exhaustedAtMonth: number | null = null

  for (let m = 1; m <= months; m += 1) {
    if (balance <= 0) {
      exhaustedAtMonth ??= m
      balance = 0
    } else {
      balance *= 1 + i
      const take = Math.min(monthly, balance)
      balance -= take
      withdrawn += take
      if (balance <= 0 && exhaustedAtMonth === null) exhaustedAtMonth = m
    }

    if (m % 12 === 0) {
      series.push({ year: m / 12, invested: withdrawn, value: balance, gain: 0 })
    }
  }

  return { withdrawn, balance, exhaustedAtMonth, series }
}

export type RetirementResult = {
  /** Today's monthly expense grown to retirement date at `inflationPct`. */
  monthlyExpenseAtRetirement: number
  /** Corpus required on day one of retirement. */
  corpusNeeded: number
  /** What the money already saved will be worth by then. */
  futureValueOfCurrentSavings: number
  /** Corpus still to be built. */
  shortfall: number
  /** Monthly SIP that closes the shortfall. */
  monthlySip: number
  yearsToRetire: number
  yearsInRetirement: number
}

/**
 * Corpus is sized with an inflation-adjusted annuity: during retirement the
 * money still earns `postReturnPct` while expenses keep rising with inflation.
 */
export function retirement(params: {
  currentAge: number
  retirementAge: number
  lifeExpectancy: number
  monthlyExpense: number
  inflationPct: number
  preReturnPct: number
  postReturnPct: number
  currentSavings: number
}): RetirementResult {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    monthlyExpense,
    inflationPct,
    preReturnPct,
    postReturnPct,
    currentSavings,
  } = params

  const yearsToRetire = Math.max(retirementAge - currentAge, 0)
  const yearsInRetirement = Math.max(lifeExpectancy - retirementAge, 0)
  const inflation = inflationPct / 100

  const monthlyExpenseAtRetirement =
    monthlyExpense * Math.pow(1 + inflation, yearsToRetire)
  const annualExpenseAtRetirement = monthlyExpenseAtRetirement * 12

  // Real (inflation-adjusted) return during retirement.
  const realRate = (1 + postReturnPct / 100) / (1 + inflation) - 1

  const corpusNeeded =
    Math.abs(realRate) < 1e-9
      ? annualExpenseAtRetirement * yearsInRetirement
      : annualExpenseAtRetirement *
        ((1 - Math.pow(1 + realRate, -yearsInRetirement)) / realRate) *
        (1 + realRate)

  const futureValueOfCurrentSavings =
    currentSavings * Math.pow(1 + preReturnPct / 100, yearsToRetire)

  const shortfall = Math.max(corpusNeeded - futureValueOfCurrentSavings, 0)
  const monthlySip = shortfall > 0 ? sipForGoal(shortfall, preReturnPct, yearsToRetire) : 0

  return {
    monthlyExpenseAtRetirement,
    corpusNeeded,
    futureValueOfCurrentSavings,
    shortfall,
    monthlySip,
    yearsToRetire,
    yearsInRetirement,
  }
}

/** Compound annual growth rate between two values, as a percentage. */
export function cagr(initial: number, final: number, years: number): number {
  if (initial <= 0 || years <= 0) return 0
  return (Math.pow(final / initial, 1 / years) - 1) * 100
}
