// components/calculators/fire-number-chart.tsx
'use client'

import dynamic from 'next/dynamic'
import type { SavingsRow } from '@/lib/calculators/fire-number'

const FireNumberChartInner = dynamic(
  () => import('./fire-number-chart-inner'),
  { ssr: false, loading: () => <div style={{ height: '200px', width: '100%', background: 'var(--f-border)', borderRadius: '8px', opacity: 0.5 }} /> }
)

interface FireNumberChartProps {
  savingsTable: SavingsRow[]
}

export function FireNumberChart({ savingsTable }: FireNumberChartProps) {
  return (
    <div
      style={{ height: '200px', width: '100%' }}
      aria-label="Bar chart showing monthly savings required at different investment timelines"
    >
      <FireNumberChartInner savingsTable={savingsTable} />
    </div>
  )
}
