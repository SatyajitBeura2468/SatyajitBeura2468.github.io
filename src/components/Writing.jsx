import { ArrowUpRight } from 'lucide-react'
import RevealText from './RevealText'
import ArticleCard from './ArticleCard'
import { articles } from '../data/articles'
import { links } from '../data/links'

export default function Writing() {
  return (
    <section id="writing" className="section-shell">
      <p className="mono-label">05 // WRITING</p>

      <RevealText
        as="h2"
        text="Ideas, Essays & Science Notes"
        className="section-title"
      />

      <p className="section-opening">
        I write when an idea keeps making noise in my head. Some pieces are about physics and
        simulations. Some are about algorithms, creativity, design, and the strange patterns behind
        modern technology.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <ArticleCard key={a.title} article={a} index={i} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href={links.medium}
          target="_blank"
          rel="noopener noreferrer"
          className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-star transition hover:border-nebula/50 hover:shadow-[0_0_24px_rgba(34,211,238,.2)]"
        >
          All essays on Medium <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  )
}