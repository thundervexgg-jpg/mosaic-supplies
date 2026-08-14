import { motion, useInView } from 'motion/react'
import { useRef, useState } from 'react'
import Reveal from './Reveal'
import { COLOR, CONTACT, TILE_RADIUS } from '../lib/tokens'
import { TRADE } from '../lib/copy'

/**
 * The highest-value block on the site. A buyer arriving from our email lands here to
 * decide whether we are a real trade buyer.
 *
 * There is no backend yet, so the form composes a pre-filled email rather than pretending
 * to submit. A form that silently swallows an enquiry would be far worse than no form.
 * When a form endpoint exists, replace handleSubmit — nothing else needs to change.
 */
export default function Trade() {
  const [values, setValues] = useState<Record<string, string>>({})
  const tilesRef = useRef<HTMLDivElement>(null)
  const tilesInView = useInView(tilesRef, { once: true, margin: '0px 0px -40px 0px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = TRADE.fields
      .map((f) => `${f.label}: ${values[f.name] ?? ''}`)
      .join('\n')
    const subject = `Trade enquiry: ${values.company || 'new supplier'}`
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  const fieldStyle: React.CSSProperties = {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: 15,
    padding: '13px 14px',
    border: `1px solid #C9C5B9`,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    width: '100%',
    color: COLOR.basalt,
  }

  return (
    <section
      id="trade"
      style={{
        backgroundColor: COLOR.basalt,
        padding: 'clamp(64px, 11vh, 130px) clamp(16px, 3vw, 48px)',
      }}
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-x-16 gap-y-12 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <Reveal>
            <p className="eyebrow pb-6" style={{ color: COLOR.muted }}>
              {TRADE.eyebrow}
            </p>
            <h2
              className="display m-0 pb-6"
              style={{ fontSize: 'clamp(44px, 6.4vw, 96px)', lineHeight: 0.86, color: COLOR.bisque }}
            >
              {TRADE.headline}
            </h2>
            <p
              className="max-w-[34em]"
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                lineHeight: 1.7,
                color: COLOR.onDark,
                textWrap: 'pretty',
              }}
            >
              {TRADE.body}
            </p>
          </Reveal>

          {/* Volunteered before they ask, so a supplier can qualify us in one read. */}
          <Reveal delay={0.1}>
            <dl className="mt-10 flex flex-col">
              {TRADE.terms.map((item) => (
                <div
                  key={item.term}
                  className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-6"
                  style={{ borderTop: `1px solid #24242A` }}
                >
                  <dt className="eyebrow" style={{ color: COLOR.muted, paddingTop: 3 }}>
                    {item.term}
                  </dt>
                  <dd style={{ fontSize: 'clamp(14px, 1.05vw, 16.5px)', lineHeight: 1.6, color: COLOR.bisque }}>
                    {item.def}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="eyebrow pb-3 pt-10" style={{ color: COLOR.muted }}>
              {TRADE.directLineLabel}
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="wordmark inline-block break-all"
              style={{
                fontSize: 'clamp(20px, 2.4vw, 36px)',
                color: COLOR.bisque,
                borderBottom: `1px solid ${COLOR.clay}`,
                paddingBottom: 2,
              }}
            >
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="wordmark mt-4 block"
              style={{ fontSize: 'clamp(18px, 1.9vw, 28px)', color: COLOR.onDark }}
            >
              {CONTACT.phone}
            </a>
          </Reveal>

          {/* Twenty tiles waiting to be placed — one supplier account each. */}
          <div
            ref={tilesRef}
            className="mt-14 grid max-w-[440px] grid-cols-10 gap-[7px]"
            aria-hidden="true"
          >
            {Array.from({ length: 20 }, (_, i) => (
              <motion.span
                key={i}
                className="block aspect-square"
                style={{ backgroundColor: '#1B1B1E', borderRadius: TILE_RADIUS }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={tilesInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: i * 0.03 }}
                whileHover={{ backgroundColor: COLOR.clay, scale: 1.14 }}
              />
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            style={{ backgroundColor: COLOR.bisque, color: COLOR.basalt, padding: 'clamp(24px, 3vw, 36px)' }}
          >
            <p className="wordmark" style={{ fontSize: 'clamp(22px, 2vw, 29px)', paddingBottom: 6 }}>
              Trade enquiry
            </p>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: COLOR.dim, paddingBottom: 24 }}>
              Tell us what you supply and we’ll come back to you.
            </p>

            <div className="flex flex-col gap-3.5">
              {TRADE.fields.map((field) => (
                <label key={field.name} className="flex flex-col gap-2">
                  <span className="eyebrow" style={{ color: COLOR.muted, letterSpacing: '0.18em' }}>
                    {field.label}
                  </span>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      rows={3}
                      placeholder={field.placeholder}
                      style={{ ...fieldStyle, resize: 'vertical' }}
                      value={values[field.name] ?? ''}
                      onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                    />
                  ) : (
                    <input
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      style={fieldStyle}
                      value={values[field.name] ?? ''}
                      onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                    />
                  )}
                </label>
              ))}

              <motion.button
                type="submit"
                className="eyebrow mt-1.5 cursor-pointer border-0 px-6 py-4"
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  backgroundColor: COLOR.clay,
                  color: COLOR.bisque,
                  borderRadius: 2,
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {TRADE.submitLabel}
              </motion.button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
