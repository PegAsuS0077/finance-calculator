// components/calculators/savings-rate-results.tsx
'use client'

import type { SavingsRateResults } from '@/lib/calculators/savings-rate'
import { formatCurrency } from '@/lib/utils/format'

interface SavingsRateResultsProps {
  results: SavingsRateResults
}

export function SavingsRateResults({ results }: SavingsRateResultsProps) {
  const { savingsRate, annualSavings, fireNumber, yearsToFI, tableRows } = results

  const savingsPct = (savingsRate * 100).toFixed(1)
  const isNegative = savingsRate < 0
  const alreadyFI = yearsToFI === 0

  // Find the closest table row to current savings rate (for highlighting)
  const closestRow = tableRows.reduce((best, row) => {
    return Math.abs(row.savingsRate - savingsRate) < Math.abs(best.savingsRate - savingsRate)
      ? row
      : best
  }, tableRows[0])

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
            color: alreadyFI ? 'oklch(0.50 0.18 145)' : isNegative ? 'oklch(0.50 0.18 25)' : 'var(--f-blue)',
            marginBottom: '0.5rem',
          }}
        >
          {alreadyFI ? 'Already at FI!' : 'Your Savings Rate'}
        </p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: isNegative ? 'oklch(0.50 0.18 25)' : 'var(--f-text-heading)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            {savingsPct}%
          </span>
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--f-text-muted)', fontWeight: 300 }}>
          {isNegative
            ? 'Your expenses exceed your take-home income. Increase income or reduce expenses to start saving.'
            : alreadyFI
            ? 'Your portfolio already covers your FIRE number. You have reached financial independence.'
            : `You save ${formatCurrency(annualSavings)} per year — ${yearsToFI >= 100 ? '100+' : yearsToFI.toFixed(1)} years to FI.`}
        </p>

        {/* Progress bar for savings rate (0–50% is typical range) */}
        {!isNegative && (
          <div style={{ marginTop: '1.125rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--f-text-faint)', fontWeight: 400 }}>Savings rate</span>
              <span
                style={{
                  fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: alreadyFI ? 'oklch(0.50 0.18 145)' : 'var(--f-blue)',
                }}
              >
                {savingsPct}%
              </span>
            </div>
            <div style={{ background: 'var(--f-border)', borderRadius: '99px', height: '6px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(100, savingsRate * 100)}%`,
                  background: alreadyFI
                    ? 'linear-gradient(90deg, oklch(0.60 0.18 145), oklch(0.50 0.18 145))'
                    : 'linear-gradient(90deg, oklch(0.55 0.18 258), oklch(0.45 0.18 258))',
                  borderRadius: '99px',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        )}
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
          { label: 'Annual Savings', value: formatCurrency(Math.max(0, annualSavings)) },
          { label: 'FIRE Number', value: formatCurrency(fireNumber) },
          { label: 'Years to FI', value: yearsToFI >= 100 ? '100+ yrs' : `${yearsToFI.toFixed(1)} yrs` },
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

      {/* Savings Rate Table */}
      <div style={{ padding: '1.25rem 1.875rem', flex: 1, overflowX: 'auto' }}>
        <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--f-text-faint)', marginBottom: '0.75rem' }}>
          Years to FI by Savings Rate
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr>
              {['Savings Rate', 'Annual Savings', 'FIRE Number', 'Years to FI'].map((col) => (
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
            {tableRows.map((row) => {
              const isHighlighted = row === closestRow
              return (
                <tr
                  key={row.savingsRate}
                  style={{
                    background: isHighlighted ? 'oklch(0.96 0.02 258)' : undefined,
                    borderRadius: isHighlighted ? '4px' : undefined,
                  }}
                >
                  <td
                    style={{
                      padding: '0.4375rem 0.75rem 0.4375rem 0.5rem',
                      fontWeight: isHighlighted ? 700 : 400,
                      color: isHighlighted ? 'var(--f-blue)' : 'var(--f-text-body)',
                      fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
                      borderBottom: '1px solid var(--f-border)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {(row.savingsRate * 100).toFixed(0)}%
                    {isHighlighted && (
                      <span style={{ marginLeft: '0.375rem', fontSize: '0.625rem', color: 'var(--f-blue)', fontWeight: 600 }}>
                        ← you
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '0.4375rem 0.75rem 0.4375rem 0', color: 'var(--f-text-body)', borderBottom: '1px solid var(--f-border)', whiteSpace: 'nowrap' }}>
                    {formatCurrency(row.annualSavings)}
                  </td>
                  <td style={{ padding: '0.4375rem 0.75rem 0.4375rem 0', color: 'var(--f-text-body)', borderBottom: '1px solid var(--f-border)', whiteSpace: 'nowrap' }}>
                    {formatCurrency(row.fireNumber)}
                  </td>
                  <td
                    style={{
                      padding: '0.4375rem 0 0.4375rem 0',
                      fontWeight: isHighlighted ? 700 : 400,
                      color: isHighlighted ? 'var(--f-blue)' : 'var(--f-text-body)',
                      fontFamily: isHighlighted ? 'var(--font-inter), ui-sans-serif, sans-serif' : undefined,
                      borderBottom: '1px solid var(--f-border)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.yearsToFI >= 100 ? '100+' : row.yearsToFI.toFixed(1)} yrs
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
