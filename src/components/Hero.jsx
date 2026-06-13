import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronDown, ArrowRight, Github, BookOpen } from 'lucide-react'
import MagneticButton from './MagneticButton'
import { links } from '../data/links'

const chips = [
  'Class 12 Science Student',
  'Odisha, India',
  'Physics & AI',
  'Aspiring Astrophysicist',
]

export default function Hero() {
  const ref = useRef(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })

  const lensX = useTransform(sx, (v) => v * 30)
  const lensY = useTransform(sy, (v) => v * 30)

  const nameX = useTransform(sx, (v) => v * -14)
  const nameY = useTransform(sy, (v) => v * -14)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  })

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center"
    >
      <motion.div
        aria-hidden="true"
        style={{ x: lensX, y: lensY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="relative h-[480px] w-[480px] max-w-[90vw]">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,.22),rgba(139,92,246,.10)_45%,transparent_70%)] blur-2xl" />

          <div
            className="absolute inset-[12%] rounded-full border border-cosmic/25"
            style={{ animation: 'border-spin 22s linear infinite' }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-nebula shadow-[0_0_12px_rgba(34,211,238,.9)]" />
          </div>

          <div
            className="absolute inset-[26%] rounded-full border border-violet/20"
            style={{ animation: 'border-spin 14s linear infinite reverse' }}
          >
            <span className="absolute top-1/2 -right-1 h-1.5 w-1.5 rounded-full bg-violet shadow-[0_0_10px_rgba(139,92,246,.9)]" />
          </div>

          <div
            className="absolute inset-[42%] rounded-full border border-nebula/15"
            style={{ animation: 'border-spin 9s linear infinite' }}
          />
        </div>
      </motion.div>

      <motion.p {...fadeUp(2.5)} className="mono-label">
        OBSERVATORY // BHAWANIPATNA → COSMOS
      </motion.p>

      <motion.h1
        {...fadeUp(2.65)}
        style={{ x: nameX, y: nameY }}
        className="mt-5 font-heading text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl"
      >
        SATYAJIT{' '}
        <span className="gradient-text drop-shadow-[0_0_30px_rgba(37,99,235,.35)]">
          BEURA
        </span>
      </motion.h1>

      <motion.ul
        {...fadeUp(2.85)}
        className="mt-7 flex flex-wrap justify-center gap-2.5"
        aria-label="Status"
      >
        {chips.map((c, i) => (
          <li key={c} className="chip animate-float-slow" style={{ animationDelay: `${i * 0.7}s` }}>
            <span className="h-1.5 w-1.5 rounded-full bg-cosmic" />
            {c}
          </li>
        ))}
      </motion.ul>

      <motion.p {...fadeUp(3.0)} className="mt-8 max-w-2xl text-lg leading-relaxed text-star sm:text-xl">
        I&apos;m a student from Bhawanipatna trying to understand the universe, build useful things,
        and turn curiosity into something real.
      </motion.p>

      <motion.p {...fadeUp(3.15)} className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        I explore physics, space science, AI, simulations, public-interest tech, and the strange
        questions that do not fit neatly inside a textbook.
      </motion.p>

      <motion.div {...fadeUp(3.3)} className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <MagneticButton>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cosmic to-violet px-6 py-3 text-sm font-semibold text-star transition hover:shadow-[0_0_32px_rgba(37,99,235,.55)]"
          >
            Explore My Work <ArrowRight size={16} />
          </a>
        </MagneticButton>

        <MagneticButton>
          <a
            href="#writing"
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-star transition hover:border-nebula/50"
          >
            <BookOpen size={16} /> Read My Ideas
          </a>
        </MagneticButton>

        <MagneticButton>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-muted transition hover:text-star"
          >
            <Github size={16} /> View GitHub
          </a>
        </MagneticButton>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-8 flex flex-col items-center gap-1 font-mono text-[10px] tracking-[0.25em] text-muted"
      >
        SCROLL TO ENTER THE LAB
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={16} className="text-nebula" />
        </motion.span>
      </motion.a>
    </section>
  )
}