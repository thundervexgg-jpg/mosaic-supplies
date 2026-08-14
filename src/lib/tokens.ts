/**
 * Brand tokens, lifted straight from the Mosaic Supplies identity sheet.
 * Anything visual should read from here rather than hard-coding a hex.
 */
export const COLOR = {
  basalt: '#0C0C0D',
  bisque: '#F3F0E8',
  clay: '#B0623F',
  glaze: '#2E8199',
  stone: '#DEDCD7',
  rule: '#DCD8CD',
  muted: '#8A8780',
  ink: '#4B4943',
  dim: '#6E6C66',
  onDark: '#A8A59C',
} as const

/** The mark's tiles are 27% rounded, and everything tile-shaped follows it. */
export const TILE_RADIUS = '27%'

export const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

/**
 * Hero background footage, served from our own origin.
 *
 * Was hotlinked from the reference design's CDN, which meant a host we do not control
 * could have blanked the hero at any moment. Mirrored into /public instead.
 *
 * The hero degrades to solid Basalt if it fails to load, and hides itself if a browser
 * refuses to autoplay it, so it is decoration that can never break the page.
 */
export const HERO_VIDEO_URL = '/hero.mp4'

export const CONTACT = {
  email: 'trade@mosaic-supplies.co.uk',
  domain: 'mosaic-supplies.co.uk',
  /** Spaced for reading; the tel: form is E.164 so it dials correctly from abroad. */
  phone: '07340 236433',
  phoneHref: '+447340236433',
} as const
