import Link from 'next/link'
import Image from 'next/image'
import { asset } from '@/lib/assetPath'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative overflow-hidden"
      style={{ color: 'var(--serve-cream)', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
    >
      <Image
        src={asset('/assets/16.png')}
        alt="Footer background"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 pt-8 pb-6 md:pt-10 md:pb-8">
        {/* Tagline */}
        <p
          className="mb-6 md:mb-10"
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(1.1rem, 2.5vw, 2rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--serve-cream)',
            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
            letterSpacing: '0.02em',
          }}
        >
          Where Umhlanga comes to play
        </p>

        <hr className="hr-elegant mb-6 md:mb-10" />

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-16">
          {/* Quick Links */}
          <div>
            <h4 className="label-overline mb-4 md:mb-6" style={{ color: 'var(--serve-amber)' }}>
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 md:gap-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Events', href: '/events' },
                { label: 'Yoga & Pilates', href: '/yoga' },
                { label: 'Eat & Drink', href: '/menu' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link"
                    style={{ color: 'var(--serve-cream)', opacity: 0.75, fontSize: '0.65rem', letterSpacing: '0.15em' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Us */}
          <div>
            <h4 className="label-overline mb-4 md:mb-6" style={{ color: 'var(--serve-amber)' }}>
              Visit Us
            </h4>
            <ul className="flex flex-col gap-4 md:gap-5">
              <li>
                <p className="label-overline mb-1" style={{ color: 'var(--serve-sage)', fontSize: '0.55rem' }}>Address</p>
                <p style={{ fontFamily: 'var(--font-jost), sans-serif', fontSize: '0.75rem', fontWeight: 300, color: 'var(--serve-cream)', opacity: 0.75, lineHeight: 1.6, letterSpacing: '0.02em' }}>
                  2nd Floor, 185 Ridge Rd
                  <br />
                  Umhlanga, KwaZulu-Natal
                </p>
              </li>
              <li>
                <p className="label-overline mb-1" style={{ color: 'var(--serve-sage)', fontSize: '0.55rem' }}>Phone</p>
                <a
                  href="tel:+27615451063"
                  style={{ fontFamily: 'var(--font-jost), sans-serif', fontSize: '0.75rem', fontWeight: 300, color: 'var(--serve-cream)', opacity: 0.75, letterSpacing: '0.02em', textDecoration: 'none' }}
                >
                  061 545 1063
                </a>
              </li>
              <li>
                <p className="label-overline mb-1" style={{ color: 'var(--serve-sage)', fontSize: '0.55rem' }}>Hours</p>
                <p style={{ fontFamily: 'var(--font-jost), sans-serif', fontSize: '0.75rem', fontWeight: 300, color: 'var(--serve-cream)', opacity: 0.75, letterSpacing: '0.02em' }}>
                  6am – 10pm daily
                </p>
              </li>
            </ul>
          </div>
        </div>

        <hr className="hr-elegant mt-6 mb-4 md:mt-8 md:mb-6" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1 md:gap-3">
          <p style={{ fontFamily: 'var(--font-jost), sans-serif', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--serve-cream)', opacity: 0.4, textTransform: 'uppercase' }}>
            &copy; {currentYear} SERVE Padel &amp; Play. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-jost), sans-serif', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--serve-cream)', opacity: 0.4, textTransform: 'uppercase' }}>
            Designed with intention in Umhlanga
          </p>
        </div>
      </div>
    </footer>
  )
}
