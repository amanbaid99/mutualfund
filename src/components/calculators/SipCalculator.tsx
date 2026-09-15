import { useMemo, useState } from 'react'
import { stepUpSip } from '../../lib/calc'
import { formatINR } from '../../lib/format'
import { CalcGrid, ResultRow, SliderField } from './controls'
import { CHART, DonutSplit, ResultPanel } from './ResultPanel'

export function SipCalculator() {
  const [monthly, setMonthly] = useState(10_000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(15)
  const [stepUp, setStepUp] = useState(0)

  const result = useMemo(
    () => stepUpSip(monthly, rate, years, stepUp),
    [monthly, rate, years, stepUp],
  )

  const summary = [
    `SIP: ${formatINR(monthly)}/month for ${years} years`,
    stepUp > 0 ? `Annual step-up: ${stepUp}%` : null,
    `Assumed return: ${rate}% p.a.`,
    `Projected value: ${formatINR(result.value)}`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <CalcGrid
      inputs={
        <>
          <SliderField
            label="Monthly investment"
            value={monthly}
            onChange={setMonthly}
            min={500}
            max={500_000}
            step={500}
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
          <SliderField
            label="Annual step-up"
            value={stepUp}
            onChange={setStepUp}
            min={0}
            max={25}
            step={1}
            format="percent"
            hint="Raise your SIP each year as your income grows"
          />
        </>
      }
      results={
        <ResultPanel
          headlineLabel="Projected value"
          headline={result.value}
          chart={<DonutSplit invested={result.invested} gain={result.gain} />}
          intent="sip"
          whatsappSummary={summary}
        >
          <ResultRow
            label="Total invested"
            value={formatINR(result.invested)}
            dotClass={CHART.investedClass}
          />
          <ResultRow
            label="Estimated returns"
            value={formatINR(result.gain)}
            dotClass={CHART.gainClass}
          />
        </ResultPanel>
      }
    />
  )
}
