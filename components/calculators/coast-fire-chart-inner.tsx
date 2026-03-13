// components/calculators/coast-fire-chart-inner.tsx
// This file is lazy-loaded by coast-fire-chart.tsx — do NOT add 'use client' here.
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import type { CoastFireChartPoint } from '@/lib/calculators/coast-fire'
import { formatCurrency, formatCompactCurrency } from '@/lib/utils/format'

interface CoastFireChartInnerProps {
  chartData: CoastFireChartPoint[]
  fireNumber: number
  coastFireNumber: number
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
        Age {label}
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
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  )
}

export default function CoastFireChartInner({ chartData, fireNumber, coastFireNumber }: CoastFireChartInnerProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={chartData} margin={{ top: 12, right: 12, left: 4, bottom: 0 }}>
        <CartesianGrid strokeDasharray="2 6" stroke="var(--f-border)" vertical={false} />
        <XAxis
          dataKey="age"
          tick={{ fontSize: 11, fill: 'var(--f-text-faint)', fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif' }}
          axisLine={{ stroke: 'var(--f-border)' }}
          tickLine={false}
          label={{ value: 'Age', position: 'insideBottom', offset: -2, fontSize: 10, fill: 'var(--f-text-faint)' }}
        />
        <YAxis
          tickFormatter={formatCompactCurrency}
          tick={{ fontSize: 11, fill: 'var(--f-text-faint)', fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif' }}
          axisLine={false}
          tickLine={false}
          width={64}
        />
        <Tooltip content={<CustomTooltip />} />
        {/* FIRE target line */}
        <ReferenceLine
          y={fireNumber}
          stroke="oklch(0.55 0.18 145)"
          strokeDasharray="4 4"
          strokeWidth={1.5}
          label={{ value: 'FIRE Target', position: 'right', fontSize: 10, fill: 'oklch(0.45 0.18 145)' }}
        />
        {/* Coast starting point line */}
        <ReferenceLine
          y={coastFireNumber}
          stroke="var(--f-blue)"
          strokeDasharray="3 5"
          strokeWidth={1}
          strokeOpacity={0.4}
        />
        <Line
          type="monotone"
          dataKey="portfolio"
          stroke="var(--f-blue)"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 4, fill: 'var(--f-blue)', stroke: 'var(--f-card)', strokeWidth: 2 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
