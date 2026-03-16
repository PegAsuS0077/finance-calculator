"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Calculator,
  BookOpen,
  Info,
  ChevronDown,
  Flame,
  TrendingUp,
  Compass,
  PiggyBank,
  BarChart2,
  Percent,
  LineChart,
  Clock,
  Leaf,
  Coffee,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ─────────────────────────────── data ─────────────────────────────── */

const CALCULATORS = [
  {
    group: "FIRE Basics",
    items: [
      { name: "FIRE Calculator", href: "/fire-calculator", icon: Flame, desc: "Years to financial independence" },
      { name: "FIRE Number", href: "/fire-number-calculator", icon: TrendingUp, desc: "How much you need to retire" },
      { name: "Coast FIRE", href: "/coast-fire-calculator", icon: Compass, desc: "When you can stop saving" },
      { name: "Savings Rate", href: "/savings-rate-calculator", icon: PiggyBank, desc: "How savings rate drives your timeline" },
    ],
  },
  {
    group: "Withdrawals & Rules",
    items: [
      { name: "4% Rule", href: "/4-percent-rule-calculator", icon: Percent, desc: "Safe withdrawal & portfolio longevity" },
      { name: "Retirement Timeline", href: "/retirement-timeline-calculator", icon: Clock, desc: "Year-by-year retirement roadmap" },
    ],
  },
  {
    group: "Growth & Investing",
    items: [
      { name: "Compound Interest", href: "/compound-interest-calculator", icon: BarChart2, desc: "Visualise compound growth" },
      { name: "Investment Growth", href: "/investment-growth-calculator", icon: LineChart, desc: "Project any portfolio over time" },
    ],
  },
  {
    group: "FIRE Variants",
    items: [
      { name: "Lean FIRE", href: "/lean-fire-calculator", icon: Leaf, desc: "Frugal early retirement" },
      { name: "Barista FIRE", href: "/barista-fire-calculator", icon: Coffee, desc: "Semi-retire with part-time income" },
    ],
  },
]

const LEARN_ITEMS = [
  { name: "What is FIRE?", href: "/blog/what-is-fire", tag: "Fundamentals" },
  { name: "How to calculate your FIRE number", href: "/blog/how-to-calculate-fire-number", tag: "Fundamentals" },
  { name: "The 4% Rule explained", href: "/blog/4-percent-rule-explained", tag: "Strategy" },
  { name: "Savings rate & retirement", href: "/blog/savings-rate-and-retirement", tag: "Strategy" },
  { name: "Coast FIRE explained", href: "/blog/coast-fire-explained", tag: "FIRE Types" },
  { name: "Lean FIRE vs Fat FIRE", href: "/blog/lean-fire-vs-fat-fire", tag: "FIRE Types" },
  { name: "Index fund investing for FIRE", href: "/blog/index-fund-investing-for-fire", tag: "Investing" },
  { name: "Investment growth & compound returns", href: "/blog/investment-growth-and-compound-returns", tag: "Investing" },
]

const TAG_COLOR: Record<string, string> = {
  Fundamentals: "var(--f-blue)",
  Strategy: "oklch(0.52 0.18 145)",
  "FIRE Types": "oklch(0.55 0.19 38)",
  Investing: "oklch(0.50 0.18 300)",
}

/* ─────────────────────────────── mobile nav ─────────────────────────────── */

function MobileNav({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  // lock body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  if (!open) return null

  return (
    <div className="mobile-nav-overlay" onClick={onClose}>
      <div className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-nav-header">
          <Link href="/" className="mobile-nav-logo" onClick={onClose}>
            <svg width="28" height="28" viewBox="0 0 64 64" fill="none" aria-hidden>
              <defs>
                <linearGradient id="mnbg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f0c29"/>
                  <stop offset="100%" stopColor="#302b63"/>
                </linearGradient>
                <linearGradient id="mnline" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24"/>
                  <stop offset="100%" stopColor="#f59e0b"/>
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="14" fill="url(#mnbg)"/>
              <polyline points="10,46 20,38 30,40 40,28 54,16" stroke="url(#mnline)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="54" cy="16" r="3" fill="#fbbf24"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--f-text-heading)" }}>
              Freedom<span style={{ color: "var(--f-blue)" }}>Calc</span>
            </span>
          </Link>
          <button className="mobile-nav-close" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <div className="mobile-nav-body">
          <Link href="/" className={cn("mobile-nav-link", pathname === "/" && "mobile-nav-link--active")} onClick={onClose}>
            <Home size={16} /> Home
          </Link>

          <div className="mobile-nav-section-label">Calculators</div>
          {CALCULATORS.flatMap((g) => g.items).map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("mobile-nav-calc-link", pathname === item.href && "mobile-nav-link--active")}
                onClick={onClose}
              >
                <span className="mobile-nav-calc-icon"><Icon size={14} /></span>
                <span>{item.name}</span>
              </Link>
            )
          })}

          <div className="mobile-nav-section-label">Learn</div>
          {LEARN_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("mobile-nav-link", pathname === item.href && "mobile-nav-link--active")}
              onClick={onClose}
            >
              <BookOpen size={16} /> {item.name}
            </Link>
          ))}

          <Link href="/blog" className={cn("mobile-nav-link", pathname === "/blog" && "mobile-nav-link--active")} onClick={onClose}>
            <BookOpen size={16} /> All blog posts
          </Link>
          <Link href="/about" className={cn("mobile-nav-link", pathname === "/about" && "mobile-nav-link--active")} onClick={onClose}>
            <Info size={16} /> About
          </Link>
        </div>

        <div className="mobile-nav-footer">
          <Link href="/fire-calculator" className="mobile-nav-cta" onClick={onClose}>
            Try FIRE Calculator — free
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────── desktop dropdowns ─────────────────────────────── */

function CalcDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div className="nav-dropdown nav-dropdown--wide">
      <div className="nav-dropdown-grid">
        {CALCULATORS.map((group) => (
          <div key={group.group} className="nav-dropdown-group">
            <p className="nav-dropdown-group-label">{group.group}</p>
            {group.items.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href} className="nav-dropdown-item" onClick={onClose}>
                  <span className="nav-dropdown-item-icon"><Icon size={15} /></span>
                  <span className="nav-dropdown-item-body">
                    <span className="nav-dropdown-item-name">{item.name}</span>
                    <span className="nav-dropdown-item-desc">{item.desc}</span>
                  </span>
                </Link>
              )
            })}
          </div>
        ))}
      </div>
      <div className="nav-dropdown-footer">
        <Link href="/#calculators" className="nav-dropdown-footer-link" onClick={onClose}>
          View all calculators →
        </Link>
      </div>
    </div>
  )
}

function LearnDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div className="nav-dropdown nav-dropdown--learn">
      <p className="nav-dropdown-group-label" style={{ marginBottom: "0.75rem" }}>From the blog</p>
      <div className="nav-learn-list">
        {LEARN_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="nav-learn-item" onClick={onClose}>
            <span className="nav-learn-tag" style={{ color: TAG_COLOR[item.tag] ?? "var(--f-blue)" }}>
              {item.tag}
            </span>
            <span className="nav-learn-name">{item.name}</span>
          </Link>
        ))}
      </div>
      <div className="nav-dropdown-footer">
        <Link href="/blog" className="nav-dropdown-footer-link" onClick={onClose}>
          All articles →
        </Link>
      </div>
    </div>
  )
}

/* ─────────────────────────────── tubelight nav items ─────────────────────────────── */

type NavItemName = "Home" | "Calculators" | "Learn" | "About"

const NAV_ITEM_NAMES: NavItemName[] = ["Home", "Calculators", "Learn", "About"]

function TubelightNavItems({
  activeTab,
  openDropdown,
  onToggle,
  onLinkClick,
  onClose,
}: {
  activeTab: NavItemName
  openDropdown: "calculators" | "learn" | null
  onToggle: (name: "calculators" | "learn") => void
  onLinkClick: () => void
  onClose: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const [highlight, setHighlight] = useState<{ left: number; width: number } | null>(null)

  useEffect(() => {
    const activeIndex = NAV_ITEM_NAMES.indexOf(activeTab)
    const activeEl = itemRefs.current[activeIndex]
    const containerEl = containerRef.current
    if (!activeEl || !containerEl) return
    const containerRect = containerEl.getBoundingClientRect()
    const itemRect = activeEl.getBoundingClientRect()
    setHighlight({ left: itemRect.left - containerRect.left, width: itemRect.width })
  }, [activeTab])

  return (
    <div
      ref={containerRef}
      className="tubelight-nav"
    >
      {/* Sliding lamp highlight */}
      {highlight && (
        <motion.div
          animate={{ left: highlight.left, width: highlight.width }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ position: "absolute", top: 0, height: "100%", borderRadius: "9999px", zIndex: 0 }}
          className="bg-muted"
        >
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1 rounded-t-full"
            style={{ background: "var(--f-blue)" }}
          >
            <div className="absolute w-10 h-5 rounded-full blur-md -top-2 -left-2" style={{ background: "var(--f-blue)", opacity: 0.2 }} />
            <div className="absolute w-6 h-5 rounded-full blur-md -top-1" style={{ background: "var(--f-blue)", opacity: 0.2 }} />
          </div>
        </motion.div>
      )}

      {/* Home */}
      <Link
        href="/"
        ref={(el) => { itemRefs.current[0] = el }}
        onClick={onLinkClick}
        className={cn("tubelight-item", activeTab === "Home" && "tubelight-item--active")}
        style={{ zIndex: 1 }}
      >
        Home
      </Link>

      {/* Calculators — wrapper is position:relative so dropdown anchors to it */}
      <div className="nav-dropdown-anchor" style={{ zIndex: 1 }}>
        <div
          ref={(el) => { itemRefs.current[1] = el }}
          className={cn("tubelight-item tubelight-item--btn", activeTab === "Calculators" && "tubelight-item--active")}
          aria-expanded={openDropdown === "calculators"}
          aria-haspopup="true"
        >
          <Link href="/#calculators" onClick={onLinkClick} className="tubelight-item-label">
            Calculators
          </Link>
          <button
            onClick={() => onToggle("calculators")}
            className="tubelight-item-chevron"
            aria-label="Toggle calculators menu"
          >
            <ChevronDown size={13} className={cn("nav-chevron", openDropdown === "calculators" && "nav-chevron--open")} />
          </button>
        </div>
        {openDropdown === "calculators" && <CalcDropdown onClose={onClose} />}
      </div>

      {/* Learn — wrapper is position:relative so dropdown anchors to it */}
      <div className="nav-dropdown-anchor" style={{ zIndex: 1 }}>
        <div
          ref={(el) => { itemRefs.current[2] = el }}
          className={cn("tubelight-item tubelight-item--btn", activeTab === "Learn" && "tubelight-item--active")}
          aria-expanded={openDropdown === "learn"}
          aria-haspopup="true"
        >
          <Link href="/blog" onClick={onLinkClick} className="tubelight-item-label">
            Learn
          </Link>
          <button
            onClick={() => onToggle("learn")}
            className="tubelight-item-chevron"
            aria-label="Toggle learn menu"
          >
            <ChevronDown size={13} className={cn("nav-chevron", openDropdown === "learn" && "nav-chevron--open")} />
          </button>
        </div>
        {openDropdown === "learn" && <LearnDropdown onClose={onClose} />}
      </div>

      {/* About */}
      <Link
        href="/about"
        ref={(el) => { itemRefs.current[3] = el }}
        onClick={onLinkClick}
        className={cn("tubelight-item", activeTab === "About" && "tubelight-item--active")}
        style={{ zIndex: 1 }}
      >
        About
      </Link>
    </div>
  )
}

