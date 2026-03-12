// components/calculators/fire-number-results.tsx
'use client'

import type { FireNumberResults } from '@/lib/calculators/fire-number'
import { formatCurrency } from '@/lib/utils/format'

interface FireNumberResultsProps {
  results: FireNumberResults
}

export function FireNumberResults({ results }: FireNumberResultsProps) {
  const { fireNumber, monthlyWithdrawal, annualWithdrawal, savingsTable } = results

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Primary result — FIRE Number */}
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
          Your FIRE Number
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
            {formatCurrency(fireNumber)}
          </span>
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--f-text-muted)', fontWeight: 300 }}>
          Total portfolio needed to retire
        </p>
      </div>

      {/* Withdrawal breakdown */}
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
          { label: 'Annual Withdrawal', value: formatCurrency(annualWithdrawal) },
          { label: 'Monthly Withdrawal', value: formatCurrency(monthlyWithdrawal) },
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

      {/* Savings required table */}
      <div style={{ padding: '1.125rem 1.875rem 0.5rem', flex: 1 }}>
        <p
          style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: 'var(--f-text-faint)',
            marginBottom: '0.75rem',
          }}
        >
          Monthly savings needed (at 7% return)
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {savingsTable.map((row, i) => (
            <div
              key={row.years}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.625rem 0',
                borderBottom: i < savingsTable.length - 1 ? '1px solid var(--f-border)' : undefined,
              }}
            >
              <span style={{ fontSize: '0.8125rem', color: 'var(--f-text-muted)', fontWeight: 300 }}>
                {row.years} years
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--f-text-heading)',
                  letterSpacing: '-0.01em',
                }}
              >
                {formatCurrency(row.monthlySavingsNeeded)}<span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--f-text-faint)' }}>/mo</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
