import Reveal from './Reveal'
import MosaicMark from './MosaicMark'
import { AmazonLogo, EbayLogo } from './MarketplaceLogos'
import { COLOR, CONTACT } from '../lib/tokens'
import { WHERE_WE_SELL } from '../lib/copy'

/**
 * Channels, stated plainly. Amazon UK is live-facing; eBay and the direct storefront are
 * labelled as planned rather than implied to be running — a supplier who checks will find
 * out, and being caught overstating costs more than the claim was worth.
 */
const CHANNELS = [
  { key: 'amazon', status: 'Primary channel' },
  { key: 'ebay', status: 'Expanding to' },
  { key: 'direct', status: 'In time' },
] as const

export default function WhereWeSell() {
  return (
    <section
      style={{
        backgroundColor: COLOR.bisque,
        padding: 'clamp(48px, 8vh, 92px) clamp(16px, 3vw, 48px)',
      }}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-[200px_1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow" style={{ color: COLOR.dim }}>
              {WHERE_WE_SELL.label}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {CHANNELS.map((channel) => (
                <div
                  key={channel.key}
                  className="flex flex-col items-center justify-center gap-3 px-5 py-7"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: `1px solid ${COLOR.rule}`,
                    borderRadius: 3,
                  }}
                >
                  <div
                    className="flex h-[38px] items-center justify-center"
                    style={{ color: COLOR.basalt }}
                  >
                    {channel.key === 'amazon' && <AmazonLogo className="w-[104px] text-[26px]" />}
                    {channel.key === 'ebay' && <EbayLogo className="h-[34px] w-auto" />}
                    {channel.key === 'direct' && (
                      <span className="flex items-center gap-2.5">
                        <MosaicMark className="w-[19px]" fill={COLOR.basalt} />
                        <span className="wordmark" style={{ fontSize: 19 }}>
                          {CONTACT.domain}
                        </span>
                      </span>
                    )}
                  </div>
                  <span className="eyebrow" style={{ color: COLOR.muted }}>
                    {channel.status}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <p
            className="mt-7 lg:pl-[248px]"
            style={{ fontSize: 'clamp(13.5px, 1vw, 15.5px)', lineHeight: 1.7, color: COLOR.ink }}
          >
            {WHERE_WE_SELL.body}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
