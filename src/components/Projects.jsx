import RevealText from './RevealText'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section id="projects" className="section-shell">
      <p className="mono-label">03 // PROJECTS</p>

      <RevealText
        as="h2"
        text="Projects, Simulations & Public-Use Ideas"
        className="section-title"
      />

      <p className="section-opening">
        I like building things that make ideas visible, useful, or easier to understand.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}