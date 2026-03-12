// components/calculators/fire-calculator.tsx
'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { fireSchema, type FireInputs } from '@/lib/validation/fire-schema'
import { calculateFire } from '@/lib/calculators/fire'
import { FireResults } from './fire-results'
import { FireChart } from './fire-chart'

const DEFAULTS: FireInputs = {
  currentAge: 30,
  currentPortfolio: 50_000,
  annualIncome: 75_000,
  annualExpenses: 40_000,
  annualContributions: 25_000,
  expectedReturn: 0.07,
  inflationRate: 0.03,
  withdrawalRate: 0.04,
}

function NumberInput({
  id, label, value, onChange, min, max, prefix,
}: {
  id: string; label: string; value: number; onChange: (v: number) => void
  min?: number; max?: number; prefix?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
            {prefix}
          </span>
        )}
        <Input
          id={id}
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={e => onChange(Number(e.target.value))}
          className={prefix ? 'pl-7' : undefined}
        />
      </div>
    </div>
  )
}

function SliderInput({
  id, label, value, onChange, min, max, step, displayValue,
}: {
  id: string; label: string; value: number; onChange: (v: number) => void
  min: number; max: number; step: number; displayValue: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        <span className="text-sm font-medium tabular-nums">{displayValue}</span>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(v) => onChange(v as number)}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{(min * 100).toFixed(0)}%</span>
        <span>{(max * 100).toFixed(0)}%</span>
      </div>
    </div>
  )
}

export function FireCalculator() {
  const [inputs, setInputs] = useState<FireInputs>(DEFAULTS)

  function set<K extends keyof FireInputs>(key: K, value: FireInputs[K]) {
    setInputs(prev => ({ ...prev, [key]: value }))
  }

  // Validate inputs with Zod, then run calculations — instant results on every change
  const results = useMemo(() => {
    const parsed = fireSchema.safeParse(inputs)
    if (!parsed.success) return null
    return calculateFire(parsed.data)
  }, [inputs])

  return (
    <div className="space-y-8">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold">Your Numbers</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NumberInput id="currentAge" label="Current Age" value={inputs.currentAge}
            onChange={v => set('currentAge', v)} min={18} max={80} />
          <NumberInput id="annualIncome" label="Annual Income" value={inputs.annualIncome}
            onChange={v => set('annualIncome', v)} prefix="$" min={1000} />
          <NumberInput id="annualExpenses" label="Annual Expenses" value={inputs.annualExpenses}
            onChange={v => set('annualExpenses', v)} prefix="$" min={1000} />
          <NumberInput id="annualContributions" label="Annual Contributions" value={inputs.annualContributions}
            onChange={v => set('annualContributions', v)} prefix="$" min={0} />
          <NumberInput id="currentPortfolio" label="Current Portfolio Value" value={inputs.currentPortfolio}
            onChange={v => set('currentPortfolio', v)} prefix="$" min={0} />

          <div className="sm:col-span-2 lg:col-span-3 grid gap-6 sm:grid-cols-3">
            <SliderInput id="expectedReturn" label="Expected Annual Return"
              value={inputs.expectedReturn} onChange={v => set('expectedReturn', v)}
              min={0.01} max={0.15} step={0.001}
              displayValue={`${(inputs.expectedReturn * 100).toFixed(1)}%`} />
            <SliderInput id="inflationRate" label="Inflation Rate"
              value={inputs.inflationRate} onChange={v => set('inflationRate', v)}
              min={0} max={0.10} step={0.001}
              displayValue={`${(inputs.inflationRate * 100).toFixed(1)}%`} />
            <SliderInput id="withdrawalRate" label="Withdrawal Rate"
              value={inputs.withdrawalRate} onChange={v => set('withdrawalRate', v)}
              min={0.01} max={0.10} step={0.001}
              displayValue={`${(inputs.withdrawalRate * 100).toFixed(1)}%`} />
          </div>
        </div>
      </div>

      {results ? (
        <>
          <FireResults results={results} />
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Portfolio Growth Projection</h2>
            <FireChart data={results.projectionData} fireNumber={results.fireNumber} />
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">Enter valid inputs to see your results.</p>
      )}
    </div>
  )
}
