'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Session } from '@/lib/types'

const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${d.getDate()} ${MONTH[d.getMonth()]} ${d.getFullYear()}`
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(':').map(Number)
  return `${h > 12 ? h - 12 : h || 12}:${String(m).padStart(2, '0')}${h >= 12 ? 'pm' : 'am'}`
}

interface BookingModalProps {
  session: Session
  userId: string
  bookingCount: number
  onClose: () => void
  onSuccess: () => void
}

export default function BookingModal({ session, userId, bookingCount, onClose, onSuccess }: BookingModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const spotsLeft = Math.max(0, session.capacity - bookingCount)

  async function handleConfirm() {
    setLoading(true)
    setError('')

    // Check for an existing cancelled booking to re-confirm
    const { data: existing } = await supabase
      .from('bookings')
      .select('id, status')
      .eq('user_id', userId)
      .eq('session_id', session.id)
      .maybeSingle()

    if (existing?.status === 'cancelled') {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'confirmed' })
        .eq('id', existing.id)
      if (error) { setError('Unable to complete booking. Please try again.'); setLoading(false); return }
    } else if (!existing) {
      const { error } = await supabase
        .from('bookings')
        .insert({ user_id: userId, session_id: session.id, status: 'confirmed' })
      if (error) {
        setError(error.code === '23505' ? 'Session is now full — please try another.' : 'Unable to complete booking. Please try again.')
        setLoading(false)
        return
      }
    }

    onSuccess()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(20,20,20,0.6)' }}>
      <div className="w-full max-w-md p-8" style={{ backgroundColor: 'var(--serve-cream)' }}>
        <p className="label-overline mb-6" style={{ color: 'var(--serve-sage)' }}>Confirm booking</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', fontWeight: 400, lineHeight: 1.1 }}>
          {session.title}
        </h2>
        <div className="mt-4 flex flex-col gap-1" style={{ fontSize: '0.85rem', opacity: 0.7 }}>
          <p>{formatDate(session.date)}</p>
          <p>{formatTime(session.start_time)} · {session.duration_minutes} min</p>
          <p>with {session.instructor}</p>
          <p style={{ marginTop: '0.5rem' }}>{spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} remaining</p>
        </div>
        {error && <p style={{ fontSize: '0.8rem', color: '#c0392b', marginTop: '1rem' }}>{error}</p>}
        <div className="flex gap-4 mt-8">
          <button onClick={onClose} className="btn-luxury btn-luxury-dark" style={{ flex: 1, justifyContent: 'center' }}>
            <span>Cancel</span>
          </button>
          <button onClick={handleConfirm} disabled={loading} className="btn-luxury btn-luxury-green" style={{ flex: 1, justifyContent: 'center' }}>
            <span>{loading ? 'Booking…' : 'Confirm'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
