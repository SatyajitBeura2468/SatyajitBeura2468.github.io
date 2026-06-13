import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import CosmicBackground from './components/CosmicBackground'
import Hero from './components/Hero'
import About from './components/About'
import Research from './components/Research'
import Projects from './components/Projects'
import Lab from './components/Lab'
import Writing from './components/Writing'
import Timeline from './components/Timeline'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <CosmicBackground />
      <Navbar />

      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Research />
        <Projects />
        <Lab />
        <Writing />
        <Timeline />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </>
  )
}