// components/calculators/fire-chart-inner.tsx
// This file is lazy-loaded by fire-chart.tsx — do NOT add 'use client' here.
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
import type { ProjectionPoint } from '@/lib/calculators/fire'
import { formatCompactCurrency } from '@/lib/utils/format'

interface FireChartInnerProps {
  data: ProjectionPoint[]
  fireNumber: number
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: number }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded border bg-background px-3 py-2 shadow text-sm">
      <p className="font-medium">Age {label}</p>
      <p className="text-primary">{formatCompactCurrency(payload[0].value)}</p>
    </div>
  )
}

export default function FireChartInner({ data, fireNumber }: FireChartInnerProps) {
  return (
    <ResponsiveContainer width="100%" height={288}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="age"
          label={{ value: 'Age', position: 'insideBottomRight', offset: -8 }}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickFormatter={formatCompactCurrency}
          tick={{ fontSize: 12 }}
          width={72}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={fireNumber}
          stroke="hsl(var(--destructive))"
          strokeDasharray="6 3"
          label={{ value: 'FIRE Target', position: 'right', fontSize: 11 }}
        />
        <Line
          type="monotone"
          dataKey="portfolioValue"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
          name="Portfolio Value"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
