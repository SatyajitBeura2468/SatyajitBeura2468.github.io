import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FileText, Lightbulb, BookOpen } from 'lucide-react'
import RevealText from './RevealText'
import { links } from '../data/links'

const badges = [
  'Preprint',
  'Zenodo DOI',
  'Langevin Dynamics',
  'Non-Equilibrium Systems',
  'Computational Physics',
]

function MemorySim() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf
    let w
    let h

    const pointer = {
      x: -999,
      y: -999,
      strength: 0,
    }

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      w = canvas.width = rect.width
      h = canvas.height = 260
    }

    resize()

    const parts = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }))

    const step = () => {
      ctx.fillStyle = 'rgba(5,8,22,0.14)'
      ctx.fillRect(0, 0, w, h)

      if (pointer.strength > 0.01) {
        const glow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          90
        )

        glow.addColorStop(0, `rgba(139,92,246,${0.25 * pointer.strength})`)
        glow.addColorStop(1, 'transparent')

        ctx.fillStyle = glow
        ctx.fillRect(0, 0, w, h)

        pointer.strength *= 0.96
      }

      for (const p of parts) {
        p.vx += (Math.random() - 0.5) * 0.12
        p.vy += (Math.random() - 0.5) * 0.12

        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const d2 = dx * dx + dy * dy

        if (d2 < 8100 && pointer.strength > 0.05) {
          const d = Math.sqrt(d2) || 1
          p.vx += (dx / d) * 1.4 * pointer.strength
          p.vy += (dy / d) * 1.4 * pointer.strength
        }

        p.vx *= 0.96
        p.vy *= 0.96

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        p.x = Math.max(0, Math.min(w, p.x))
        p.y = Math.max(0, Math.min(h, p.y))

        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(34,211,238,0.85)'
        ctx.fill()
      }

      if (!reduced) raf = requestAnimationFrame(step)
    }

    step()

    const disturb = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.strength = 1
    }

    canvas.addEventListener('pointermove', disturb)
    canvas.addEventListener('pointerdown', disturb)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('pointermove', disturb)
      canvas.removeEventListener('pointerdown', disturb)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-xl border border-muted/15 bg-deep">
      <canvas
        ref={canvasRef}
        className="block h-[260px] w-full cursor-crosshair"
        aria-label="Interactive particle simulation: disturb the system and watch traces fade"
      />

      <span className="absolute bottom-3 left-3 font-mono text-[10px] tracking-widest text-muted">
        CAN A SYSTEM REMEMBER?
      </span>
    </div>
  )
}

export default function Research() {
  return (
    <section id="research" className="section-shell">
      <p className="mono-label">02 // RESEARCH</p>

      <RevealText
        as="h2"
        text="Research & Strange Questions"
        className="section-title"
      />

      <p className="section-opening">
        Some questions begin as random thoughts. Some refuse to leave.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="aurora-border mt-12 rounded-2xl"
      >
        <div className="aurora-inner grid gap-8 rounded-2xl p-7 sm:p-9 lg:grid-cols-2">
          <div>
            <h3 className="font-heading text-2xl font-bold text-star sm:text-3xl">
              Dimensional Memory Encoding
            </h3>

            <p className="mt-2 text-nebula">
              Can chaotic systems carry traces of their past?
            </p>

            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
              My DME work explores whether non-equilibrium systems can retain short-term traces of
              their previous states through local pressure differences and flow patterns. The idea is
              not to make chaos magical, but to ask whether memory-like behavior can emerge from
              physical systems under the right conditions.
            </p>

            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Research badges">
              {badges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 font-mono text-[10px] text-violet"
                >
                  {badge}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={links.zenodo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cosmic to-violet px-5 py-2.5 text-xs font-semibold text-star transition hover:shadow-[0_0_24px_rgba(37,99,235,.5)]"
              >
                <FileText size={14} /> Read Preprint
              </a>

              <a
                href={links.zenodo}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium text-star hover:border-nebula/50"
              >
                <Lightbulb size={14} /> Simple Explanation
              </a>

              <a
                href={links.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium text-muted hover:text-star"
              >
                <BookOpen size={14} /> Medium Notes
              </a>
            </div>
          </div>

          <MemorySim />
        </div>
      </motion.div>
    </section>
  )
}
