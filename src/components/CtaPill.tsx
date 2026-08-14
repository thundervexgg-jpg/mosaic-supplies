import { motion } from 'motion/react'
import { useState } from 'react'
import { COLOR, EXPO_OUT } from '../lib/tokens'

/**
 * The pill CTA: one SVG shape whose right end is a ring, with an arrow that swings
 * from -135deg to -90deg on hover.
 *
 * Bisque fill rather than the accent — Clay under Bisque text only clears about 4.2:1,
 * which is short of AA at this label size. Bisque on Basalt clears 15:1, and the accent
 * lands on the arrow disc instead, where it has no text sitting on it.
 */

const PILL_PATH =
  'M316 0C329.08 0 340.435 7.38674 346.121 18.2162C348.618 22.9736 353.086 26.8535 358.459 26.8535H359.252C364.667 26.8535 369.155 22.9169 371.63 18.1007C377.159 7.34039 388.205 0.00015843 400.931 0C419.195 0 434.001 15.1191 434.001 33.7695L433.99 34.6416C433.537 52.8891 418.909 67.5391 400.931 67.5391C387.96 67.5389 376.734 59.9132 371.317 48.8128C368.923 43.9077 364.427 39.873 358.969 39.873C353.492 39.873 348.986 43.9356 346.589 48.8605C341.074 60.1913 329.449 68 316 68H34.001C15.2233 68 0 52.7777 0 34C0 15.2223 15.2233 0 34.001 0H316ZM400.931 2.44141C384.063 2.44163 370.303 16.419 370.303 33.7695C370.303 51.1201 384.063 65.0974 400.931 65.0977C417.798 65.0977 431.56 51.1202 431.56 33.7695C431.56 16.4189 417.798 2.44141 400.931 2.44141Z'

type Props = {
  label: string
  href: string
  delay?: number
}

export default function CtaPill({ label, href, delay = 0.5 }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={href}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65, delay, ease: EXPO_OUT }}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="relative block w-full h-[56px] sm:w-auto sm:h-[clamp(48px,min(6vh,4.5vw),68px)] sm:aspect-[434/68]"
    >
      <svg
        viewBox="0 0 434.001 68"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <path d={PILL_PATH} fill={COLOR.bisque} />
      </svg>

      {/* Arrow disc, held square against the pill's non-uniform horizontal stretch. */}
      <span
        className="absolute top-1/2 right-0 flex aspect-square h-[82%] -translate-y-1/2 items-center justify-center rounded-full"
        style={{ backgroundColor: COLOR.clay }}
        aria-hidden="true"
      >
        <motion.svg
          viewBox="0 0 16.89 20.37"
          className="h-[42%] w-auto overflow-visible"
          animate={{ rotate: hovered ? -90 : -135 }}
          transition={{ duration: 0.35, ease: EXPO_OUT }}
        >
          <g fill="none" stroke={COLOR.bisque} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="8.445" y1="19.37" x2="8.445" y2="1.6" />
            <polyline points="1.6,8.4 8.445,1.4 15.29,8.4" />
          </g>
        </motion.svg>
      </span>

      <span
        className="absolute inset-y-0 left-0 right-[16%] flex items-center justify-center font-medium"
        style={{
          color: COLOR.basalt,
          fontSize: 'clamp(14px, min(1.6vh, 1.2vw), 19px)',
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </span>
      {/* The disc sits inside the ring, so it is decorative — the label carries the name. */}
      <span className="sr-only">{label}</span>
    </motion.a>
  )
}
