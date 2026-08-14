/**
 * All site copy in one place.
 *
 * The audience is a buyer at a wholesaler deciding whether to open a trade account.
 * Everything here is written for them.
 *
 * Four rules this file exists to enforce:
 *
 * 1. Nothing about HOW products get chosen. No screening, no listing analysis, no
 *    sales-velocity data, no tooling, no return threshold. That is internal. Publishing
 *    it tells a supplier the buying decision is made by software rather than a buyer who
 *    knows their category, and hands them our margin floor as a negotiating frame.
 *
 * 2. No claim of scale. Pre-launch. No customer counts, no revenue, no years trading,
 *    no testimonials, no tonnage.
 *
 * 3. Nothing about internal structure. How many directors there are, and how far along
 *    registration is, are not a buyer's business and only invite doubt. State the company
 *    is a UK private limited company and leave it there.
 *
 * 4. No em dashes. Plain punctuation only. Full stops and commas do the work.
 */

export const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Range', href: '#range' },
  { label: 'Trade', href: '#trade' },
] as const

export const HERO = {
  eyebrow: 'Wholesale-sourced goods for UK online retail',
  line1: 'Every',
  line2: 'Piece',
  line3: 'In Place.',
  tagline: ['A mosaic is', 'assembled one', 'piece at a time.'],
  body: 'Genuine branded goods, bought on trade terms and sold through the major online marketplaces.',
  statement: 'Genuine goods.\nGenuine invoices.',
  statementBody:
    'Every unit we buy comes from a brand owner, an authorised distributor or an established wholesaler, with a VAT invoice behind it.',
  cta: 'Open a trade account',
} as const

export const ABOUT = {
  eyebrow: 'About us',
  headline: 'A supplier of the ordinary, done properly.',
  body: [
    'Mosaic Supplies is a UK online retailer. We buy genuine branded consumer goods from brand owners, authorised distributors and established wholesalers, and sell them through major online marketplaces.',
    'The range is deliberately broad rather than deep in one niche. A mosaic only makes sense as a whole. That is how the catalogue is assembled: product by product, supplier by supplier, each one placed on purpose.',
  ],
  /** Plain facts a buyer scans for. Stated as facts, not as claims about ourselves. */
  facts: [
    { term: 'Base', def: 'United Kingdom' },
    { term: 'Structure', def: 'Private limited company' },
    { term: 'First channel', def: 'Amazon UK' },
  ],
} as const

export const SOURCING = {
  headline: 'Sourcing',
  taglineLine1: 'brought together',
  taglineLine2: 'piece by piece',
  mapCaption:
    'We buy from suppliers across the UK and further afield, and bring the range together in one place.',
} as const

export const STANDARDS = {
  eyebrow: 'How we operate',
  items: [
    {
      heading: 'Genuine goods, genuine invoices',
      body: 'Every unit we buy comes from brand owners, authorised distributors or established wholesalers, on trade terms, with a VAT invoice behind it.',
    },
    {
      // Not "we don't undercut". A public pricing undertaking to suppliers is
      // resale-price-maintenance exposure, and it is not ours to give.
      heading: 'Availability, not price',
      body: 'We compete on availability and reliability rather than on price. We’re a channel for a brand’s products, not a threat to it.',
    },
    {
      heading: 'Our own stock, our own risk',
      body: 'We buy outright and hold the stock ourselves. We sell established brands, not products of our own.',
    },
  ],
} as const

export const RANGE = {
  eyebrow: 'What we buy',
  headlineLine1: 'Many pieces.',
  headlineLine2: 'One standard.',
  body: 'A mosaic is assembled piece by piece. We buy across a broad set of everyday categories rather than deep into one. Small, light goods that households get through and buy again. No large appliances, no furniture, no electronics needing warranty support.',
  /** Framed as examples, not a closed list. The range is meant to grow. */
  examplesLabel: 'A few examples of what we carry',
  categories: [
    { key: 'pet', name: 'Pet supplies' },
    { key: 'home', name: 'Home & garden' },
    { key: 'baby', name: 'Baby products' },
    { key: 'sports', name: 'Sports & outdoors' },
    { key: 'stationery', name: 'Stationery & office' },
  ],
  footnote: 'If you supply something adjacent to these, it is still worth an email.',
} as const

export const WHERE_WE_SELL = {
  label: 'Where we sell',
  body: 'Amazon UK is our first channel, with eBay and our own storefront to follow.',
} as const

export const TRADE = {
  eyebrow: 'Trade enquiries',
  headline: 'We’re opening trade accounts.',
  body: 'If you’re a brand owner, distributor or wholesaler in our categories, send us your terms and price list and we’ll come back with a proper enquiry.',
  /** Volunteered up front, so a supplier can qualify us without a back-and-forth. */
  terms: [
    { term: 'Who we are', def: 'A UK-registered private limited company.' },
    {
      term: 'What we buy',
      def: 'Pet supplies, home and garden, baby products, sports and outdoors, stationery and office.',
    },
    { term: 'How we pay', def: 'We can pay pro forma on opening orders.' },
  ],
  fields: [
    { label: 'Company name', placeholder: 'Company name', type: 'text', name: 'company' },
    { label: 'Your name', placeholder: 'Name and role', type: 'text', name: 'contact' },
    { label: 'Email address', placeholder: 'name@company.co.uk', type: 'email', name: 'email' },
    { label: 'What you supply', placeholder: 'Categories and brands', type: 'textarea', name: 'supply' },
  ],
  submitLabel: 'Send enquiry',
  directLineLabel: 'Or email us directly',
} as const

export const FOOTER = {
  descriptor: 'A UK online retailer of genuine branded everyday goods, sourced on trade terms.',
  /**
   * REQUIRED, STILL MISSING. A UK company's website must show its registered name, company
   * number and registered office address. The company is registered but these have not been
   * supplied yet, so the footer renders nothing rather than inventing them. Fill both in and
   * the legal line appears automatically.
   */
  companyNumber: null as string | null,
  registeredOffice: null as string | null,
} as const
