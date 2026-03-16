// components/calculators/lean-fire-chart.tsx
'use client'

import dynamic from 'next/dynamic'
import type { ProjectionPoint } from '@/lib/calculators/lean-fire'

const LeanFireChartInner = dynamic(
  () => import('./lean-fire-chart-inner'),
  { ssr: false, loading: () => <div className="h-72 w-full animate-pulse rounded-lg bg-muted" /> }
)

interface LeanFireChartProps {
  data: ProjectionPoint[]
  leanFireNumber: number
}

export function LeanFireChart({ data, leanFireNumber }: LeanFireChartProps) {
  return (
    <div
      className="h-72 w-full"
      aria-label="Portfolio growth projection chart showing portfolio value by age for Lean FIRE"
    >
      <LeanFireChartInner data={data} leanFireNumber={leanFireNumber} />
    </div>
  )
}
