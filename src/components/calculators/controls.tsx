import { useId } from 'react'
import { clamp, formatINR, parseNumberInput } from '../../lib/format'
import { cx } from '../ui'

type FieldProps = {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  /** How the current value is rendered in the box beside the label. */
  format?: 'currency' | 'percent' | 'years' | 'plain'
  suffix?: string
  hint?: string
}

const formatters: Record<NonNullable<FieldProps['format']>, (n: number) => string> = {
  currency: (n) => formatINR(n),
  percent: (n) => `${n}%`,
  years: (n) => `${n} ${n === 1 ? 'yr' : 'yrs'}`,
  plain: (n) => String(n),
}

/**
 * A labelled slider with an editable value box. Typing and dragging stay in
 * sync, and every value is clamped to the field's range on commit.
 */
export function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format = 'currency',
  hint,
}: FieldProps) {
  const id = useId()
  const editable = format === 'currency' || format === 'plain'

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-navy-700">
          {label}
        </label>

        {editable ? (
          <div className="flex items-center gap-1 rounded-btn bg-white px-3 py-1.5 ring-1 ring-mist-300 focus-within:ring-2 focus-within:ring-navy-600">
            {format === 'currency' && <span className="text-sm text-slate-400">₹</span>}
            <input
              inputMode="numeric"
              value={value === 0 ? '' : new Intl.NumberFormat('en-IN').format(value)}
              onChange={(e) => onChange(clamp(parseNumberInput(e.target.value), 0, max))}
              onBlur={(e) => onChange(clamp(parseNumberInput(e.target.value), min, max))}
              aria-label={label}
              className="w-24 bg-transparent text-right text-sm font-semibold text-navy-800 outline-none sm:w-28"
            />
          </div>
        ) : (
          <output
            htmlFor={id}
            className="rounded-btn bg-white px-3 py-1.5 text-sm font-semibold text-navy-800 ring-1 ring-mist-300"
          >
            {formatters[format](value)}
          </output>
        )}
      </div>

      <input
        id={id}
        type="range"
        className="slider mt-4"
        min={min}
        max={max}
        step={step}
        value={clamp(value, min, max)}
        onChange={(e) => onChange(Number(e.target.value))}
      />

      <div className="mt-1.5 flex justify-between text-[0.7rem] text-slate-400">
        <span>{formatters[format](min)}</span>
        <span>{hint ?? formatters[format](max)}</span>
      </div>
    </div>
  )
}

/** Key/value line used in the result panels. */
export function ResultRow({
  label,
  value,
  emphasis,
  dotClass,
}: {
  label: string
  value: string
  emphasis?: boolean
  dotClass?: string
}) {
  return (
    <div
      className={cx(
        'flex items-baseline justify-between gap-4 py-3',
        emphasis && 'border-t border-mist-300 pt-4',
      )}
    >
      <span className="flex items-center gap-2 text-sm text-slate-500">
        {dotClass && <span className={cx('h-2.5 w-2.5 shrink-0 rounded-full', dotClass)} />}
        {label}
      </span>
      <span
        className={cx(
          'font-display text-right font-semibold tabular-nums',
          emphasis ? 'text-2xl text-navy-800' : 'text-base text-navy-700',
        )}
      >
        {value}
      </span>
    </div>
  )
}

export function CalcGrid({
  inputs,
  results,
}: {
  inputs: React.ReactNode
  results: React.ReactNode
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
      <div className="rounded-card bg-mist-100 p-6 sm:p-8">
        <div className="space-y-7">{inputs}</div>
      </div>
      <div className="rounded-card bg-white p-6 ring-1 ring-mist-200 sm:p-8">{results}</div>
    </div>
  )
}
