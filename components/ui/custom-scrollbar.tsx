"use client"

import { useEffect, useRef, useCallback, useState } from "react"

export function CustomScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const [thumbHeight, setThumbHeight] = useState(40)
  const [thumbTop, setThumbTop] = useState(0)
  const [visible, setVisible] = useState(false)
  const dragging = useRef(false)
  const dragStartY = useRef(0)
  const dragStartScroll = useRef(0)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const getScrollRatio = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = window.innerHeight
    const scrollTop = window.scrollY
    const trackHeight = clientHeight - 56 // minus top+bottom arrow buttons (28px each)
    const ratio = clientHeight / scrollHeight
    const height = Math.max(32, trackHeight * ratio)
    const maxTop = trackHeight - height
    const top = scrollHeight > clientHeight
      ? (scrollTop / (scrollHeight - clientHeight)) * maxTop
      : 0
    return { height, top, scrollable: scrollHeight > clientHeight }
  }, [])

  const update = useCallback(() => {
    const { height, top, scrollable } = getScrollRatio()
    setThumbHeight(height)
    setThumbTop(top)
    setVisible(scrollable)
  }, [getScrollRatio])

  const showTemporarily = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    update()
    hideTimer.current = setTimeout(() => {}, 0) // keep visible while scrolling
  }, [update])

  useEffect(() => {
    update()
    window.addEventListener("scroll", showTemporarily, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", showTemporarily)
      window.removeEventListener("resize", update)
    }
  }, [update, showTemporarily])

  const scrollBy = (amount: number) => {
    window.scrollBy({ top: amount, behavior: "smooth" })
  }

  const onThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    dragging.current = true
    dragStartY.current = e.clientY
    dragStartScroll.current = window.scrollY

    const onMove = (ev: MouseEvent) => {
      if (!dragging.current) return
      const delta = ev.clientY - dragStartY.current
      const trackHeight = window.innerHeight - 56
      const scrollHeight = document.documentElement.scrollHeight
      const maxScroll = scrollHeight - window.innerHeight
      const maxThumbTop = trackHeight - thumbHeight
      const scrollDelta = (delta / maxThumbTop) * maxScroll
      window.scrollTo({ top: dragStartScroll.current + scrollDelta })
    }

    const onUp = () => {
      dragging.current = false
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseup", onUp)
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseup", onUp)
  }

  const onTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === thumbRef.current) return
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const trackHeight = rect.height
    const scrollHeight = document.documentElement.scrollHeight
    const maxScroll = scrollHeight - window.innerHeight
    const targetScroll = (clickY / trackHeight) * maxScroll
    window.scrollTo({ top: targetScroll, behavior: "smooth" })
  }

  if (!visible) return null

  const btnStyle: React.CSSProperties = {
    width: "100%",
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "oklch(0.93 0.004 255)",
    border: "none",
    cursor: "default",
    borderRadius: 8,
    flexShrink: 0,
    color: "oklch(0.45 0.008 255)",
    userSelect: "none",
  }

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        width: 14,
        height: "100vh",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        background: "oklch(0.88 0.004 255)",
        borderRadius: "6px 0 0 6px",
      }}
    >
      {/* Up arrow */}
      <button
        style={btnStyle}
        onMouseDown={(e) => { e.preventDefault(); scrollBy(-80) }}
        aria-label="Scroll up"
      >
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M5 1L1 7H9L5 1Z" fill="currentColor" />
        </svg>
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        onClick={onTrackClick}
        style={{ flex: 1, position: "relative", cursor: "default" }}
      >
        <div
          ref={thumbRef}
          onMouseDown={onThumbMouseDown}
          style={{
            position: "absolute",
            left: 2,
            right: 2,
            top: thumbTop,
            height: thumbHeight,
            background: "oklch(0.72 0.008 255)",
            borderRadius: 999,
            cursor: "default",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "oklch(0.55 0.010 255)")}
          onMouseLeave={e => (e.currentTarget.style.background = "oklch(0.72 0.008 255)")}
        />
      </div>

      {/* Down arrow */}
      <button
        style={btnStyle}
        onMouseDown={(e) => { e.preventDefault(); scrollBy(80) }}
        aria-label="Scroll down"
      >
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M5 7L9 1H1L5 7Z" fill="currentColor" />
        </svg>
      </button>
    </div>
  )
}
