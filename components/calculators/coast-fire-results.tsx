// components/calculators/coast-fire-results.tsx
'use client'

import type { CoastFireResults } from '@/lib/calculators/coast-fire'
import { formatCurrency } from '@/lib/utils/format'

interface CoastFireResultsProps {
  results: CoastFireResults
}

export function CoastFireResults({ results }: CoastFireResultsProps) {
  const { fireNumber, coastFireNumber, yearsOfGrowth, gap, alreadyCoasted, progressPercent } = results

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
            color: alreadyCoasted ? 'oklch(0.50 0.18 145)' : 'var(--f-blue)',
            marginBottom: '0.5rem',
          }}
        >
          {alreadyCoasted ? 'Coast FIRE Reached!' : 'Coast FIRE Number'}
        </p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: 'var(--f-text-heading)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            {formatCurrency(coastFireNumber)}
          </span>
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--f-text-muted)', fontWeight: 300 }}>
          {alreadyCoasted
            ? 'You\'ve already reached Coast FIRE — your portfolio will grow to your FIRE number without contributions.'
            : 'Invest this today and let compound growth carry you to retirement — no more contributions needed.'}
        </p>

        {/* Progress bar */}
        <div style={{ marginTop: '1.125rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
            <span style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)', fontWeight: 400 }}>Progress to Coast FIRE</span>
            <span
              style={{
                fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: alreadyCoasted ? 'oklch(0.50 0.18 145)' : 'var(--f-blue)',
              }}
            >
              {progressPercent}%
            </span>
          </div>
          <div style={{ background: 'var(--f-border)', borderRadius: '99px', height: '6px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: alreadyCoasted
                  ? 'linear-gradient(90deg, oklch(0.60 0.18 145), oklch(0.50 0.18 145))'
                  : 'linear-gradient(90deg, oklch(0.55 0.18 258), oklch(0.45 0.18 258))',
                borderRadius: '99px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* Key metrics */}
      <div
        style={{
          padding: '1.25rem 1.875rem',
          borderBottom: '1px solid var(--f-border)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}
      >
        {[
          { label: 'FIRE Number', value: formatCurrency(fireNumber) },
          { label: 'Years of Growth', value: `${yearsOfGrowth} yrs` },
        ].map((item) => (
          <div key={item.label}>
            <p style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)', fontWeight: 400, marginBottom: '0.3rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {item.label}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
                fontSize: '1.1875rem',
                fontWeight: 700,
                color: 'var(--f-blue)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Gap / status */}
      <div style={{ padding: '1.25rem 1.875rem', flex: 1 }}>
        {alreadyCoasted ? (
          <div
            style={{
              background: 'oklch(0.96 0.02 145)',
              border: '1px solid oklch(0.80 0.10 145)',
              borderRadius: '8px',
              padding: '1rem 1.125rem',
            }}
          >
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'oklch(0.40 0.18 145)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '0.375rem',
              }}
            >
              You're coasting!
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'oklch(0.35 0.12 145)', lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
              Your portfolio is large enough that compound growth alone will reach your FIRE number by retirement. You can stop making contributions if you choose.
            </p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)', fontWeight: 400, marginBottom: '0.3rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Additional savings needed
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 800,
                color: 'var(--f-text-heading)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginBottom: '0.375rem',
              }}
            >
              {formatCurrency(gap)}
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--f-text-muted)', fontWeight: 300, margin: 0 }}>
              Gap between your current portfolio and your Coast FIRE number
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