/* ─────────────────────────────── main navbar ─────────────────────────────── */

export function NavBar() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<"calculators" | "learn" | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  const closeAll = useCallback(() => setOpenDropdown(null), [])

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) closeAll()
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [closeAll])

  useEffect(() => {
    closeAll()
    setMobileOpen(false)
  }, [pathname, closeAll])

  function toggle(name: "calculators" | "learn") {
    setOpenDropdown((prev) => (prev === name ? null : name))
  }

  const isCalcActive = CALCULATORS.flatMap((g) => g.items).some((i) => pathname === i.href)
  const isLearnActive = pathname === "/blog" || pathname.startsWith("/blog/")

  const activeTab: NavItemName = isCalcActive
    ? "Calculators"
    : isLearnActive
    ? "Learn"
    : pathname === "/about"
    ? "About"
    : "Home"

  return (
    <>
      <header className="nav-header" ref={navRef}>
        <div className="nav-inner">

          {/* Logo */}
          <Link href="/" className="nav-logo">
            <svg width="32" height="32" viewBox="0 0 64 64" fill="none" aria-hidden style={{ flexShrink: 0 }}>
              <defs>
                <linearGradient id="nbg2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f0c29"/>
                  <stop offset="100%" stopColor="#302b63"/>
                </linearGradient>
                <linearGradient id="nline2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24"/>
                  <stop offset="100%" stopColor="#f59e0b"/>
                </linearGradient>
                <linearGradient id="nfill2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35"/>
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="14" fill="url(#nbg2)"/>
              <rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1"/>
              <polygon points="10,46 20,38 30,40 40,28 54,16 54,46" fill="url(#nfill2)"/>
              <polyline points="10,46 20,38 30,40 40,28 54,16" stroke="url(#nline2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="54" cy="16" r="3" fill="#fbbf24"/>
              <line x1="10" y1="50" x2="54" y2="50" stroke="white" strokeOpacity="0.12" strokeWidth="1"/>
            </svg>
            <span className="nav-logo-text">
              Freedom<span style={{ color: "var(--f-blue)" }}>Calc</span>
            </span>
          </Link>

          {/* Centered tubelight nav — desktop only */}
          <div className="nav-center-slot">
            <TubelightNavItems
              activeTab={activeTab}
              openDropdown={openDropdown}
              onToggle={toggle}
              onLinkClick={closeAll}
              onClose={closeAll}
            />
          </div>

          {/* Right side */}
          <div className="nav-right">
            <Link href="/fire-calculator" className="nav-cta">
              Try for free
            </Link>
            <button
              className="nav-hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen nav */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />

      {/* Mobile bottom tab bar */}
      <nav className="mobile-tab-bar">
        <Link href="/" className={cn("mobile-tab", pathname === "/" && "mobile-tab--active")}>
          <Home size={20} />
          <span>Home</span>
        </Link>
        <button
          className={cn("mobile-tab", isCalcActive && "mobile-tab--active")}
          onClick={() => setMobileOpen(true)}
        >
          <Calculator size={20} />
          <span>Calculators</span>
        </button>
        <button
          className={cn("mobile-tab", isLearnActive && "mobile-tab--active")}
          onClick={() => setMobileOpen(true)}
        >
          <BookOpen size={20} />
          <span>Learn</span>
        </button>
        <button
          className={cn("mobile-tab", pathname === "/about" && "mobile-tab--active")}
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={20} />
          <span>More</span>
        </button>
      </nav>
    </>
  )
}
