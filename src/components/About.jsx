import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Atom, Telescope, Sparkles } from 'lucide-react'
import RevealText from './RevealText'

const profile = [
  { icon: MapPin, label: 'Location', value: 'Bhawanipatna, Odisha' },
  { icon: GraduationCap, label: 'Current', value: 'Class 12 Science Student' },
  { icon: Atom, label: 'Focus', value: 'Physics, AI, Space Science' },
  { icon: Telescope, label: 'Direction', value: 'Astrophysics and Research' },
  { icon: Sparkles, label: 'Motto', value: 'Trying to do better.' },
]

export default function About() {
  return (
    <section id="about" className="section-shell">
      <p className="mono-label">01 // ABOUT</p>

      <RevealText
        as="h2"
        text="A student, a builder, and a little too curious for the syllabus."
        className="section-title max-w-3xl"
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-5 text-base leading-relaxed text-muted sm:text-lg"
        >
          <p>
            I am Satyajit Beura, a Class 12 science student from Bhawanipatna, Odisha. I have
            always been drawn toward the sky, not just because it looks beautiful, but because it
            keeps asking questions we still cannot fully answer.
          </p>

          <p>
            Physics, astronomy, AI, and science communication are the areas that pull me the most.
            I enjoy learning about black holes, spacetime, quantum ideas, the Fermi Paradox,
            simulations, and the hidden patterns behind natural systems.
          </p>

          <p>
            At the same time, I do not want curiosity to stay only as curiosity. I like building
            websites, simulations, public-use tools, and science projects that connect ideas with
            real people.
          </p>

          <p className="gradient-text font-heading text-xl font-semibold">
            Grounded in Odisha. Looking toward the cosmos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="aurora-border rounded-2xl"
        >
          <div className="aurora-inner rounded-2xl p-6">
            <p className="mono-label mb-5 text-[10px]">PROFILE // SB-26</p>

            <ul className="space-y-4">
              {profile.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="glass mt-0.5 rounded-lg p-2 text-nebula">
                    <Icon size={15} />
                  </span>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-star">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}