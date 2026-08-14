import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import Header from './Header'
import CtaPill from './CtaPill'
import TilePanel from './TilePanel'
import { COLOR, EXPO_OUT, HERO_VIDEO_URL } from '../lib/tokens'
import { HERO } from '../lib/copy'

/** Words slide up out of a clipped line, tipped back slightly so they arrive rather than fade. */
function RevealLine({
  text,
  start,
  delay,
  className,
  style,
}: {
  text: string
  start: boolean
  delay: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <span className={`flex flex-wrap ${className ?? ''}`} style={{ ...style, perspective: 600 }}>
      {text.split(' ').map((word, i) => (
        <span key={`${word}-${i}`} className="overflow-hidden pr-[0.28em] leading-[0.9]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', rotateX: 45, opacity: 0 }}
            animate={start ? { y: '0%', rotateX: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: delay + i * 0.08, ease: EXPO_OUT }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  // The footage is served from a third-party CDN we do not control. If it is slow or
  // gone, the hero must still appear. Never leave the page blank waiting on it.
  useEffect(() => {
    const t = setTimeout(() => setVideoReady(true), 2200)
    return () => clearTimeout(t)
  }, [])

  /*
    Safari and Chrome both refuse autoplay in states the `autoPlay` attribute alone cannot
    recover from, Low Power Mode on iOS being the common one. Ask again on mount, and once
    more on the visitor's first interaction, which counts as the user gesture the browser
    was holding out for. Failures are swallowed: this is decoration, and the gradients keep
    the hero readable whether or not it ever plays.
  */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // React sets `muted` as a property after mount, which can land too late for the
    // autoplay check. Force it on the element before asking to play.
    video.muted = true

    const attempt = () => video.play().catch(() => {})
    attempt()

    const events: Array<keyof WindowEventMap> = ['touchstart', 'pointerdown', 'scroll']
    events.forEach((e) => window.addEventListener(e, attempt, { once: true, passive: true }))
    return () => events.forEach((e) => window.removeEventListener(e, attempt))
  }, [])

  /*
    Sized off viewport width more than height, unlike the reference. Our headline words
    are short: "Every" is five letters where the reference had "AND LIMITS", so at the
    reference's own scale the type only covers about 40% of its column and reads timid.
    This brings the longest line back to roughly the 60-65% column fill the design depends
    on, with the vh term still capping it so three lines never swamp a short viewport.
  */
  const headlineSize = 'clamp(72px, min(14.5vw, 19vh), 240px)'

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      style={{ backgroundColor: COLOR.basalt }}
    >
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        style={{ filter: 'grayscale(0.25) contrast(1.03) brightness(0.92)' }}
        src={HERO_VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        // Older iOS honours the vendor-prefixed spelling; without it the clip goes fullscreen.
        webkit-playsinline="true"
        x5-playsinline="true"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        preload="auto"
        tabIndex={-1}
        aria-hidden="true"
        onCanPlay={() => setVideoReady(true)}
        onError={() => setVideoReady(true)}
      />

      {/*
        Legibility wash, kept as light as the type will tolerate. Heaviest on the left
        behind the giant headline, and clearing almost entirely on the right so the
        footage is actually visible rather than a dark smudge.
      */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(90deg, rgba(12,12,13,0.86) 0%, rgba(12,12,13,0.56) 46%, rgba(12,12,13,0.40) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(12,12,13,0.52) 0%, rgba(12,12,13,0.04) 34%, rgba(12,12,13,0.34) 74%, rgba(12,12,13,0.9) 100%)',
        }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {videoReady && (
          <motion.div
            className="relative z-10 flex w-full flex-1 flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Header />

            <main
              className="grid flex-1 grid-cols-1 lg:grid-cols-[2.17fr_1fr]"
              style={{
                padding: 'clamp(20px, 4.5vh, 88px) clamp(16px, 3vw, 48px) 0',
                gap: 'clamp(20px, 4vh, 48px)',
              }}
            >
              <div style={{ overflow: 'clip' }}>
                <motion.p
                  className="eyebrow"
                  style={{ color: COLOR.onDark, paddingBottom: 'clamp(12px, 2vh, 24px)' }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: EXPO_OUT }}
                >
                  {HERO.eyebrow}
                </motion.p>

                <h1 className="display m-0" style={{ fontSize: headlineSize }}>
                  {[
                    { text: HERO.line1, from: -900, delay: 0, color: COLOR.bisque, indent: '0' },
                    { text: HERO.line2, from: 900, delay: 0.13, color: COLOR.clay, indent: '0.524em' },
                    { text: HERO.line3, from: -900, delay: 0.26, color: COLOR.bisque, indent: '0' },
                  ].map((line) => (
                    <motion.span
                      key={line.text}
                      className="block whitespace-nowrap"
                      style={{ color: line.color, marginLeft: line.indent }}
                      initial={{ x: line.from }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.85, delay: line.delay, ease: EXPO_OUT }}
                    >
                      {line.text}
                    </motion.span>
                  ))}
                </h1>
              </div>

              <div className="flex flex-col" style={{ gap: 'clamp(16px, 2.66vh, 32px)' }}>
                <div
                  className="flex flex-col"
                  style={{
                    fontSize: 'clamp(22px, min(3.6vh, 2.7vw), 46px)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    color: COLOR.bisque,
                  }}
                >
                  {HERO.tagline.map((line, i) => (
                    <RevealLine
                      key={line}
                      text={line}
                      start={videoReady}
                      delay={0.3 + i * 0.2}
                      style={{ marginLeft: i === 1 ? '1.1em' : 0 }}
                    />
                  ))}
                </div>

                {/*
                  The line above says the mosaic is assembled one piece at a time, so it
                  needs something to point at. Square panel, so cap it against viewport
                  height as well as column width or it pushes the hero past the fold.
                */}
                <div className="relative w-full" style={{ maxWidth: 'min(100%, 26vh, 300px)' }}>
                  <TilePanel start={videoReady} baseDelay={0.6} />
                </div>

                <motion.p
                  className="hidden sm:block"
                  style={{
                    fontSize: 'clamp(12px, min(1.6vh, 1.05vw), 17px)',
                    lineHeight: 1.6,
                    color: COLOR.bisque,
                    opacity: 0.82,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.6, ease: EXPO_OUT }}
                >
                  {HERO.body}
                </motion.p>
              </div>
            </main>

            <div
              className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
              style={{ padding: 'clamp(20px, 4vh, 44px) clamp(16px, 3vw, 48px) clamp(20px, 5vh, 60px)' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.45, ease: EXPO_OUT }}
                className="max-w-[26em]"
              >
                <p
                  className="display whitespace-pre-line"
                  style={{
                    fontSize: 'clamp(30px, min(5.4vh, 4vw), 62px)',
                    lineHeight: 0.86,
                    color: COLOR.bisque,
                  }}
                >
                  {HERO.statement}
                </p>
                <p
                  style={{
                    fontSize: 'clamp(13px, min(1.6vh, 1.1vw), 17px)',
                    lineHeight: 1.5,
                    color: COLOR.onDark,
                    paddingTop: 'clamp(8px, 1.4vh, 16px)',
                  }}
                >
                  {HERO.statementBody}
                </p>
              </motion.div>

              <div className="w-full sm:w-auto sm:shrink-0">
                <CtaPill label={HERO.cta} href="#trade" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
