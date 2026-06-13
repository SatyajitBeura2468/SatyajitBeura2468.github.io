import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

function MiniVisual({ type }) {
  if (type === 'air') {
    return (
      <div className="relative h-24 overflow-hidden rounded-xl bg-deep" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-muted/70 animate-float-slow"
            style={{
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 4) * 14}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}

        <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-nebula/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-nebula shadow-[0_0_14px_rgba(34,211,238,.8)]" />

        <span className="absolute right-2 top-2 rounded bg-panel px-1.5 py-0.5 font-mono text-[9px] text-nebula">
          AQI ▼
        </span>
      </div>
    )
  }

  if (type === 'bridge') {
    return (
      <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-xl bg-deep" aria-hidden="true">
        <svg viewBox="0 0 200 60" className="w-full px-6 opacity-80">
          <path
            d="M10 50 Q 100 -10 190 50"
            fill="none"
            stroke="#2563EB"
            strokeWidth="1.5"
          />

          {[40, 70, 100, 130, 160].map((x) => (
            <line
              key={x}
              x1={x}
              y1={50}
              x2={x}
              y2={50 - 38 * Math.sin(((x - 10) / 180) * Math.PI)}
              stroke="#22D3EE"
              strokeWidth="0.7"
              opacity="0.6"
            />
          ))}

          <circle cx="100" cy="12" r="3" fill="#8B5CF6" className="animate-pulse-soft" />
        </svg>
      </div>
    )
  }

  if (type === 'flow') {
    return (
      <div className="relative h-24 overflow-hidden rounded-xl bg-deep" aria-hidden="true">
        <svg viewBox="0 0 200 60" className="h-full w-full">
          <path
            d="M0 15 L70 15 Q 100 22 130 15 L200 15 M0 45 L70 45 Q 100 38 130 45 L200 45"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1"
            opacity="0.5"
          />

          {[0, 1, 2, 3].map((i) => (
            <circle key={i} r="2" fill="#22D3EE">
              <animateMotion
                dur={`${2.5 + i * 0.4}s`}
                repeatCount="indefinite"
                path="M10 30 L70 30 Q 100 30 130 30 L190 30"
              />
            </circle>
          ))}
        </svg>
      </div>
    )
  }

  return (
    <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-xl bg-deep" aria-hidden="true">
      <div className="relative h-16 w-16">
        <span
          className="absolute inset-0 rounded-full border border-cosmic/50"
          style={{ animation: 'border-spin 8s linear infinite' }}
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-nebula shadow-[0_0_8px_rgba(34,211,238,.9)]" />
        </span>

        <span className="absolute inset-3 rounded-full border border-violet/40" />
        <span className="absolute inset-[26px] rounded-full bg-violet/80 shadow-[0_0_16px_rgba(139,92,246,.7)]" />
      </div>
    </div>
  )
}

export default function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height

    setTilt({
      rx: (0.5 - py) * 7,
      ry: (px - 0.5) * 7,
    })

    setGlow({
      x: px * 100,
      y: py * 100,
      on: true,
    })
  }

  const onLeave = () => {
    setTilt({ rx: 0, ry: 0 })
    setGlow((g) => ({ ...g, on: false }))
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.12,
        ease: 'easeOut',
      }}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: 'transform .25s ease-out',
      }}
      className="glass group relative flex flex-col gap-4 rounded-2xl p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: glow.on ? 1 : 0,
          background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, rgba(37,99,235,.14), transparent 65%)`,
        }}
      />

      <div className="flex items-center justify-between">
        <span className="mono-label text-[10px]">{project.category}</span>
        <span className="font-mono text-[10px] text-muted">0{index + 1}</span>
      </div>

      <MiniVisual type={project.visual} />

      <div>
        <h3 className="font-heading text-xl font-bold text-star">{project.title}</h3>
        <p className="mt-1 text-sm text-nebula/90">{project.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
      </div>

      <ul className="flex flex-wrap gap-2" aria-label="Tags">
        {project.tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-muted/20 bg-panel px-2.5 py-0.5 font-mono text-[10px] text-muted"
          >
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-3 pt-2">
        {project.buttons.map((b) => (
          <a
            key={b.label}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition ${
              b.primary
                ? 'bg-gradient-to-r from-cosmic to-violet text-star hover:shadow-[0_0_20px_rgba(37,99,235,.5)]'
                : 'border border-muted/30 text-muted hover:border-nebula/50 hover:text-star'
            }`}
          >
            {b.primary ? <ExternalLink size={13} /> : <Github size={13} />}
            {b.label}
          </a>
        ))}
      </div>
    </motion.article>
  )
}