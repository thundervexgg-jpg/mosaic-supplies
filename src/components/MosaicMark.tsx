/**
 * The Mosaic Supplies mark: an M assembled from 13 tiles on a fixed 5x5 grid.
 *
 * Geometry is locked to the identity sheet — gap is 5.5% of the mark width, which
 * puts the cell at 15.6 and the pitch at 21.1 in a 100-unit box. Tile radius is 27%
 * of the cell. Do not eyeball these; the mark has to hold at 16px.
 */

const CELL = 15.6
const PITCH = 21.1
const RADIUS = CELL * 0.27

/** [row, column], both 1-indexed, reading top-left to bottom-right. */
export const MARK_TILES: ReadonlyArray<readonly [number, number]> = [
  [1, 1], [1, 5],
  [2, 1], [2, 2], [2, 4], [2, 5],
  [3, 1], [3, 3], [3, 5],
  [4, 1], [4, 5],
  [5, 1], [5, 5],
]

export const tileX = (col: number) => (col - 1) * PITCH
export const tileY = (row: number) => (row - 1) * PITCH
export { CELL as TILE_CELL, RADIUS as TILE_RX }

type Props = {
  className?: string
  /** Defaults to currentColor so the mark inherits from its container, as the sheet specifies. */
  fill?: string
  title?: string
}

export default function MosaicMark({ className, fill = 'currentColor', title }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {MARK_TILES.map(([row, col]) => (
        <rect
          key={`${row}-${col}`}
          x={tileX(col)}
          y={tileY(row)}
          width={CELL}
          height={CELL}
          rx={RADIUS}
          ry={RADIUS}
          fill={fill}
        />
      ))}
    </svg>
  )
}
