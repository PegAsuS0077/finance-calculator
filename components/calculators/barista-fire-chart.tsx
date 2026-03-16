// components/calculators/barista-fire-chart.tsx
'use client'

import dynamic from 'next/dynamic'
import type { ProjectionPoint } from '@/lib/calculators/barista-fire'

const BaristaFireChartInner = dynamic(
  () => import('./barista-fire-chart-inner'),
  { ssr: false, loading: () => <div className="h-72 w-full animate-pulse rounded-lg bg-muted" /> }
)

interface BaristaFireChartProps {
  data: ProjectionPoint[]
  baristaFireNumber: number
  fullFireNumber: number
}

export function BaristaFireChart({ data, baristaFireNumber, fullFireNumber }: BaristaFireChartProps) {
  return (
    <div
      className="h-72 w-full"
      aria-label="Portfolio growth projection chart showing portfolio value by age for Barista FIRE"
    >
      <BaristaFireChartInner
        data={data}
        baristaFireNumber={baristaFireNumber}
        fullFireNumber={fullFireNumber}
      />
    </div>
  )
}
