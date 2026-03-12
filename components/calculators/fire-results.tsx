// components/calculators/fire-results.tsx
'use client'

import type { FireResults } from '@/lib/calculators/fire'
import { formatCurrency, formatNumber } from '@/lib/utils/format'

interface FireResultsProps {
  results: FireResults
}

// Segmented horizontal bar — like the mouon reference
function SegmentedBar({ segments }: { segments: Array<{ color: string; pct: number }> }) {
  return (
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
      {segments.map((seg, i) => (
        <div
          key={i}
          style={{
            flex: seg.pct,
            background: seg.color,
            borderRadius: '999px',
            minWidth: seg.pct > 0 ? '4px' : 0,
            transition: 'flex 0.4s ease',
          }}
        />
      ))}
    </div>
  )
}

export function FireResults({ results }: FireResultsProps) {
  const { fireNumber, yearsToFire, fireAge, remainingGap } = results

  const yearsDisplay = yearsToFire === Infinity ? '∞' : formatNumber(yearsToFire, 1)
  const fireAgeDisplay = fireAge === Infinity ? '—' : String(fireAge)
  const reachedFire = remainingGap === 0

  // Compute portfolio-vs-target ratio for the segmented bar
  const currentPortfolio = Math.max(0, fireNumber - remainingGap)
  const totalForBar = Math.max(fireNumber, currentPortfolio)
  const portfolioPct = totalForBar > 0 ? (currentPortfolio / totalForBar) * 100 : 0
  const gapPct = 100 - portfolioPct

  // Breakdown rows — what makes up your FIRE plan
  const annualWithdrawal = fireNumber * 0.04
  const savingsRate = currentPortfolio > 0
    ? Math.min(100, Math.round((currentPortfolio / fireNumber) * 100))
    : 0

  const breakdownRows = [
    {
      label: 'Current Portfolio',
      value: formatCurrency(currentPortfolio),
      color: 'var(--f-chart-1)',
      pct: portfolioPct.toFixed(1) + '%',
    },
    {
      label: 'Remaining Gap',
      value: reachedFire ? 'Reached' : formatCurrency(remainingGap),
      color: 'var(--f-chart-2)',
      pct: reachedFire ? '0%' : gapPct.toFixed(1) + '%',
    },
    {
      label: 'Annual Withdrawal',
      value: formatCurrency(annualWithdrawal),
      color: 'var(--f-chart-3)',
      pct: '4% rule',
    },
    {
      label: 'Progress to FIRE',
      value: `${savingsRate}%`,
      color: 'var(--f-chart-4)',
      pct: `${savingsRate}% funded`,
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
          {reachedFire ? 'Financial Independence Reached' : 'Projected Retirement Age'}
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
            ? 'Increase contributions or reduce expenses to reach FIRE'
            : yearsToFire <= 0
            ? 'Financial independence already achieved'
            : `${yearsDisplay} years from today`}
        </p>
      </div>

      {/* Toggle: Monthly / Annual (visual only, matches reference) */}
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
          Your FIRE number based on a{' '}
          <strong style={{ color: 'var(--f-text-body)', fontWeight: 500 }}>4% withdrawal rate</strong>
          {' '}is:
        </span>
      </div>

      {/* Big FIRE number */}
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
          {formatCurrency(fireNumber)}
        </p>

        {/* Segmented bar */}
        <SegmentedBar
          segments={[
            { color: 'var(--f-chart-1)', pct: portfolioPct },
            { color: 'var(--f-chart-2)', pct: gapPct },
          ]}
        />
      </div>

      {/* Breakdown rows */}
      <div style={{ padding: '0.25rem 0', flex: 1 }}>
        {breakdownRows.map((row) => (
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--f-text-faint)', fontWeight: 300 }}>
                {row.pct}
              </span>
              <span
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--f-text-heading)',
                  minWidth: '80px',
                  textAlign: 'right',
                  fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
                  letterSpacing: '-0.01em',
                }}
              >
                {row.value}
              </span>
            </div>
          </div>
        ))}

        {/* Summary stat: Years to FIRE */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.875rem',
          }}
        >
          <span style={{ fontSize: '0.8125rem', color: 'var(--f-text-muted)', fontWeight: 300 }}>
            Years to FIRE
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
