// components/calculators/compound-interest-chart.tsx
'use client'

import dynamic from 'next/dynamic'
import type { CompoundInterestYearRow } from '@/lib/calculators/compound-interest'

const CompoundInterestChartInner = dynamic(
  () => import('./compound-interest-chart-inner'),
  { ssr: false, loading: () => <div style={{ height: 260 }} /> }
)

interface Props {
  yearRows: CompoundInterestYearRow[]
}

export function CompoundInterestChart({ yearRows }: Props) {
  return <CompoundInterestChartInner yearRows={yearRows} />
}
