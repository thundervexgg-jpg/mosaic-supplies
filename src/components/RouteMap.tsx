import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { COLOR } from '../lib/tokens'

/**
 * The dotted world map with animated supply routes, restored from the reference design.
 *
 * It earns its place here on two counts: the map is drawn entirely out of small squares,
 * so it is already a mosaic, and it shows goods moving between places without claiming
 * anything we cannot back up.
 *
 * It sits on a light section rather than over the hero video. The dots are dark, so on a
 * dark ground the map all but disappears.
 *
 * NOTE: like the hero video, these four images are hotlinked from the reference design's
 * CDN. They are not our assets. Mirror them into /public before this URL goes out on
 * trade applications.
 */

const MAP_IMAGE =
  'https://polo-pecan-73837341.figma.site/_assets/v11/b6d561167283e799453232309bd13dd78b2d1afa.png'

const ICON_BASE =
  'https://image-bottom-92901062.figma.site/_components/v2/142c6a6f3074dd8aee013fa440ff4ff369649d48/'

const ROUTES = [
  'M128.161 74.6764C79.9989 130.001 71.9994 46.0005 20.9815 111.737',
  'M216.999 9.99985C260.499 12.4998 222.499 71.9998 291.999 58.9998',
  'M130.102 70.9998C144.499 -32.0002 183.852 70.2739 219.999 3.99985',
  'M14.4999 16.9998C111 20.9998 -53.0003 73.4998 21.4999 107',
]

/** Where the routes stop. Each is a filled tile-coloured dot with a dark centre. */
const STOPS: ReadonlyArray<readonly [number, number]> = [
  [9.519, 15.519],
  [289.519, 59.518],
  [220.519, 9.519],
  [125.518, 78.519],
  [19.519, 104.519],
]

const CARRIERS = [
  {
    key: 'ship',
    src: `${ICON_BASE}08d6a37375d428e07c59e24a8529de89bfee157e.08d6a373.png`,
    left: '26.0%',
    top: '28.9%',
    delay: 2.1,
    transform: 'none',
  },
  {
    key: 'road',
    src: `${ICON_BASE}7d6f50a87e1427d9b4d1a9c9f1c064ff04b2b3f9.7d6f50a8.png`,
    left: '70.8%',
    top: '15.6%',
    delay: 2.2,
    transform: 'rotate(9.73deg)',
  },
  {
    key: 'air',
    src: `${ICON_BASE}0e0282ab1c70db03d437b0d01875ce45557d49f6.0e0282ab.png`,
    left: '55.2%',
    top: '52.1%',
    delay: 2.3,
    transform: 'rotate(180deg) scaleY(-1)',
  },
]

export default function RouteMap({ caption }: { caption: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: '435 / 263' }}>
      <img
        src={MAP_IMAGE}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-contain"
      />

      <svg
        viewBox="0 0 299.037 142.509"
        className="pointer-events-none absolute overflow-visible"
        style={{ left: '13.8%', top: '24.3%', width: '68.7%', aspectRatio: '299 / 143' }}
        aria-hidden="true"
        focusable="false"
      >
        {ROUTES.map((d, i) => (
          <g key={d}>
            <motion.path
              id={`route-${i}`}
              d={d}
              fill="none"
              stroke={COLOR.clay}
              strokeWidth={2.5}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.1, delay: 0.55 + i * 0.12, ease: 'easeInOut' }}
            />
            <polygon points="0,-4 8,0 0,4" fill={COLOR.clay}>
              <animateMotion dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" rotate="auto">
                <mpath href={`#route-${i}`} />
              </animateMotion>
            </polygon>
          </g>
        ))}

        {STOPS.map(([cx, cy], i) => (
          <motion.g
            key={`${cx}-${cy}`}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 420, damping: 14, delay: 0.7 + i * 0.09 }}
          >
            <circle cx={cx} cy={cy} r={9.519} fill={COLOR.clay} />
            <circle cx={cx} cy={cy} r={3.389} fill={COLOR.basalt} />
          </motion.g>
        ))}
      </svg>

      {CARRIERS.map((carrier) => (
        <motion.div
          key={carrier.key}
          className="absolute rounded-full bg-white"
          style={{
            left: carrier.left,
            top: carrier.top,
            width: '14.9%',
            aspectRatio: '1',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 220, damping: 16, delay: carrier.delay }}
          whileHover={{ scale: 1.12, y: -4, boxShadow: '0 10px 24px rgba(0,0,0,0.22)' }}
        >
          <img
            src={carrier.src}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-contain p-[18%]"
            style={{ transform: carrier.transform }}
          />
        </motion.div>
      ))}

      <motion.p
        className="absolute hidden sm:block"
        style={{
          left: '55.6%',
          top: '89%',
          width: '44%',
          fontSize: 'clamp(12px, 1.05vw, 17px)',
          lineHeight: 1.55,
          color: COLOR.basalt,
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 2.4 }}
      >
        {caption}
      </motion.p>
    </div>
  )
}
