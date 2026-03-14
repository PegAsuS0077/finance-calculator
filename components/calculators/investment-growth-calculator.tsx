// components/calculators/investment-growth-calculator.tsx
'use client'

import { useState, useMemo } from 'react'
import { Slider } from '@/components/ui/slider'
import { investmentGrowthSchema } from '@/lib/validation/investment-growth-schema'
import { calculateInvestmentGrowthResults } from '@/lib/calculators/investment-growth'
import type { InvestmentGrowthSchema } from '@/lib/validation/investment-growth-schema'
import { InvestmentGrowthResults } from './investment-growth-results'
import { InvestmentGrowthChart } from './investment-growth-chart'

const DEFAULTS: InvestmentGrowthSchema = {
  initialInvestment: 10_000,
  monthlyContribution: 500,
  annualReturn: 0.07,
  years: 20,
  compoundFrequency: 'monthly',
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
  id, label, value, onChange, prefix, hint,
}: {
  id: string; label: string; value: number; onChange: (v: number) => void
  prefix?: string; hint?: string
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
  id, label, value, onChange, min, max, step, displayValue, hint,
}: {
  id: string; label: string; value: number; onChange: (v: number) => void
  min: number; max: number; step: number; displayValue: string; hint?: string
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
        <label
          htmlFor={id}
          style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--f-text-label)' }}
        >
          {label}
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
          {min}
        </span>
        {hint && <span style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)' }}>{hint}</span>}
        <span style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)' }}>
          {max}
        </span>
      </div>
    </div>
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

// ─── Main component ───────────────────────────────────────────────────────────

export function InvestmentGrowthCalculator() {
  const [inputs, setInputs] = useState<InvestmentGrowthSchema>(DEFAULTS)

  function set<K extends keyof InvestmentGrowthSchema>(key: K, value: InvestmentGrowthSchema[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const results = useMemo(() => {
    const parsed = investmentGrowthSchema.safeParse(inputs)
    if (!parsed.success) return null
    return calculateInvestmentGrowthResults(parsed.data)
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
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)',
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
          <GroupLabel>Investment</GroupLabel>

          <NumberInput
            id="initialInvestment"
            label="Initial Investment"
            value={inputs.initialInvestment}
            onChange={(v) => set('initialInvestment', v)}
            prefix="$"
            hint="lump sum"
          />

          <NumberInput
            id="monthlyContribution"
            label="Monthly Contribution"
            value={inputs.monthlyContribution}
            onChange={(v) => set('monthlyContribution', v)}
            prefix="$"
            hint="per month"
          />

          <GroupLabel>Growth Assumptions</GroupLabel>

          <SliderInput
            id="annualReturn"
            label="Annual Return Rate"
            value={inputs.annualReturn}
            onChange={(v) => set('annualReturn', v)}
            min={0}
            max={0.20}
            step={0.001}
            displayValue={`${(inputs.annualReturn * 100).toFixed(1)}%`}
            hint="nominal"
          />

          <SliderInput
            id="years"
            label="Time Horizon"
            value={inputs.years}
            onChange={(v) => set('years', Math.round(v))}
            min={1}
            max={50}
            step={1}
            displayValue={`${inputs.years} yrs`}
          />

          <GroupLabel>Options</GroupLabel>

          <div>
            <FieldLabel htmlFor="compoundFrequency">Compound Frequency</FieldLabel>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['monthly', 'annual'] as const).map((freq) => (
                <button
                  key={freq}
                  onClick={() => set('compoundFrequency', freq)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '7px',
                    border: `1px solid ${inputs.compoundFrequency === freq ? 'var(--f-blue)' : 'var(--f-border-strong)'}`,
                    background: inputs.compoundFrequency === freq ? 'var(--f-blue-light)' : 'var(--f-input)',
                    color: inputs.compoundFrequency === freq ? 'var(--f-blue)' : 'var(--f-text-muted)',
                    fontSize: '0.8125rem',
                    fontWeight: inputs.compoundFrequency === freq ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textTransform: 'capitalize',
                  }}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div style={{ background: 'oklch(0.985 0.004 258)', display: 'flex', flexDirection: 'column' }}>
          {results ? (
            <InvestmentGrowthResults results={results} />
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
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--f-text-muted)', letterSpacing: '0.03em' }}>
              Portfolio Growth Over Time
            </p>
            <p style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)', fontWeight: 300, marginTop: '0.25rem' }}>
              Blue area = investment growth (compound interest). Lower area = your contributions.
            </p>
          </div>
          <InvestmentGrowthChart yearRows={results.yearRows} />
        </div>
      )}
    </div>
  )
}
