import { motion } from 'motion/react'
import MosaicMark from './MosaicMark'
import { COLOR, EXPO_OUT } from '../lib/tokens'

/**
 * The stacked lockup from the identity sheet: mark to the left, "Mosaic" over
 * "Supplies" in DM Serif Display. The wordmark is always the serif — it is the logo,
 * and it does not follow the Barlow Condensed used for headlines.
 */
type Props = {
  animate?: boolean
  /** 'light' sits on Basalt, 'dark' sits on Bisque. */
  tone?: 'light' | 'dark'
  fontSize?: string
}

export default function Logo({ animate = true, tone = 'light', fontSize }: Props) {
  const Wrapper = animate ? motion.a : 'a'
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: EXPO_OUT },
      }
    : {}

  const base = tone === 'light' ? COLOR.bisque : COLOR.basalt

  return (
    <Wrapper
      href="#top"
      aria-label="Mosaic Supplies, home"
      className="flex items-center gap-[0.55em]"
      style={{
        fontSize: fontSize ?? 'clamp(22px, min(3.15vh, 2.32vw), 32px)',
        color: base,
      }}
      {...motionProps}
    >
      <MosaicMark className="w-[1.42em] shrink-0" fill={base} />
      <span className="wordmark flex flex-col leading-[0.9]">
        <span>Mosaic</span>
        <span style={{ color: COLOR.clay }}>Supplies</span>
      </span>
    </Wrapper>
  )
}
