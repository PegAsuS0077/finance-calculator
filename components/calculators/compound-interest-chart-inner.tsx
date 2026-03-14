// components/calculators/compound-interest-chart-inner.tsx
'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { CompoundInterestYearRow } from '@/lib/calculators/compound-interest'
import { formatCurrency } from '@/lib/utils/format'

interface Props {
  yearRows: CompoundInterestYearRow[]
}

function formatYAxis(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
  return `$${value}`
}

export default function CompoundInterestChartInner({ yearRows }: Props) {
  const data = yearRows.map((row) => ({
    year: row.year,
    Contributed: row.totalContributed,
    Interest: row.totalInterest,
  }))

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="ciContrib" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.65 0.12 258)" stopOpacity={0.85} />
            <stop offset="95%" stopColor="oklch(0.65 0.12 258)" stopOpacity={0.55} />
          </linearGradient>
          <linearGradient id="ciInterest" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.50 0.18 258)" stopOpacity={0.9} />
            <stop offset="95%" stopColor="oklch(0.45 0.18 258)" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--f-border)" />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: 'var(--f-text-faint)' }}
          tickLine={false}
          axisLine={{ stroke: 'var(--f-border)' }}
          label={{ value: 'Year', position: 'insideBottom', offset: -2, fontSize: 11, fill: 'var(--f-text-faint)' }}
        />
        <YAxis
          tickFormatter={formatYAxis}
          tick={{ fontSize: 11, fill: 'var(--f-text-faint)' }}
          tickLine={false}
          axisLine={false}
          width={56}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null
            const total = (payload[0]?.value as number ?? 0) + (payload[1]?.value as number ?? 0)
            return (
              <div style={{ background: 'var(--f-card)', border: '1px solid var(--f-border)', borderRadius: '8px', padding: '0.625rem 0.875rem', fontSize: '0.8125rem' }}>
                <p style={{ fontWeight: 600, marginBottom: '0.375rem', color: 'var(--f-text-heading)' }}>Year {label}</p>
                {payload.map((entry) => (
                  <p key={entry.name as string} style={{ color: entry.color as string, margin: '0.125rem 0' }}>
                    {entry.name}: {formatCurrency(entry.value as number)}
                  </p>
                ))}
                <p style={{ color: 'var(--f-text-heading)', fontWeight: 600, marginTop: '0.25rem', borderTop: '1px solid var(--f-border)', paddingTop: '0.25rem' }}>
                  Total: {formatCurrency(total)}
                </p>
              </div>
            )
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}
          iconType="square"
        />
        <Area
          type="monotone"
          dataKey="Contributed"
          stackId="1"
          stroke="oklch(0.65 0.12 258)"
          fill="url(#ciContrib)"
          strokeWidth={1.5}
        />
        <Area
          type="monotone"
          dataKey="Interest"
          stackId="1"
          stroke="oklch(0.45 0.18 258)"
          fill="url(#ciInterest)"
          strokeWidth={1.5}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
