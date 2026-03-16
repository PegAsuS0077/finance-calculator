// lib/blog.ts — Blog post metadata registry

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  category: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-fire",
    title: "What Is FIRE? Financial Independence, Retire Early Explained",
    description: "A complete beginner's guide to the FIRE movement — the math, the mindset, the four types of FIRE, and how to get started.",
    date: "2025-01-15",
    readingTime: "12 min read",
    category: "FIRE Fundamentals",
  },
  {
    slug: "how-to-calculate-fire-number",
    title: "How to Calculate Your FIRE Number",
    description: "Step-by-step guide to calculating exactly how much you need to retire — including how to choose your withdrawal rate and account for Social Security.",
    date: "2025-01-22",
    readingTime: "10 min read",
    category: "FIRE Fundamentals",
  },
  {
    slug: "4-percent-rule-explained",
    title: "The 4% Rule Explained: Safe Withdrawal Rates for Early Retirees",
    description: "The research behind the 4% rule, why it works, its limitations for long retirements, and how to apply it to your FIRE plan.",
    date: "2025-02-05",
    readingTime: "11 min read",
    category: "FIRE Strategy",
  },
  {
    slug: "savings-rate-and-retirement",
    title: "Why Your Savings Rate Matters More Than Your Income",
    description: "The single most powerful variable in your retirement timeline isn't how much you earn — it's the percentage you save. Here's the math.",
    date: "2025-02-18",
    readingTime: "9 min read",
    category: "FIRE Strategy",
  },
  {
    slug: "coast-fire-explained",
    title: "Coast FIRE Explained: How to Stop Saving and Still Retire",
    description: "Coast FIRE is the milestone where your existing portfolio will grow to your FIRE number without another contribution. Here's how it works.",
    date: "2025-03-03",
    readingTime: "10 min read",
    category: "FIRE Types",
  },
  {
    slug: "lean-fire-vs-fat-fire",
    title: "Lean FIRE vs. Fat FIRE: Which Path Is Right for You?",
    description: "Two very different approaches to financial independence — frugal early retirement vs. a comfortable portfolio. A side-by-side comparison to help you decide.",
    date: "2025-03-10",
    readingTime: "11 min read",
    category: "FIRE Types",
  },
  {
    slug: "index-fund-investing-for-fire",
    title: "Index Fund Investing for FIRE: A Practical Guide",
    description: "Why the FIRE community has converged on index funds, how to build a simple three-fund portfolio, and the tax strategies that accelerate your timeline.",
    date: "2025-03-13",
    readingTime: "13 min read",
    category: "Investing",
  },
  {
    slug: "investment-growth-and-compound-returns",
    title: "How Investment Growth Works: Compound Returns Explained",
    description: "The math behind compound investment growth, why time is the most powerful variable, and how to project your portfolio using the future value formula.",
    date: "2026-03-14",
    readingTime: "10 min read",
    category: "Investing",
  },
  {
    slug: "how-to-retire-early-using-4-percent-rule",
    title: "How to Retire Early Using the 4% Rule",
    description: "A step-by-step tutorial on applying the 4% rule to plan your early retirement — calculating expenses, choosing a withdrawal rate, building your portfolio, and stress-testing the plan.",
    date: "2026-03-16",
    readingTime: "13 min read",
    category: "Tutorial",
  },
  {
    slug: "best-investment-apps-financial-freedom",
    title: "Top 5 Investment Apps to Achieve Financial Freedom",
    description: "Fidelity, Vanguard, M1 Finance, Betterment, and Schwab compared for FIRE investors — which platform is right for your savings strategy and portfolio size.",
    date: "2026-03-16",
    readingTime: "11 min read",
    category: "Investing",
  },
  {
    slug: "financial-independence-calculator-explained",
    title: "Financial Independence Calculator Explained",
    description: "What FIRE calculators actually compute, how to use them effectively, what the inputs mean, how to read the outputs, and the scenarios you must stress-test.",
    date: "2026-03-16",
    readingTime: "12 min read",
    category: "FIRE Fundamentals",
  },
  {
    slug: "how-much-to-save-retire-by-40",
    title: "How Much Should I Save to Retire by 40?",
    description: "The exact portfolio targets, savings rate requirements, income scenarios, and account strategies for achieving financial independence by your early 40s.",
    date: "2026-03-16",
    readingTime: "11 min read",
    category: "FIRE Strategy",
  },
  {
    slug: "case-study-retiring-with-1m-by-35",
    title: "Case Study: Retiring with $1M by 35",
    description: "A detailed year-by-year breakdown of how a software engineer went from $8,000 in savings at 24 to $1,040,000 and work-optional at 35 — the decisions, numbers, and lessons.",
    date: "2026-03-16",
    readingTime: "14 min read",
    category: "FIRE Strategy",
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
