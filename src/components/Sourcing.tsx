import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import RouteMap from './RouteMap'
import { COLOR, EXPO_OUT } from '../lib/tokens'
import { SOURCING } from '../lib/copy'

/**
 * Warm band carrying the route map.
 *
 * The gradient is the reference design's idea, pulled onto our own palette: Stone at the
 * top running down into Clay. It also does the page a structural favour, breaking up what
 * would otherwise be a long run of flat cream sections.
 */
export default function Sourcing() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #DEDCD7 0%, #E8D3BC 46%, #D2A183 100%)',
        padding: 'clamp(56px, 10vh, 116px) clamp(16px, 3vw, 48px) clamp(40px, 7vh, 88px)',
      }}
    >
      <div ref={ref} className="mx-auto max-w-[1180px]">
        <motion.h2
          className="display m-0"
          style={{ fontSize: 'clamp(46px, 9vw, 116px)', color: COLOR.bisque }}
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: EXPO_OUT }}
        >
          {SOURCING.headline}
        </motion.h2>

        <motion.p
          className="pt-2"
          style={{
            fontSize: 'clamp(18px, 2.6vw, 34px)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: COLOR.basalt,
          }}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: EXPO_OUT }}
        >
          {SOURCING.taglineLine1}
          <br />
          <span className="pl-[1.4em]">{SOURCING.taglineLine2}</span>
        </motion.p>

        <div className="mx-auto mt-8 w-full max-w-[860px] lg:mt-12">
          <RouteMap caption={SOURCING.mapCaption} />
        </div>
      </div>
    </section>
  )
}
