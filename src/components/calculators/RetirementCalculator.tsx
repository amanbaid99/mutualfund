import { useMemo, useState } from 'react'
import { retirement } from '../../lib/calc'
import { formatINR } from '../../lib/format'
import { CalcGrid, ResultRow, SliderField } from './controls'
import { ResultPanel } from './ResultPanel'

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(32)
  const [retirementAge, setRetirementAge] = useState(60)
  const [lifeExpectancy, setLifeExpectancy] = useState(85)
  const [monthlyExpense, setMonthlyExpense] = useState(60_000)
  const [inflation, setInflation] = useState(6)
  const [currentSavings, setCurrentSavings] = useState(1_000_000)

  const result = useMemo(
    () =>
      retirement({
        currentAge,
        retirementAge,
        lifeExpectancy,
        monthlyExpense,
        inflationPct: inflation,
        preReturnPct: 12,
        postReturnPct: 8,
        currentSavings,
      }),
    [currentAge, retirementAge, lifeExpectancy, monthlyExpense, inflation, currentSavings],
  )

  const summary = [
    `Age ${currentAge}, retiring at ${retirementAge}, planning to age ${lifeExpectancy}`,
    `Today's monthly expense: ${formatINR(monthlyExpense)} at ${inflation}% inflation`,
    `Corpus needed: ${formatINR(result.corpusNeeded)}`,
    `Monthly SIP needed: ${formatINR(result.monthlySip)}`,
  ].join('\n')

  // Guard the UI against a retirement age set below the current age.
  const invalid = retirementAge <= currentAge || lifeExpectancy <= retirementAge

  return (
    <CalcGrid
      inputs={
        <>
          <SliderField
            label="Your age today"
            value={currentAge}
            onChange={setCurrentAge}
            min={18}
            max={70}
            step={1}
            format="plain"
            hint="70"
          />
          <SliderField
            label="Retirement age"
            value={retirementAge}
            onChange={setRetirementAge}
            min={35}
            max={75}
            step={1}
            format="plain"
            hint="75"
          />
          <SliderField
            label="Plan until age"
            value={lifeExpectancy}
            onChange={setLifeExpectancy}
            min={60}
            max={100}
            step={1}
            format="plain"
            hint="100"
          />
          <SliderField
            label="Monthly expenses today"
            value={monthlyExpense}
            onChange={setMonthlyExpense}
            min={10_000}
            max={1_000_000}
            step={5_000}
          />
          <SliderField
            label="Inflation"
            value={inflation}
            onChange={setInflation}
            min={2}
            max={12}
            step={0.5}
            format="percent"
          />
          <SliderField
            label="Already saved for retirement"
            value={currentSavings}
            onChange={setCurrentSavings}
            min={0}
            max={100_000_000}
            step={100_000}
          />
          <p className="rounded-btn border border-mist-300 bg-white px-4 py-3 text-xs leading-relaxed text-slate-500">
            Assumes 12% p.a. while you are building the corpus and 8% p.a. after you retire, with
            expenses rising at your inflation figure every year of retirement.
          </p>
        </>
      }
      results={
        invalid ? (
          <div className="grid h-full place-content-center px-4 py-16 text-center">
            <p className="text-sm leading-relaxed text-slate-500">
              Set a retirement age above your current age, and a planning age above your
              retirement age.
            </p>
          </div>
        ) : (
          <ResultPanel
            headlineLabel="Retirement corpus needed"
            headline={result.corpusNeeded}
            intent="consultation"
            whatsappSummary={summary}
            footnote="Retirement is the one goal you cannot take a loan for. Worth a proper conversation."
          >
            <ResultRow
              label={`Monthly expense at ${retirementAge}`}
              value={formatINR(result.monthlyExpenseAtRetirement)}
            />
            <ResultRow
              label="Your savings will grow to"
              value={formatINR(result.futureValueOfCurrentSavings)}
            />
            <ResultRow label="Still to build" value={formatINR(result.shortfall)} />
            <ResultRow label="Monthly SIP needed" value={formatINR(result.monthlySip)} emphasis />
            <p className="pt-2 text-[0.7rem] leading-relaxed text-slate-400">
              {result.yearsToRetire} years to build it, {result.yearsInRetirement} years to live
              on it.
            </p>
          </ResultPanel>
        )
      }
    />
  )
}
