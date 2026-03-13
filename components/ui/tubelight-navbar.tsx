"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calculator, BookOpen, FileText, Info, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  sectionId?: string  // for homepage scroll sections
}

const navItems: NavItem[] = [
  { name: "Home", url: "/", icon: Home },
  { name: "Calculators", url: "/#calculators", icon: Calculator, sectionId: "calculators" },
  { name: "FIRE Guide", url: "/#what-is-fire", icon: BookOpen, sectionId: "what-is-fire" },
  { name: "Blog", url: "#", icon: FileText },
  { name: "About", url: "/about", icon: Info },
]

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

    // Track which sections are currently visible
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
          // Pick the first matching section in navItems order
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

  // On non-home pages, match by pathname
  const activeTab = isHome
    ? activeSection
    : (navItems.find((item) => item.url === pathname)?.name ?? "Home")

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
            <div style={{ width: "34px", height: "34px", background: "var(--f-blue)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M3 5h8M3 9h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M11 8v6M11 14l-2-2M11 14l2-2" stroke="#86efac" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: "1.0625rem", color: "var(--f-text-heading)", letterSpacing: "0.01em" }}>
              Fin<span style={{ color: "var(--f-blue)" }}>Calc</span>
            </span>
          </Link>

          {/* Nav items — absolutely centered */}
          <nav className="hidden sm:flex" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", alignItems: "center", gap: "0.125rem" }}>
            {navItems.map((item) => {
              const isActive = activeTab === item.name
              return (
                <Link
                  key={item.name}
                  href={item.url}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors",
                    "text-foreground/60 hover:text-foreground",
                    isActive && "text-foreground",
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full bg-muted rounded-full -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1 rounded-t-full" style={{ background: "var(--f-blue)" }}>
                        <div className="absolute w-10 h-5 rounded-full blur-md -top-2 -left-2" style={{ background: "var(--f-blue)", opacity: 0.2 }} />
                        <div className="absolute w-6 h-5 rounded-full blur-md -top-1" style={{ background: "var(--f-blue)", opacity: 0.2 }} />
                      </div>
                    </motion.div>
                  )}
                </Link>
              )
            })}
          </nav>

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
