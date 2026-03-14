// components/calculators/investment-growth-chart-inner.tsx
// Lazy-loaded by investment-growth-chart.tsx — do NOT add 'use client' here.
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { InvestmentGrowthYearRow } from '@/lib/calculators/investment-growth'

interface Props {
  yearRows: InvestmentGrowthYearRow[]
}

function fmt(v: number): string {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`
  return `$${v.toFixed(0)}`
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        background: 'var(--f-card)',
        border: '1px solid var(--f-border-strong)',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        boxShadow: 'var(--f-shadow-md)',
        minWidth: '160px',
      }}
    >
      <p
        style={{
          fontSize: '0.625rem',
          color: 'var(--f-text-faint)',
          marginBottom: '0.5rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        Year {label}
      </p>
      {[...payload].reverse().map((p) => (
        <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--f-text-muted)', fontWeight: 400 }}>{p.name}</span>
          <span
            style={{
              fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: p.color,
              letterSpacing: '-0.01em',
            }}
          >
            {fmt(p.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function InvestmentGrowthChartInner({ yearRows }: Props) {
  const data = yearRows.map((row) => ({
    year: row.year,
    Principal: Math.round(row.totalContributed),
    Growth: Math.round(row.totalInterest),
  }))

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 8, right: 12, left: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="gradPrincipal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.65 0.12 258)" stopOpacity={0.9} />
            <stop offset="95%" stopColor="oklch(0.65 0.12 258)" stopOpacity={0.6} />
          </linearGradient>
          <linearGradient id="gradGrowth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.50 0.18 258)" stopOpacity={0.95} />
            <stop offset="95%" stopColor="oklch(0.50 0.18 258)" stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 6" stroke="var(--f-border)" vertical={false} />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: 'var(--f-text-faint)', fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif' }}
          axisLine={{ stroke: 'var(--f-border)' }}
          tickLine={false}
          tickFormatter={(v) => `Yr ${v}`}
          interval="preserveStartEnd"
        />
        <YAxis
          tickFormatter={fmt}
          tick={{ fontSize: 11, fill: 'var(--f-text-faint)', fontFamily: 'var(--font-inter), ui-sans-serif, sans-serif' }}
          axisLine={false}
          tickLine={false}
          width={54}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: '0.75rem', color: 'var(--f-text-faint)', paddingTop: '0.5rem' }}
        />
        <Area
          type="monotone"
          dataKey="Principal"
          stackId="1"
          stroke="oklch(0.65 0.12 258)"
          fill="url(#gradPrincipal)"
          strokeWidth={1.5}
          isAnimationActive={false}
        />
        <Area
          type="monotone"
          dataKey="Growth"
          stackId="1"
          stroke="oklch(0.45 0.18 258)"
          fill="url(#gradGrowth)"
          strokeWidth={1.5}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
