import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import RevealText from './RevealText'

const QUESTIONS = [
  'What happens to information inside a black hole?',
  'Can randomness create memory?',
  'Why does the universe allow structure?',
  'Are algorithms a kind of evolution?',
  'What would science look like if school made curiosity the center?',
  'Can a small simulation reveal a large idea?',
  'Where does order come from in a chaotic system?',
]

function ParticleMemory() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf
    let w
    let h

    const blast = {
      x: 0,
      y: 0,
      s: 0,
    }

    const resize = () => {
      w = canvas.width = canvas.parentElement.getBoundingClientRect().width
      h = canvas.height = 220
    }

    resize()

    const parts = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }))

    const step = () => {
      ctx.fillStyle = 'rgba(5,8,22,0.12)'
      ctx.fillRect(0, 0, w, h)

      if (blast.s > 0.02) {
        const glow = ctx.createRadialGradient(blast.x, blast.y, 0, blast.x, blast.y, 80)
        glow.addColorStop(0, `rgba(37,99,235,${0.3 * blast.s})`)
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, w, h)

        blast.s *= 0.95
      }

      for (const p of parts) {
        p.vx += (Math.random() - 0.5) * 0.1
        p.vy += (Math.random() - 0.5) * 0.1

        const dx = p.x - blast.x
        const dy = p.y - blast.y
        const d2 = dx * dx + dy * dy

        if (d2 < 7000 && blast.s > 0.05) {
          const d = Math.sqrt(d2) || 1
          p.vx += (dx / d) * 1.6 * blast.s
          p.vy += (dy / d) * 1.6 * blast.s
        }

        p.vx *= 0.96
        p.vy *= 0.96

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(248,250,252,0.8)'
        ctx.fill()
      }

      if (!reduced) raf = requestAnimationFrame(step)
    }

    step()

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      blast.x = e.clientX - rect.left
      blast.y = e.clientY - rect.top
      blast.s = 1
    }

    canvas.addEventListener('pointerdown', onClick)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('pointerdown', onClick)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-xl border border-muted/15 bg-deep">
      <canvas
        ref={canvasRef}
        className="block h-[220px] w-full cursor-pointer"
        aria-label="Click to disturb the particle system and watch the trace fade"
      />

      <span className="absolute bottom-2.5 left-3 font-mono text-[10px] tracking-widest text-muted">
        CAN A SYSTEM REMEMBER?
      </span>
    </div>
  )
}

