'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { asset } from '@/lib/assetPath'

const PLAYTOMIC_URL =
  'https://app.playtomic.com/tenant/c9825c68-9da4-4cc4-a065-06ea58087f85?utm_source=app_ios&utm_campaign=share&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGngd9wn58fSDwPnOr_qB-ckJuekphFMIAt1taj2AnenpRp9ew3MykolGyULcw_aem_s3FqvC8jKTCbMpbwv-VupA'

function useScrollAnimation() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.fade-up, .fade-in, .reveal-left, .reveal-right, .scale-reveal'
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

function useParallax() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const img = el.querySelector('.parallax-img') as HTMLElement | null
    if (!img) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const viewH = window.innerHeight
      const progress = (viewH - rect.top) / (viewH + rect.height)
      const shift = (progress - 0.5) * 60
      img.style.transform = `translateY(${shift}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return ref
}


const galleryImages = [
  { src: '/assets/dining-terrace.webp', alt: 'Dining terrace at SERVE' },
  { src: '/assets/srv-logo-mural.webp', alt: 'SRV botanical logo mural' },
  { src: '/assets/pizza-artisan.webp', alt: 'Artisan wood-fired pizza' },
  { src: '/assets/kids-play-night.webp', alt: 'Kids playing at night under string lights' },
  { src: '/assets/serve-sign-hedge.webp', alt: 'SERVE padel sign on green hedge' },
  { src: '/assets/court-night-lights.webp', alt: 'Padel court at night with SRV sign' },
  { src: '/assets/3.png', alt: 'Guests enjoying drinks on the SERVE terrace at sunset' },
  { src: '/assets/4.png', alt: 'Aerial view of SERVE padel courts and facility' },
  { src: '/assets/5.jpg', alt: 'Players mid-rally on a floodlit padel court' },
  { src: '/assets/7.jpg', alt: 'Friends celebrating after a padel match at SERVE' },
  { src: '/assets/8.jpg', alt: 'Wood-fired pizza oven and kitchen at SERVE' },
]

export default function HomePage() {
  useScrollAnimation()
  const parallaxRef = useParallax()

  return (
    <>
      {/* ─── SECTION 1: HERO ─── */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={asset('/assets/new-vid.mp4')}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/court-night-lights.webp"
        />

        {/* Overlay */}
        <div className="video-overlay absolute inset-0 z-10" />

        {/* Hero content */}
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto pb-28 pt-20">

          {/* Amber accent line */}
          <div className="flex justify-center mb-6">
            <div className="amber-line" />
          </div>

          {/* Headline */}
          <h1
            className="hero-word font-light text-[var(--serve-cream)] tracking-tight mb-4"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(3.5rem, 9vw, 9rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              animationDelay: '0.4s',
              opacity: 0,
            }}
          >
            Where Umhlanga comes to{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--serve-amber)' }}>play.</span>
          </h1>

          {/* Script accent */}
          <p
            className="hero-word text-[var(--serve-cream)] mb-4"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              opacity: 0,
              animationDelay: '0.9s',
              letterSpacing: '0.02em',
            }}
          >
            and stay a little longer
          </p>

          {/* Subheading */}
          <p
            className="hero-word text-[var(--serve-cream)] mb-10"
            style={{
              fontFamily: 'var(--font-jost)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: 0,
              animationDelay: '1.1s',
            }}
          >
            Padel courts · Social dining · Private events
          </p>

          {/* CTA */}
          <div className="hero-word flex flex-col items-center" style={{ animationDelay: '1.3s', opacity: 0 }}>
            <a
              href={PLAYTOMIC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury btn-luxury-light"
            >
              <span>Book a Court</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 fade-in in-view" style={{ transitionDelay: '1.1s' }}>
          <span className="label-overline text-[var(--serve-cream)] opacity-60">Scroll</span>
          <div className="w-px h-12 bg-[var(--serve-cream)] opacity-40 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-[var(--serve-cream)]"
              style={{
                animation: 'scrollLine 1.8s ease-in-out infinite',
                height: '100%',
              }}
            />
          </div>
        </div>

      </section>

      {/* ─── SECTION 2: EXPERIENCE ─── */}
      <section
        id="experience"
        className="bg-[var(--serve-cream)] section-padding-sm overflow-hidden"
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-16 items-stretch">
            {/* Left: image */}
            <div
              ref={parallaxRef}
              className="parallax-container w-full lg:w-[60%] h-[55vw] lg:h-[42vw] max-h-[520px] min-h-[260px] reveal-left"
            >
              <Image
                src={asset('/assets/home.png')}
                alt="Padel court at night with illuminated SERVE sign and string lights"
                fill
                className="parallax-img object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                loading="eager"
              />
            </div>

            {/* Right: text */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center pt-8 lg:pt-0">
              <p className="label-overline text-[var(--serve-green)] mb-5 fade-up delay-100">
                The Experience
              </p>

              <h2
                className="text-display-md text-[var(--serve-dark)] font-light mb-8 fade-up delay-200"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                More than a game.
                <br />
                A way of life.
              </h2>

              <p
                className="text-sm leading-relaxed text-[var(--serve-dark)] opacity-75 mb-12 fade-up delay-300"
                style={{ fontFamily: 'var(--font-jost)', maxWidth: '38ch' }}
              >
                SERVE is where padel, food, and good company come together.
                <br /><br />
                A place to play, unwind, and stay longer than you planned.
                <br /><br />
                Mornings start with a match. Evenings turn into drinks, dinner, and one more game.
                <br /><br />
                Whether you&apos;re here to compete or simply to be part of it, this is where you want to be.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: PLAY ─── */}
      <section
        id="play"
        className="bg-[var(--serve-green)] section-padding-sm overflow-hidden relative"
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="label-overline text-[var(--serve-cream)] opacity-60 mb-5 fade-up">
              Play
            </p>
            <h2
              className="text-display-lg text-[var(--serve-cream)] font-light fade-up delay-100"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Built for those who play
              <br />
              with intention
            </h2>
            <p
              className="mt-6 text-sm text-[var(--serve-cream)] opacity-60 max-w-xl mx-auto leading-relaxed fade-up delay-200"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              Three championship padel courts and one dedicated pickleball court,
              designed for both competitive play and relaxed social matches.
            </p>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
            {/* Left image */}
            <div className="img-hover-zoom relative aspect-[4/5] reveal-left">
              <Image
                src={asset('/assets/padel-corridor.webp')}
                alt="Two players walking through padel court corridors"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <span className="label-overline text-[var(--serve-cream)] text-xs font-bold tracking-widest">
                  Padel Courts × 3
                </span>
              </div>
            </div>

            {/* Right image */}
            <div className="img-hover-zoom relative aspect-[4/5] reveal-right">
              <Image
                src={asset('/assets/padel-player-court.webp')}
                alt="Padel player on court"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <span className="label-overline text-[var(--serve-cream)] text-xs font-bold tracking-widest">
                  Pickleball Court × 1
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center fade-up">
            <a
              href={PLAYTOMIC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury btn-luxury-light"
            >
              <span>Book a Court</span>
            </a>
          </div>
        </div>

      </section>

      {/* ─── STATEMENT SECTION ─── */}
      <section className="bg-[var(--serve-dark)] py-14 md:py-20 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex justify-center mb-10">
            <div style={{ width: '60px', height: '1px', backgroundColor: 'var(--serve-amber)' }} />
          </div>
          <h2
            className="fade-up"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(3.5rem, 9vw, 10rem)',
              fontWeight: 300,
              color: 'var(--serve-cream)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            Play hard.{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--serve-amber)' }}>Eat well.</span>
            <br />
            Stay longer.
          </h2>
          <p
            className="fade-up delay-200 label-overline mt-10"
            style={{ color: 'var(--serve-cream)', opacity: 0.4, letterSpacing: '0.3em' }}
          >
            2nd Floor, 185 Ridge Rd · Umhlanga · Open 6am – 10pm Daily
          </p>
        </div>
      </section>

      {/* ─── SECTION 3.5: HOW IT WORKS ─── */}
      <section className="bg-[var(--serve-warm)] section-padding-sm overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="label-overline text-[var(--serve-green)] opacity-70 mb-4 fade-up">
              Getting Started
            </p>
            <h2
              className="text-display-md text-[var(--serve-dark)] font-light fade-up delay-100"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              How it works
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { num: '01', title: 'Book via Playtomic', desc: 'Reserve your court online in seconds.' },
              { num: '02', title: 'Show up', desc: 'Arrive at 2nd Floor, 185 Ridge Rd, Umhlanga.' },
              { num: '03', title: 'Play', desc: 'Take to the court and give it everything.' },
              { num: '04', title: 'Eat & Stay', desc: 'Refuel with food, drinks, and good company.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="flex flex-col gap-3 fade-up">
                <span
                  className="text-display-sm text-[var(--serve-green)] font-light leading-none"
                  style={{ fontFamily: 'var(--font-cormorant)', opacity: 0.4 }}
                >
                  {num}
                </span>
                <h3
                  className="text-[var(--serve-dark)] font-medium text-sm tracking-wide uppercase"
                  style={{ fontFamily: 'var(--font-jost)', letterSpacing: '0.1em' }}
                >
                  {title}
                </h3>
                <p
                  className="text-[var(--serve-dark)] opacity-60 text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-jost)' }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: GALLERY STRIP ─── */}
      <section className="bg-[var(--serve-dark)] py-16 overflow-hidden">
        {/* Marquee strip */}
        <div className="relative w-full overflow-hidden marquee-strip">
          <div
            className="flex gap-3 marquee-track"
            style={{ animation: 'marquee 32s linear infinite', width: 'max-content' }}
          >
            {[...galleryImages, ...galleryImages].map((img, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 h-[400px] w-[280px] sm:w-[300px] overflow-hidden"
              >
                <Image
                  src={asset(img.src)}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="300px"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Caption */}
        <p className="label-overline text-white opacity-90 text-center mt-10 px-6">
          A place to be seen. A place to belong.
        </p>

      </section>

      {/* ─── SECTION 5: EAT & DRINK ─── */}
      <section
        id="eat"
        className="bg-[var(--serve-cream)] section-padding overflow-hidden"
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left: text */}
            <div className="w-full lg:w-[40%] reveal-left">
              <p className="label-overline text-[var(--serve-green)] mb-6">
                Eat &amp; Drink
              </p>

              <p
                className="text-script-md text-[var(--serve-dark)] mb-8 leading-snug"
                style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}
              >
                Linger a little longer
              </p>

              <p
                className="text-sm leading-relaxed text-[var(--serve-dark)] opacity-75 mb-10"
                style={{ fontFamily: 'var(--font-jost)', maxWidth: '38ch' }}
              >
                From your first coffee to your last drink, everything here is designed to stretch the moment.
                Wood-fired pizzas, simple, well-made dishes, and a setting that invites you to slow down without thinking twice.
                Because at SERVE, the best part isn&apos;t just the game, it&apos;s everything that comes after.
              </p>

              <Link href="/menu" className="btn-luxury btn-luxury-green">
                <span>View Menu</span>
              </Link>
            </div>

            {/* Right: images */}
            <div className="w-full lg:w-[60%] reveal-right">
              <div className="relative pb-0 sm:pb-12">
                {/* Main image */}
                <div className="img-hover-zoom relative aspect-[3/2] sm:aspect-[4/3] w-full">
                  <Image
                    src={asset('/assets/pizza-artisan.webp')}
                    alt="Artisan wood-fired pizza on wooden board"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>

                {/* Offset smaller image */}
                <div
                  className="img-hover-zoom absolute -bottom-10 -left-6 lg:-left-12 w-[48%] aspect-[3/4] border-4 border-[var(--serve-cream)] shadow-2xl hidden sm:block"
                  style={{ zIndex: 10 }}
                >
                  <Image
                    src={asset('/assets/dining-terrace.webp')}
                    alt="People dining at the outdoor terrace beside glass padel courts"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 48vw, 30vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: FAMILY ─── */}
      <section
        className="bg-[var(--serve-warm)] section-padding-sm overflow-hidden"
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="label-overline text-[var(--serve-green)] opacity-70 mb-5 fade-up">
              For the whole family
            </p>
            <h2
              className="text-display-md text-[var(--serve-dark)] font-light max-w-2xl mx-auto fade-up delay-100"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              They play. You play.
              <br />
              Everyone wins.
            </h2>
            <p
              className="mt-6 text-sm text-[var(--serve-dark)] opacity-70 max-w-lg mx-auto leading-relaxed fade-up delay-200"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              While you take on the court, the little ones have a world of their
              own. Our kids&apos; play area means the whole family can make a day of it.
            </p>
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="img-hover-zoom relative aspect-[4/3] reveal-left">
              <Image
                src={asset('/assets/kids-foosball.webp')}
                alt="Kids playing foosball indoors at SERVE"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="img-hover-zoom relative aspect-[4/3] reveal-right">
              <Image
                src={asset('/assets/kids-play-night.webp')}
                alt="Children playing outside under string lights at night"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: EVENTS CTA BANNER ─── */}
      <section className="bg-[var(--serve-green)] section-padding-sm">
        <div className="max-w-screen-md mx-auto px-6 text-center">
          <p className="label-overline text-[var(--serve-cream)] opacity-60 mb-6 fade-up in-view">
            Private Events
          </p>
          <h2
            className="text-display-lg text-[var(--serve-cream)] font-light mb-6 fade-up in-view delay-100"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Make it memorable
          </h2>
          <p
            className="text-sm text-[var(--serve-cream)] opacity-70 max-w-md mx-auto leading-relaxed mb-10 fade-up in-view delay-200"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Birthday parties, corporate days, kids&apos; celebrations. We handle the
            venue, you handle the memories.
          </p>
          <div className="fade-up in-view delay-300">
            <Link href="/events" className="btn-luxury btn-luxury-light">
              <span>Enquire About Events</span>
            </Link>
          </div>
        </div>
      </section>

    </>
  )
}
