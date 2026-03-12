// app/fire-calculator/page.tsx
import type { Metadata } from 'next'
import { config } from '@/lib/config'
import FireCalculatorContent from '@/content/tools/fire-calculator.mdx'

export const metadata: Metadata = {
  title: 'FIRE Calculator — Calculate Your Financial Independence Number',
  description: 'Use our free FIRE calculator to calculate your FIRE number, years to financial independence, and retirement age. Results update instantly.',
  alternates: {
    canonical: `${config.siteUrl}/fire-calculator`,
  },
}

export default function FireCalculatorPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <FireCalculatorContent />
      </article>
    </main>
  )
}
