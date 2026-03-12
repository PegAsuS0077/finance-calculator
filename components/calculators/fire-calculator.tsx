// components/calculators/fire-calculator.tsx
'use client'

import { useState, useMemo, useRef } from 'react'
import { Slider } from '@/components/ui/slider'
import { fireSchema, type FireInputs } from '@/lib/validation/fire-schema'
import { calculateFire } from '@/lib/calculators/fire'
import { FireResults } from './fire-results'
import { FireChart } from './fire-chart'

const DEFAULTS: FireInputs = {
  currentAge: 30,
  currentPortfolio: 50_000,
  annualIncome: 75_000,
  annualExpenses: 40_000,
  annualContributions: 25_000,
  expectedReturn: 0.07,
  inflationRate: 0.03,
  withdrawalRate: 0.04,
}

// ─── Input primitives ─────────────────────────────────────────────────────────

function FieldLabel({ htmlFor, children, hint }: { htmlFor: string; children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4375rem' }}>
      <label
        htmlFor={htmlFor}
        style={{
          fontSize: '0.8125rem',
          fontWeight: 500,
          color: 'var(--f-text-label)',
          letterSpacing: '0',
        }}
      >
        {children}
      </label>
      {hint && (
        <span style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)', fontWeight: 400 }}>
          {hint}
        </span>
      )}
    </div>
  )
}

function NumberInput({
  id, label, value, onChange, min, max, prefix, hint,
}: {
  id: string; label: string; value: number; onChange: (v: number) => void
  min?: number; max?: number; prefix?: string; hint?: string
}) {
  const [raw, setRaw] = useState(() => String(value))

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const str = e.target.value
    setRaw(str)
    const n = parseFloat(str)
    if (!isNaN(n)) onChange(n)
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = 'var(--f-border-strong)'
    e.currentTarget.style.boxShadow = 'none'
    if (raw === '' || isNaN(parseFloat(raw))) {
      setRaw(String(value))
    }
  }

  return (
    <div>
      <FieldLabel htmlFor={id} hint={hint}>{label}</FieldLabel>
      <div style={{ position: 'relative' }}>
        {prefix && (
          <span
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '0.875rem',
              color: 'var(--f-text-faint)',
              pointerEvents: 'none',
            }}
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={raw}
          min={min}
          max={max}
          onChange={handleChange}
          style={{
            width: '100%',
            background: 'var(--f-input)',
            border: '1px solid var(--f-border-strong)',
            borderRadius: '7px',
            padding: prefix ? '0.5625rem 0.75rem 0.5625rem 1.625rem' : '0.5625rem 0.75rem',
            fontSize: '0.9375rem',
            color: 'var(--f-text-heading)',
            fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
            fontWeight: 450,
            outline: 'none',
            appearance: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--f-blue)'
            e.currentTarget.style.boxShadow = '0 0 0 3px oklch(0.50 0.18 258 / 0.12)'
          }}
          onBlur={handleBlur}
        />
      </div>
    </div>
  )
}

function SliderInput({
  id, label, value, onChange, min, max, step, displayValue, hint, tooltip,
}: {
  id: string; label: string; value: number; onChange: (v: number) => void
  min: number; max: number; step: number; displayValue: string; hint?: string; tooltip?: string
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
        <label
          htmlFor={id}
          style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--f-text-label)', display: 'flex', alignItems: 'center' }}
        >
          {label}
          {tooltip && <InfoTooltip text={tooltip} />}
        </label>
        <span
          style={{
            fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
            fontSize: '1.0625rem',
            fontWeight: 700,
            color: 'var(--f-blue)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {displayValue}
        </span>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(v) => onChange(v as number)}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4375rem' }}>
        <span style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)' }}>
          {(min * 100).toFixed(0)}%
        </span>
        {hint && <span style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)' }}>{hint}</span>}
        <span style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)' }}>
          {(max * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  )
}

