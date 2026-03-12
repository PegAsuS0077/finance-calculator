// components/calculators/fire-chart.tsx
'use client'

import dynamic from 'next/dynamic'
import type { ProjectionPoint } from '@/lib/calculators/fire'

const FireChartInner = dynamic(
  () => import('./fire-chart-inner'),
  { ssr: false, loading: () => <div className="h-72 w-full animate-pulse rounded-lg bg-muted" /> }
)

interface FireChartProps {
  data: ProjectionPoint[]
  fireNumber: number
}

export function FireChart({ data, fireNumber }: FireChartProps) {
  return (
    <div
      className="h-72 w-full"
      aria-label="Portfolio growth projection chart showing portfolio value by age"
    >
      <FireChartInner data={data} fireNumber={fireNumber} />
    </div>
  )
}
