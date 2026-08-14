import { motion } from 'motion/react'
import { COLOR } from '../lib/tokens'
import { MARK_TILES, TILE_CELL, TILE_RX, tileX, tileY } from './MosaicMark'

/**
 * The mark assembling itself, tile by tile, sitting under the hero tagline.
 *
 * It is here because the line above it says "a mosaic is assembled one piece at a time",
 * and that sentence needs something to point at. The 13 tiles of the real mark drop into
 * a 5x5 grid one by one, with the 12 cells they leave empty drawn as faint outlines, so
 * the picture visibly comes together rather than just appearing.
 *
 * Geometry is the real mark's, imported rather than re-typed, so this can never drift
 * out of register with the logo.
 */

/** The 12 cells the mark leaves empty: the picture not yet filled. */
const EMPTY_CELLS: ReadonlyArray<readonly [number, number]> = (() => {
  const filled = new Set(MARK_TILES.map(([r, c]) => `${r}-${c}`))
  const rest: Array<readonly [number, number]> = []
  for (let r = 1; r <= 5; r += 1) {
    for (let c = 1; c <= 5; c += 1) {
      if (!filled.has(`${r}-${c}`)) rest.push([r, c] as const)
    }
  }
  return rest
})()

/** The centre tile: the one deliberately placed piece. */
const ACCENT_TILE = '3-3'

/** Fixed jitter so the assembly reads as hand-placed rather than swept left to right. */
const JITTER = [0.11, 0.02, 0.19, 0.07, 0.24, 0.0, 0.15, 0.3, 0.05, 0.21, 0.09, 0.26, 0.13]

export default function TilePanel({ start, baseDelay = 0 }: { start: boolean; baseDelay?: number }) {
  return (
    <svg viewBox="-3 -3 106 106" className="h-auto w-full overflow-visible" aria-hidden="true" focusable="false">
      {EMPTY_CELLS.map(([row, col]) => (
        <motion.rect
          key={`empty-${row}-${col}`}
          x={tileX(col)}
          y={tileY(row)}
          width={TILE_CELL}
          height={TILE_CELL}
          rx={TILE_RX}
          ry={TILE_RX}
          fill="none"
          stroke={COLOR.bisque}
          strokeWidth={0.6}
          initial={{ opacity: 0 }}
          animate={start ? { opacity: 0.22 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: baseDelay + 0.1 + (row + col) * 0.03 }}
        />
      ))}

      {MARK_TILES.map(([row, col], i) => {
        const isAccent = `${row}-${col}` === ACCENT_TILE
        return (
          <motion.rect
            key={`tile-${row}-${col}`}
            x={tileX(col)}
            y={tileY(row)}
            width={TILE_CELL}
            height={TILE_CELL}
            rx={TILE_RX}
            ry={TILE_RX}
            fill={isAccent ? COLOR.clay : COLOR.bisque}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={start ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
            transition={{
              type: 'spring',
              stiffness: 420,
              damping: 15,
              delay: baseDelay + 0.35 + i * 0.055 + (JITTER[i] ?? 0),
            }}
          />
        )
      })}
    </svg>
  )
}
