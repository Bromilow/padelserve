'use client'

import { useEffect, useRef, useState, FormEvent } from 'react'
import Image from 'next/image'
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
      { threshold: 0.1 }
    )

    animatableEls.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return sectionRef
}

interface FormState {
  name: string
  email: string
  phone: string
  enquiryType: string
  message: string
}

const enquiryTypes = [
  'General Enquiry',
  'Book a Court',
  'Private Events',
  'Corporate Enquiry',
  'Other',
]

export default function ContactContent() {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    // Simulate async submission with a brief delay for UX feel
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 900)
  }

  return (
    <div ref={pageRef}>
      {/* ─── 1. PAGE HEADER ─── */}
      <section
        className="relative flex items-end pb-12 md:pb-16"
        style={{
          backgroundColor: 'var(--serve-green)',
          paddingTop: 'calc(80px + 2.5rem)',
          minHeight: '38vh',
        }}
      >
        {/* Subtle botanical mural watermark */}
        <Image
          src={asset('/assets/botanical-mural.webp')}
          alt=""
          fill
          className="object-cover object-center opacity-10"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 w-full">
          <p
            className="label-overline mb-5 fade-up in-view"
            style={{ color: 'rgba(245, 240, 232, 0.65)' }}
          >
            Get in touch
          </p>
          <p
            className="fade-up in-view delay-200"
            style={{
              fontFamily: 'var(--font-great-vibes), cursive',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              color: 'var(--serve-sage)',
              marginBottom: '0.5rem',
            }}
          >
            Say hello
          </p>
          <h1
            className="text-display-md fade-up in-view delay-300"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontWeight: 400,
              color: 'var(--serve-cream)',
              fontStyle: 'italic',
            }}
          >
            We&apos;d love to hear from you
          </h1>
        </div>
      </section>

      {/* ─── 2. CONTACT SPLIT ─── */}
      <section className="section-padding-sm px-6" style={{ backgroundColor: 'var(--serve-cream)' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 xl:gap-24 items-start">

            {/* LEFT: Form */}
            <div className="reveal-left">
              {submitted ? (
                /* Success state */
                <div
                  className="flex flex-col items-start justify-center py-16"
                  style={{ minHeight: '480px' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-great-vibes), cursive',
                      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                      color: 'var(--serve-sage)',
                      marginBottom: '1rem',
                    }}
                  >
                    Thank you
                  </p>
                  <h2
                    className="text-display-sm mb-4"
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontWeight: 400,
                      color: 'var(--serve-green)',
                    }}
                  >
                    Message received.
                  </h2>
                  <hr className="hr-elegant w-16 mb-6" style={{ color: 'var(--serve-green)' }} />
                  <p
                    style={{
                      fontFamily: 'var(--font-jost), sans-serif',
                      fontSize: '1rem',
                      lineHeight: 1.85,
                      color: 'var(--serve-charcoal)',
                      fontWeight: 300,
                      maxWidth: '28rem',
                    }}
                  >
                    We&apos;ll be in touch shortly &mdash; thank you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2
                    className="text-display-sm mb-10"
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontWeight: 400,
                      color: 'var(--serve-green)',
                    }}
                  >
                    Send us a message
                  </h2>

                  <div className="space-y-8">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="label-overline block mb-2"
                        style={{ color: 'var(--serve-green)', opacity: 0.65 }}
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={handleChange}
                        className="form-field"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="label-overline block mb-2"
                        style={{ color: 'var(--serve-green)', opacity: 0.65 }}
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="jane@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className="form-field"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="label-overline block mb-2"
                        style={{ color: 'var(--serve-green)', opacity: 0.65 }}
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+27 60 000 0000"
                        value={form.phone}
                        onChange={handleChange}
                        className="form-field"
                      />
                    </div>

                    {/* Enquiry Type */}
                    <div>
                      <label
                        htmlFor="enquiryType"
                        className="label-overline block mb-2"
                        style={{ color: 'var(--serve-green)', opacity: 0.65 }}
                      >
                        Enquiry Type
                      </label>
                      <select
                        id="enquiryType"
                        name="enquiryType"
                        required
                        value={form.enquiryType}
                        onChange={handleChange}
                        className="form-field"
                        style={{
                          cursor: 'pointer',
                          color: form.enquiryType ? 'var(--serve-dark)' : 'rgba(28, 58, 42, 0.35)',
                          appearance: 'none',
                          WebkitAppearance: 'none',
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231C3A2A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 4px center',
                          paddingRight: '2rem',
                        }}
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        {enquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="label-overline block mb-2"
                        style={{ color: 'var(--serve-green)', opacity: 0.65 }}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        placeholder="Tell us a bit more about what you're looking for..."
                        value={form.message}
                        onChange={handleChange}
                        className="form-field resize-none"
                        style={{ paddingTop: '0.875rem' }}
                      />
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-luxury btn-luxury-green"
                        style={{ opacity: submitting ? 0.65 : 1 }}
                      >
                        <span>{submitting ? 'Sending...' : 'Send Enquiry'}</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* RIGHT: Contact info + map */}
            <div className="reveal-right">
              {/* Info card */}
              <div
                className="mb-8 overflow-hidden"
                style={{ backgroundColor: 'var(--serve-green)' }}
              >
                {/* Decorative serve-sign image */}
                <div className="relative" style={{ height: '200px' }}>
                  <Image
                    src={asset('/assets/serve-sign-hedge.webp')}
                    alt="SERVE padel sign on hedge wall"
                    fill
                    className="object-cover object-center"
                    sizes="420px"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'rgba(28, 58, 42, 0.45)' }}
                  />
                </div>

                {/* Details */}
                <div className="p-8 space-y-7">
                  {/* Visit Us */}
                  <div>
                    <p
                      className="label-overline mb-2"
                      style={{ color: 'var(--serve-sage)' }}
                    >
                      Visit Us
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontSize: '1.15rem',
                        fontWeight: 400,
                        color: 'var(--serve-cream)',
                        lineHeight: 1.6,
                      }}
                    >
                      2nd Floor, 185 Ridge Rd
                      <br />
                      Umhlanga, KwaZulu-Natal
                    </p>
                  </div>

                  <hr className="hr-elegant" style={{ color: 'var(--serve-cream)' }} />

                  {/* Call Us */}
                  <div>
                    <p
                      className="label-overline mb-2"
                      style={{ color: 'var(--serve-sage)' }}
                    >
                      Call Us
                    </p>
                    <a
                      href="tel:+27615451063"
                      style={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontSize: '1.15rem',
                        fontWeight: 400,
                        color: 'var(--serve-cream)',
                        textDecoration: 'none',
                        transition: 'opacity 0.3s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      061 545 1063
                    </a>
                  </div>

                  <hr className="hr-elegant" style={{ color: 'var(--serve-cream)' }} />

                  {/* Hours */}
                  <div>
                    <p
                      className="label-overline mb-2"
                      style={{ color: 'var(--serve-sage)' }}
                    >
                      Hours
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontSize: '1.15rem',
                        fontWeight: 400,
                        color: 'var(--serve-cream)',
                        lineHeight: 1.6,
                      }}
                    >
                      Monday &ndash; Sunday
                      <br />
                      6:00am &ndash; 10:00pm
                    </p>
                  </div>

                  <hr className="hr-elegant" style={{ color: 'var(--serve-cream)' }} />

                  {/* Book Online */}
                  <div>
                    <p
                      className="label-overline mb-2"
                      style={{ color: 'var(--serve-sage)' }}
                    >
                      Book Online
                    </p>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-jost), sans-serif',
                        fontSize: '0.85rem',
                        fontWeight: 400,
                        color: 'var(--serve-cream)',
                        textDecoration: 'none',
                        letterSpacing: '0.04em',
                        opacity: 0.8,
                        transition: 'opacity 0.3s ease',
                        display: 'inline-block',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
                    >
                      Book via Playtomic &uarr;&#x2197;
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Maps embed */}
              <div className="overflow-hidden" style={{ border: '1px solid rgba(28,58,42,0.12)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.5!2d31.071!3d-29.726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s185+Ridge+Rd%2C+Umhlanga!5e0!3m2!1sen!2sza!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SERVE Padel & Play location — 185 Ridge Rd, Umhlanga"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. BOTTOM STRIP ─── */}
      <section
        className="py-6 px-6"
        style={{ backgroundColor: 'var(--serve-dark)' }}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p
            style={{
              fontFamily: 'var(--font-jost), sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              color: 'rgba(245, 240, 232, 0.5)',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            SERVE Padel &amp; Play &middot; 2nd Floor, 185 Ridge Rd, Umhlanga &middot; 061 545 1063
          </p>
          <p
            style={{
              fontFamily: 'var(--font-jost), sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              color: 'rgba(245, 240, 232, 0.4)',
              textTransform: 'uppercase',
              flexShrink: 0,
            }}
          >
            @servepadel
          </p>
        </div>
      </section>
    </div>
  )
}
