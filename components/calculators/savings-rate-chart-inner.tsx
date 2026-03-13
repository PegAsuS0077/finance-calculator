// components/calculators/savings-rate-chart-inner.tsx
// This file is lazy-loaded by savings-rate-chart.tsx — do NOT add 'use client' here.
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
import type { SavingsRateRow } from '@/lib/calculators/savings-rate'

interface SavingsRateChartInnerProps {
  tableRows: SavingsRateRow[]
  currentSavingsRate: number
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
        {label}% savings rate
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
        {payload[0].value >= 100 ? '100+' : payload[0].value.toFixed(1)} yrs
      </p>
    </div>
  )
}

export default function SavingsRateChartInner({ tableRows, currentSavingsRate }: SavingsRateChartInnerProps) {
  const chartData = tableRows.map((row) => ({
    savingsRate: Math.round(row.savingsRate * 100),
    yearsToFI: Math.round(row.yearsToFI * 10) / 10,
  }))

  // Find nearest data point to user's current savings rate for the reference dot
  const currentPct = Math.round(currentSavingsRate * 100)
  const nearestPoint = chartData.reduce((best, point) => {
    return Math.abs(point.savingsRate - currentPct) < Math.abs(best.savingsRate - currentPct)
      ? point
      : best
  }, chartData[0])

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={chartData} margin={{ top: 12, right: 12, left: 4, bottom: 0 }}>
        <CartesianGrid strokeDasharray="2 6" stroke="var(--f-border)" vertical={false} />
        <XAxis
          dataKey="savingsRate"
          tick={{ fontSize: 11, fill: 'var(--f-text-faint)', fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif' }}
          axisLine={{ stroke: 'var(--f-border)' }}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
          label={{ value: 'Savings Rate', position: 'insideBottom', offset: -2, fontSize: 10, fill: 'var(--f-text-faint)' }}
        />
        <YAxis
          tickFormatter={(v) => `${v}y`}
          tick={{ fontSize: 11, fill: 'var(--f-text-faint)', fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif' }}
          axisLine={false}
          tickLine={false}
          width={40}
          domain={[0, 105]}
        />
        <Tooltip content={<CustomTooltip />} />
        {/* Vertical reference line at user's current savings rate */}
        {currentSavingsRate >= 0.05 && currentSavingsRate <= 0.95 && (
          <ReferenceLine
            x={currentPct}
            stroke="var(--f-blue)"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            strokeOpacity={0.5}
          />
        )}
        {/* Reference dot on the line at user's savings rate */}
        {nearestPoint && (
          <ReferenceDot
            x={nearestPoint.savingsRate}
            y={nearestPoint.yearsToFI}
            r={5}
            fill="var(--f-blue)"
            stroke="var(--f-card)"
            strokeWidth={2}
          />
        )}
        <Line
          type="monotone"
          dataKey="yearsToFI"
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
