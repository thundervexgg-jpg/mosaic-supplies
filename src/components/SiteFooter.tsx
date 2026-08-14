import Logo from './Logo'
import Reveal from './Reveal'
import { COLOR, CONTACT } from '../lib/tokens'
import { FOOTER, NAV } from '../lib/copy'

export default function SiteFooter() {
  return (
    <footer
      style={{
        backgroundColor: COLOR.bisque,
        padding: 'clamp(48px, 7vh, 80px) clamp(16px, 3vw, 48px) clamp(24px, 4vh, 40px)',
      }}
    >
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div
            className="grid grid-cols-1 gap-x-10 gap-y-10 pb-11 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]"
            style={{ borderBottom: `1px solid ${COLOR.rule}` }}
          >
            <div>
              <div className="pb-4">
                <Logo animate={false} tone="dark" fontSize="26px" />
              </div>
              <p
                className="max-w-[28em]"
                style={{ fontSize: 13.5, lineHeight: 1.7, color: COLOR.dim, textWrap: 'pretty' }}
              >
                {FOOTER.descriptor}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="eyebrow" style={{ color: '#A29E94' }}>
                Company
              </span>
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="eyebrow transition-colors"
                  style={{ color: COLOR.ink, letterSpacing: '0.14em' }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="eyebrow" style={{ color: '#A29E94' }}>
                Contact
              </span>
              <a
                href={`mailto:${CONTACT.email}`}
                className="eyebrow break-all"
                style={{ color: COLOR.ink, letterSpacing: '0.14em' }}
              >
                {CONTACT.email}
              </a>
              <a
                href={`tel:${CONTACT.phoneHref}`}
                className="eyebrow"
                style={{ color: COLOR.ink, letterSpacing: '0.14em' }}
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </Reveal>

        {/*
          Legally required on a UK company website: registered name, company number and
          registered office. Neither has been supplied yet, so this stays out entirely
          rather than showing a placeholder. Set both in copy.ts and the line appears.
        */}
        {FOOTER.companyNumber && FOOTER.registeredOffice && (
          <p
            className="max-w-[52em] pt-6"
            style={{ fontSize: 12, lineHeight: 1.7, color: COLOR.muted }}
          >
            {`Mosaic Supplies Ltd. Registered in England and Wales, company number ${FOOTER.companyNumber}. Registered office: ${FOOTER.registeredOffice}.`}
          </p>
        )}

        <div
          className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between"
          style={{ fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: COLOR.muted }}
        >
          <span>© {new Date().getFullYear()} Mosaic Supplies</span>
          <span>{CONTACT.domain}</span>
        </div>
      </div>
    </footer>
  )
}
