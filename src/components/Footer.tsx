import Link from 'next/link'
import Image from 'next/image'
import { asset } from '@/lib/assetPath'

const BOOKING_URL =
  'https://app.playtomic.com/tenant/c9825c68-9da4-4cc4-a065-06ea58087f85?utm_source=app_ios&utm_campaign=share&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGngd9wn58fSDwPnOr_qB-ckJuekphFMIAt1taj2AnenpRp9ew3MykolGyULcw_aem_s3FqvC8jKTCbMpbwv-VupA'

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
      {/* Top: Logo + Tagline */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 pt-10 pb-8">
        <div className="flex flex-col items-start gap-3 mb-10">
          <p
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--serve-cream)',
              textShadow: '0 2px 8px rgba(0,0,0,0.6)',
              letterSpacing: '0.02em',
            }}
          >
            Where Umhlanga comes to play
          </p>
        </div>

        <hr className="hr-elegant mb-10" />

        {/* Middle: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1: Quick Links */}
          <div>
            <h4
              className="label-overline mb-6"
              style={{ color: 'var(--serve-amber)' }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Events', href: '/events' },
                { label: 'Eat & Drink', href: '/menu' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link"
                    style={{
                      color: 'var(--serve-cream)',
                      opacity: 0.75,
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Play */}
          <div>
            <h4
              className="label-overline mb-6"
              style={{ color: 'var(--serve-amber)' }}
            >
              Play
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                  style={{
                    color: 'var(--serve-cream)',
                    opacity: 0.75,
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                  }}
                >
                  Book a Court
                </a>
              </li>
              {[
                { label: 'Padel Courts', href: '/#play' },
                { label: 'Pickleball', href: '/#play' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="nav-link"
                    style={{
                      color: 'var(--serve-cream)',
                      opacity: 0.75,
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Visit Us */}
          <div>
            <h4
              className="label-overline mb-6"
              style={{ color: 'var(--serve-amber)' }}
            >
              Visit Us
            </h4>
            <ul className="flex flex-col gap-5">
              <li>
                <p
                  className="label-overline mb-1"
                  style={{ color: 'var(--serve-sage)', fontSize: '0.58rem' }}
                >
                  Address
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-jost), sans-serif',
                    fontSize: '0.8rem',
                    fontWeight: 300,
                    color: 'var(--serve-cream)',
                    opacity: 0.75,
                    lineHeight: 1.6,
                    letterSpacing: '0.02em',
                  }}
                >
                  2nd Floor, 185 Ridge Rd
                  <br />
                  Umhlanga, KwaZulu-Natal
                </p>
              </li>
              <li>
                <p
                  className="label-overline mb-1"
                  style={{ color: 'var(--serve-sage)', fontSize: '0.58rem' }}
                >
                  Phone
                </p>
                <a
                  href="tel:+27615451063"
                  style={{
                    fontFamily: 'var(--font-jost), sans-serif',
                    fontSize: '0.8rem',
                    fontWeight: 300,
                    color: 'var(--serve-cream)',
                    opacity: 0.75,
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                  }}
                >
                  061 545 1063
                </a>
              </li>
              <li>
                <p
                  className="label-overline mb-1"
                  style={{ color: 'var(--serve-sage)', fontSize: '0.58rem' }}
                >
                  Hours
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-jost), sans-serif',
                    fontSize: '0.8rem',
                    fontWeight: 300,
                    color: 'var(--serve-cream)',
                    opacity: 0.75,
                    letterSpacing: '0.02em',
                  }}
                >
                  6am – 10pm daily
                </p>
              </li>
            </ul>
          </div>
        </div>

        <hr className="hr-elegant mt-8 mb-6" />

        {/* Bottom: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p
            style={{
              fontFamily: 'var(--font-jost), sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              color: 'var(--serve-cream)',
              opacity: 0.4,
              textTransform: 'uppercase',
            }}
          >
            &copy; {currentYear} SERVE Padel &amp; Play. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-jost), sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              color: 'var(--serve-cream)',
              opacity: 0.4,
              textTransform: 'uppercase',
            }}
          >
            Designed with intention in Umhlanga
          </p>
        </div>
      </div>
    </footer>
  )
}
