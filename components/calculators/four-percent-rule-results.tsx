// components/calculators/four-percent-rule-results.tsx
'use client'

import type { FourPercentRuleResults } from '@/lib/calculators/four-percent-rule'
import { formatCurrency } from '@/lib/utils/format'

interface Props {
  results: FourPercentRuleResults
}

function formatDuration(years: number | null): string {
  if (years === null) return 'Indefinite ∞'
  if (years >= 60) return '60+ years'
  return `${years.toFixed(1)} years`
}

export function FourPercentRuleResults({ results }: Props) {
  const { annualWithdrawal, monthlyWithdrawal, portfolioDuration, isSafe, comparisonTable } = results

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
            color: 'var(--f-blue)',
            marginBottom: '0.5rem',
          }}
        >
          Annual Safe Withdrawal
        </p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 900,
              color: 'var(--f-text-heading)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            {formatCurrency(annualWithdrawal)}
          </span>
          <span style={{ fontSize: '0.875rem', color: 'var(--f-text-faint)', fontWeight: 300, paddingBottom: '0.375rem' }}>
            / year
          </span>
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--f-text-muted)', fontWeight: 300 }}>
          {formatCurrency(monthlyWithdrawal)} per month
        </p>

        {/* Safe / unsafe indicator */}
        <div
          style={{
            marginTop: '1.125rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 0.875rem',
            borderRadius: '99px',
            background: isSafe ? 'oklch(0.94 0.05 142)' : 'oklch(0.94 0.05 25)',
            border: `1px solid ${isSafe ? 'oklch(0.75 0.12 142)' : 'oklch(0.75 0.12 25)'}`,
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isSafe ? 'oklch(0.35 0.12 142)' : 'oklch(0.40 0.15 25)' }}>
            {isSafe ? '✓ Safe withdrawal rate' : '⚠ High withdrawal rate'}
          </span>
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
          { label: 'Monthly Withdrawal', value: formatCurrency(monthlyWithdrawal) },
          { label: 'Portfolio Duration', value: formatDuration(portfolioDuration) },
        ].map((item) => (
          <div key={item.label}>
            <p style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)', fontWeight: 400, marginBottom: '0.3rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {item.label}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
                fontSize: '1.0625rem',
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

      {/* Comparison table */}
      <div style={{ padding: '1.25rem 1.875rem', flex: 1, overflowX: 'auto' }}>
        <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--f-text-faint)', marginBottom: '0.75rem' }}>
          Withdrawal Rate Comparison
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr>
              {['Rate', 'Annual', 'Monthly', 'Lasts'].map((col) => (
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
            {comparisonTable.map((row) => {
              const isCurrent = Math.abs(row.rate - results.comparisonTable[2].rate) < 0.001 && false
              return (
                <tr
                  key={row.rate}
                  style={{ background: row.isSafe ? undefined : 'oklch(0.98 0.01 25)' }}
                >
                  <td
                    style={{
                      padding: '0.4375rem 0.75rem 0.4375rem 0.5rem',
                      fontWeight: 600,
                      color: row.isSafe ? 'var(--f-blue)' : 'oklch(0.45 0.12 25)',
                      fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
                      borderBottom: '1px solid var(--f-border)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {(row.rate * 100).toFixed(1)}%
                  </td>
                  <td style={{ padding: '0.4375rem 0.75rem 0.4375rem 0', color: 'var(--f-text-body)', borderBottom: '1px solid var(--f-border)', whiteSpace: 'nowrap' }}>
                    {formatCurrency(row.annualWithdrawal)}
                  </td>
                  <td style={{ padding: '0.4375rem 0.75rem 0.4375rem 0', color: 'var(--f-text-body)', borderBottom: '1px solid var(--f-border)', whiteSpace: 'nowrap' }}>
                    {formatCurrency(row.monthlyWithdrawal)}
                  </td>
                  <td
                    style={{
                      padding: '0.4375rem 0 0.4375rem 0',
                      color: row.isSafe ? 'oklch(0.35 0.12 142)' : 'oklch(0.45 0.12 25)',
                      fontWeight: 600,
                      borderBottom: '1px solid var(--f-border)',
                      whiteSpace: 'nowrap',
                      fontSize: '0.75rem',
                    }}
                  >
                    {formatDuration(row.portfolioDuration)}
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
