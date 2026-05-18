'use client'

import { useEffect, useRef, useState, FormEvent } from 'react'
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
    image: '/assets/event-crowd.jpg',
    alt: 'Everyone together at SERVE',
    title: 'Birthday Parties',
    body: 'Mark the occasion on the court. We set the stage: courts, catering, atmosphere. You just show up and celebrate. Available for all ages, all styles.',
  },
  {
    image: '/assets/event-handshake.jpg',
    alt: 'Corporate event at SERVE',
    title: 'Corporate Events',
    body: 'Team-building, client entertainment, or company days. Padel is the perfect equaliser. Break the ice, build the team, and do it somewhere worth dressing for.',
  },
  {
    image: '/assets/kids-play-night.webp',
    alt: "Kids playing at SERVE",
    title: "Kids' Celebrations",
    body: "A padel party the kids will talk about for months. Supervised play, our kids\u2019 area, food they\u2019ll actually eat, and memories worth keeping.",
  },
]

const features = [
  'Exclusive venue hire options',
  'Professional event coordination',
  'Full catering from our kitchen',
  'Tailored packages for any budget',
]

interface FormState {
  name: string
  email: string
  phone: string
  enquiryType: string
  message: string
}

const enquiryTypes = [
  'Birthday Party',
  'Corporate Event',
  "Kids' Celebration",
  'Other',
]

