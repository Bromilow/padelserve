'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { asset } from '@/lib/assetPath'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

const BOOKING_URL =
  'https://app.playtomic.com/tenant/c9825c68-9da4-4cc4-a065-06ea58087f85?utm_source=app_ios&utm_campaign=share&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGngd9wn58fSDwPnOr_qB-ckJuekphFMIAt1taj2AnenpRp9ew3MykolGyULcw_aem_s3FqvC8jKTCbMpbwv-VupA'

const navLinks = [
  { label: 'Play', href: '/#play' },
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Yoga', href: '/yoga' },
  { label: 'Eat & Drink', href: '/menu' },
  { label: 'Contact', href: '/contact' },
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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('mobile-nav-open')
    } else {
      document.body.classList.remove('mobile-nav-open')
    }
    return () => document.body.classList.remove('mobile-nav-open')
  }, [menuOpen])

  const pathname = usePathname()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const accountMenuRef = useRef<HTMLDivElement>(null)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    setAccountMenuOpen(false)
    router.push('/')
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault()
      const el = document.querySelector(href.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    closeMenu()
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: 'var(--serve-cream)',
          borderBottom: '1px solid rgba(28,58,42,0.12)',
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" onClick={closeMenu}>
              <Image
                src={asset('/assets/webp/serve.webp')}
                alt="SERVE Padel & Play"
                width={160}
                height={80}
                style={{ width: 'auto', height: 'clamp(48px, 10vw, 72px)' }}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-[var(--serve-dark)] opacity-80 hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => handleNavClick(e, link.href)}
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
                className="btn-luxury btn-luxury-dark"
              >
                <span>Book a Court</span>
              </a>
            </div>

            {/* Desktop Auth */}
            {!authLoading && (
              <div className="hidden md:flex items-center ml-4 pl-4" style={{ borderLeft: '1px solid rgba(28,58,42,0.15)' }}>
                {!user ? (
                  <Link
                    href="/login"
                    className="nav-link text-[var(--serve-dark)] opacity-70 hover:opacity-100 transition-opacity duration-300"
                  >
                    Sign In
                  </Link>
                ) : (
                  <div ref={accountMenuRef} style={{ position: 'relative' }}>
                    <button
                      onClick={() => setAccountMenuOpen(prev => !prev)}
                      className="nav-link text-[var(--serve-dark)] opacity-70 hover:opacity-100 transition-opacity duration-300"
                    >
                      My Account
                    </button>
                    {accountMenuOpen && (
                      <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 1rem)',
                        right: 0,
                        backgroundColor: 'var(--serve-cream)',
                        border: '1px solid rgba(28,58,42,0.15)',
                        minWidth: '140px',
                        zIndex: 100,
                      }}>
                        <Link
                          href="/profile"
                          onClick={() => setAccountMenuOpen(false)}
                          className="nav-link block px-4 py-3 text-[var(--serve-dark)] opacity-70 hover:opacity-100"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="nav-link w-full text-left px-4 py-3 text-[var(--serve-dark)] opacity-70 hover:opacity-100"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11 relative z-50"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span
                className="block w-6 h-px bg-black transition-all duration-400"
                style={{
                  transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
                  transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              />
              <span
                className="block w-6 h-px bg-black transition-all duration-400"
                style={{
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? 'translateX(-8px)' : 'none',
                  transition:
                    'opacity 0.25s ease, transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              />
              <span
                className="block w-6 h-px bg-black"
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
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[var(--serve-cream)] block text-center"
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
              {!authLoading && (
                <motion.div variants={linkVariants} className="mt-2">
                  {!user ? (
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="text-[var(--serve-cream)] block text-center"
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                        fontWeight: 400,
                        fontStyle: 'italic',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Sign In
                    </Link>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <Link
                        href="/profile"
                        onClick={closeMenu}
                        className="text-[var(--serve-cream)] block text-center"
                        style={{
                          fontFamily: 'var(--font-cormorant)',
                          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                          fontWeight: 400,
                          fontStyle: 'italic',
                          letterSpacing: '0.05em',
                        }}
                      >
                        My Account
                      </Link>
                      <button
                        onClick={() => { handleSignOut(); closeMenu() }}
                        style={{
                          fontFamily: 'var(--font-jost)',
                          fontSize: '0.65rem',
                          letterSpacing: '0.3em',
                          textTransform: 'uppercase',
                          color: 'var(--serve-cream)',
                          opacity: 0.5,
                        }}
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </nav>

            {/* Script accent */}
            <motion.p
              variants={linkVariants}
              className="absolute bottom-20 text-[var(--serve-cream)]"
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontStyle: 'italic',
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
