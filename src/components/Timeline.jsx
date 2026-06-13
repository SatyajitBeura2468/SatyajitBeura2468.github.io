import { motion } from 'framer-motion'
import RevealText from './RevealText'
import { timeline } from '../data/timeline'

export default function Timeline() {
  return (
    <section id="timeline" className="section-shell">
      <p className="mono-label">06 // JOURNEY LOG</p>

      <RevealText as="h2" text="Journey Log" className="section-title" />

      <p className="section-opening">
        A simple map of where this curiosity has been going.
      </p>

      <div className="relative mt-14 ml-3 sm:ml-6">
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-cosmic via-nebula to-violet opacity-60"
          style={{ boxShadow: '0 0 12px rgba(34,211,238,.4)' }}
        />

        <ol className="space-y-10">
          {timeline.map((item, i) => (
            <motion.li
              key={item.period}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.05 * i }}
              className="relative pl-10"
            >
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.1 * i }}
                className="absolute -left-[7px] top-1.5 h-[15px] w-[15px] rounded-full border-2 border-nebula bg-deep shadow-[0_0_12px_rgba(34,211,238,.8)]"
              />

              <div className="glass max-w-xl rounded-2xl p-5 transition hover:border-nebula/40">
                <span className="mono-label text-[10px]">
                  MISSION LOG // {item.period}
                </span>

                <h3 className="mt-1.5 font-heading text-lg font-bold text-star">
                  {item.title}
                </h3>

                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}