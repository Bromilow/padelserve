import Link from 'next/link'

const BOOKING_URL =
  'https://app.playtomic.com/tenant/c9825c68-9da4-4cc4-a065-06ea58087f85?utm_source=app_ios&utm_campaign=share&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGngd9wn58fSDwPnOr_qB-ckJuekphFMIAt1taj2AnenpRp9ew3MykolGyULcw_aem_s3FqvC8jKTCbMpbwv-VupA'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{ backgroundColor: 'var(--serve-dark)', color: 'var(--serve-cream)' }}
    >
      {/* Top: Logo + Tagline */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pt-20 pb-12">
        <div className="flex flex-col items-start gap-3 mb-16">
          <div className="flex flex-col leading-none">
            <span
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: '2.2rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: 'var(--serve-cream)',
              }}
            >
              SERVE
            </span>
            <span
              style={{
                fontFamily: 'var(--font-jost), sans-serif',
                fontSize: '0.55rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 300,
                opacity: 0.6,
                marginTop: '-2px',
                color: 'var(--serve-cream)',
              }}
            >
              padel &amp; play
            </span>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-great-vibes), cursive',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              color: 'var(--serve-sage)',
              marginTop: '0.5rem',
            }}
          >
            Where Umhlanga comes to play
          </p>
        </div>

        <hr className="hr-elegant mb-16" />

        {/* Middle: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1: Quick Links */}
          <div>
            <h4
              className="label-overline mb-6"
              style={{ color: 'var(--serve-sage)' }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Events', href: '/events' },
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
              style={{ color: 'var(--serve-sage)' }}
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
              style={{ color: 'var(--serve-sage)' }}
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

        <hr className="hr-elegant mt-16 mb-8" />

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
