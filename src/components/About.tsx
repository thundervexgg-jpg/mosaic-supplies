import Reveal from './Reveal'
import { COLOR } from '../lib/tokens'
import { ABOUT } from '../lib/copy'

export default function About() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: COLOR.bisque,
        padding: 'clamp(64px, 11vh, 130px) clamp(16px, 3vw, 48px)',
      }}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow pb-5" style={{ color: COLOR.muted }}>
              {ABOUT.eyebrow}
            </p>
            <h2
              className="wordmark m-0"
              style={{
                fontSize: 'clamp(34px, 4.6vw, 64px)',
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
                color: COLOR.basalt,
                textWrap: 'balance',
              }}
            >
              {ABOUT.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="pt-1">
            {ABOUT.body.map((para) => (
              <p
                key={para.slice(0, 24)}
                className="mb-5 last:mb-0"
                style={{
                  fontSize: 'clamp(15px, 1.15vw, 17px)',
                  lineHeight: 1.7,
                  color: COLOR.ink,
                  textWrap: 'pretty',
                }}
              >
                {para}
              </p>
            ))}
          </Reveal>
        </div>

        {/*
          Plain facts, not claims. A buyer is triaging for whether we are a real business;
          give them the details they would otherwise have to ask for.
        */}
        <ul className="mt-14 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 lg:mt-20">
          {ABOUT.facts.map((item, i) => (
            <Reveal as="li" key={item.term} delay={0.08 * i} className="min-w-0">
              <div style={{ borderTop: `2px solid ${COLOR.basalt}`, paddingTop: 18 }}>
                <p className="eyebrow pb-2.5" style={{ color: COLOR.muted }}>
                  {item.term}
                </p>
                <p
                  className="wordmark"
                  style={{ fontSize: 'clamp(18px, 1.6vw, 24px)', lineHeight: 1.25, color: COLOR.basalt }}
                >
                  {item.def}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
