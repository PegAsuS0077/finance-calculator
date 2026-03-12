// components/calculators/fire-chart-inner.tsx
// This file is lazy-loaded by fire-chart.tsx — do NOT add 'use client' here.
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
import type { ProjectionPoint } from '@/lib/calculators/fire'
import { formatCompactCurrency } from '@/lib/utils/format'

interface FireChartInnerProps {
  data: ProjectionPoint[]
  fireNumber: number
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
        background: 'oklch(0.17 0.005 260)',
        border: '1px solid oklch(0.28 0.008 260)',
        borderRadius: '4px',
        padding: '0.625rem 0.875rem',
        boxShadow: '0 8px 24px oklch(0 0 0 / 0.4)',
      }}
    >
      <p
        style={{
          fontSize: '0.6875rem',
          color: 'oklch(0.50 0.01 260)',
          marginBottom: '0.25rem',
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        Age {label}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '1.125rem',
          color: 'oklch(0.78 0.16 68)',
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

export default function FireChartInner({ data, fireNumber }: FireChartInnerProps) {
  return (
    <ResponsiveContainer width="100%" height={288}>
      <AreaChart data={data} margin={{ top: 12, right: 56, left: 4, bottom: 0 }}>
        <defs>
          <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.16 68)" stopOpacity={0.15} />
            <stop offset="100%" stopColor="oklch(0.78 0.16 68)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="1 5"
          stroke="oklch(0.22 0.008 260)"
          vertical={false}
        />
        <XAxis
          dataKey="age"
          tick={{
            fontSize: 11,
            fill: 'oklch(0.40 0.01 260)',
          }}
          axisLine={{ stroke: 'oklch(0.22 0.008 260)' }}
          tickLine={false}
          label={{
            value: 'Age',
            position: 'insideBottomRight',
            offset: -4,
            fontSize: 10,
            fill: 'oklch(0.35 0.01 260)',
          }}
        />
        <YAxis
          tickFormatter={formatCompactCurrency}
          tick={{
            fontSize: 11,
            fill: 'oklch(0.40 0.01 260)',
          }}
          axisLine={false}
          tickLine={false}
          width={68}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{
            stroke: 'oklch(0.35 0.01 260)',
            strokeWidth: 1,
            strokeDasharray: '3 3',
          }}
        />
        <ReferenceLine
          y={fireNumber}
          stroke="oklch(0.72 0.14 68)"
          strokeDasharray="5 4"
          strokeWidth={1.5}
          label={{
            value: 'FIRE Target',
            position: 'right',
            fontSize: 10,
            fill: 'oklch(0.60 0.12 68)',
          }}
        />
        <Area
          type="monotone"
          dataKey="portfolioValue"
          stroke="oklch(0.78 0.16 68)"
          strokeWidth={2.5}
          fill="url(#portfolioGradient)"
          dot={false}
          isAnimationActive={false}
          name="Portfolio Value"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
