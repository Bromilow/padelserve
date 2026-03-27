'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const BOOKING_URL =
  'https://app.playtomic.com/tenant/c9825c68-9da4-4cc4-a065-06ea58087f85?utm_source=app_ios&utm_campaign=share&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGngd9wn58fSDwPnOr_qB-ckJuekphFMIAt1taj2AnenpRp9ew3MykolGyULcw_aem_s3FqvC8jKTCbMpbwv-VupA'

const navLinks = [
  { label: 'Play', href: '/#play' },
  { label: 'Eat & Drink', href: '/#eat' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
]

const overlayVariants = {
  hidden: { opacity: 0, y: '-100%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94],
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: '-100%',
    transition: {
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const linkVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('mobile-nav-open')
    } else {
      document.body.classList.remove('mobile-nav-open')
    }
    return () => document.body.classList.remove('mobile-nav-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled
            ? 'rgba(28, 58, 42, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none" onClick={closeMenu}>
              <span
                className="text-white font-bold tracking-widest"
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                }}
              >
                SERVE
              </span>
              <span
                className="text-white"
                style={{
                  fontFamily: 'var(--font-jost), sans-serif',
                  fontSize: '0.52rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  fontWeight: 300,
                  marginTop: '-2px',
                  opacity: 0.8,
                }}
              >
                padel &amp; play
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-white opacity-90 hover:opacity-100 transition-opacity duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury btn-luxury-light"
              >
                <span>Book a Court</span>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 relative z-50"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span
                className="block w-6 h-px bg-white transition-all duration-400"
                style={{
                  transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
                  transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              />
              <span
                className="block w-6 h-px bg-white transition-all duration-400"
                style={{
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? 'translateX(-8px)' : 'none',
                  transition:
                    'opacity 0.25s ease, transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              />
              <span
                className="block w-6 h-px bg-white"
                style={{
                  transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
                  transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 flex flex-col justify-center items-center"
            style={{ backgroundColor: 'var(--serve-green)' }}
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="text-white block text-center"
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 'clamp(2rem, 6vw, 3rem)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={linkVariants} className="mt-4">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury btn-luxury-light"
                  onClick={closeMenu}
                >
                  <span>Book a Court</span>
                </a>
              </motion.div>
            </nav>

            {/* Script accent */}
            <motion.p
              variants={linkVariants}
              className="absolute bottom-12 text-white"
              style={{
                fontFamily: 'var(--font-great-vibes), cursive',
                fontSize: '1.5rem',
                opacity: 0.4,
              }}
            >
              Umhlanga&apos;s finest
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
