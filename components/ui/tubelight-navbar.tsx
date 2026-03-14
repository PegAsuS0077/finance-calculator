"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calculator, BookOpen, FileText, Info, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  sectionId?: string
}

const navItems: NavItem[] = [
  { name: "Home", url: "/", icon: Home },
  { name: "Calculators", url: "/#calculators", icon: Calculator, sectionId: "calculators" },
  { name: "FIRE Guide", url: "/#what-is-fire", icon: BookOpen, sectionId: "what-is-fire" },
  { name: "Blog", url: "/blog", icon: FileText },
  { name: "About", url: "/about", icon: Info },
]

function NavItems({ activeTab }: { activeTab: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [highlight, setHighlight] = useState<{ left: number; width: number } | null>(null)

  useEffect(() => {
    const activeIndex = navItems.findIndex((item) => item.name === activeTab)
    const activeEl = itemRefs.current[activeIndex]
    const containerEl = containerRef.current
    if (!activeEl || !containerEl) return

    const containerRect = containerEl.getBoundingClientRect()
    const itemRect = activeEl.getBoundingClientRect()
    setHighlight({
      left: itemRect.left - containerRect.left,
      width: itemRect.width,
    })
  }, [activeTab])

  return (
    <div
      ref={containerRef}
      className="hidden sm:flex"
      style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", alignItems: "center", gap: "0.125rem" }}
    >
      {/* Single always-mounted sliding highlight */}
      {highlight && (
        <motion.div
          animate={{ left: highlight.left, width: highlight.width }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ position: "absolute", top: 0, height: "100%", borderRadius: "9999px", zIndex: 0 }}
          className="bg-muted"
        >
          {/* Lamp glow on top */}
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1 rounded-t-full"
            style={{ background: "var(--f-blue)" }}
          >
            <div className="absolute w-10 h-5 rounded-full blur-md -top-2 -left-2" style={{ background: "var(--f-blue)", opacity: 0.2 }} />
            <div className="absolute w-6 h-5 rounded-full blur-md -top-1" style={{ background: "var(--f-blue)", opacity: 0.2 }} />
          </div>
        </motion.div>
      )}

      {navItems.map((item, i) => {
        const isActive = activeTab === item.name
        return (
          <Link
            key={item.name}
            href={item.url}
            ref={(el) => { itemRefs.current[i] = el }}
            className={cn(
              "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors",
              "text-foreground/60 hover:text-foreground",
              isActive && "text-foreground",
            )}
            style={{ zIndex: 1 }}
          >
            {item.name}
          </Link>
        )
      })}
    </div>
  )
}

interface NavBarProps {
  className?: string
}

export function NavBar({ className }: NavBarProps) {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [activeSection, setActiveSection] = useState<string>("Home")

  useEffect(() => {
    if (!isHome) return

    const sectionItems = navItems.filter((item) => item.sectionId)
    const observers: IntersectionObserver[] = []
    const visible = new Set<string>()

    sectionItems.forEach((item) => {
      const el = document.getElementById(item.sectionId!)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visible.add(item.sectionId!)
          } else {
            visible.delete(item.sectionId!)
          }
          const active = sectionItems.find((i) => visible.has(i.sectionId!))
          setActiveSection(active ? active.name : "Home")
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [isHome])

  const activeTab = isHome
    ? activeSection
    : (navItems.find((item) => item.url === pathname || (item.url !== "/" && pathname.startsWith(item.url)))?.name ?? "Home")

  return (
    <>
      {/* Desktop/tablet header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg",
          className,
        )}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(1.25rem, 4vw, 2.5rem)", height: "60px", display: "flex", alignItems: "center", position: "relative" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", flexShrink: 0 }}>
            <svg width="34" height="34" viewBox="0 0 64 64" fill="none" aria-hidden style={{ flexShrink: 0 }}>
                <defs>
                  <linearGradient id="nbg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0f0c29"/>
                    <stop offset="100%" stopColor="#302b63"/>
                  </linearGradient>
                  <linearGradient id="nline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24"/>
                    <stop offset="100%" stopColor="#f59e0b"/>
                  </linearGradient>
                  <linearGradient id="nfill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35"/>
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <rect width="64" height="64" rx="14" fill="url(#nbg)"/>
                <rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1"/>
                <polygon points="10,46 20,38 30,40 40,28 54,16 54,46" fill="url(#nfill)"/>
                <polyline points="10,46 20,38 30,40 40,28 54,16" stroke="url(#nline)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <circle cx="54" cy="16" r="3" fill="#fbbf24"/>
                <line x1="10" y1="50" x2="54" y2="50" stroke="white" strokeOpacity="0.12" strokeWidth="1"/>
              </svg>
            <span style={{ fontWeight: 700, fontSize: "1.0625rem", color: "var(--f-text-heading)", letterSpacing: "0.01em" }}>
              Freedom<span style={{ color: "var(--f-blue)" }}>Calc</span>
            </span>
          </Link>

          {/* Nav items — absolutely centered */}
          <NavItems activeTab={activeTab} />

          {/* CTA */}
          <div style={{ marginLeft: "auto" }}>
            <Link
              href="/fire-calculator"
              style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--f-blue)", background: "var(--f-blue-light)", border: "1px solid var(--f-blue-border)", padding: "0.4375rem 1rem", borderRadius: "7px", textDecoration: "none", whiteSpace: "nowrap" }}
            >
              Try for free
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur-lg">
        <div style={{ display: "flex", justifyContent: "space-around", padding: "0.5rem 0", paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            return (
              <Link
                key={item.name}
                href={item.url}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", padding: "0.375rem 0.75rem", color: isActive ? "var(--f-blue)" : "var(--f-text-muted)", textDecoration: "none" }}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span style={{ fontSize: "0.625rem", fontWeight: isActive ? 600 : 400 }}>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
