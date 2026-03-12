// components/calculators/fire-results.tsx
'use client'

import type { FireResults } from '@/lib/calculators/fire'
import { formatCurrency, formatNumber } from '@/lib/utils/format'

interface FireResultsProps {
  results: FireResults
}

export function FireResults({ results }: FireResultsProps) {
  const { fireNumber, yearsToFire, fireAge, remainingGap } = results

  const yearsDisplay =
    yearsToFire === Infinity ? '∞' : formatNumber(yearsToFire, 1)

  const fireAgeDisplay = fireAge === Infinity ? '—' : String(fireAge)

  const gapDisplay =
    remainingGap === 0 ? 'Reached' : formatCurrency(remainingGap)

  const reachedFire = remainingGap === 0

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1px',
        background: 'var(--fire-charcoal-border)',
        border: '1px solid var(--fire-charcoal-border)',
        borderRadius: '6px',
        overflow: 'hidden',
      }}
    >
      {/* Hero result — FIRE Age */}
      <div
        style={{
          background: reachedFire
            ? 'oklch(0.22 0.06 68)'
            : 'var(--fire-charcoal-mid)',
          padding: '1.75rem 1.5rem',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div>
          <p
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--fire-amber)',
              marginBottom: '0.5rem',
            }}
          >
            {reachedFire ? 'You have reached FIRE' : 'Retire at age'}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(3rem, 6vw, 4.5rem)',
              fontWeight: 900,
              color: reachedFire ? 'var(--fire-amber)' : 'oklch(0.97 0.005 260)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            {fireAgeDisplay}
          </p>
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--fire-text-muted)',
              marginTop: '0.5rem',
              fontWeight: 300,
            }}
          >
            {yearsToFire === Infinity
              ? 'Increase contributions to reach FIRE'
              : yearsToFire <= 0
              ? 'Financial independence achieved'
              : `${yearsDisplay} years from now`}
          </p>
        </div>
        {/* Visual accent */}
        <div
          aria-hidden
          style={{
            width: '48px',
            height: '48px',
            border: '2px solid oklch(0.78 0.16 68 / 0.25)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              background: 'var(--fire-amber)',
              borderRadius: '50%',
            }}
          />
        </div>
      </div>

      {/* Secondary results — 3-column row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'var(--fire-charcoal-border)',
        }}
      >
        <StatCell
          label="FIRE Number"
          value={formatCurrency(fireNumber)}
          sub="Target portfolio"
        />
        <StatCell
          label="Years to FIRE"
          value={yearsToFire === Infinity ? '∞' : `${yearsDisplay} yr`}
          sub="From today"
        />
        <StatCell
          label="Remaining Gap"
          value={gapDisplay}
          sub={reachedFire ? 'Congratulations' : 'Still needed'}
          highlight={reachedFire}
        />
      </div>
    </div>
  )
}

function StatCell({
  label,
  value,
  sub,
  highlight,
}: {
  label: string
  value: string
  sub?: string
  highlight?: boolean
}) {
  return (
    <div
      style={{
        background: 'var(--fire-charcoal)',
        padding: '1.25rem 1.5rem',
      }}
    >
      <p
        style={{
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--fire-text-dim)',
          marginBottom: '0.375rem',
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
          fontWeight: 700,
          color: highlight ? 'var(--fire-amber)' : 'oklch(0.92 0.005 260)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </p>
      {sub && (
        <p
          style={{
            fontSize: '0.6875rem',
            color: 'var(--fire-text-dim)',
            marginTop: '0.25rem',
            fontWeight: 300,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  )
}
