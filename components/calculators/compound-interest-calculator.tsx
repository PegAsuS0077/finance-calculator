// components/calculators/compound-interest-calculator.tsx
'use client'

import { useState, useMemo } from 'react'
import { Slider } from '@/components/ui/slider'
import { compoundInterestSchema } from '@/lib/validation/compound-interest-schema'
import { calculateCompoundInterestResults } from '@/lib/calculators/compound-interest'
import type { CompoundInterestSchema } from '@/lib/validation/compound-interest-schema'
import type { CompoundFrequency } from '@/lib/calculators/compound-interest'
import { CompoundInterestResults } from './compound-interest-results'
import { CompoundInterestChart } from './compound-interest-chart'

const DEFAULTS: CompoundInterestSchema = {
  principal: 1_000,
  annualRate: 0.08,
  years: 10,
  compoundFrequency: 'monthly',
  annualContribution: 0,
}

const FREQUENCY_LABELS: Record<CompoundFrequency, string> = {
  daily: 'Daily',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  annually: 'Annually',
}

// ─── Input primitives ─────────────────────────────────────────────────────────

function FieldLabel({ htmlFor, children, hint }: { htmlFor: string; children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4375rem' }}>
      <label
        htmlFor={htmlFor}
        style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--f-text-label)', letterSpacing: '0' }}
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
  id, label, value, onChange, prefix, suffix, hint,
}: {
  id: string; label: string; value: number; onChange: (v: number) => void
  prefix?: string; suffix?: string; hint?: string
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
    if (raw === '' || isNaN(parseFloat(raw))) setRaw(String(value))
  }

  return (
    <div>
      <FieldLabel htmlFor={id} hint={hint}>{label}</FieldLabel>
      <div style={{ position: 'relative' }}>
        {prefix && (
          <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.875rem', color: 'var(--f-text-faint)', pointerEvents: 'none' }}>
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
            padding: prefix ? '0.5625rem 0.75rem 0.5625rem 1.625rem' : suffix ? '0.5625rem 2rem 0.5625rem 0.75rem' : '0.5625rem 0.75rem',
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
        {suffix && (
          <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.875rem', color: 'var(--f-text-faint)', pointerEvents: 'none' }}>
            {suffix}
          </span>
        )}
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
        <label htmlFor={id} style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--f-text-label)' }}>
          {label}
        </label>
        <span style={{ fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif', fontSize: '1.0625rem', fontWeight: 700, color: 'var(--f-blue)', letterSpacing: '-0.02em', lineHeight: 1 }}>
          {displayValue}
        </span>
      </div>
      <Slider id={id} min={min} max={max} step={step} value={value} onValueChange={(v) => onChange(v as number)} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4375rem' }}>
        <span style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)' }}>{min}</span>
        {hint && <span style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)' }}>{hint}</span>}
        <span style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)' }}>{max}</span>
      </div>
    </div>
  )
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--f-text-faint)', marginBottom: '0.875rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--f-border)' }}>
      {children}
    </p>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CompoundInterestCalculator() {
  const [inputs, setInputs] = useState<CompoundInterestSchema>(DEFAULTS)

  function set<K extends keyof CompoundInterestSchema>(key: K, value: CompoundInterestSchema[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const results = useMemo(() => {
    const parsed = compoundInterestSchema.safeParse(inputs)
    if (!parsed.success) return null
    return calculateCompoundInterestResults(parsed.data)
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
        <div style={{ padding: '1.75rem', borderRight: '1px solid var(--f-border)', display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
          <GroupLabel>Starting Amount</GroupLabel>

          <NumberInput
            id="principal"
            label="Initial Principal"
            value={inputs.principal}
            onChange={(v) => set('principal', v)}
            prefix="$"
            hint="starting balance"
          />

          <NumberInput
            id="annualContribution"
            label="Annual Contribution"
            value={inputs.annualContribution}
            onChange={(v) => set('annualContribution', v)}
            prefix="$"
            hint="per year (optional)"
          />

          <GroupLabel>Growth Settings</GroupLabel>

          <SliderInput
            id="annualRate"
            label="Annual Interest Rate"
            value={inputs.annualRate}
            onChange={(v) => set('annualRate', v)}
            min={0}
            max={0.30}
            step={0.001}
            displayValue={`${(inputs.annualRate * 100).toFixed(1)}%`}
          />

          <SliderInput
            id="years"
            label="Time Period"
            value={inputs.years}
            onChange={(v) => set('years', Math.round(v))}
            min={1}
            max={50}
            step={1}
            displayValue={`${inputs.years} yrs`}
          />

          <GroupLabel>Compounding</GroupLabel>

          <div>
            <FieldLabel htmlFor="compoundFrequency">Compound Frequency</FieldLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {(['daily', 'monthly', 'quarterly', 'annually'] as CompoundFrequency[]).map((freq) => (
                <button
                  key={freq}
                  onClick={() => set('compoundFrequency', freq)}
                  style={{
                    padding: '0.4375rem',
                    borderRadius: '7px',
                    border: `1px solid ${inputs.compoundFrequency === freq ? 'var(--f-blue)' : 'var(--f-border-strong)'}`,
                    background: inputs.compoundFrequency === freq ? 'var(--f-blue-light)' : 'var(--f-input)',
                    color: inputs.compoundFrequency === freq ? 'var(--f-blue)' : 'var(--f-text-muted)',
                    fontSize: '0.75rem',
                    fontWeight: inputs.compoundFrequency === freq ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {FREQUENCY_LABELS[freq]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div style={{ background: 'oklch(0.985 0.004 258)', display: 'flex', flexDirection: 'column' }}>
          {results ? (
            <CompoundInterestResults results={results} annualRate={inputs.annualRate} />
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem' }}>
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
              Growth Over Time
            </p>
            <p style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)', fontWeight: 300, marginTop: '0.25rem' }}>
              Blue area = interest earned (compound growth). Lower area = your principal and contributions.
            </p>
          </div>
          <CompoundInterestChart yearRows={results.yearRows} />
        </div>
      )}
    </div>
  )
}
