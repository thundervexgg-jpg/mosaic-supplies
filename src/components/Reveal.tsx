import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { EXPO_OUT } from '../lib/tokens'

/** Scroll-triggered reveal. Fires once, a little before the element is fully in view. */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  className,
  as = 'div',
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  x?: number
  className?: string
  as?: 'div' | 'li' | 'section'
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  // Polymorphic tag: the concrete element varies, so props are resolved at the call site.
  const Tag = motion[as] as React.ElementType

  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EXPO_OUT }}
    >
      {children}
    </Tag>
  )
}
