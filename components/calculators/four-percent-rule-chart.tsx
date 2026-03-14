// components/calculators/four-percent-rule-chart.tsx
'use client'

import dynamic from 'next/dynamic'
import type { PortfolioDepleteYear } from '@/lib/calculators/four-percent-rule'

const FourPercentRuleChartInner = dynamic(
  () => import('./four-percent-rule-chart-inner'),
  { ssr: false, loading: () => <div style={{ height: 260 }} /> }
)

interface Props {
  depletionChart: PortfolioDepleteYear[]
  portfolioValue: number
}

export function FourPercentRuleChart({ depletionChart, portfolioValue }: Props) {
  return <FourPercentRuleChartInner depletionChart={depletionChart} portfolioValue={portfolioValue} />
}
