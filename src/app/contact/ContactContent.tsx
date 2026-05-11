'use client'

import { useEffect, useRef, useState, FormEvent } from 'react'
import Image from 'next/image'
import { asset } from '@/lib/assetPath'

const BOOKING_URL =
  'https://app.playtomic.com/tenant/c9825c68-9da4-4cc4-a065-06ea58087f85?utm_source=app_ios&utm_campaign=share&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGngd9wn58fSDwPnOr_qB-ckJuekphFMIAt1taj2AnenpRp9ew3MykolGyULcw_aem_s3FqvC8jKTCbMpbwv-VupA'

// ─── Options ───
const INTEREST_OPTIONS = [
  'Padel Courts',
  'Pickleball Court',
  'Upper Deck / Viewing Area',
  'Kids Play Area',
  'Corporate Event',
  'Birthday Party',
  'Social Event',
  'Tournament / Americano',
  'Food & Beverage Booking',
  'Full Venue Hire',
  'Other',
]

const EVENT_TYPES = [
  'Corporate Function',
  'Birthday Party',
  'Team Building',
  'Kids Party',
  'Adult Social Event',
  'School Event',
  'Private Function',
  'Tournament',
  'Casual Court Booking',
  'Other',
]

const AGE_RANGES = [
  'Kids (Under 12)',
  'Teens (13–17)',
  'Young Adults (18–25)',
  'Adults (26–45)',
  'Mixed Ages',
  'Other',
]

const EQUIPMENT_OPTIONS = ['Racket Hire', 'Balls', 'Coaching', 'Referee / Event Host']

const CATERING_OPTIONS = [
  'Coffee & Pastries',
  'Breakfast',
  'Platters',
  'Lunch',
  'Pizza / Casual Food',
  'Snacks',
  'Kids Catering',
  'Bar Service',
  'Welcome Drinks',
  'Custom Catering Request',
]

const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Gluten Free', 'Other']

const DECOR_OPTIONS = [
  'Balloon Setup',
  'Branded Decor',
  'Kids Party Decor',
  'Floral Styling',
  'Table Styling',
  'Themed Event Decor',
  'Custom Signage',
  'Photo Area / Backdrop',
  'Other',
]

const VENUE_SETUP_STYLES = [
  'Casual Seating',
  'Reserved Tables',
  'Cocktail Style',
  'Formal Seating',
  'Kids Party Setup',
  'Presentation / Corporate Layout',
]

const EXTRAS_OPTIONS = [
  'Branding Opportunities',
  'Photographer / Videographer',
  'DJ / Music',
  'TV / Sports Screening',
  'Prize Giving Setup',
  'Sponsor Activation',
]

const BUDGET_OPTIONS = [
  'Under R5,000',
  'R5,000–R10,000',
  'R10,000–R20,000',
  'R20,000+',
  'Not Sure Yet',
]

// ─── Types ───
interface FormState {
  name: string
  mobile: string
  email: string
  preferredContact: string
  interests: string[]
  eventType: string
  estimatedGuests: string
  adultsCount: string
  childrenCount: string
  ageRanges: string[]
  eventDate: string
  startTime: string
  endTime: string
  dateFlexible: string
  padelCourts: string
  coachingGames: string
  americano: string
  equipment: string[]
  catering: string
  cateringOptions: string[]
  dietaryRequirements: string[]
  decorAssistance: string
  decorOptions: string[]
  venueSetupStyle: string
  extras: string[]
  budget: string
  additionalInfo: string
}

type ArrayFieldKey = {
  [K in keyof FormState]: FormState[K] extends string[] ? K : never
}[keyof FormState]

type StringFieldKey = {
  [K in keyof FormState]: FormState[K] extends string ? K : never
}[keyof FormState]

const initialForm: FormState = {
  name: '',
  mobile: '',
  email: '',
  preferredContact: '',
  interests: [],
  eventType: '',
  estimatedGuests: '',
  adultsCount: '',
  childrenCount: '',
  ageRanges: [],
  eventDate: '',
  startTime: '',
  endTime: '',
  dateFlexible: '',
  padelCourts: '',
  coachingGames: '',
  americano: '',
  equipment: [],
  catering: '',
  cateringOptions: [],
  dietaryRequirements: [],
  decorAssistance: '',
  decorOptions: [],
  venueSetupStyle: '',
  extras: [],
  budget: '',
  additionalInfo: '',
}

