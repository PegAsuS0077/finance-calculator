// components/calculators/investment-growth-results.tsx
'use client'

import type { InvestmentGrowthResults } from '@/lib/calculators/investment-growth'
import { formatCurrency } from '@/lib/utils/format'

interface Props {
  results: InvestmentGrowthResults
}

export function InvestmentGrowthResults({ results }: Props) {
  const { finalValue, totalContributed, totalInterest, growthMultiplier, yearRows } = results

  const interestPct = totalContributed > 0
    ? ((totalInterest / finalValue) * 100).toFixed(1)
    : '0'

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
          Final Portfolio Value
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
            {formatCurrency(finalValue)}
          </span>
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--f-text-muted)', fontWeight: 300 }}>
          {growthMultiplier.toFixed(2)}× your money — {interestPct}% from investment growth
        </p>

        {/* Interest vs principal bar */}
        <div style={{ marginTop: '1.125rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
            <span style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)', fontWeight: 400 }}>Principal</span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)', fontWeight: 400 }}>Growth</span>
          </div>
          <div style={{ background: 'var(--f-border)', borderRadius: '99px', height: '6px', overflow: 'hidden', display: 'flex' }}>
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, (totalContributed / finalValue) * 100)}%`,
                background: 'oklch(0.65 0.12 258)',
                borderRadius: '99px 0 0 99px',
              }}
            />
            <div
              style={{
                height: '100%',
                flex: 1,
                background: 'linear-gradient(90deg, oklch(0.55 0.18 258), oklch(0.45 0.18 258))',
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
          { label: 'Total Contributed', value: formatCurrency(totalContributed) },
          { label: 'Total Growth', value: formatCurrency(totalInterest) },
          { label: 'Growth Multiplier', value: `${growthMultiplier.toFixed(2)}×` },
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

      {/* Year-by-year table — show every 5 years for compactness */}
      <div style={{ padding: '1.25rem 1.875rem', flex: 1, overflowX: 'auto' }}>
        <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--f-text-faint)', marginBottom: '0.75rem' }}>
          Year-by-Year Breakdown
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr>
              {['Year', 'Balance', 'Contributed', 'Growth'].map((col) => (
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
            {yearRows
              .filter((row) => row.year % 5 === 0 || row.year === 1 || row.year === yearRows.length)
              .map((row) => {
                const isLast = row.year === yearRows.length
                return (
                  <tr
                    key={row.year}
                    style={{ background: isLast ? 'oklch(0.96 0.02 258)' : undefined }}
                  >
                    <td
                      style={{
                        padding: '0.4375rem 0.75rem 0.4375rem 0.5rem',
                        fontWeight: isLast ? 700 : 400,
                        color: isLast ? 'var(--f-blue)' : 'var(--f-text-body)',
                        fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
                        borderBottom: '1px solid var(--f-border)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Yr {row.year}
                      {isLast && <span style={{ marginLeft: '0.375rem', fontSize: '0.625rem', color: 'var(--f-blue)', fontWeight: 600 }}>← final</span>}
                    </td>
                    <td style={{ padding: '0.4375rem 0.75rem 0.4375rem 0', fontWeight: isLast ? 700 : 400, color: isLast ? 'var(--f-blue)' : 'var(--f-text-body)', fontFamily: isLast ? 'var(--font-inter), ui-sans-serif, sans-serif' : undefined, borderBottom: '1px solid var(--f-border)', whiteSpace: 'nowrap' }}>
                      {formatCurrency(row.balance)}
                    </td>
                    <td style={{ padding: '0.4375rem 0.75rem 0.4375rem 0', color: 'var(--f-text-body)', borderBottom: '1px solid var(--f-border)', whiteSpace: 'nowrap' }}>
                      {formatCurrency(row.totalContributed)}
                    </td>
                    <td style={{ padding: '0.4375rem 0 0.4375rem 0', color: 'var(--f-text-body)', borderBottom: '1px solid var(--f-border)', whiteSpace: 'nowrap' }}>
                      {formatCurrency(row.totalInterest)}
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
