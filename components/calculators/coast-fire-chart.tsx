// components/calculators/coast-fire-chart.tsx
'use client'

import dynamic from 'next/dynamic'
import type { CoastFireChartPoint } from '@/lib/calculators/coast-fire'

const CoastFireChartInner = dynamic(
  () => import('./coast-fire-chart-inner'),
  { ssr: false, loading: () => <div style={{ height: '220px', width: '100%', background: 'var(--f-border)', borderRadius: '8px', opacity: 0.5 }} /> }
)

interface CoastFireChartProps {
  chartData: CoastFireChartPoint[]
  fireNumber: number
  coastFireNumber: number
}

export function CoastFireChart({ chartData, fireNumber, coastFireNumber }: CoastFireChartProps) {
  return (
    <div
      style={{ height: '220px', width: '100%' }}
      aria-label="Line chart showing portfolio growth from Coast FIRE number to FIRE target over time"
    >
      <CoastFireChartInner chartData={chartData} fireNumber={fireNumber} coastFireNumber={coastFireNumber} />
    </div>
  )
}
