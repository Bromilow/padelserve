'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${d.getDate()} ${MONTH[d.getMonth()]} ${d.getFullYear()}`
}

interface CancelModalProps {
  bookingId: string
  sessionTitle: string
  sessionDate: string
  onClose: () => void
  onSuccess: () => void
}

export default function CancelModal({ bookingId, sessionTitle, sessionDate, onClose, onSuccess }: CancelModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleConfirm() {
    setLoading(true)
    setError('')
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId)
    if (error) { setError('Unable to cancel. Please try again.'); setLoading(false); return }
    onSuccess()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(20,20,20,0.6)' }}>
      <div className="w-full max-w-md p-8" style={{ backgroundColor: 'var(--serve-cream)' }}>
        <p className="label-overline mb-6" style={{ color: 'var(--serve-sage)' }}>Cancel booking</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', fontWeight: 400, lineHeight: 1.1 }}>
          {sessionTitle}
        </h2>
        <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.75rem' }}>{formatDate(sessionDate)}</p>
        <p style={{ fontSize: '0.9rem', marginTop: '1.5rem', lineHeight: 1.7, opacity: 0.8 }}>
          Cancel your spot? It will become available to others immediately.
        </p>
        {error && <p style={{ fontSize: '0.8rem', color: '#c0392b', marginTop: '1rem' }}>{error}</p>}
        <div className="flex gap-4 mt-8">
          <button onClick={onClose} className="btn-luxury btn-luxury-dark" style={{ flex: 1, justifyContent: 'center' }}>
            <span>Keep booking</span>
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            style={{
              flex: 1,
              padding: '1rem',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              border: '1px solid #c0392b',
              color: '#c0392b',
              background: 'transparent',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading ? 'Cancelling…' : 'Cancel booking'}
          </button>
        </div>
      </div>
    </div>
  )
}
