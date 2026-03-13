// components/calculators/savings-rate-chart.tsx
'use client'

import dynamic from 'next/dynamic'
import type { SavingsRateRow } from '@/lib/calculators/savings-rate'

const SavingsRateChartInner = dynamic(
  () => import('./savings-rate-chart-inner'),
  { ssr: false, loading: () => <div style={{ height: '220px', width: '100%', background: 'var(--f-border)', borderRadius: '8px', opacity: 0.5 }} /> }
)

interface SavingsRateChartProps {
  tableRows: SavingsRateRow[]
  currentSavingsRate: number
}

export function SavingsRateChart({ tableRows, currentSavingsRate }: SavingsRateChartProps) {
  return (
    <div
      style={{ height: '220px', width: '100%' }}
      aria-label="Line chart showing years to financial independence at savings rates from 10% to 90%"
    >
      <SavingsRateChartInner tableRows={tableRows} currentSavingsRate={currentSavingsRate} />
    </div>
  )
}
