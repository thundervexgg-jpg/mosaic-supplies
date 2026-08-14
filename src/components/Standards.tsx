import Reveal from './Reveal'
import MosaicMark from './MosaicMark'
import { COLOR } from '../lib/tokens'
import { STANDARDS } from '../lib/copy'

/**
 * This band replaces the reference design's "3M+ tons of cargo delivered" stat.
 *
 * We have no such number and inventing one is the fastest way to lose a trade account —
 * a buyer checks Companies House and sees an August 2026 incorporation. These are the
 * actual operating rules instead, which is what a wholesaler is trying to find out anyway.
 */
export default function Standards() {
  return (
    <section
      style={{
        backgroundColor: COLOR.stone,
        borderTop: `1px solid ${COLOR.rule}`,
        borderBottom: `1px solid ${COLOR.rule}`,
        padding: 'clamp(56px, 9vh, 104px) clamp(16px, 3vw, 48px)',
      }}
    >
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="eyebrow pb-8" style={{ color: COLOR.dim }}>
            {STANDARDS.eyebrow}
          </p>
        </Reveal>

        <ul className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3">
          {STANDARDS.items.map((item, i) => (
            <Reveal as="li" key={item.heading} delay={0.1 * i} className="min-w-0">
              <MosaicMark className="mb-5 w-[26px]" fill={COLOR.clay} />
              <h3
                className="display pb-3"
                style={{
                  fontSize: 'clamp(26px, 2.6vw, 40px)',
                  lineHeight: 0.92,
                  color: COLOR.basalt,
                }}
              >
                {item.heading}
              </h3>
              <p
                style={{
                  fontSize: 'clamp(14px, 1.05vw, 16px)',
                  lineHeight: 1.7,
                  color: COLOR.ink,
                  textWrap: 'pretty',
                }}
              >
                {item.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
