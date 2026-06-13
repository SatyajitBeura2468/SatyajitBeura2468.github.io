import { Github, BookOpen, GraduationCap, Fingerprint, Mail, ArrowUp } from 'lucide-react'
import { links } from '../data/links'
import MagneticButton from './MagneticButton'

const socials = [
  { icon: Github, href: links.github, label: 'GitHub' },
  { icon: BookOpen, href: links.medium, label: 'Medium' },
  { icon: GraduationCap, href: links.scholar, label: 'Google Scholar' },
  { icon: Fingerprint, href: links.orcid, label: 'ORCID' },
  { icon: Mail, href: links.email, label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 mt-12 border-t border-muted/15">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-glow-radial"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 text-center">
        <p className="gradient-text font-heading text-xl font-bold sm:text-2xl">
          From Bhawanipatna to the Cosmos.
        </p>

        <div className="flex gap-5">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted transition hover:text-nebula hover:drop-shadow-[0_0_8px_rgba(34,211,238,.6)]"
            >
              <Icon size={19} />
            </a>
          ))}
        </div>

        <p className="font-mono text-xs text-muted">
          © 2026 Satyajit Beura. Built with curiosity.
        </p>

        <MagneticButton>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted transition hover:text-nebula hover:shadow-[0_0_18px_rgba(34,211,238,.35)]"
          >
            <ArrowUp size={18} />
          </button>
        </MagneticButton>
      </div>
    </footer>
  )
}