// components/calculators/investment-growth-chart.tsx
'use client'

import dynamic from 'next/dynamic'
import type { InvestmentGrowthYearRow } from '@/lib/calculators/investment-growth'

const InvestmentGrowthChartInner = dynamic(
  () => import('./investment-growth-chart-inner'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: '240px',
          width: '100%',
          background: 'var(--f-border)',
          borderRadius: '8px',
          opacity: 0.5,
        }}
      />
    ),
  }
)

interface Props {
  yearRows: InvestmentGrowthYearRow[]
}

export function InvestmentGrowthChart({ yearRows }: Props) {
  return (
    <div
      style={{ height: '240px', width: '100%' }}
      aria-label="Stacked area chart showing portfolio growth split between principal contributed and investment growth over time"
    >
      <InvestmentGrowthChartInner yearRows={yearRows} />
    </div>
  )
}
