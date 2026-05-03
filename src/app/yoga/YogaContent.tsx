'use client'

import { useEffect, useState, Suspense } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import SessionCard from '@/components/yoga/SessionCard'
import BookingModal from '@/components/yoga/BookingModal'
import { asset } from '@/lib/assetPath'
import type { Session, Booking } from '@/lib/types'

function YogaList() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [sessions, setSessions] = useState<Session[]>([])
  const [bookingCounts, setBookingCounts] = useState<Record<string, number>>({})
  const [userBookings, setUserBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSession, setActiveSession] = useState<Session | null>(null)

  useEffect(() => { fetchSessions() }, [])

  useEffect(() => {
    if (!authLoading && user) fetchUserBookings()
  }, [user, authLoading])

  useEffect(() => {
    if (!authLoading && user && sessions.length > 0) {
      const pendingId = sessionStorage.getItem('pending-book-session')
      if (pendingId) {
        sessionStorage.removeItem('pending-book-session')
        const s = sessions.find(s => s.id === pendingId)
        if (s) setActiveSession(s)
      }
    }
  }, [user, authLoading, sessions])

  async function fetchSessions() {
    const today = new Date().toISOString().slice(0, 10)
    const { data } = await supabase
      .from('sessions')
      .select('*')
      .eq('is_active', true)
      .gte('date', today)
      .order('date')
      .order('start_time')

    if (data) {
      setSessions(data)
      const ids = data.map(s => s.id)
      if (ids.length) {
        const { data: bookings } = await supabase
          .from('bookings')
          .select('session_id')
          .eq('status', 'confirmed')
          .in('session_id', ids)
        const counts: Record<string, number> = {}
        bookings?.forEach(b => { counts[b.session_id] = (counts[b.session_id] || 0) + 1 })
        setBookingCounts(counts)
      }
    }
    setLoading(false)
  }

  async function fetchUserBookings() {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', user!.id)
    setUserBookings(data || [])
  }

  function handleBook(session: Session) {
    if (!user) {
      sessionStorage.setItem('pending-book-session', session.id)
      router.push('/login?redirect=/yoga')
      return
    }
    setActiveSession(session)
  }

  function getUserStatus(sessionId: string) {
    return userBookings.find(b => b.session_id === sessionId)?.status ?? null
  }

  async function handleBookingSuccess() {
    setActiveSession(null)
    await fetchSessions()
    if (user) await fetchUserBookings()
  }

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--serve-dark)' }}>
        <div className="animate-spin" style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--serve-cream)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex items-end" style={{ height: 'calc(80vh + 80px)', minHeight: '640px', paddingTop: '80px' }}>
        <Image
          src={asset('/assets/yoga1.png')}
          alt="Yoga class on the SERVE rooftop"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.82) 100%)' }} />
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
            Breathe.
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--serve-amber)' }}>Move.</span>
            <br />
            Reset.
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
            Yoga on our open-air rooftop terrace. Small groups. Expert instruction. A space to come back to yourself.
          </p>
          <div style={{ marginTop: '2.5rem' }}>
            <a
              href="#sessions"
              className="btn-luxury btn-luxury-light"
            >
              <span>View Sessions</span>
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2" style={{ opacity: 0.4 }}>
          <div style={{ width: 1, height: 48, background: 'var(--serve-cream)' }} />
          <span className="label-overline" style={{ fontSize: '0.5rem', color: 'var(--serve-cream)', letterSpacing: '0.2em', writingMode: 'vertical-rl' }}>SCROLL</span>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section style={{ backgroundColor: 'var(--serve-dark)' }}>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[600px]">
            <Image
              src={asset('/assets/yoga2.png')}
              alt="Yoga practitioner at SERVE"
              fill
              className="object-cover object-top"
            />
          </div>

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
              A pause in the middle of everything.
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
              Set on our open-air rooftop above the courts, this is yoga with a view, and a purpose. Whether you&rsquo;re recovering from a match, working through the week, or simply carving out an hour for yourself, our sessions are designed to meet you exactly where you are.
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
              All levels. Small groups. Intentional movement.
            </p>

            {/* Pillars */}
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
        </div>
      </section>

      {/* ── SESSIONS ── */}
      <section id="sessions" style={{ backgroundColor: 'var(--serve-cream)' }} className="section-padding">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <p className="label-overline mb-3" style={{ color: 'var(--serve-green)' }}>Reserve Your Spot</p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                color: 'var(--serve-dark)',
                lineHeight: 1.1,
              }}
            >
              Upcoming Sessions
            </h2>
            <div style={{ width: '40px', height: '1px', background: 'var(--serve-amber)', marginTop: '1rem' }} />
          </div>

          {sessions.length === 0 ? (
            <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
              <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.9rem', opacity: 0.45 }}>
                No upcoming sessions scheduled. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 max-w-2xl">
              {sessions.map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  bookingCount={bookingCounts[session.id] || 0}
                  userStatus={getUserStatus(session.id)}
                  onBook={handleBook}
                />
              ))}
            </div>
          )}

          <p
            style={{
              fontFamily: 'var(--font-jost)',
              fontSize: '0.75rem',
              color: 'var(--serve-dark)',
              opacity: 0.35,
              marginTop: '3rem',
              letterSpacing: '0.05em',
            }}
          >
            Sessions are limited to small groups. Book early to secure your place.
          </p>
        </div>
      </section>

      {activeSession && user && (
        <BookingModal
          session={activeSession}
          userId={user.id}
          bookingCount={bookingCounts[activeSession.id] || 0}
          onClose={() => setActiveSession(null)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </>
  )
}

export default function YogaContent() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--serve-dark)' }}>
        <div className="animate-spin" style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--serve-cream)', borderTopColor: 'transparent' }} />
      </div>
    }>
      <YogaList />
    </Suspense>
  )
}
