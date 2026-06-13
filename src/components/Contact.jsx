import { motion } from 'framer-motion'
import { Github, BookOpen, GraduationCap, Fingerprint, Mail } from 'lucide-react'
import RevealText from './RevealText'
import MagneticButton from './MagneticButton'
import { links } from '../data/links'

const buttons = [
  { icon: Github, label: 'GitHub', href: links.github },
  { icon: BookOpen, label: 'Medium', href: links.medium },
  { icon: GraduationCap, label: 'Google Scholar', href: links.scholar },
  { icon: Fingerprint, label: 'ORCID', href: links.orcid },
  { icon: Mail, label: 'Email', href: links.email },
]

export default function Contact() {
  return (
    <section id="contact" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="aurora-border rounded-3xl"
      >
        <div className="aurora-inner relative overflow-hidden rounded-3xl px-7 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-glow-radial"
          />

          <p className="mono-label relative">08 // TRANSMISSION</p>

          <RevealText
            as="h2"
            text="Let's Build, Learn, or Discuss Something Weirdly Interesting."
            className="section-title relative mx-auto max-w-3xl"
          />

          <p className="relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
            I am always interested in science, technology, education, astronomy, public-interest
            tools, and ideas that connect learning with real life.
          </p>

          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
            {buttons.map(({ icon: Icon, label, href }, i) => (
              <MagneticButton key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                    i === 0
                      ? 'bg-gradient-to-r from-cosmic to-violet text-star hover:shadow-[0_0_26px_rgba(37,99,235,.55)]'
                      : 'glass text-star hover:border-nebula/50 hover:shadow-[0_0_18px_rgba(34,211,238,.2)]'
                  }`}
                >
                  <Icon size={15} /> {label}
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}