// ─── Shared styles ───
const fieldLabelStyle: React.CSSProperties = { color: 'var(--serve-green)', opacity: 0.65 }

const optionLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-jost), sans-serif',
  fontSize: '0.82rem',
  fontWeight: 300,
  color: 'var(--serve-charcoal)',
  letterSpacing: '0.02em',
  lineHeight: 1.4,
  cursor: 'pointer',
  userSelect: 'none',
}

const subTextStyle: React.CSSProperties = {
  fontFamily: 'var(--font-jost), sans-serif',
  fontSize: '0.75rem',
  fontWeight: 300,
  color: 'rgba(28,58,42,0.45)',
  letterSpacing: '0.05em',
  marginBottom: '0.75rem',
  display: 'block',
}

// ─── Sub-components ───
function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3" style={{ marginBottom: '1.25rem' }}>
      <span
        style={{
          fontFamily: 'var(--font-jost), sans-serif',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          fontWeight: 500,
          color: 'var(--serve-amber)',
          flexShrink: 0,
        }}
      >
        {number}
      </span>
      <p
        className="label-overline"
        style={{ color: 'var(--serve-green)', opacity: 0.7, whiteSpace: 'nowrap' }}
      >
        {title}
      </p>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(28,58,42,0.1)' }} />
    </div>
  )
}

function RequiredStar() {
  return <span style={{ color: 'var(--serve-amber)', marginLeft: '2px' }}>*</span>
}

function CheckboxGrid({
  options,
  selected,
  onToggle,
}: {
  options: string[]
  selected: string[]
  onToggle: (val: string) => void
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            className="serve-checkbox"
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
          />
          <span style={optionLabelStyle}>{opt}</span>
        </label>
      ))}
    </div>
  )
}

function RadioGrid({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (val: string) => void
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="radio"
            className="serve-radio"
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          <span style={optionLabelStyle}>{opt}</span>
        </label>
      ))}
    </div>
  )
}

function RadioInline({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (val: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="radio"
            className="serve-radio"
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          <span style={optionLabelStyle}>{opt}</span>
        </label>
      ))}
    </div>
  )
}

// ─── Scroll reveal ───
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

