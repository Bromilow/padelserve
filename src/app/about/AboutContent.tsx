'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { asset } from '@/lib/assetPath'

const BOOKING_URL =
  'https://app.playtomic.com/tenant/c9825c68-9da4-4cc4-a065-06ea58087f85?utm_source=app_ios&utm_campaign=share&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGngd9wn58fSDwPnOr_qB-ckJuekphFMIAt1taj2AnenpRp9ew3MykolGyULcw_aem_s3FqvC8jKTCbMpbwv-VupA'

function useScrollReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = sectionRef.current
    if (!container) return

    const animatableEls = container.querySelectorAll<HTMLElement>(
      '.fade-up, .fade-in, .reveal-left, .reveal-right, .scale-reveal'
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    animatableEls.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return sectionRef
}

const values = [
  {
    number: '01',
    title: 'Play Hard',
    body: 'Our courts are designed for serious players and enthusiastic beginners alike. World-class surfaces, professional lighting, and space to rally, serve, and compete the way the game deserves.',
  },
  {
    number: '02',
    title: 'Stay Longer',
    body: 'Coffee before. Pizza after. Maybe another match in between. Our kitchen and terrace are built for lingering. There is no rush at SERVE, just good food, great company, and an open sky.',
  },
  {
    number: '03',
    title: 'Belong Here',
    body: 'SERVE is a community first. Whether you\u2019re booking a solo hit, joining a social game, or hosting a private event, this is your space. Show up regularly enough and you\u2019ll know every name on the court.',
  },
]

const slideshowImages = [
  '/assets/11.jpg',
  '/assets/22.jpg',
  '/assets/33.jpg',
  '/assets/44.jpg',
]

export default function AboutContent() {
  const pageRef = useScrollReveal()
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideshowImages.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={pageRef}>
      {/* ─── 1. PAGE HERO ─── */}
      <section
        className="relative flex items-center justify-center"
        style={{ height: 'calc(80vh + 80px)', minHeight: '640px', paddingTop: '80px' }}
      >
        <Image
          src={asset('/assets/now.JPG')}
          alt="SERVE Padel & Play"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="video-overlay absolute inset-0" />

        {/* Pre-apply in-view so hero text shows immediately on navigation */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="label-overline text-[var(--serve-cream)] opacity-70 mb-6 fade-up in-view">Our Story</p>
          <h1
            className="text-display-lg text-[var(--serve-cream)] font-light mb-6 fade-up in-view delay-200"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Born from a love of the game.
            <br />Stayed for the{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--serve-amber)' }}>lifestyle.</span>
          </h1>
          <p
            className="text-[var(--serve-cream)] fade-up in-view delay-400"
            style={{
              fontFamily: 'var(--font-jost), sans-serif',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              opacity: 0.8,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 300,
            }}
          >
            This is SERVE.
          </p>
        </div>
      </section>

      {/* ─── 2. OUR STORY — editorial two-column ─── */}
      <section className="section-padding px-6" style={{ backgroundColor: 'var(--serve-cream)' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: tall portrait image */}
            <div className="reveal-left" style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
              {slideshowImages.map((src, i) => (
                <Image
                  key={src}
                  src={asset(src)}
                  alt="SERVE Padel & Play"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                  style={{
                    opacity: i === slideIndex ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                    position: 'absolute',
                  }}
                />
              ))}
              {/* Slide indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {slideshowImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    style={{
                      width: i === slideIndex ? '20px' : '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: 'var(--serve-cream)',
                      opacity: i === slideIndex ? 1 : 0.4,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: copy */}
            <div className="reveal-right">
              <p className="label-overline mb-5" style={{ color: 'var(--serve-sage)' }}>
                How it started
              </p>
              <h2
                className="text-display-md mb-10"
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontWeight: 300,
                  color: 'var(--serve-green)',
                }}
              >
                A vision for Umhlanga&apos;s next chapter
              </h2>

              <div
                className="space-y-6"
                style={{
                  fontFamily: 'var(--font-jost), sans-serif',
                  fontSize: '0.975rem',
                  lineHeight: 1.85,
                  color: 'var(--serve-charcoal)',
                  fontWeight: 300,
                }}
              >
                <p>
                  SERVE isn&apos;t just a padel club. It&apos;s the place Umhlanga didn&apos;t know it needed, until now.
                  We built courts, yes. But we also built a terrace where deals are done over coffee,
                  friendships form after a hard-fought match, and evenings stretch long into the night
                  under a string of warm lights.
                </p>
                <p>
                  Umhlanga has always been a place where people come to feel alive. The energy of the coastline,
                  the ambition of a city on the rise, the sense that something exciting is always just around the
                  corner. SERVE was built to match that energy, and then some.
                </p>
                <p>
                  Situated on the second floor of 185 Ridge Road, our facility combines world-class padel
                  infrastructure with a genuine passion for community. Three padel courts, one pickleball court,
                  a kitchen that takes its food seriously, and a kids&apos; area that makes the whole family welcome.
                </p>
                <p>
                  We believe sport and social life are inseparable. The best conversations happen after a match.
                  The best evenings start on a court. Come as a player. Leave as a regular.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. VALUES ─── */}
      <section className="section-padding-sm px-6" style={{ backgroundColor: 'var(--serve-green)' }}>
        <div className="max-w-screen-xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16 lg:mb-20">
            <p className="label-overline opacity-60 mb-4 fade-up" style={{ color: 'var(--serve-cream)' }}>
              What we stand for
            </p>
            <h2
              className="text-display-md fade-up delay-200"
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontWeight: 300,
                color: 'var(--serve-cream)',
              }}
            >
              More than a venue
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {values.map((value, i) => (
              <div
                key={value.number}
                className="fade-up"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 'clamp(4rem, 8vw, 6rem)',
                    fontWeight: 700,
                    color: 'rgba(245, 240, 232, 0.08)',
                    lineHeight: 1,
                    marginBottom: '-0.5rem',
                    userSelect: 'none',
                  }}
                >
                  {value.number}
                </p>
                <h3
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                    fontWeight: 500,
                    color: 'var(--serve-cream)',
                    letterSpacing: '0.03em',
                  }}
                >
                  {value.title}
                </h3>
                <hr className="hr-elegant mb-5" style={{ color: 'var(--serve-cream)' }} />
                <p
                  style={{
                    fontFamily: 'var(--font-jost), sans-serif',
                    fontSize: '0.9rem',
                    lineHeight: 1.85,
                    color: 'rgba(245, 240, 232, 0.7)',
                    fontWeight: 300,
                  }}
                >
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. CTA ─── */}
      <section className="section-padding-sm px-6" style={{ backgroundColor: 'var(--serve-cream)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="label-overline mb-4 fade-up"
            style={{ color: 'var(--serve-sage)' }}
          >
            Ready to see it for yourself?
          </p>
          <h2
            className="text-display-md mb-12 fade-up delay-200"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontWeight: 300,
              color: 'var(--serve-green)',
            }}
          >
            Come play
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 fade-up delay-400">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury btn-luxury-green"
            >
              <span>Book a Court</span>
            </a>
            <Link href="/contact" className="btn-luxury btn-luxury-dark">
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
