// components/calculators/coast-fire-calculator.tsx
'use client'

import { useState, useMemo } from 'react'
import { Slider } from '@/components/ui/slider'
import { coastFireSchema, type CoastFireInputs } from '@/lib/validation/coast-fire-schema'
import { calculateCoastFireResults } from '@/lib/calculators/coast-fire'
import { CoastFireResults } from './coast-fire-results'
import { CoastFireChart } from './coast-fire-chart'

const DEFAULTS: CoastFireInputs = {
  currentAge: 30,
  retirementAge: 65,
  annualExpenses: 40_000,
  withdrawalRate: 0.04,
  annualReturn: 0.07,
  currentPortfolio: 0,
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

export function CoastFireCalculator() {
  const [inputs, setInputs] = useState<CoastFireInputs>(DEFAULTS)

  function set<K extends keyof CoastFireInputs>(key: K, value: CoastFireInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const results = useMemo(() => {
    const parsed = coastFireSchema.safeParse(inputs)
    if (!parsed.success) return null
    return calculateCoastFireResults(parsed.data)
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
          <GroupLabel>Your Profile</GroupLabel>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
            <NumberInput
              id="currentAge"
              label="Current Age"
              value={inputs.currentAge}
              onChange={(v) => set('currentAge', Math.round(v))}
              hint="years"
            />
            <NumberInput
              id="retirementAge"
              label="Retirement Age"
              value={inputs.retirementAge}
              onChange={(v) => set('retirementAge', Math.round(v))}
              hint="years"
            />
          </div>

          <NumberInput
            id="currentPortfolio"
            label="Current Portfolio"
            value={inputs.currentPortfolio}
            onChange={(v) => set('currentPortfolio', v)}
            prefix="$"
            hint="invested today"
          />

          <GroupLabel>Retirement Assumptions</GroupLabel>

          <NumberInput
            id="annualExpenses"
            label="Annual Expenses in Retirement"
            value={inputs.annualExpenses}
            onChange={(v) => set('annualExpenses', v)}
            prefix="$"
            hint="per year"
          />

          <SliderInput
            id="withdrawalRate"
            label="Withdrawal Rate"
            value={inputs.withdrawalRate}
            onChange={(v) => set('withdrawalRate', v)}
            min={0.01}
            max={0.10}
            step={0.001}
            displayValue={`${(inputs.withdrawalRate * 100).toFixed(1)}%`}
            hint="4% rule"
          />

          <SliderInput
            id="annualReturn"
            label="Expected Annual Return"
            value={inputs.annualReturn}
            onChange={(v) => set('annualReturn', v)}
            min={0.01}
            max={0.15}
            step={0.001}
            displayValue={`${(inputs.annualReturn * 100).toFixed(1)}%`}
            hint="nominal"
          />
        </div>

        {/* Results */}
        <div style={{ background: 'oklch(0.985 0.004 258)', display: 'flex', flexDirection: 'column' }}>
          {results ? (
            <CoastFireResults results={results} />
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
              Portfolio Growth to FIRE Target
            </p>
            <p style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)', fontWeight: 300, marginTop: '0.25rem' }}>
              Compound growth from your Coast FIRE number to your full FIRE target — no contributions needed
            </p>
          </div>
          <CoastFireChart
            chartData={results.chartData}
            fireNumber={results.fireNumber}
            coastFireNumber={results.coastFireNumber}
          />
        </div>
      )}
    </div>
  )
}
