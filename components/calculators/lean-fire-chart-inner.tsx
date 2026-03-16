// components/calculators/lean-fire-chart-inner.tsx
// This file is lazy-loaded by lean-fire-chart.tsx — do NOT add 'use client' here.
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import type { ProjectionPoint } from '@/lib/calculators/lean-fire'
import { formatCompactCurrency } from '@/lib/utils/format'

interface LeanFireChartInnerProps {
  data: ProjectionPoint[]
  leanFireNumber: number
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: number
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
        {formatCompactCurrency(payload[0].value)}
      </p>
    </div>
  )
}

export default function LeanFireChartInner({ data, leanFireNumber }: LeanFireChartInnerProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 64, left: 4, bottom: 0 }}>
        <defs>
          <linearGradient id="leanPortfolioGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.50 0.18 258)" stopOpacity={0.15} />
            <stop offset="70%" stopColor="oklch(0.50 0.18 258)" stopOpacity={0.03} />
            <stop offset="100%" stopColor="oklch(0.50 0.18 258)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="2 6"
          stroke="var(--f-border)"
          vertical={false}
        />
        <XAxis
          dataKey="age"
          tick={{ fontSize: 11, fill: 'var(--f-text-faint)', fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif' }}
          axisLine={{ stroke: 'var(--f-border)' }}
          tickLine={false}
          label={{
            value: 'Age',
            position: 'insideBottomRight',
            offset: -4,
            fontSize: 10,
            fill: 'var(--f-text-faint)',
          }}
        />
        <YAxis
          tickFormatter={formatCompactCurrency}
          tick={{ fontSize: 11, fill: 'var(--f-text-faint)', fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif' }}
          axisLine={false}
          tickLine={false}
          width={68}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: 'var(--f-border-strong)', strokeWidth: 1, strokeDasharray: '4 4' }}
        />
        <ReferenceLine
          y={leanFireNumber}
          stroke="oklch(0.68 0.15 195)"
          strokeDasharray="6 4"
          strokeWidth={1.5}
          label={{
            value: 'Lean FIRE',
            position: 'right',
            fontSize: 10,
            fill: 'oklch(0.55 0.12 195)',
            fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
          }}
        />
        <Area
          type="monotone"
          dataKey="portfolioValue"
          stroke="var(--f-blue)"
          strokeWidth={2.5}
          fill="url(#leanPortfolioGradient)"
          dot={false}
          isAnimationActive={false}
          name="Portfolio Value"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
