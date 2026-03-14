// components/calculators/retirement-timeline-results.tsx
'use client'

import type { RetirementTimelineResults } from '@/lib/calculators/retirement-timeline'
import { formatCurrency } from '@/lib/utils/format'

interface RetirementTimelineResultsProps {
  results: RetirementTimelineResults
  currentAge: number
}

export function RetirementTimelineResults({ results, currentAge }: RetirementTimelineResultsProps) {
  const { fireNumber, annualContributions, yearsToFI, retirementAge, savingsRate, scenarios } = results

  const alreadyFI = yearsToFI === 0
  const cannotReachFI = yearsToFI >= 100 && annualContributions === 0

  const scenarioColors = [
    'var(--f-text-heading)', // current plan
    'oklch(0.48 0.18 145)',  // cut 10%
    'oklch(0.44 0.18 145)',  // cut 20%
    'oklch(0.40 0.18 145)',  // cut 30%
    'oklch(0.48 0.18 258)',  // +10% contrib
    'oklch(0.44 0.18 258)',  // +20% contrib
    'oklch(0.40 0.18 258)',  // +30% contrib
    'oklch(0.50 0.18 300)',  // +1% return
    'oklch(0.44 0.18 300)',  // +2% return
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
            color: alreadyFI ? 'oklch(0.50 0.18 145)' : cannotReachFI ? 'oklch(0.50 0.18 25)' : 'var(--f-blue)',
            marginBottom: '0.5rem',
          }}
        >
          {alreadyFI ? 'Already Financially Independent!' : cannotReachFI ? 'Cannot Reach FI' : 'Retirement Age'}
        </p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: cannotReachFI ? 'oklch(0.50 0.18 25)' : 'var(--f-text-heading)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            {alreadyFI ? currentAge : cannotReachFI ? '100+' : retirementAge}
          </span>
          {!cannotReachFI && (
            <span
              style={{
                fontSize: '0.9375rem',
                color: 'var(--f-text-muted)',
                fontWeight: 300,
                marginBottom: '0.4rem',
              }}
            >
              yrs old
            </span>
          )}
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--f-text-muted)', fontWeight: 300 }}>
          {alreadyFI
            ? 'Your portfolio already covers your FIRE number. You have reached financial independence.'
            : cannotReachFI
            ? 'Your expenses equal or exceed your income. Reduce expenses or increase income to build a savings buffer.'
            : `${yearsToFI >= 100 ? '100+' : yearsToFI.toFixed(1)} years from now — contributing ${formatCurrency(annualContributions)}/yr toward a ${formatCurrency(fireNumber)} FIRE target.`}
        </p>
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
          { label: 'Years to FI', value: yearsToFI >= 100 ? '100+ yrs' : `${yearsToFI.toFixed(1)} yrs` },
          { label: 'Annual Savings', value: formatCurrency(annualContributions) },
          { label: 'Savings Rate', value: `${(savingsRate * 100).toFixed(1)}%` },
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

      {/* Scenario comparison table */}
      <div style={{ padding: '1.25rem 1.875rem', flex: 1, overflowX: 'auto' }}>
        <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--f-text-faint)', marginBottom: '0.75rem' }}>
          What-If Scenarios
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr>
              {['Scenario', 'FIRE Target', 'Years to FI', 'Retire at'].map((col) => (
                <th
                  key={col}
                  style={{
                    textAlign: 'left',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: 'var(--f-text-faint)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid var(--f-border)',
                    paddingRight: '0.75rem',
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scenarios.map((row, i) => {
              const isBase = i === 0
              return (
                <tr
                  key={row.label}
                  style={{
                    background: isBase ? 'oklch(0.96 0.02 258)' : undefined,
                  }}
                >
                  <td
                    style={{
                      padding: '0.4375rem 0.75rem 0.4375rem 0.5rem',
                      fontWeight: isBase ? 700 : 400,
                      color: isBase ? 'var(--f-blue)' : 'var(--f-text-muted)',
                      borderBottom: '1px solid var(--f-border)',
                      whiteSpace: 'nowrap',
                      fontSize: '0.8125rem',
                    }}
                  >
                    {row.label}
                    {isBase && (
                      <span style={{ marginLeft: '0.375rem', fontSize: '0.625rem', color: 'var(--f-blue)', fontWeight: 600 }}>
                        ← you
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '0.4375rem 0.75rem 0.4375rem 0', color: 'var(--f-text-body)', borderBottom: '1px solid var(--f-border)', whiteSpace: 'nowrap' }}>
                    {formatCurrency(row.fireNumber)}
                  </td>
                  <td
                    style={{
                      padding: '0.4375rem 0.75rem 0.4375rem 0',
                      fontWeight: isBase ? 700 : 400,
                      color: scenarioColors[i],
                      fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
                      borderBottom: '1px solid var(--f-border)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.yearsToFI >= 100 ? '100+' : row.yearsToFI.toFixed(1)} yrs
                  </td>
                  <td
                    style={{
                      padding: '0.4375rem 0 0.4375rem 0',
                      fontWeight: isBase ? 700 : 400,
                      color: isBase ? 'var(--f-blue)' : scenarioColors[i],
                      fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
                      borderBottom: '1px solid var(--f-border)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    age {row.retirementAge >= currentAge + 100 ? '100+' : row.retirementAge}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
