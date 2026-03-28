'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { asset } from '@/lib/assetPath'

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

const eventTypes = [
  {
    image: '/assets/kids-play-night.webp',
    alt: 'Kids playing outside at SERVE under string lights at night',
    title: 'Birthday Parties',
    body: 'Mark the occasion on the court. We set the stage \u2014 courts, catering, atmosphere. You just show up and celebrate. Available for all ages, all styles.',
  },
  {
    image: '/assets/dining-terrace.webp',
    alt: 'People dining at the outdoor terrace beside padel courts',
    title: "Kids' Celebrations",
    body: "A padel party the kids will talk about for months. Supervised play, our kids\u2019 area, food they\u2019ll actually eat, and memories worth keeping.",
  },
  {
    image: '/assets/padel-corridor.webp',
    alt: 'Players walking through the SERVE padel corridors',
    title: 'Corporate Events',
    body: 'Team-building, client entertainment, or company days \u2014 padel is the perfect equaliser. Break the ice, build the team, and do it somewhere worth dressing for.',
  },
]

const features = [
  'Exclusive venue hire options',
  'Professional event coordination',
  'Full catering from our kitchen',
  'Tailored packages for any budget',
]

export default function EventsContent() {
  const pageRef = useScrollReveal()

  return (
    <div ref={pageRef}>
      {/* ─── 1. PAGE HERO ─── */}
      <section
        className="relative flex items-center justify-center"
        style={{ height: 'calc(80vh + 80px)', minHeight: '640px', paddingTop: '80px' }}
      >
        <Image
          src={asset('/assets/court-night-lights.webp')}
          alt="Padel court at night with SRV sign illuminated"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(20,20,20,0.5) 0%, rgba(20,20,20,0.72) 100%)',
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="label-overline text-white opacity-70 mb-6 fade-up in-view">Private Events</p>
          <h1
            className="text-display-lg text-white mb-6 fade-up in-view delay-200"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontWeight: 300,
              fontStyle: 'italic',
            }}
          >
            Your event. Our courts.
            <br />Unforgettable.
          </h1>
          <p
            className="text-white fade-up in-view delay-400"
            style={{
              fontFamily: 'var(--font-great-vibes), cursive',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              opacity: 0.85,
            }}
          >
            Let&apos;s make something special
          </p>
        </div>
      </section>

      {/* ─── 2. INTRO ─── */}
      <section className="section-padding-sm px-6" style={{ backgroundColor: 'var(--serve-cream)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-overline mb-5 fade-up" style={{ color: 'var(--serve-sage)' }}>
            Host with us
          </p>
          <h2
            className="text-display-md mb-8 fade-up delay-200"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontWeight: 400,
              color: 'var(--serve-green)',
            }}
          >
            From intimate gatherings to full-scale celebrations
          </h2>
          <p
            className="fade-up delay-300"
            style={{
              fontFamily: 'var(--font-jost), sans-serif',
              fontSize: '1rem',
              lineHeight: 1.9,
              color: 'var(--serve-charcoal)',
              fontWeight: 300,
            }}
          >
            SERVE offers a one-of-a-kind event experience in the heart of Umhlanga. Whether you&apos;re
            planning a birthday party, a team-building day, a kids&apos; celebration, or a corporate
            function &mdash; our facility transforms beautifully for any occasion. Padel as the centrepiece.
            Style as standard.
          </p>
        </div>
      </section>

      {/* ─── 3. EVENT TYPES ─── */}
      <section className="section-padding-sm px-6" style={{ backgroundColor: 'var(--serve-warm)' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {eventTypes.map((event, i) => (
              <article
                key={event.title}
                className="group fade-up img-hover-zoom"
                style={{
                  transitionDelay: `${i * 150}ms`,
                  backgroundColor: 'var(--serve-cream)',
                }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: '4/3' }}
                >
                  <Image
                    src={asset(event.image)}
                    alt={event.alt}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-luxury group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Copy */}
                <div className="p-8">
                  <h3
                    className="mb-4"
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                      fontWeight: 500,
                      color: 'var(--serve-green)',
                    }}
                  >
                    {event.title}
                  </h3>
                  <hr className="hr-elegant mb-5" style={{ color: 'var(--serve-green)' }} />
                  <p
                    style={{
                      fontFamily: 'var(--font-jost), sans-serif',
                      fontSize: '0.9rem',
                      lineHeight: 1.85,
                      color: 'var(--serve-charcoal)',
                      fontWeight: 300,
                    }}
                  >
                    {event.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. WHY SERVE FOR EVENTS ─── */}
      <section className="section-padding px-6" style={{ backgroundColor: 'var(--serve-green)' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: pull quote */}
            <div className="reveal-left">
              <p
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 1.4,
                  color: 'var(--serve-cream)',
                }}
              >
                &ldquo;Every great event needs a great backdrop. We&apos;ve got four courts, a full kitchen,
                and a terrace that looks like it was made for celebrations.&rdquo;
              </p>
            </div>

            {/* Right: feature list */}
            <div className="reveal-right">
              <ul className="space-y-6">
                {features.map((feature, i) => (
                  <li
                    key={feature}
                    className="flex items-start gap-5"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontSize: '1.2rem',
                        color: 'var(--serve-sage)',
                        lineHeight: 1,
                        marginTop: '0.2rem',
                        flexShrink: 0,
                      }}
                    >
                      &mdash;
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-jost), sans-serif',
                        fontSize: '1rem',
                        lineHeight: 1.7,
                        color: 'rgba(245, 240, 232, 0.85)',
                        fontWeight: 300,
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. EDITORIAL IMAGE BREAK ─── */}
      <div className="relative w-full scale-reveal" style={{ height: '55vh', minHeight: '340px' }}>
        <Image
          src={asset('/assets/srv-logo-mural.webp')}
          alt="SRV tropical botanical logo mural"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle overlay to keep it editorial */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(20, 20, 20, 0.18)' }}
        />
      </div>

      {/* ─── 6. ENQUIRE CTA ─── */}
      <section className="section-padding-sm px-6" style={{ backgroundColor: 'var(--serve-cream)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="fade-up mb-4"
            style={{
              fontFamily: 'var(--font-great-vibes), cursive',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              color: 'var(--serve-sage)',
            }}
          >
            Let&apos;s talk
          </p>
          <h2
            className="text-display-md mb-6 fade-up delay-200"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontWeight: 400,
              color: 'var(--serve-green)',
            }}
          >
            Tell us what you&apos;re planning
          </h2>
          <p
            className="mb-12 fade-up delay-300"
            style={{
              fontFamily: 'var(--font-jost), sans-serif',
              fontSize: '0.975rem',
              lineHeight: 1.85,
              color: 'var(--serve-charcoal)',
              fontWeight: 300,
            }}
          >
            Every event at SERVE starts with a conversation. Fill in your details and our events team
            will be in touch within 24 hours.
          </p>
          <div className="fade-up delay-400">
            <Link href="/contact" className="btn-luxury btn-luxury-green">
              <span>Enquire Now</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
