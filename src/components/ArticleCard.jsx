import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function ArticleCard({ article, index }) {
  return (
    <motion.a
      href={article.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -5 }}
      className="glass group relative flex flex-col gap-3 rounded-2xl p-5 transition hover:border-nebula/40 hover:shadow-[0_0_30px_rgba(34,211,238,.12)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="mono-label text-[10px]">{article.topic}</span>
        <span className="font-mono text-[10px] text-muted/60">
          № {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="font-heading text-lg font-semibold leading-snug text-star transition-colors group-hover:text-nebula">
        {article.title}
      </h3>

      <span className="mt-auto inline-flex items-center gap-1 font-mono text-[11px] text-muted transition group-hover:text-nebula">
        Read on Medium
        <ArrowUpRight
          size={13}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </motion.a>
  )
}