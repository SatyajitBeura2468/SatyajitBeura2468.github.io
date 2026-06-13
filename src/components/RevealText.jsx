import { motion } from 'framer-motion'

export default function RevealText({ as: Tag = 'p', text, className = '', delay = 0 }) {
  const words = text.split(' ')
  const MotionTag = motion[Tag] || motion.p

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.045,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}