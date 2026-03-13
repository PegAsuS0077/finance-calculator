"use client"

import { useEffect, useState } from "react"

interface Section {
  id: string
  label: string
}

interface OnThisPageProps {
  sections: Section[]
}

export function OnThisPage({ sections }: OnThisPageProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    const callback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    })

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
      observer.disconnect()
    }
  }, [sections])

  return (
    <nav
      aria-label="On this page"
      style={{
        position: "sticky",
        top: "calc(56px + 2rem)",
        width: "280px",
        flexShrink: 0,
        alignSelf: "flex-start",
      }}
    >
      <p
        style={{
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--f-text-faint)",
          marginBottom: "1rem",
        }}
      >
        On this page
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {sections.map(({ id, label }) => {
          const isActive = activeId === id
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--f-blue)" : "var(--f-text-label)",
                  textDecoration: "none",
                  padding: "0.4375rem 0.875rem",
                  borderRight: isActive ? "2px solid var(--f-blue)" : "2px solid var(--f-border)",
                  lineHeight: 1.4,
                  transition: "color 0.12s ease, border-color 0.12s ease",
                }}
              >
                {label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
