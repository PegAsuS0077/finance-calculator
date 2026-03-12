// components/calculators/fire-results.tsx
'use client'

import type { FireResults } from '@/lib/calculators/fire'
import { formatCurrency, formatNumber } from '@/lib/utils/format'

interface FireResultsProps {
  results: FireResults
}

function ResultCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

export function FireResults({ results }: FireResultsProps) {
  const { fireNumber, yearsToFire, fireAge, remainingGap } = results

  const yearsDisplay = yearsToFire === Infinity
    ? 'Never (increase savings)'
    : `${formatNumber(yearsToFire, 1)} years`

  const fireAgeDisplay = fireAge === Infinity ? '—' : `Age ${fireAge}`

  const gapDisplay = remainingGap === 0
    ? 'You have reached FIRE!'
    : formatCurrency(remainingGap)

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <ResultCard label="FIRE Number" value={formatCurrency(fireNumber)} sub="Total portfolio needed" />
      <ResultCard label="Years to FIRE" value={yearsDisplay} sub="From today" />
      <ResultCard label="FIRE Age" value={fireAgeDisplay} sub="Your retirement age" />
      <ResultCard label="Remaining Gap" value={gapDisplay} sub={remainingGap === 0 ? undefined : 'Still needed'} />
    </div>
  )
}
