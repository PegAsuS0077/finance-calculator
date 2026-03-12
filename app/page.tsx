// app/page.tsx
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">FIRE Tools</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Free financial independence calculators for the FIRE movement.
      </p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link href="/fire-calculator" className="rounded-lg border p-6 hover:bg-accent transition-colors">
          <h2 className="font-semibold text-lg">FIRE Calculator</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Calculate your FIRE number, years to financial independence, and retirement age.
          </p>
        </Link>
      </div>
    </main>
  )
}
