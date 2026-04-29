'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import SessionCard from '@/components/yoga/SessionCard'
import BookingModal from '@/components/yoga/BookingModal'
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

  // Auto-open modal for sessions stored in sessionStorage before login redirect
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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--serve-cream)' }}>
        <div className="animate-spin" style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--serve-green)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  return (
    <>
      <div className="section-padding pt-28" style={{ backgroundColor: 'var(--serve-cream)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <p className="label-overline mb-6" style={{ color: 'var(--serve-sage)' }}>Move with us</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 300, lineHeight: 1.0 }}>
            Yoga Sessions
          </h1>
          <p style={{ fontSize: '0.9rem', marginTop: '1.5rem', maxWidth: '36rem', lineHeight: 1.8, opacity: 0.7 }}>
            Book your spot in one of our upcoming sessions. All levels welcome.
          </p>
          <div className="grid gap-4 mt-16 max-w-2xl">
            {sessions.length === 0 ? (
              <p style={{ fontSize: '0.9rem', opacity: 0.5 }}>No upcoming sessions. Check back soon.</p>
            ) : sessions.map(session => (
              <SessionCard
                key={session.id}
                session={session}
                bookingCount={bookingCounts[session.id] || 0}
                userStatus={getUserStatus(session.id)}
                onBook={handleBook}
              />
            ))}
          </div>
        </div>
      </div>

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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--serve-cream)' }}>
        <div className="animate-spin" style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--serve-green)', borderTopColor: 'transparent' }} />
      </div>
    }>
      <YogaList />
    </Suspense>
  )
}
