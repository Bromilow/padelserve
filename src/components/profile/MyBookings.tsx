'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import CancelModal from '@/components/yoga/CancelModal'
import type { BookingWithSession } from '@/lib/types'

const MONTH = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${d.getDate()} ${MONTH[d.getMonth()]} ${d.getFullYear()}`
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

  if (loading) return <div style={{ opacity: 0.5, fontSize: '0.9rem' }}>Loading…</div>

  return (
    <>
      <div className="max-w-2xl">
        {upcoming.length === 0 && past.length === 0 && (
          <p style={{ fontSize: '0.9rem', opacity: 0.5 }}>
            No bookings yet.{' '}
            <a href="/yoga" style={{ textDecoration: 'underline' }}>Browse sessions →</a>
          </p>
        )}

        {upcoming.length > 0 && (
          <div>
            <p className="label-overline mb-6" style={{ color: 'var(--serve-sage)' }}>Upcoming</p>
            <div className="flex flex-col gap-3">
              {upcoming.map(booking => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-5"
                  style={{ border: '1px solid rgba(28,58,42,0.15)', backgroundColor: 'white' }}
                >
                  <div>
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.25rem', fontWeight: 400 }}>
                      {booking.sessions.title}
                    </p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.25rem' }}>
                      {formatDate(booking.sessions.date)} · {formatTime(booking.sessions.start_time)}
                    </p>
                  </div>
                  <button
                    onClick={() => setCancelTarget(booking)}
                    style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.45, textDecoration: 'underline' }}
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {past.length > 0 && (
          <div className="mt-12">
            <p className="label-overline mb-6" style={{ color: 'rgba(20,20,20,0.3)' }}>Past</p>
            <div className="flex flex-col gap-3">
              {past.map(booking => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-5"
                  style={{ border: '1px solid rgba(28,58,42,0.08)', opacity: 0.5 }}
                >
                  <div>
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.25rem', fontWeight: 400 }}>
                      {booking.sessions.title}
                    </p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.25rem' }}>
                      {formatDate(booking.sessions.date)} · {formatTime(booking.sessions.start_time)}
                    </p>
                  </div>
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