function CleanAirSurface() {
  const canvasRef = useRef(null)
  const [aqi, setAqi] = useState(180)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf
    let w
    let h
    let uv = false
    let cleaned = 0

    const resize = () => {
      w = canvas.width = canvas.parentElement.getBoundingClientRect().width
      h = canvas.height = 220
    }

    resize()

    const spawn = () => ({
      x: Math.random() * w,
      y: Math.random() * (h - 60),
      a: 1,
      vy: 0.25 + Math.random() * 0.3,
    })

    const parts = Array.from({ length: 45 }, spawn)

    const step = () => {
      ctx.clearRect(0, 0, w, h)

      ctx.fillStyle = uv ? 'rgba(34,211,238,0.9)' : 'rgba(34,211,238,0.35)'
      ctx.fillRect(0, h - 6, w, 6)

      if (uv) {
        const glow = ctx.createLinearGradient(0, h - 70, 0, h)
        glow.addColorStop(0, 'transparent')
        glow.addColorStop(1, 'rgba(34,211,238,0.28)')
        ctx.fillStyle = glow
        ctx.fillRect(0, h - 70, w, 70)
      }

      for (const p of parts) {
        p.y += p.vy
        p.x += Math.sin(p.y * 0.04) * 0.4

        if (uv && p.y > h - 60) p.a -= 0.03

        if (p.a <= 0 || p.y > h - 8) {
          cleaned += uv && p.a <= 0 ? 1 : 0
          Object.assign(p, spawn(), { y: -5 })
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(148,163,184,${0.75 * p.a})`
        ctx.fill()
      }

      setAqi(Math.max(40, Math.round(180 - cleaned * 1.5)))

      if (!reduced) raf = requestAnimationFrame(step)
    }

    step()

    const on = () => {
      uv = true
    }

    const off = () => {
      uv = false
    }

    canvas.addEventListener('pointerenter', on)
    canvas.addEventListener('pointerleave', off)
    canvas.addEventListener('pointerdown', on)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('pointerenter', on)
      canvas.removeEventListener('pointerleave', off)
      canvas.removeEventListener('pointerdown', on)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-xl border border-muted/15 bg-deep">
      <canvas
        ref={canvasRef}
        className="block h-[220px] w-full cursor-pointer"
        aria-label="Hover to activate UV light and clean pollutant particles"
      />

      <span
        className={`absolute right-3 top-3 rounded-md px-2 py-1 font-mono text-[10px] ${
          aqi < 90 ? 'bg-nebula/15 text-nebula' : 'bg-violet/15 text-violet'
        }`}
      >
        AQI {aqi}
      </span>

      <span className="absolute bottom-2.5 left-3 font-mono text-[10px] tracking-widest text-muted">
        HOVER = UV ACTIVE
      </span>
    </div>
  )
}

function QuestionEngine() {
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState('')
  const [seed, setSeed] = useState(1)

  useEffect(() => {
    setShown('')

    const question = QUESTIONS[index]
    let i = 0

    const timer = setInterval(() => {
      i += 1
      setShown(question.slice(0, i))

      if (i >= question.length) clearInterval(timer)
    }, 26)

    return () => clearInterval(timer)
  }, [index])

  const next = () => {
    setIndex((i) => (i + 1) % QUESTIONS.length)
    setSeed(Math.random())
  }

  const stars = Array.from({ length: 7 }, (_, i) => ({
    x: 20 + ((Math.sin(seed * 97 + i * 13) + 1) / 2) * 160,
    y: 15 + ((Math.cos(seed * 53 + i * 29) + 1) / 2) * 70,
  }))

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-muted/15 bg-deep p-5">
      <svg
        aria-hidden="true"
        viewBox="0 0 200 100"
        className="absolute inset-0 h-full w-full opacity-40"
      >
        {stars.map((star, i) => (
          <g key={i}>
            {i > 0 && (
              <line
                x1={stars[i - 1].x}
                y1={stars[i - 1].y}
                x2={star.x}
                y2={star.y}
                stroke="#2563EB"
                strokeWidth="0.4"
              />
            )}

            <circle cx={star.x} cy={star.y} r="1.4" fill="#22D3EE" />
          </g>
        ))}
      </svg>

      <div className="relative flex min-h-[110px] flex-1 items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            className="font-heading text-lg font-semibold leading-snug text-star sm:text-xl"
          >
            {shown}
            <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse-soft bg-nebula align-middle" />
          </motion.p>
        </AnimatePresence>
      </div>

      <button
        onClick={next}
        className="relative mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-cosmic to-violet px-5 py-2.5 text-xs font-semibold text-star transition hover:shadow-[0_0_22px_rgba(139,92,246,.5)]"
      >
        <Sparkles size={14} /> Generate Question
      </button>
    </div>
  )
}

const modules = [
  {
    title: 'Particle Memory',
    text: 'Click inside the system and watch how a small disturbance leaves a temporary trace.',
    Comp: ParticleMemory,
  },
  {
    title: 'Clean Air Surface',
    text: 'A tiny visual inspired by Tejas-Vayu, showing pollutant particles interacting with a glowing photocatalytic surface.',
    Comp: CleanAirSurface,
  },
  {
    title: 'Question Engine',
    text: 'Some questions are too interesting to leave alone.',
    Comp: QuestionEngine,
  },
]

export default function Lab() {
  return (
    <section id="lab" className="section-shell">
      <p className="mono-label">04 // THE LAB</p>

      <RevealText as="h2" text="The Lab" className="section-title" />

      <p className="section-opening">
        A small interactive space for the ideas I keep coming back to.
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {modules.map(({ title, text, Comp }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="glass flex flex-col gap-4 rounded-2xl p-5"
          >
            <div>
              <span className="mono-label text-[10px]">MODULE 0{i + 1}</span>

              <h3 className="mt-1 font-heading text-lg font-bold text-star">
                {title}
              </h3>

              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {text}
              </p>
            </div>

            <div className="flex-1">
              <Comp />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}