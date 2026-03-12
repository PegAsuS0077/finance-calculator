// components/calculators/fire-calculator.tsx
'use client'

import { useState, useMemo } from 'react'
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

// ─── Input primitives ────────────────────────────────────────────────────────

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: 'block',
        fontSize: '0.6875rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'oklch(0.45 0.01 260)',
        marginBottom: '0.5rem',
      }}
    >
      {children}
    </label>
  )
}

function NumberInput({
  id,
  label,
  value,
  onChange,
  min,
  max,
  prefix,
}: {
  id: string
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  prefix?: string
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div style={{ position: 'relative' }}>
        {prefix && (
          <span
            style={{
              position: 'absolute',
              left: '0.875rem',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '0.875rem',
              color: 'oklch(0.42 0.01 260)',
              pointerEvents: 'none',
              fontWeight: 400,
            }}
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            width: '100%',
            background: 'oklch(0.11 0.004 260)',
            border: '1px solid oklch(0.22 0.008 260)',
            borderRadius: '4px',
            padding: prefix
              ? '0.625rem 0.75rem 0.625rem 1.75rem'
              : '0.625rem 0.75rem',
            fontSize: '0.9375rem',
            color: 'oklch(0.92 0.005 260)',
            fontFamily: 'var(--font-dm-sans), ui-sans-serif, sans-serif',
            fontWeight: 400,
            outline: 'none',
            appearance: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'oklch(0.65 0.12 68)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'oklch(0.22 0.008 260)'
          }}
        />
      </div>
    </div>
  )
}

function SliderInput({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  displayValue,
}: {
  id: string
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  displayValue: string
}) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: '0.625rem',
        }}
      >
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <span
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1rem',
            fontWeight: 700,
            color: 'oklch(0.78 0.16 68)',
            letterSpacing: '-0.01em',
            lineHeight: 1,
            marginLeft: '0.75rem',
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.375rem',
        }}
      >
        <span style={{ fontSize: '0.6875rem', color: 'oklch(0.32 0.01 260)' }}>
          {(min * 100).toFixed(0)}%
        </span>
        <span style={{ fontSize: '0.6875rem', color: 'oklch(0.32 0.01 260)' }}>
          {(max * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  )
}

function SectionDivider({ label }: { label: string }) {
  return (
    <p
      style={{
        fontSize: '0.6875rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'oklch(0.30 0.007 260)',
        paddingBottom: '0.875rem',
        borderBottom: '1px solid oklch(0.20 0.006 260)',
        marginBottom: '0',
      }}
    >
      {label}
    </p>
  )
}

function LegendItem({
  color,
  label,
  dashed,
}: {
  color: string
  label: string
  dashed?: boolean
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
      <div
        style={{
          width: '18px',
          height: '0',
          borderTop: dashed ? `2px dashed ${color}` : `2.5px solid ${color}`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: '0.6875rem',
          color: 'oklch(0.40 0.01 260)',
          fontWeight: 400,
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {/* ── Two-column: inputs left | results right ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '1px',
          background: 'oklch(0.22 0.008 260)',
          border: '1px solid oklch(0.22 0.008 260)',
          borderRadius: results ? '6px 6px 0 0' : '6px',
          overflow: 'hidden',
        }}
      >
        {/* ── Inputs Panel ── */}
        <div
          style={{
            background: 'oklch(0.14 0.005 260)',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.125rem',
          }}
        >
          <SectionDivider label="Your Numbers" />

          <NumberInput
            id="currentAge"
            label="Current Age"
            value={inputs.currentAge}
            onChange={(v) => set('currentAge', v)}
            min={18}
            max={80}
          />
          <NumberInput
            id="annualIncome"
            label="Annual Income"
            value={inputs.annualIncome}
            onChange={(v) => set('annualIncome', v)}
            prefix="$"
            min={1000}
          />
          <NumberInput
            id="annualExpenses"
            label="Annual Expenses"
            value={inputs.annualExpenses}
            onChange={(v) => set('annualExpenses', v)}
            prefix="$"
            min={1000}
          />
          <NumberInput
            id="annualContributions"
            label="Annual Contributions"
            value={inputs.annualContributions}
            onChange={(v) => set('annualContributions', v)}
            prefix="$"
            min={0}
          />
          <NumberInput
            id="currentPortfolio"
            label="Current Portfolio"
            value={inputs.currentPortfolio}
            onChange={(v) => set('currentPortfolio', v)}
            prefix="$"
            min={0}
          />

          {/* Rate sliders */}
          <SectionDivider label="Rate Assumptions" />

          <SliderInput
            id="expectedReturn"
            label="Expected Return"
            value={inputs.expectedReturn}
            onChange={(v) => set('expectedReturn', v)}
            min={0.01}
            max={0.15}
            step={0.001}
            displayValue={`${(inputs.expectedReturn * 100).toFixed(1)}%`}
          />
          <SliderInput
            id="inflationRate"
            label="Inflation Rate"
            value={inputs.inflationRate}
            onChange={(v) => set('inflationRate', v)}
            min={0}
            max={0.1}
            step={0.001}
            displayValue={`${(inputs.inflationRate * 100).toFixed(1)}%`}
          />
          <SliderInput
            id="withdrawalRate"
            label="Withdrawal Rate"
            value={inputs.withdrawalRate}
            onChange={(v) => set('withdrawalRate', v)}
            min={0.01}
            max={0.1}
            step={0.001}
            displayValue={`${(inputs.withdrawalRate * 100).toFixed(1)}%`}
          />
        </div>

        {/* ── Results Panel ── */}
        <div
          style={{
            background: 'oklch(0.13 0.005 260)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {results ? (
            <FireResults results={results} />
          ) : (
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
              }}
            >
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'oklch(0.32 0.01 260)',
                  fontWeight: 300,
                }}
              >
                Enter valid inputs to see results.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Chart — full width below ── */}
      {results && (
        <div
          style={{
            background: 'oklch(0.12 0.004 260)',
            border: '1px solid oklch(0.22 0.008 260)',
            borderTop: 'none',
            borderRadius: '0 0 6px 6px',
            padding: '1.5rem 1.75rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
            }}
          >
            <p
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'oklch(0.30 0.008 260)',
              }}
            >
              Portfolio Growth Projection
            </p>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <LegendItem color="oklch(0.78 0.16 68)" label="Portfolio" />
              <LegendItem color="oklch(0.72 0.14 68)" label="FIRE Target" dashed />
            </div>
          </div>
          <FireChart data={results.projectionData} fireNumber={results.fireNumber} />
        </div>
      )}
    </div>
  )
}
