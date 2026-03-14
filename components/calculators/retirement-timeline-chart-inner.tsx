// components/calculators/retirement-timeline-chart-inner.tsx
// This file is lazy-loaded by retirement-timeline-chart.tsx — do NOT add 'use client' here.
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts'
import type { PortfolioPoint } from '@/lib/calculators/retirement-timeline'

interface RetirementTimelineChartInnerProps {
  chartData: PortfolioPoint[]
  fireNumber: number
  retirementAge: number
  yearsToFI: number
}

function formatYAxis(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
  return `$${value}`
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
        {formatYAxis(payload[0].value)}
      </p>
    </div>
  )
}

export default function RetirementTimelineChartInner({
  chartData,
  fireNumber,
  retirementAge,
  yearsToFI,
}: RetirementTimelineChartInnerProps) {
  // Find the data point at or closest to retirement age for the dot
  const retirementPoint = chartData.find((p) => p.age === retirementAge) ?? chartData[chartData.length - 1]

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={chartData} margin={{ top: 12, right: 12, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="2 6" stroke="var(--f-border)" vertical={false} />
        <XAxis
          dataKey="age"
          tick={{ fontSize: 11, fill: 'var(--f-text-faint)', fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif' }}
          axisLine={{ stroke: 'var(--f-border)' }}
          tickLine={false}
          label={{ value: 'Age', position: 'insideBottom', offset: -2, fontSize: 10, fill: 'var(--f-text-faint)' }}
        />
        <YAxis
          tickFormatter={formatYAxis}
          tick={{ fontSize: 11, fill: 'var(--f-text-faint)', fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif' }}
          axisLine={false}
          tickLine={false}
          width={52}
        />
        <Tooltip content={<CustomTooltip />} />

        {/* Horizontal FIRE target line */}
        <ReferenceLine
          y={fireNumber}
          stroke="oklch(0.50 0.18 145)"
          strokeDasharray="4 4"
          strokeWidth={1.5}
          label={{
            value: 'FIRE target',
            position: 'insideTopRight',
            fontSize: 10,
            fill: 'oklch(0.50 0.18 145)',
          }}
        />

        {/* Vertical line at retirement age */}
        {yearsToFI < 100 && (
          <ReferenceLine
            x={retirementAge}
            stroke="var(--f-blue)"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            strokeOpacity={0.5}
          />
        )}

        {/* Dot at intersection */}
        {yearsToFI < 100 && retirementPoint && (
          <ReferenceDot
            x={retirementPoint.age}
            y={retirementPoint.value}
            r={5}
            fill="var(--f-blue)"
            stroke="var(--f-card)"
            strokeWidth={2}
          />
        )}

        <Line
          type="monotone"
          dataKey="value"
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
