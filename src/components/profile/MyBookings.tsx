'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import CancelModal from '@/components/yoga/CancelModal'
import type { BookingWithSession } from '@/lib/types'

const MONTH = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAY = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${DAY[d.getDay()]}, ${d.getDate()} ${MONTH[d.getMonth()]}`
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(':').map(Number)
  return `${h > 12 ? h - 12 : h || 12}:${String(m).padStart(2, '0')}${h >= 12 ? 'pm' : 'am'}`
}

export default function MyBookings({ userId }: { userId: string }) {
  const [bookings, setBookings] = useState<BookingWithSession[]>([])
  const [loading, setLoading] = useState(true)
  const [cancelTarget, setCancelTarget] = useState<BookingWithSession | null>(null)
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => { fetchBookings() }, [userId])

  async function fetchBookings() {
    const { data } = await supabase
      .from('bookings')
      .select('*, sessions(*)')
      .eq('user_id', userId)
      .eq('status', 'confirmed')
    setBookings((data as BookingWithSession[]) || [])
    setLoading(false)
  }

  const upcoming = bookings
    .filter(b => b.sessions.date >= today)
    .sort((a, b) => a.sessions.date.localeCompare(b.sessions.date) || a.sessions.start_time.localeCompare(b.sessions.start_time))
  const past = bookings
    .filter(b => b.sessions.date < today)
    .sort((a, b) => b.sessions.date.localeCompare(a.sessions.date))

  if (loading) return <div style={{ opacity: 0.4, fontSize: '0.9rem', paddingTop: '1rem' }}>Loading...</div>

  return (
    <>
      <div className="max-w-2xl">

        {upcoming.length === 0 && past.length === 0 && (
          <div style={{ paddingTop: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.4rem', fontWeight: 300, opacity: 0.5, marginBottom: '0.75rem' }}>
              No bookings yet.
            </p>
            <p style={{ fontSize: '0.85rem', opacity: 0.45, marginBottom: '1.5rem', lineHeight: 1.7 }}>
              Browse our upcoming yoga sessions and reserve your spot.
            </p>
            <a href="/yoga" className="btn-luxury btn-luxury-dark" style={{ display: 'inline-flex' }}>
              <span>Browse Sessions</span>
            </a>
          </div>
        )}

        {upcoming.length > 0 && (
          <div>
            <p className="label-overline mb-6" style={{ color: 'var(--serve-green)', letterSpacing: '0.2em' }}>Upcoming</p>
            <div className="flex flex-col gap-3">
              {upcoming.map(booking => (
                <div
                  key={booking.id}
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid rgba(28,58,42,0.15)',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--serve-dark)', marginBottom: '0.3rem' }}>
                      {booking.sessions.title}
                    </p>
                    <p style={{ fontSize: '0.78rem', opacity: 0.5, letterSpacing: '0.03em' }}>
                      {formatDate(booking.sessions.date)} &nbsp;·&nbsp; {formatTime(booking.sessions.start_time)}
                    </p>
                    {booking.sessions.instructor && (
                      <p style={{ fontSize: '0.72rem', opacity: 0.4, marginTop: '0.2rem', letterSpacing: '0.03em' }}>
                        with {booking.sessions.instructor}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setCancelTarget(booking)}
                    style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.3, textDecoration: 'underline', flexShrink: 0 }}
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {past.length > 0 && (
          <div style={{ marginTop: upcoming.length > 0 ? '3rem' : 0 }}>
            <p className="label-overline mb-6" style={{ color: 'rgba(20,20,20,0.25)', letterSpacing: '0.2em' }}>Past</p>
            <div className="flex flex-col gap-3">
              {past.map(booking => (
                <div
                  key={booking.id}
                  style={{
                    borderBottom: '1px solid rgba(20,20,20,0.08)',
                    padding: '1.25rem 0',
                    opacity: 0.4,
                  }}
                >
                  <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--serve-dark)', marginBottom: '0.3rem' }}>
                    {booking.sessions.title}
                  </p>
                  <p style={{ fontSize: '0.78rem', opacity: 0.6, letterSpacing: '0.03em' }}>
                    {formatDate(booking.sessions.date)} &nbsp;·&nbsp; {formatTime(booking.sessions.start_time)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {cancelTarget && (
        <CancelModal
          bookingId={cancelTarget.id}
          sessionTitle={cancelTarget.sessions.title}
          sessionDate={cancelTarget.sessions.date}
          onClose={() => setCancelTarget(null)}
          onSuccess={() => { setCancelTarget(null); fetchBookings() }}
        />
      )}
    </>
  )
}
