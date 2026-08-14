import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import Reveal from './Reveal'
import MosaicMark from './MosaicMark'
import { COLOR } from '../lib/tokens'
import { RANGE } from '../lib/copy'
import { CATEGORY_IMAGES } from '../lib/categoryImages'

export default function Range() {
  const gridRef = useRef<HTMLUListElement>(null)
  const gridInView = useInView(gridRef, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <section
      id="range"
      style={{
        backgroundColor: COLOR.bisque,
        padding: 'clamp(64px, 11vh, 130px) clamp(16px, 3vw, 48px)',
      }}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 items-end gap-x-16 gap-y-8 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <p className="eyebrow pb-6" style={{ color: COLOR.muted }}>
              {RANGE.eyebrow}
            </p>
            <h2 className="display m-0" style={{ fontSize: 'clamp(52px, 8.6vw, 132px)', lineHeight: 0.82 }}>
              <span className="block" style={{ color: COLOR.basalt }}>
                {RANGE.headlineLine1}
              </span>
              <span className="block" style={{ color: COLOR.clay }}>
                {RANGE.headlineLine2}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="pb-2">
            <p
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                lineHeight: 1.7,
                color: COLOR.ink,
                textWrap: 'pretty',
              }}
            >
              {RANGE.body}
            </p>
          </Reveal>
        </div>

        {/*
          Presented as examples, not a closed list. The range is meant to grow, and a
          supplier whose line sits just outside these five should still get in touch.
        */}
        <Reveal delay={0.05}>
          <p className="eyebrow mt-14 pb-5 lg:mt-20" style={{ color: COLOR.muted }}>
            {RANGE.examplesLabel}
          </p>
        </Reveal>

        <ul ref={gridRef} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {RANGE.categories.map((category, i) => {
            const image = CATEGORY_IMAGES[category.key]
            return (
              <motion.li
                key={category.key}
                className="group min-w-0"
                initial={{ opacity: 0, y: 26 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: '4 / 5',
                    backgroundColor: COLOR.stone,
                    border: `1px solid ${COLOR.rule}`,
                    borderRadius: 3,
                  }}
                >
                  {/* Mark sits underneath, so a missing file leaves a deliberate-looking tile. */}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <MosaicMark className="w-[26%]" fill={COLOR.rule} />
                  </span>
                  {image ? (
                    <img
                      src={image.file}
                      alt={image.alt}
                      loading="lazy"
                      className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : null}
                </div>
                <p
                  className="wordmark pt-3.5"
                  style={{ fontSize: 'clamp(16px, 1.4vw, 22px)', lineHeight: 1.15, color: COLOR.basalt }}
                >
                  {category.name}
                </p>
              </motion.li>
            )
          })}
        </ul>

        <Reveal delay={0.1}>
          <p
            className="pt-8"
            style={{ fontSize: 'clamp(13.5px, 1vw, 15.5px)', lineHeight: 1.7, color: COLOR.dim }}
          >
            {RANGE.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
