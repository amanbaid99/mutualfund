import { useMemo, useState } from 'react'
import { cagr, lumpsum } from '../../lib/calc'
import { formatINR } from '../../lib/format'
import { CalcGrid, ResultRow, SliderField } from './controls'
import { CHART, DonutSplit, ResultPanel } from './ResultPanel'

export function LumpsumCalculator() {
  const [amount, setAmount] = useState(500_000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const result = useMemo(() => lumpsum(amount, rate, years), [amount, rate, years])
  const multiple = amount > 0 ? result.value / amount : 0

  const summary = [
    `Lump sum: ${formatINR(amount)}`,
    `Period: ${years} years at ${rate}% p.a.`,
    `Projected value: ${formatINR(result.value)}`,
  ].join('\n')

  return (
    <CalcGrid
      inputs={
        <>
          <SliderField
            label="Amount to invest"
            value={amount}
            onChange={setAmount}
            min={5_000}
            max={50_000_000}
            step={5_000}
          />
          <SliderField
            label="Expected return (p.a.)"
            value={rate}
            onChange={setRate}
            min={1}
            max={30}
            step={0.5}
            format="percent"
          />
          <SliderField
            label="Investment period"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
            format="years"
          />
          <p className="rounded-btn border border-mist-300 bg-white px-4 py-3 text-xs leading-relaxed text-slate-500">
            Putting a large sum in on a single day concentrates your timing risk. An STP, which
            moves money from a liquid fund into equity over a few months, usually sits better with
            most people. Ask me how it would work for this amount.
          </p>
        </>
      }
      results={
        <ResultPanel
          headlineLabel="Projected value"
          headline={result.value}
          chart={<DonutSplit invested={result.invested} gain={result.gain} />}
          intent="lumpsum"
          whatsappSummary={summary}
        >
          <ResultRow
            label="Amount invested"
            value={formatINR(result.invested)}
            dotClass={CHART.investedClass}
          />
          <ResultRow
            label="Estimated returns"
            value={formatINR(result.gain)}
            dotClass={CHART.gainClass}
          />
          <ResultRow label="Your money grows" value={`${multiple.toFixed(2)}x`} emphasis />
          <p className="pt-1 text-[0.7rem] text-slate-400">
            Effective CAGR {cagr(amount, result.value, years).toFixed(1)}% over {years} years.
          </p>
        </ResultPanel>
      }
    />
  )
}
