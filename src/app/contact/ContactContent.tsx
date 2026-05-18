'use client'

import Image from 'next/image'
import { asset } from '@/lib/assetPath'

const BOOKING_URL =
  'https://app.playtomic.com/tenant/c9825c68-9da4-4cc4-a065-06ea58087f85?utm_source=app_ios&utm_campaign=share&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGngd9wn58fSDwPnOr_qB-ckJuekphFMIAt1taj2AnenpRp9ew3MykolGyULcw_aem_s3FqvC8jKTCbMpbwv-VupA'

export default function ContactContent() {
  return (
    <div>
      {/* ─── PAGE HEADER ─── */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: 'calc(80vh + 80px)', minHeight: '640px', paddingTop: '80px' }}
      >
        <Image
          src={asset('/assets/10.JPG')}
          alt="SERVE Padel & Play"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="video-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="label-overline text-[var(--serve-cream)] opacity-70 mb-6">
            Get in touch
          </p>
          <h1
            className="text-display-lg text-[var(--serve-cream)] font-light mb-6"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            We&apos;d love to{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--serve-amber)' }}>hear from you.</span>
          </h1>
        </div>
      </section>

      {/* ─── CONTACT DETAILS ─── */}
      <section className="section-padding-sm px-6" style={{ backgroundColor: 'var(--serve-cream)' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {/* Visit Us */}
            <div className="p-10" style={{ backgroundColor: 'var(--serve-green)' }}>
              <p className="label-overline mb-4" style={{ color: 'var(--serve-sage)' }}>Visit Us</p>
              <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.2rem', fontWeight: 300, color: 'var(--serve-cream)', lineHeight: 1.7 }}>
                2nd Floor, 185 Ridge Rd<br />Umhlanga, KwaZulu-Natal
              </p>
            </div>

            {/* Call Us */}
            <div className="p-10" style={{ backgroundColor: 'var(--serve-dark)' }}>
              <p className="label-overline mb-4" style={{ color: 'var(--serve-sage)' }}>Call Us</p>
              <a
                href="tel:+27615451063"
                style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.2rem', fontWeight: 300, color: 'var(--serve-cream)', textDecoration: 'none', lineHeight: 1.7, display: 'block' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                061 545 1063
              </a>
            </div>

            {/* Hours */}
            <div className="p-10" style={{ backgroundColor: 'var(--serve-green)' }}>
              <p className="label-overline mb-4" style={{ color: 'var(--serve-sage)' }}>Hours</p>
              <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.2rem', fontWeight: 300, color: 'var(--serve-cream)', lineHeight: 1.7 }}>
                Monday &ndash; Sunday<br />6:00am &ndash; 10:00pm
              </p>
            </div>

            {/* Book Online */}
            <div className="p-10" style={{ backgroundColor: 'var(--serve-dark)' }}>
              <p className="label-overline mb-4" style={{ color: 'var(--serve-sage)' }}>Book Online</p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.2rem', fontWeight: 300, color: 'var(--serve-cream)', textDecoration: 'none', lineHeight: 1.7, display: 'block' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Book via Playtomic ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
