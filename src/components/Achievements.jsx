import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import RevealText from './RevealText'
import { achievements } from '../data/timeline'

export default function Achievements() {
  return (
    <section id="achievements" className="section-shell">
      <p className="mono-label">07 // MILESTONES</p>

      <RevealText
        as="h2"
        text="Achievements & Milestones"
        className="section-title"
      />

      <p className="section-opening">
        A few proof points from the journey so far.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass flex items-start gap-4 rounded-2xl p-5 transition hover:border-violet/40 hover:shadow-[0_0_24px_rgba(139,92,246,.15)]"
          >
            <span className="glass rounded-xl p-2.5 text-violet">
              <Award size={18} />
            </span>

            <div>
              <h3 className="font-heading text-base font-semibold text-star">
                {a.title}
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-muted">
                {a.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}