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
 * Hero background footage.
 *
 * NOTE: this is the reference clip that came with the design brief, served from a
 * third-party CDN. It is fine for a preview build, but it is not our asset and the
 * host could pull it at any time. Replace with our own file in /public before this
 * URL goes out on trade applications — the hero degrades to solid Basalt if it fails.
 */
export const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260620_185230_f7f71ef4-6655-469f-b9c6-efbdc1f7684a.mp4'

export const CONTACT = {
  email: 'trade@mosaic-supplies.co.uk',
  domain: 'mosaic-supplies.co.uk',
  /** Spaced for reading; the tel: form is E.164 so it dials correctly from abroad. */
  phone: '07340 236433',
  phoneHref: '+447340236433',
} as const
