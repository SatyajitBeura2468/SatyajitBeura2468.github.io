import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, BookOpen, GraduationCap, Fingerprint, Menu, X, Rocket } from 'lucide-react'
import { links, navLinks } from '../data/links'

const socials = [
  { icon: Github, href: links.github, label: 'GitHub' },
  { icon: BookOpen, href: links.medium, label: 'Medium' },
  { icon: GraduationCap, href: links.scholar, label: 'Google Scholar' },
  { icon: Fingerprint, href: links.orcid, label: 'ORCID' },
]

function scrollToSection(event, href, closeMenu) {
  event.preventDefault()

  const target = document.querySelector(href)

  if (!target) return

  closeMenu?.()

  const navbarOffset = 76
  const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarOffset

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  })

  window.history.pushState(null, '', href)
}

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean)

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sections.forEach((s) => obs.observe(s))

    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      obs.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.4, duration: 0.7, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-[0_4px_30px_rgba(2,6,23,.6)]' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8"
      >
        <a href="#home" className="group flex items-center gap-3">
          <span className="font-heading text-lg font-bold tracking-tight">Satyajit Beura</span>
          <span className="chip hidden sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-nebula animate-pulse-soft" />
            SB-26 / ONLINE
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active === l.href.slice(1) ? 'text-star' : 'text-muted hover:text-star'
                }`}
              >
                {l.label}
                {active === l.href.slice(1) && (
                  <motion.span
                    layoutId="nav-glow"
                    className="absolute inset-0 -z-10 rounded-full bg-cosmic/20 ring-1 ring-nebula/30"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-full p-2 text-muted transition hover:text-nebula hover:drop-shadow-[0_0_8px_rgba(34,211,238,.6)]"
            >
              <Icon size={17} />
            </a>
          ))}

          <a
            href="#lab"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cosmic to-violet px-4 py-2 text-sm font-medium text-star transition hover:shadow-[0_0_24px_rgba(37,99,235,.5)]"
          >
            <Rocket size={15} /> Launch Lab
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-star lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass overflow-hidden lg:hidden"
          >
            <ul className="space-y-1 px-6 py-4">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 ${
                      active === l.href.slice(1) ? 'bg-cosmic/20 text-star' : 'text-muted'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}

              <li className="flex gap-4 px-3 pt-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-muted"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