function InfoTooltip({ text }: { text: string }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginLeft: '0.3rem' }}>
      <button
        type="button"
        aria-label="More information"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          border: '1.5px solid var(--f-text-faint)',
          background: 'transparent',
          color: 'var(--f-text-faint)',
          fontSize: '9px',
          fontWeight: 700,
          lineHeight: 1,
          cursor: 'default',
          padding: 0,
          flexShrink: 0,
        }}
      >
        i
      </button>
      {visible && (
        <span
          ref={ref}
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 6px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--f-text-heading)',
            color: 'var(--f-card)',
            fontSize: '0.6875rem',
            fontWeight: 400,
            lineHeight: 1.45,
            padding: '0.4rem 0.6rem',
            borderRadius: '6px',
            whiteSpace: 'normal',
            width: '200px',
            boxShadow: '0 4px 12px oklch(0 0 0 / 0.18)',
            zIndex: 50,
            pointerEvents: 'none',
          }}
        >
          {text}
          <span
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid var(--f-text-heading)',
            }}
          />
        </span>
      )}
    </span>
  )
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: '0.6875rem',
        fontWeight: 700,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        color: 'var(--f-text-faint)',
        marginBottom: '0.875rem',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid var(--f-border)',
      }}
    >
      {children}
    </p>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export function FireCalculator() {
  const [inputs, setInputs] = useState<FireInputs>(DEFAULTS)

  function set<K extends keyof FireInputs>(key: K, value: FireInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const results = useMemo(() => {
    const parsed = fireSchema.safeParse(inputs)
    if (!parsed.success) return null
    return calculateFire(parsed.data)
  }, [inputs])

  return (
    <div
      style={{
        background: 'var(--f-card)',
        border: '1px solid var(--f-border)',
        borderRadius: '12px',
        boxShadow: 'var(--f-shadow-lg)',
        overflow: 'hidden',
      }}
    >
      {/* ── Two columns: inputs | results ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.05fr)',
          borderBottom: results ? '1px solid var(--f-border)' : undefined,
        }}
      >
        {/* Inputs */}
        <div
          style={{
            padding: '1.75rem',
            borderRight: '1px solid var(--f-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.125rem',
          }}
        >
          <GroupLabel>Your Finances</GroupLabel>

          <NumberInput id="currentAge" label="Current Age" value={inputs.currentAge}
            onChange={(v) => set('currentAge', v)} min={18} max={80} hint="years old" />
          <NumberInput id="annualIncome" label="Annual Income" value={inputs.annualIncome}
            onChange={(v) => set('annualIncome', v)} prefix="$" min={1000} hint="pre-tax" />
          <NumberInput id="annualExpenses" label="Annual Expenses" value={inputs.annualExpenses}
            onChange={(v) => set('annualExpenses', v)} prefix="$" min={1000} hint="post-tax" />
          <NumberInput id="annualContributions" label="Annual Contributions" value={inputs.annualContributions}
            onChange={(v) => set('annualContributions', v)} prefix="$" min={0} hint="invested / year" />
          <NumberInput id="currentPortfolio" label="Current Portfolio" value={inputs.currentPortfolio}
            onChange={(v) => set('currentPortfolio', v)} prefix="$" min={0} hint="invested assets" />

          <GroupLabel>Rate Assumptions</GroupLabel>

          <SliderInput id="expectedReturn" label="Expected Return" value={inputs.expectedReturn}
            onChange={(v) => set('expectedReturn', v)} min={0.01} max={0.15} step={0.001}
            displayValue={`${(inputs.expectedReturn * 100).toFixed(1)}%`} hint="7% historical avg"
            tooltip="The average annual growth rate you expect your investments to earn. The US stock market has historically returned ~7% after inflation. Higher returns mean reaching FIRE sooner, but come with more risk." />
          <SliderInput id="inflationRate" label="Inflation Rate" value={inputs.inflationRate}
            onChange={(v) => set('inflationRate', v)} min={0} max={0.1} step={0.001}
            displayValue={`${(inputs.inflationRate * 100).toFixed(1)}%`} hint="3% typical"
            tooltip="The annual rate at which the cost of living rises. Inflation erodes your purchasing power over time, so your FIRE number must account for it. The US long-run average is around 3%." />
          <SliderInput id="withdrawalRate" label="Withdrawal Rate" value={inputs.withdrawalRate}
            onChange={(v) => set('withdrawalRate', v)} min={0.01} max={0.1} step={0.001}
            displayValue={`${(inputs.withdrawalRate * 100).toFixed(1)}%`} hint="4% rule"
            tooltip="How much of your portfolio you spend each year in retirement. A higher rate means you need less saved to retire — but your money runs out faster. The '4% rule' (Expenses ÷ 4% = FIRE number) has historically lasted 30+ years. Go lower (3–3.5%) for a longer, safer retirement." />
        </div>

        {/* Results */}
        <div style={{ background: 'oklch(0.985 0.004 258)', display: 'flex', flexDirection: 'column' }}>
          {results ? (
            <FireResults results={results} />
          ) : (
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem 2rem',
              }}
            >
              <p style={{ fontSize: '0.875rem', color: 'var(--f-text-faint)', fontWeight: 300 }}>
                Enter valid inputs to see your results.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      {results && (
        <div style={{ padding: '1.5rem 1.75rem 1.375rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--f-text-muted)', letterSpacing: '0.03em' }}>
              Portfolio Growth Projection
            </p>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              {[
                { color: 'var(--f-blue)', label: 'Portfolio value', dashed: false },
                { color: 'oklch(0.68 0.15 195)', label: 'FIRE target', dashed: true },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <div style={{
                    width: '18px',
                    height: '0',
                    borderTop: item.dashed ? `2px dashed ${item.color}` : `2.5px solid ${item.color}`,
                    borderRadius: '999px',
                  }} />
                  <span style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)', fontWeight: 400 }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <FireChart data={results.projectionData} fireNumber={results.fireNumber} />
        </div>
      )}
    </div>
  )
}
