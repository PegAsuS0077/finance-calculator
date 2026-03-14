// components/calculators/four-percent-rule-chart-inner.tsx
'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { PortfolioDepleteYear } from '@/lib/calculators/four-percent-rule'
import { formatCurrency } from '@/lib/utils/format'

interface Props {
  depletionChart: PortfolioDepleteYear[]
  portfolioValue: number
}

const COLORS = {
  '3%': 'oklch(0.50 0.18 142)',
  '4%': 'oklch(0.50 0.18 258)',
  '5%': 'oklch(0.50 0.18 25)',
}

function formatYAxis(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
  return `$${value}`
}

export default function FourPercentRuleChartInner({ depletionChart, portfolioValue }: Props) {
  const data = depletionChart.map((row) => ({
    year: row.year,
    '3% Rate': row.balance3pct,
    '4% Rate': row.balance4pct,
    '5% Rate': row.balance5pct,
  }))

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
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
            return (
              <div style={{ background: 'var(--f-card)', border: '1px solid var(--f-border)', borderRadius: '8px', padding: '0.625rem 0.875rem', fontSize: '0.8125rem' }}>
                <p style={{ fontWeight: 600, marginBottom: '0.375rem', color: 'var(--f-text-heading)' }}>Year {label}</p>
                {payload.map((entry) => (
                  <p key={entry.name as string} style={{ color: entry.color as string, margin: '0.125rem 0' }}>
                    {entry.name}: {typeof entry.value === 'number' ? formatCurrency(entry.value) : 'Depleted'}
                  </p>
                ))}
              </div>
            )
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: '0.75rem', paddingTop: '0.5rem' }}
          iconType="line"
        />
        <Line
          type="monotone"
          dataKey="3% Rate"
          stroke={COLORS['3%']}
          strokeWidth={2}
          dot={false}
          connectNulls={false}
        />
        <Line
          type="monotone"
          dataKey="4% Rate"
          stroke={COLORS['4%']}
          strokeWidth={2.5}
          dot={false}
          connectNulls={false}
        />
        <Line
          type="monotone"
          dataKey="5% Rate"
          stroke={COLORS['5%']}
          strokeWidth={2}
          dot={false}
          connectNulls={false}
          strokeDasharray="5 3"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
