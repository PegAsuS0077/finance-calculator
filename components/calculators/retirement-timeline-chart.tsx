// components/calculators/retirement-timeline-chart.tsx
'use client'

import dynamic from 'next/dynamic'
import type { PortfolioPoint } from '@/lib/calculators/retirement-timeline'

const RetirementTimelineChartInner = dynamic(
  () => import('./retirement-timeline-chart-inner'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: '220px',
          width: '100%',
          background: 'var(--f-border)',
          borderRadius: '8px',
          opacity: 0.5,
        }}
      />
    ),
  }
)

interface RetirementTimelineChartProps {
  chartData: PortfolioPoint[]
  fireNumber: number
  retirementAge: number
  yearsToFI: number
}

export function RetirementTimelineChart({
  chartData,
  fireNumber,
  retirementAge,
  yearsToFI,
}: RetirementTimelineChartProps) {
  return (
    <div
      style={{ height: '220px', width: '100%' }}
      aria-label="Line chart showing portfolio growth over time with FIRE target reference line"
    >
      <RetirementTimelineChartInner
        chartData={chartData}
        fireNumber={fireNumber}
        retirementAge={retirementAge}
        yearsToFI={yearsToFI}
      />
    </div>
  )
}
