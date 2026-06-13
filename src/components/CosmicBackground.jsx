import { useEffect, useRef } from 'react'

export default function CosmicBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    let raf = null
    let stars = []
    const mouse = { x: 0, y: 0 }

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(
        160,
        Math.floor((window.innerWidth * window.innerHeight) / 9000)
      )

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.3 + 0.2,
        depth: Math.random() * 0.8 + 0.2,
        tw: Math.random() * Math.PI * 2,
        hue:
          Math.random() < 0.12
            ? 'rgba(139,92,246,'
            : Math.random() < 0.25
              ? 'rgba(34,211,238,'
              : 'rgba(248,250,252,',
      }))
    }

    const draw = (t = 0) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (const s of stars) {
        const alpha = reduced
          ? 0.7
          : 0.35 + 0.45 * Math.abs(Math.sin(t * 0.0006 + s.tw))

        const px = s.x + mouse.x * 24 * s.depth
        const py = s.y + mouse.y * 24 * s.depth

        ctx.beginPath()
        ctx.arc(px, py, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `${s.hue}${alpha})`
        ctx.fill()
      }

      if (!reduced) raf = requestAnimationFrame(draw)
    }

    const onMouse = (e) => {
      mouse.x = e.clientX / window.innerWidth - 0.5
      mouse.y = e.clientY / window.innerHeight - 0.5
    }

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else if (!reduced) raf = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-space via-deep to-space" />

      <div className="absolute left-1/4 top-0 h-[60vh] w-[60vw] -translate-x-1/2 bg-glow-radial blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[50vh] w-[50vw] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,.10),transparent_65%)] blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.4) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}