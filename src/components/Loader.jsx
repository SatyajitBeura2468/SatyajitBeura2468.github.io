import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINES = [
  'INITIALIZING OBSERVATORY',
  'LOCATION: BHAWANIPATNA, ODISHA',
  'STATUS: CURIOUS',
  'INTERFACE ONLINE',
]

export default function Loader({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setVisibleLines((v) => (v < LINES.length ? v + 1 : v))
    }, 450)

    const progTimer = setInterval(() => {
      setProgress((p) => Math.min(p + 4, 100))
    }, 80)

    const done = setTimeout(() => onComplete?.(), 2300)

    return () => {
      clearInterval(lineTimer)
      clearInterval(progTimer)
      clearTimeout(done)
    }
  }, [onComplete])

  return (
    <motion.div
      role="status"
      aria-label="Loading observatory interface"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-space"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {[...Array(40)].map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute h-px w-px rounded-full bg-star animate-pulse-soft"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i % 10) * 0.3}s`,
            opacity: 0.6,
          }}
        />
      ))}

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-nebula/10 to-transparent animate-scan"
      />

      <div className="relative w-[min(90vw,420px)]">
        <p className="mono-label mb-6 text-nebula/80">SB-26 // BOOT SEQUENCE</p>

        <div className="min-h-[120px] space-y-2 font-mono text-sm text-muted">
          {LINES.slice(0, visibleLines).map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className={i === LINES.length - 1 ? 'text-nebula' : ''}
            >
              <span className="text-cosmic">&gt;</span> {line}
            </motion.p>
          ))}
        </div>

        <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-panel">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cosmic via-nebula to-violet"
            style={{
              width: `${progress}%`,
              boxShadow: '0 0 12px rgba(34,211,238,.7)',
            }}
          />
        </div>

        <p className="mt-2 text-right font-mono text-[10px] text-muted">{progress}%</p>
      </div>
    </motion.div>
  )
}