export default function EventsContent() {
  const pageRef = useScrollReveal()

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    enquiryType: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'events-enquiry',
          ...form,
        }).toString(),
      })
      setSubmitted(true)
    } catch {
      alert('Something went wrong. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div ref={pageRef}>
      {/* ─── 1. PAGE HERO ─── */}
      <section
        className="relative flex items-center justify-center"
        style={{ height: 'calc(80vh + 80px)', minHeight: '640px', paddingTop: '80px' }}
      >
        <Image
          src={asset('/assets/event-action.jpg')}
          alt="Event day at SERVE padel courts"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="video-overlay absolute inset-0" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="label-overline text-[var(--serve-cream)] opacity-70 mb-6 fade-up in-view">Private Events</p>
          <h1
            className="text-display-lg text-[var(--serve-cream)] font-light mb-6 fade-up in-view delay-200"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Your event. Our courts.
            <br /><span style={{ fontStyle: 'italic', color: 'var(--serve-amber)' }}>Unforgettable.</span>
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
            Let&apos;s make something special.
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
              fontWeight: 300,
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
            function, our facility transforms beautifully for any occasion. Padel as the centrepiece.
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
                    loading="lazy"
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
                  fontWeight: 300,
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
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--serve-sage)',
                        marginTop: '0.55rem',
                        flexShrink: 0,
                        display: 'inline-block',
                      }}
                    />
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

      {/* ─── 6. ENQUIRY FORM ─── */}
      <section id="enquire" className="section-padding-sm px-6" style={{ backgroundColor: 'var(--serve-cream)' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 xl:gap-24 items-start">
            {/* Left: Form */}
            <div className="reveal-left">
              {submitted ? (
                <div className="flex flex-col items-start justify-center py-16" style={{ minHeight: '480px' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontStyle: 'italic',
                      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                      color: 'var(--serve-sage)',
                      marginBottom: '1rem',
                    }}
                  >
                    Thank you
                  </p>
                  <h2
                    className="text-display-sm mb-4"
                    style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--serve-green)' }}
                  >
                    Enquiry received.
                  </h2>
                  <hr className="hr-elegant w-16 mb-6" style={{ color: 'var(--serve-green)' }} />
                  <p style={{ fontFamily: 'var(--font-jost), sans-serif', fontSize: '1rem', lineHeight: 1.85, color: 'var(--serve-charcoal)', fontWeight: 300, maxWidth: '28rem' }}>
                    Our events team will be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate name="events-enquiry" data-netlify="true">
                  <input type="hidden" name="form-name" value="events-enquiry" />
                  <h2
                    className="text-display-sm mb-3"
                    style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--serve-green)' }}
                  >
                    Tell us what you&apos;re planning
                  </h2>
                  <p className="mb-10" style={{ fontFamily: 'var(--font-jost)', fontSize: '0.9rem', color: 'var(--serve-charcoal)', opacity: 0.7, lineHeight: 1.8 }}>
                    Every event starts with a conversation. Fill in your details and our team will be in touch within 24 hours.
                  </p>

                  <div className="space-y-8">
                    <div>
                      <label htmlFor="name" className="label-overline block mb-2" style={{ color: 'var(--serve-green)', opacity: 0.65 }}>Full Name</label>
                      <input id="name" name="name" type="text" required placeholder="Jane Smith" value={form.name} onChange={handleChange} className="form-field" />
                    </div>
                    <div>
                      <label htmlFor="email" className="label-overline block mb-2" style={{ color: 'var(--serve-green)', opacity: 0.65 }}>Email Address</label>
                      <input id="email" name="email" type="email" required placeholder="jane@example.com" value={form.email} onChange={handleChange} className="form-field" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="label-overline block mb-2" style={{ color: 'var(--serve-green)', opacity: 0.65 }}>Phone Number</label>
                      <input id="phone" name="phone" type="tel" placeholder="+27 60 000 0000" value={form.phone} onChange={handleChange} className="form-field" />
                    </div>
                    <div>
                      <label htmlFor="enquiryType" className="label-overline block mb-2" style={{ color: 'var(--serve-green)', opacity: 0.65 }}>Event Type</label>
                      <select
                        id="enquiryType" name="enquiryType" required value={form.enquiryType} onChange={handleChange} className="form-field"
                        style={{ cursor: 'pointer', color: form.enquiryType ? 'var(--serve-dark)' : 'rgba(28, 58, 42, 0.35)', appearance: 'none', WebkitAppearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231C3A2A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 4px center', paddingRight: '2rem' }}
                      >
                        <option value="" disabled>Select an event type</option>
                        {enquiryTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="label-overline block mb-2" style={{ color: 'var(--serve-green)', opacity: 0.65 }}>Message</label>
                      <textarea id="message" name="message" rows={5} required placeholder="Tell us about your event — date, number of guests, any special requirements..." value={form.message} onChange={handleChange} className="form-field resize-none" style={{ paddingTop: '0.875rem' }} />
                    </div>
                    <div className="pt-4">
                      <button type="submit" disabled={submitting} className="btn-luxury btn-luxury-green" style={{ opacity: submitting ? 0.65 : 1 }}>
                        <span>{submitting ? 'Sending...' : 'Send Enquiry'}</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Contact details */}
            <div className="reveal-right">
              <div className="overflow-hidden" style={{ backgroundColor: 'var(--serve-green)' }}>
                <div className="p-8 space-y-7">
                  <div>
                    <p className="label-overline mb-2" style={{ color: 'var(--serve-sage)' }}>Visit Us</p>
                    <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.15rem', fontWeight: 300, color: 'var(--serve-cream)', lineHeight: 1.6 }}>
                      2nd Floor, 185 Ridge Rd<br />Umhlanga, KwaZulu-Natal
                    </p>
                  </div>
                  <hr className="hr-elegant" style={{ color: 'var(--serve-cream)' }} />
                  <div>
                    <p className="label-overline mb-2" style={{ color: 'var(--serve-sage)' }}>Call Us</p>
                    <a href="tel:+27615451063" style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.15rem', fontWeight: 300, color: 'var(--serve-cream)', textDecoration: 'none' }}>
                      061 545 1063
                    </a>
                  </div>
                  <hr className="hr-elegant" style={{ color: 'var(--serve-cream)' }} />
                  <div>
                    <p className="label-overline mb-2" style={{ color: 'var(--serve-sage)' }}>Hours</p>
                    <p style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.15rem', fontWeight: 300, color: 'var(--serve-cream)', lineHeight: 1.6 }}>
                      Monday &ndash; Sunday<br />6:00am &ndash; 10:00pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
