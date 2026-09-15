import { useMemo, useState } from 'react'
import { lumpsumForGoal, sipForGoal } from '../../lib/calc'
import { formatINR } from '../../lib/format'
import { CalcGrid, ResultRow, SliderField } from './controls'
import { ResultPanel } from './ResultPanel'

const presets = [
  { label: 'Child education', target: 5_000_000, years: 15 },
  { label: 'Home down payment', target: 3_000_000, years: 7 },
  { label: 'First ₹1 crore', target: 10_000_000, years: 15 },
  { label: 'Car', target: 1_500_000, years: 4 },
] as const

export function GoalCalculator() {
  const [target, setTarget] = useState(5_000_000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(15)
  const [inflation, setInflation] = useState(6)

  /** What the goal will actually cost by the time you get there. */
  const inflatedTarget = useMemo(
    () => target * Math.pow(1 + inflation / 100, years),
    [target, inflation, years],
  )

  const monthly = useMemo(
    () => sipForGoal(inflatedTarget, rate, years),
    [inflatedTarget, rate, years],
  )
  const oneTime = useMemo(
    () => lumpsumForGoal(inflatedTarget, rate, years),
    [inflatedTarget, rate, years],
  )

  const summary = [
    `Goal: ${formatINR(target)} in today's money, ${years} years away`,
    `At ${inflation}% inflation that is ${formatINR(inflatedTarget)} then`,
    `Monthly SIP needed at ${rate}% p.a.: ${formatINR(monthly)}`,
  ].join('\n')

  return (
    <CalcGrid
      inputs={
        <>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setTarget(preset.target)
                  setYears(preset.years)
                }}
                className="rounded-btn bg-white px-3.5 py-2 text-xs font-medium text-navy-700 ring-1 ring-mist-300 transition hover:bg-navy-800 hover:text-white hover:ring-navy-800"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <SliderField
            label="Goal amount (in today's money)"
            value={target}
            onChange={setTarget}
            min={100_000}
            max={100_000_000}
            step={100_000}
          />
          <SliderField
            label="Years to the goal"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
            format="years"
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
            label="Inflation"
            value={inflation}
            onChange={setInflation}
            min={0}
            max={15}
            step={0.5}
            format="percent"
            hint="Education inflation runs higher, near 10%"
          />
        </>
      }
      results={
        <ResultPanel
          headlineLabel="Monthly SIP needed"
          headline={monthly}
          intent="goal"
          whatsappSummary={summary}
        >
          <ResultRow label="Goal in today's money" value={formatINR(target)} />
          <ResultRow
            label={`Cost in ${years} years at ${inflation}%`}
            value={formatINR(inflatedTarget)}
          />
          <ResultRow label="Or invest one time, today" value={formatINR(oneTime)} />
          <ResultRow label="Monthly SIP needed" value={formatINR(monthly)} emphasis />
          <p className="pt-2 text-[0.7rem] leading-relaxed text-slate-400">
            Most people size a goal in today&rsquo;s rupees and fall short. This figure is the one
            that actually buys the goal on the day you need it.
          </p>
        </ResultPanel>
      }
    />
  )
}
