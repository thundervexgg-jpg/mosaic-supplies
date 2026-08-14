import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Logo from './Logo'
import { COLOR, CONTACT, EXPO_OUT } from '../lib/tokens'
import { NAV } from '../lib/copy'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  // A fixed overlay over a scrollable page needs the body locked, or the page
  // scrolls behind the menu on touch.
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header
        className="relative z-50 flex items-center justify-between gap-8"
        style={{ padding: 'clamp(16px, 4vh, 40px) clamp(16px, 3vw, 48px) 0' }}
      >
        <Logo />

        <nav className="hidden items-center md:flex" style={{ gap: 'clamp(20px, 3.8vw, 52px)' }}>
          {NAV.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="text-bisque"
              style={{
                fontSize: 'clamp(15px, min(1.97vh, 1.45vw), 20px)',
                letterSpacing: '-0.02em',
              }}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: EXPO_OUT }}
              whileHover={{ color: COLOR.clay, x: 2 }}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.a
            href="#trade"
            className="eyebrow rounded-sm px-5 py-3"
            style={{ backgroundColor: COLOR.bisque, color: COLOR.basalt }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + NAV.length * 0.08, ease: EXPO_OUT }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact
          </motion.a>
        </nav>

        <button
          type="button"
          className="text-bisque md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ backgroundColor: COLOR.basalt }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.32, ease: EXPO_OUT }}
          >
            {NAV.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="wordmark text-bisque"
                style={{ fontSize: 34 }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06 + i * 0.07, ease: EXPO_OUT }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href={`mailto:${CONTACT.email}`}
              onClick={() => setMenuOpen(false)}
              className="eyebrow"
              style={{ color: COLOR.clay }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06 + NAV.length * 0.07, ease: EXPO_OUT }}
            >
              {CONTACT.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
