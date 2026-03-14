"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "4px",
        height: "100vh",
        zIndex: 100,
        background: "#e5e7eb",
      }}
    >
      <div
        style={{
          width: "100%",
          height: `${progress}%`,
          background: "#6366f1",
          borderRadius: "0 0 999px 999px",
          transition: "height 0.05s linear",
        }}
      />
    </div>
  )
}