// ─── Main component ───
export default function ContactContent() {
  const pageRef = useScrollReveal()
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleRadio = (field: StringFieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckbox = (field: ArrayFieldKey, value: string) => {
    setForm((prev) => {
      const arr = prev[field] as string[]
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload: Record<string, string> = {
        'form-name': 'booking-enquiry',
        name: form.name,
        mobile: form.mobile,
        email: form.email,
        preferredContact: form.preferredContact,
        interests: form.interests.join(', '),
        eventType: form.eventType,
        estimatedGuests: form.estimatedGuests,
        adultsCount: form.adultsCount,
        childrenCount: form.childrenCount,
        ageRanges: form.ageRanges.join(', '),
        eventDate: form.eventDate,
        startTime: form.startTime,
        endTime: form.endTime,
        dateFlexible: form.dateFlexible,
        padelCourts: form.padelCourts,
        coachingGames: form.coachingGames,
        americano: form.americano,
        equipment: form.equipment.join(', '),
        catering: form.catering,
        cateringOptions: form.cateringOptions.join(', '),
        dietaryRequirements: form.dietaryRequirements.join(', '),
        decorAssistance: form.decorAssistance,
        decorOptions: form.decorOptions.join(', '),
        venueSetupStyle: form.venueSetupStyle,
        extras: form.extras.join(', '),
        budget: form.budget,
        additionalInfo: form.additionalInfo,
      }
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
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
          <p className="label-overline text-[var(--serve-cream)] opacity-70 mb-6 fade-up in-view">
            Get in touch
          </p>
          <h1
            className="text-display-lg text-[var(--serve-cream)] font-light mb-6 fade-up in-view delay-200"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            We&apos;d love to{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--serve-amber)' }}>hear from you.</span>
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
            Say hello.
          </p>
        </div>
      </section>

      {/* ─── CONTACT SPLIT ─── */}
      <section className="section-padding-sm px-6" style={{ backgroundColor: 'var(--serve-cream)' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 xl:gap-24 items-start">

            {/* LEFT: Form */}
            <div className="reveal-left">
              {submitted ? (
                <div
                  className="flex flex-col items-start justify-center py-16"
                  style={{ minHeight: '480px' }}
                >
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
                    We&apos;ll review your enquiry and be in touch shortly. Thank you.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  name="booking-enquiry"
                  data-netlify="true"
                >
                  <input type="hidden" name="form-name" value="booking-enquiry" />

                  {/* Form heading */}
                  <div style={{ marginBottom: '2.5rem' }}>
                    <h2
                      className="text-display-sm mb-2"
                      style={{ fontFamily: 'var(--font-cormorant), serif', fontWeight: 300, color: 'var(--serve-green)' }}
                    >
                      Booking Enquiry
                    </h2>
                    <p
                      style={{
                        fontFamily: 'var(--font-jost), sans-serif',
                        fontSize: '0.8rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontWeight: 300,
                        color: 'rgba(28,58,42,0.5)',
                      }}
                    >
                      For Serve Padel &amp; Play
                    </p>
                  </div>

                  <div className="space-y-10">

                    {/* ── 1. Contact Details ── */}
                    <div className="space-y-6">
                      <SectionHeader number="01" title="Contact Details" />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="label-overline block mb-2" style={fieldLabelStyle}>
                            Full Name <RequiredStar />
                          </label>
                          <input
                            id="name" name="name" type="text" required
                            placeholder="Jane Smith"
                            value={form.name} onChange={handleText}
                            className="form-field"
                          />
                        </div>
                        <div>
                          <label htmlFor="mobile" className="label-overline block mb-2" style={fieldLabelStyle}>
                            Mobile Number <RequiredStar />
                          </label>
                          <input
                            id="mobile" name="mobile" type="tel" required
                            placeholder="+27 82 000 0000"
                            value={form.mobile} onChange={handleText}
                            className="form-field"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="label-overline block mb-2" style={fieldLabelStyle}>
                          Email Address <RequiredStar />
                        </label>
                        <input
                          id="email" name="email" type="email" required
                          placeholder="jane@example.com"
                          value={form.email} onChange={handleText}
                          className="form-field"
                        />
                      </div>

                      <div>
                        <p className="label-overline mb-3" style={fieldLabelStyle}>
                          Preferred Contact Method
                        </p>
                        <RadioInline
                          options={['WhatsApp', 'Call', 'Email']}
                          value={form.preferredContact}
                          onChange={(v) => handleRadio('preferredContact', v)}
                        />
                      </div>
                    </div>

                    <hr className="hr-elegant" style={{ opacity: 0.3 }} />

                    {/* ── 2. Interests ── */}
                    <div className="space-y-4">
                      <SectionHeader number="02" title="What Are You Interested In?" />
                      <span style={subTextStyle}>Select all that apply</span>
                      <CheckboxGrid
                        options={INTEREST_OPTIONS}
                        selected={form.interests}
                        onToggle={(v) => handleCheckbox('interests', v)}
                      />
                    </div>

                    <hr className="hr-elegant" style={{ opacity: 0.3 }} />

                    {/* ── 3. Event Type ── */}
                    <div className="space-y-4">
                      <SectionHeader number="03" title="Event Type" />
                      <RadioGrid
                        options={EVENT_TYPES}
                        value={form.eventType}
                        onChange={(v) => handleRadio('eventType', v)}
                      />
                    </div>

                    <hr className="hr-elegant" style={{ opacity: 0.3 }} />

                    {/* ── 4. Guest Information ── */}
                    <div className="space-y-6">
                      <SectionHeader number="04" title="Guest Information" />

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                          <label htmlFor="estimatedGuests" className="label-overline block mb-2" style={fieldLabelStyle}>
                            Total Guests
                          </label>
                          <input
                            id="estimatedGuests" name="estimatedGuests" type="number" min="1"
                            placeholder="0"
                            value={form.estimatedGuests} onChange={handleText}
                            className="form-field"
                          />
                        </div>
                        <div>
                          <label htmlFor="adultsCount" className="label-overline block mb-2" style={fieldLabelStyle}>
                            Adults
                          </label>
                          <input
                            id="adultsCount" name="adultsCount" type="number" min="0"
                            placeholder="0"
                            value={form.adultsCount} onChange={handleText}
                            className="form-field"
                          />
                        </div>
                        <div>
                          <label htmlFor="childrenCount" className="label-overline block mb-2" style={fieldLabelStyle}>
                            Children
                          </label>
                          <input
                            id="childrenCount" name="childrenCount" type="number" min="0"
                            placeholder="0"
                            value={form.childrenCount} onChange={handleText}
                            className="form-field"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="label-overline mb-3" style={fieldLabelStyle}>
                          Age Range
                        </p>
                        <CheckboxGrid
                          options={AGE_RANGES}
                          selected={form.ageRanges}
                          onToggle={(v) => handleCheckbox('ageRanges', v)}
                        />
                      </div>
                    </div>

                    <hr className="hr-elegant" style={{ opacity: 0.3 }} />

                    {/* ── 5. Date & Time ── */}
                    <div className="space-y-6">
                      <SectionHeader number="05" title="Date & Time" />

                      <div>
                        <label htmlFor="eventDate" className="label-overline block mb-2" style={fieldLabelStyle}>
                          Preferred Event Date
                        </label>
                        <input
                          id="eventDate" name="eventDate" type="date"
                          value={form.eventDate} onChange={handleText}
                          className="form-field"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="startTime" className="label-overline block mb-2" style={fieldLabelStyle}>
                            Preferred Start Time
                          </label>
                          <input
                            id="startTime" name="startTime" type="time"
                            value={form.startTime} onChange={handleText}
                            className="form-field"
                          />
                        </div>
                        <div>
                          <label htmlFor="endTime" className="label-overline block mb-2" style={fieldLabelStyle}>
                            Preferred End Time
                          </label>
                          <input
                            id="endTime" name="endTime" type="time"
                            value={form.endTime} onChange={handleText}
                            className="form-field"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="label-overline mb-3" style={fieldLabelStyle}>
                          Is Your Date Flexible?
                        </p>
                        <RadioInline
                          options={['Yes', 'No']}
                          value={form.dateFlexible}
                          onChange={(v) => handleRadio('dateFlexible', v)}
                        />
                      </div>
                    </div>

                    <hr className="hr-elegant" style={{ opacity: 0.3 }} />

                    {/* ── 6. Court & Activity Requirements ── */}
                    <div className="space-y-6">
                      <SectionHeader number="06" title="Court & Activity Requirements" />

                      <div>
                        <label htmlFor="padelCourts" className="label-overline block mb-2" style={fieldLabelStyle}>
                          How Many Padel Courts Would You Like?
                        </label>
                        <input
                          id="padelCourts" name="padelCourts" type="number" min="1" max="8"
                          placeholder="e.g. 2"
                          value={form.padelCourts} onChange={handleText}
                          className="form-field"
                          style={{ maxWidth: '10rem' }}
                        />
                      </div>

                      <div>
                        <p className="label-overline mb-3" style={fieldLabelStyle}>
                          Would You Like Coaching or Organised Games?
                        </p>
                        <RadioInline
                          options={['Yes', 'No']}
                          value={form.coachingGames}
                          onChange={(v) => handleRadio('coachingGames', v)}
                        />
                      </div>

                      <div>
                        <p className="label-overline mb-3" style={fieldLabelStyle}>
                          Would You Like an Americano / Mexicano Format Organised?
                        </p>
                        <RadioInline
                          options={['Yes', 'No']}
                          value={form.americano}
                          onChange={(v) => handleRadio('americano', v)}
                        />
                      </div>

                      <div>
                        <p className="label-overline mb-3" style={fieldLabelStyle}>
                          Equipment Required
                        </p>
                        <CheckboxGrid
                          options={EQUIPMENT_OPTIONS}
                          selected={form.equipment}
                          onToggle={(v) => handleCheckbox('equipment', v)}
                        />
                      </div>
                    </div>

                    <hr className="hr-elegant" style={{ opacity: 0.3 }} />

                    {/* ── 7. Food & Beverage ── */}
                    <div className="space-y-6">
                      <SectionHeader number="07" title="Food & Beverage" />

                      <div>
                        <p className="label-overline mb-3" style={fieldLabelStyle}>
                          Are You Interested in Catering?
                        </p>
                        <RadioInline
                          options={['Yes', 'No']}
                          value={form.catering}
                          onChange={(v) => handleRadio('catering', v)}
                        />
                      </div>

                      {form.catering === 'Yes' && (
                        <>
                          <div>
                            <p className="label-overline mb-3" style={fieldLabelStyle}>
                              Catering Options
                            </p>
                            <CheckboxGrid
                              options={CATERING_OPTIONS}
                              selected={form.cateringOptions}
                              onToggle={(v) => handleCheckbox('cateringOptions', v)}
                            />
                          </div>

                          <div>
                            <p className="label-overline mb-3" style={fieldLabelStyle}>
                              Dietary Requirements
                            </p>
                            <CheckboxGrid
                              options={DIETARY_OPTIONS}
                              selected={form.dietaryRequirements}
                              onToggle={(v) => handleCheckbox('dietaryRequirements', v)}
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <hr className="hr-elegant" style={{ opacity: 0.3 }} />

                    {/* ── 8. Decor & Setup ── */}
                    <div className="space-y-6">
                      <SectionHeader number="08" title="Decor & Setup Requirements" />

                      <div>
                        <p className="label-overline mb-3" style={fieldLabelStyle}>
                          Do You Require Any Decor or Styling Assistance?
                        </p>
                        <RadioInline
                          options={['Yes', 'No']}
                          value={form.decorAssistance}
                          onChange={(v) => handleRadio('decorAssistance', v)}
                        />
                      </div>

                      {form.decorAssistance === 'Yes' && (
                        <div>
                          <p className="label-overline mb-3" style={fieldLabelStyle}>
                            Decor Options
                          </p>
                          <CheckboxGrid
                            options={DECOR_OPTIONS}
                            selected={form.decorOptions}
                            onToggle={(v) => handleCheckbox('decorOptions', v)}
                          />
                        </div>
                      )}

                      <div>
                        <p className="label-overline mb-3" style={fieldLabelStyle}>
                          Venue Setup Style
                        </p>
                        <RadioGrid
                          options={VENUE_SETUP_STYLES}
                          value={form.venueSetupStyle}
                          onChange={(v) => handleRadio('venueSetupStyle', v)}
                        />
                      </div>
                    </div>

                    <hr className="hr-elegant" style={{ opacity: 0.3 }} />

                    {/* ── 9. Extras ── */}
                    <div className="space-y-4">
                      <SectionHeader number="09" title="Extras" />
                      <CheckboxGrid
                        options={EXTRAS_OPTIONS}
                        selected={form.extras}
                        onToggle={(v) => handleCheckbox('extras', v)}
                      />
                    </div>

                    <hr className="hr-elegant" style={{ opacity: 0.3 }} />

                    {/* ── 10. Budget Guidance ── */}
                    <div className="space-y-4">
                      <SectionHeader number="10" title="Budget Guidance" />
                      <span style={subTextStyle}>Optional — but helpful for us to tailor our proposal</span>
                      <RadioGrid
                        options={BUDGET_OPTIONS}
                        value={form.budget}
                        onChange={(v) => handleRadio('budget', v)}
                      />
                    </div>

                    <hr className="hr-elegant" style={{ opacity: 0.3 }} />

                    {/* ── 11. Additional Information ── */}
                    <div className="space-y-4">
                      <SectionHeader number="11" title="Additional Information" />
                      <span style={subTextStyle}>Anything else you&apos;d like us to know?</span>
                      <textarea
                        id="additionalInfo" name="additionalInfo"
                        rows={5}
                        placeholder="Tell us more about your vision, special requests, or any other details..."
                        value={form.additionalInfo} onChange={handleText}
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

            {/* RIGHT: Contact info + map (sticky) */}
            <div className="reveal-right lg:sticky lg:top-8 lg:self-start">
              <div className="mb-8 overflow-hidden" style={{ backgroundColor: 'var(--serve-green)' }}>
                <div className="p-8 space-y-7">

                  <div>
                    <p className="label-overline mb-2" style={{ color: 'var(--serve-sage)' }}>
                      Visit Us
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontSize: '1.15rem',
                        fontWeight: 300,
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

                  <div>
                    <p className="label-overline mb-2" style={{ color: 'var(--serve-sage)' }}>
                      Call Us
                    </p>
                    <a
                      href="tel:+27615451063"
                      style={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontSize: '1.15rem',
                        fontWeight: 300,
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

                  <div>
                    <p className="label-overline mb-2" style={{ color: 'var(--serve-sage)' }}>
                      Hours
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontSize: '1.15rem',
                        fontWeight: 300,
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

                  <div>
                    <p className="label-overline mb-2" style={{ color: 'var(--serve-sage)' }}>
                      Book Online
                    </p>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-jost), sans-serif',
                        fontSize: '0.85rem',
                        fontWeight: 300,
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

              <div className="overflow-hidden" style={{ border: '1px solid rgba(28,58,42,0.12)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.5!2d31.071!3d-29.726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s185+Ridge+Rd%2C+Umhlanga!5e0!3m2!1sen!2sza!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SERVE Padel & Play location, 185 Ridge Rd, Umhlanga"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
