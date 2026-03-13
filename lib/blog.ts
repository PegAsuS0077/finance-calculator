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
