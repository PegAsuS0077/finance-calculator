// lib/calculators/fire-number.ts
import type { FireNumberInputs } from '../validation/fire-number-schema'

export interface SavingsRow {
  years: number
  monthlySavingsNeeded: number
}

export interface FireNumberResults {
  fireNumber: number
  monthlyWithdrawal: number
  annualWithdrawal: number
  savingsTable: SavingsRow[]
}

/**
 * FIRE Number = Annual Expenses / Withdrawal Rate
 */
export function calculateFireNumber(annualExpenses: number, withdrawalRate: number): number {
  if (withdrawalRate <= 0) throw new Error('Withdrawal rate must be greater than 0')
  return annualExpenses / withdrawalRate
}

/**
 * Monthly savings required to reach a target in n years at a given annual return.
 * Uses future value of annuity formula solved for payment:
 *   PMT = FV * r / ((1 + r)^n - 1)
 * where r = monthly rate, n = total months
 */
export function monthlySavingsNeeded(
  targetAmount: number,
  years: number,
  annualReturn: number
): number {
  const monthlyRate = annualReturn / 12
  const months = years * 12

  if (monthlyRate === 0) return targetAmount / months

  const factor = Math.pow(1 + monthlyRate, months)
  return (targetAmount * monthlyRate) / (factor - 1)
}

/**
 * Build savings table for standard timelines (10, 15, 20, 25, 30 years) at 7% return.
 */
export function buildSavingsTable(fireNumber: number): SavingsRow[] {
  const RETURN_RATE = 0.07
  return [10, 15, 20, 25, 30].map((years) => ({
    years,
    monthlySavingsNeeded: Math.round(monthlySavingsNeeded(fireNumber, years, RETURN_RATE)),
  }))
}

/**
 * Main function: calculate all FIRE Number results from validated inputs.
 */
export function calculateFireNumberResults(inputs: FireNumberInputs): FireNumberResults {
  const { annualExpenses, withdrawalRate, isMonthly } = inputs

  const effectiveAnnualExpenses = isMonthly ? annualExpenses * 12 : annualExpenses

  const fireNumber = calculateFireNumber(effectiveAnnualExpenses, withdrawalRate)
  const annualWithdrawal = fireNumber * withdrawalRate
  const monthlyWithdrawal = annualWithdrawal / 12
  const savingsTable = buildSavingsTable(fireNumber)

  return { fireNumber, monthlyWithdrawal, annualWithdrawal, savingsTable }
}
