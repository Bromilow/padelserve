'use client'

import Image from 'next/image'
import Link from 'next/link'
import { asset } from '@/lib/assetPath'

export default function PilatesContent() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex items-end" style={{ height: 'calc(80vh + 80px)', minHeight: '640px', paddingTop: '80px' }}>
        <Image
          src={asset('/assets/rooftop-duo.jpg')}
          alt="Talia and Lauren on the SERVE rooftop"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.85) 100%)' }} />
        <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 lg:px-12 pb-20">
          <p
            className="label-overline mb-6"
            style={{ color: 'var(--serve-cream)', opacity: 0.6, letterSpacing: '0.25em' }}
          >
            Rooftop · Umhlanga
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(3.2rem, 7vw, 6.5rem)',
              fontWeight: 300,
              lineHeight: 1.0,
              color: 'var(--serve-cream)',
              maxWidth: '14ch',
            }}
          >
            Strengthen.
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--serve-amber)' }}>Connect.</span>
            <br />
            Empower.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-jost)',
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              color: 'var(--serve-cream)',
              opacity: 0.65,
              marginTop: '1.5rem',
              maxWidth: '38ch',
              lineHeight: 1.8,
              letterSpacing: '0.04em',
            }}
          >
            Pilates on our open-air rooftop terrace. Expert BASI-qualified instruction. Small groups. A practice built around you.
          </p>
          <div style={{ marginTop: '2.5rem' }}>
            <Link href="/contact" className="btn-luxury btn-luxury-light">
              <span>Enquire to Book</span>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2" style={{ opacity: 0.4 }}>
          <div style={{ width: 1, height: 48, background: 'var(--serve-cream)' }} />
          <span className="label-overline" style={{ fontSize: '0.5rem', color: 'var(--serve-cream)', letterSpacing: '0.2em', writingMode: 'vertical-rl' }}>SCROLL</span>
        </div>
      </section>

      {/* ── INSTRUCTOR ── */}
      <section style={{ backgroundColor: 'var(--serve-cream)' }}>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[600px] overflow-hidden">
            <Image
              src={asset('/assets/talia-pilates.jpg')}
              alt="Talia Tostee — BASI Pilates instructor at SERVE"
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center px-10 py-20 lg:px-16">
            <p className="label-overline mb-4" style={{ color: 'var(--serve-green)', letterSpacing: '0.2em' }}>Your Instructor</p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                color: 'var(--serve-dark)',
                marginBottom: '0.5rem',
              }}
            >
              Talia Tostee
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '1.1rem',
                fontStyle: 'italic',
                color: 'var(--serve-sage)',
                marginBottom: '1.5rem',
              }}
            >
              BASI Certified Pilates Instructor
            </p>
            <div style={{ width: '40px', height: '1px', background: 'var(--serve-amber)', marginBottom: '1.5rem' }} />
            <p
              style={{
                fontFamily: 'var(--font-jost)',
                fontSize: '0.9rem',
                color: 'var(--serve-dark)',
                opacity: 0.7,
                lineHeight: 1.9,
                marginBottom: '1.2rem',
              }}
            >
              Growing up, dance was everything — but it was discovering Pilates at just 13 that truly changed the course of my life. What began as a way to support my dancing quickly became so much more, helping me manage my scoliosis and unlock a strength I never knew I had.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-jost)',
                fontSize: '0.9rem',
                color: 'var(--serve-dark)',
                opacity: 0.7,
                lineHeight: 1.9,
              }}
            >
              Now a qualified BASI Pilates instructor, I bring both personal experience and genuine passion to every session. My goal is simple: to help others feel stronger, more connected, and truly empowered in their own bodies. I&rsquo;m on a mission to share the life-changing power of Pilates, one mat at a time.
            </p>
          </div>
        </div>
      </section>

      {/* ── ABOUT PILATES ── */}
      <section style={{ backgroundColor: 'var(--serve-dark)' }}>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* Text */}
          <div className="flex flex-col justify-center px-10 py-20 lg:px-16">
            <p className="label-overline mb-6" style={{ color: 'var(--serve-amber)', letterSpacing: '0.25em' }}>
              The Practice
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                color: 'var(--serve-cream)',
                marginBottom: '1.5rem',
              }}
            >
              Strength from the inside out.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-jost)',
                fontSize: '0.9rem',
                color: 'var(--serve-cream)',
                opacity: 0.6,
                lineHeight: 1.9,
                marginBottom: '1.2rem',
              }}
            >
              Our Pilates sessions are held on SERVE&rsquo;s open-air rooftop — a space that encourages focus, breath, and intentional movement. Whether you&rsquo;re new to Pilates or deepening an existing practice, every session is designed to meet you where you are.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-jost)',
                fontSize: '0.9rem',
                color: 'var(--serve-cream)',
                opacity: 0.6,
                lineHeight: 1.9,
              }}
            >
              All levels welcome. Small groups. Purpose-driven movement.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {[
                { num: '01', label: 'Open-Air Rooftop' },
                { num: '02', label: 'All Levels Welcome' },
                { num: '03', label: 'Small Groups' },
              ].map(p => (
                <div key={p.num}>
                  <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', fontWeight: 300, color: 'var(--serve-amber)', lineHeight: 1 }}>{p.num}</p>
                  <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.7rem', color: 'var(--serve-cream)', opacity: 0.5, marginTop: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{p.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[600px] overflow-hidden">
            <Image
              src={asset('/assets/talia-action.jpg')}
              alt="Pilates on the SERVE rooftop"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ── BOOK CTA ── */}
      <section style={{ backgroundColor: 'var(--serve-cream)' }} className="section-padding">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 text-center">
          <p className="label-overline mb-3" style={{ color: 'var(--serve-green)' }}>Reserve Your Spot</p>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              color: 'var(--serve-dark)',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Ready to begin?
          </h2>
          <div style={{ width: '40px', height: '1px', background: 'var(--serve-amber)', margin: '0 auto 2rem' }} />
          <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.9rem', color: 'var(--serve-dark)', opacity: 0.6, lineHeight: 1.8, maxWidth: '38ch', margin: '0 auto 2.5rem' }}>
            Sessions are limited to small groups. Get in touch to find out about upcoming classes and availability.
          </p>
          <Link href="/contact" className="btn-luxury btn-luxury-green">
            <span>Enquire to Book</span>
          </Link>
        </div>
      </section>
    </>
  )
}
