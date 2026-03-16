// components/calculators/lean-fire-results.tsx
'use client'

import type { LeanFireResults } from '@/lib/calculators/lean-fire'
import { formatCurrency, formatNumber } from '@/lib/utils/format'

interface LeanFireResultsProps {
  results: LeanFireResults
  annualLeanExpenses: number
}

export function LeanFireResults({ results, annualLeanExpenses }: LeanFireResultsProps) {
  const { leanFireNumber, regularFireNumber, fatFireNumber, yearsToFire, fireAge, remainingGap } = results

  const yearsDisplay = yearsToFire === Infinity ? '∞' : formatNumber(yearsToFire, 1)
  const fireAgeDisplay = fireAge === Infinity ? '—' : String(fireAge)
  const reachedFire = remainingGap === 0

  // Segmented bar: portfolio vs gap
  const currentPortfolio = Math.max(0, leanFireNumber - remainingGap)
  const totalForBar = Math.max(leanFireNumber, currentPortfolio)
  const portfolioPct = totalForBar > 0 ? (currentPortfolio / totalForBar) * 100 : 0
  const gapPct = 100 - portfolioPct

  const comparisonRows = [
    {
      type: 'Lean FIRE',
      annualExpenses: annualLeanExpenses,
      fireNumber: leanFireNumber,
      isHighlighted: true,
    },
    {
      type: 'Regular FIRE',
      annualExpenses: annualLeanExpenses * 1.5,
      fireNumber: regularFireNumber,
      isHighlighted: false,
    },
    {
      type: 'Fat FIRE',
      annualExpenses: annualLeanExpenses * 2.5,
      fireNumber: fatFireNumber,
      isHighlighted: false,
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Primary result */}
      <div
        style={{
          padding: '2rem 1.875rem 1.625rem',
          borderBottom: '1px solid var(--f-border)',
        }}
      >
        <p
          style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: reachedFire ? 'oklch(0.52 0.17 145)' : 'var(--f-blue)',
            marginBottom: '0.5rem',
          }}
        >
          {reachedFire ? 'Lean FIRE Reached' : 'Projected Lean FIRE Age'}
        </p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.625rem', marginBottom: '0.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
              fontSize: 'clamp(3rem, 6vw, 4.25rem)',
              fontWeight: 900,
              color: reachedFire ? 'oklch(0.52 0.17 145)' : 'var(--f-text-heading)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            {fireAgeDisplay}
          </span>
          {!reachedFire && fireAge !== Infinity && (
            <span
              style={{
                fontSize: '0.9375rem',
                color: 'var(--f-text-muted)',
                fontWeight: 300,
                paddingBottom: '0.5rem',
              }}
            >
              years old
            </span>
          )}
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--f-text-muted)', fontWeight: 300 }}>
          {yearsToFire === Infinity
            ? 'Increase contributions or reduce expenses to reach Lean FIRE'
            : yearsToFire <= 0
            ? 'Lean FIRE already achieved'
            : `${yearsDisplay} years from today`}
        </p>
      </div>

      {/* Lean FIRE number label */}
      <div
        style={{
          padding: '0.875rem 1.875rem',
          borderBottom: '1px solid var(--f-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{ fontSize: '0.8125rem', color: 'var(--f-text-faint)', fontWeight: 300 }}>
          Your Lean FIRE number at a{' '}
          <strong style={{ color: 'var(--f-text-body)', fontWeight: 500 }}>
            {(results.leanFireNumber > 0
              ? ((annualLeanExpenses / results.leanFireNumber) * 100).toFixed(0)
              : '4')}% withdrawal rate
          </strong>{' '}
          is:
        </span>
      </div>

      {/* Big Lean FIRE number with segmented bar */}
      <div
        style={{
          padding: '1.5rem 1.875rem',
          borderBottom: '1px solid var(--f-border)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: 'var(--f-blue)',
            letterSpacing: '-0.035em',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
        >
          {formatCurrency(leanFireNumber)}
        </p>

        {/* Segmented bar */}
        <div
          style={{
            display: 'flex',
            height: '6px',
            borderRadius: '999px',
            overflow: 'hidden',
            gap: '2px',
            background: 'var(--f-border)',
          }}
        >
          <div
            style={{
              flex: portfolioPct,
              background: 'var(--f-chart-1)',
              borderRadius: '999px',
              minWidth: portfolioPct > 0 ? '4px' : 0,
              transition: 'flex 0.4s ease',
            }}
          />
          <div
            style={{
              flex: gapPct,
              background: 'var(--f-chart-2)',
              borderRadius: '999px',
              minWidth: gapPct > 0 ? '4px' : 0,
              transition: 'flex 0.4s ease',
            }}
          />
        </div>
      </div>

      {/* FIRE comparison table */}
      <div style={{ borderBottom: '1px solid var(--f-border)' }}>
        {/* Table header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            padding: '0.625rem 1.875rem',
            borderBottom: '1px solid var(--f-border)',
          }}
        >
          {['Type', 'Annual Exp.', 'FIRE Number'].map((h) => (
            <span
              key={h}
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--f-text-faint)',
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Table rows */}
        {comparisonRows.map((row) => (
          <div
            key={row.type}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              padding: '0.75rem 1.875rem',
              borderBottom: '1px solid var(--f-border)',
              background: row.isHighlighted ? 'var(--f-blue-light)' : 'transparent',
            }}
          >
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: row.isHighlighted ? 600 : 400,
                color: row.isHighlighted ? 'var(--f-blue)' : 'var(--f-text-body)',
              }}
            >
              {row.type}
            </span>
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: row.isHighlighted ? 600 : 400,
                color: row.isHighlighted ? 'var(--f-blue)' : 'var(--f-text-body)',
                fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
              }}
            >
              {formatCurrency(row.annualExpenses)}
            </span>
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: row.isHighlighted ? 700 : 500,
                color: row.isHighlighted ? 'var(--f-blue)' : 'var(--f-text-heading)',
                fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
                letterSpacing: '-0.01em',
              }}
            >
              {formatCurrency(row.fireNumber)}
            </span>
          </div>
        ))}
      </div>

      {/* Summary: remaining gap + years to FIRE */}
      <div style={{ padding: '0.25rem 0', flex: 1 }}>
        {[
          {
            label: 'Remaining Gap',
            value: reachedFire ? 'Reached' : formatCurrency(remainingGap),
            color: 'var(--f-chart-2)',
          },
          {
            label: 'Current Portfolio',
            value: formatCurrency(currentPortfolio),
            color: 'var(--f-chart-1)',
          },
        ].map((row) => (
          <div
            key={row.label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 1.875rem',
              borderBottom: '1px solid var(--f-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: row.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: '0.8125rem', color: 'var(--f-text-body)', fontWeight: 400 }}>
                {row.label}
              </span>
            </div>
            <span
              style={{
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: 'var(--f-text-heading)',
                fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
                letterSpacing: '-0.01em',
              }}
            >
              {row.value}
            </span>
          </div>
        ))}

        {/* Years to FIRE summary */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.875rem',
          }}
        >
          <span style={{ fontSize: '0.8125rem', color: 'var(--f-text-muted)', fontWeight: 300 }}>
            Years to Lean FIRE
          </span>
          <span
            style={{
              fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
              fontSize: '1.375rem',
              fontWeight: 700,
              color: reachedFire ? 'oklch(0.52 0.17 145)' : 'var(--f-text-heading)',
              letterSpacing: '-0.025em',
            }}
          >
            {yearsToFire === Infinity ? '∞' : `${yearsDisplay} yr`}
          </span>
        </div>
      </div>
    </div>
  )
}
