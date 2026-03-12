// components/calculators/fire-number-chart-inner.tsx
// This file is lazy-loaded by fire-number-chart.tsx — do NOT add 'use client' here.
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { SavingsRow } from '@/lib/calculators/fire-number'
import { formatCurrency, formatCompactCurrency } from '@/lib/utils/format'

interface FireNumberChartInnerProps {
  savingsTable: SavingsRow[]
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        background: 'var(--f-card)',
        border: '1px solid var(--f-border-strong)',
        borderRadius: '8px',
        padding: '0.625rem 0.875rem',
        boxShadow: 'var(--f-shadow-md)',
      }}
    >
      <p
        style={{
          fontSize: '0.625rem',
          color: 'var(--f-text-faint)',
          marginBottom: '0.25rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
          fontSize: '1.125rem',
          color: 'var(--f-blue)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        {formatCurrency(payload[0].value)}<span style={{ fontSize: '0.75rem', fontWeight: 400 }}>/mo</span>
      </p>
    </div>
  )
}

const BAR_COLORS = [
  'oklch(0.42 0.18 258)',
  'oklch(0.48 0.18 258)',
  'oklch(0.54 0.18 258)',
  'oklch(0.62 0.16 258)',
  'oklch(0.70 0.14 258)',
]

export default function FireNumberChartInner({ savingsTable }: FireNumberChartInnerProps) {
  const data = savingsTable.map((row) => ({
    name: `${row.years}yr`,
    savings: row.monthlySavingsNeeded,
  }))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 4, bottom: 0 }} barSize={36}>
        <CartesianGrid strokeDasharray="2 6" stroke="var(--f-border)" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: 'var(--f-text-faint)', fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif' }}
          axisLine={{ stroke: 'var(--f-border)' }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={formatCompactCurrency}
          tick={{ fontSize: 11, fill: 'var(--f-text-faint)', fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif' }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: 'var(--f-border)', opacity: 0.5 }}
        />
        <Bar dataKey="savings" radius={[4, 4, 0, 0]} isAnimationActive={false}>
          {data.map((_, index) => (
            <Cell key={index} fill={BAR_COLORS[index] ?? BAR_COLORS[BAR_COLORS.length - 1]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
