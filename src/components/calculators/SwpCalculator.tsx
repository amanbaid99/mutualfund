import { useMemo, useState } from 'react'
import { swp } from '../../lib/calc'
import { formatINR } from '../../lib/format'
import { CalcGrid, ResultRow, SliderField } from './controls'
import { ResultPanel } from './ResultPanel'

export function SwpCalculator() {
  const [corpus, setCorpus] = useState(10_000_000)
  const [monthly, setMonthly] = useState(50_000)
  const [rate, setRate] = useState(9)
  const [years, setYears] = useState(25)

  const result = useMemo(() => swp(corpus, monthly, rate, years), [corpus, monthly, rate, years])

  const lasted = result.exhaustedAtMonth
    ? `${Math.floor(result.exhaustedAtMonth / 12)} yrs ${result.exhaustedAtMonth % 12} mo`
    : `${years} yrs and still going`

  const summary = [
    `SWP: ${formatINR(monthly)}/month from a ${formatINR(corpus)} corpus`,
    `Assumed return: ${rate}% p.a. over ${years} years`,
    result.exhaustedAtMonth
      ? `Corpus runs out after ${lasted}`
      : `Corpus left after ${years} years: ${formatINR(result.balance)}`,
  ].join('\n')

  return (
    <CalcGrid
      inputs={
        <>
          <SliderField
            label="Your corpus"
            value={corpus}
            onChange={setCorpus}
            min={100_000}
            max={100_000_000}
            step={100_000}
          />
          <SliderField
            label="Monthly withdrawal"
            value={monthly}
            onChange={setMonthly}
            min={1_000}
            max={1_000_000}
            step={1_000}
          />
          <SliderField
            label="Expected return (p.a.)"
            value={rate}
            onChange={setRate}
            min={1}
            max={20}
            step={0.5}
            format="percent"
            hint="Post-retirement portfolios are usually more conservative"
          />
          <SliderField
            label="Withdrawal period"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
            format="years"
          />
        </>
      }
      results={
        <ResultPanel
          headlineLabel={`Corpus left after ${years} years`}
          headline={result.balance}
          intent="consultation"
          whatsappSummary={summary}
          footnote="A withdrawal plan is worth getting right once, not adjusting in a panic later."
        >
          <ResultRow label="Starting corpus" value={formatINR(corpus)} />
          <ResultRow label="Total withdrawn" value={formatINR(result.withdrawn)} />
          <ResultRow label="Money lasts" value={lasted} />
          <ResultRow label="Balance at the end" value={formatINR(result.balance)} emphasis />

          {result.exhaustedAtMonth && (
            <p className="mt-3 rounded-btn bg-mist-100 px-4 py-3 text-xs leading-relaxed text-slate-600">
              At this rate the corpus is exhausted after{' '}
              <span className="font-semibold text-navy-800">{lasted}</span>, short of your{' '}
              {years} year horizon. Lower the withdrawal or start with a larger corpus.
            </p>
          )}
        </ResultPanel>
      }
    />
  )
}
