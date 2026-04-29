'use client'

import type { Session } from '@/lib/types'

const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return `${DAY[d.getDay()]} ${d.getDate()} ${MONTH[d.getMonth()]}`
}

function formatTime(timeStr: string): string {
  const [h, m] = timeStr.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${displayHour}:${String(m).padStart(2, '0')}${suffix}`
}

interface SessionCardProps {
  session: Session
  bookingCount: number
  userStatus: 'confirmed' | 'cancelled' | null
  onBook: (session: Session) => void
}

export default function SessionCard({ session, bookingCount, userStatus, onBook }: SessionCardProps) {
  const isFull = bookingCount >= session.capacity
  const isBooked = userStatus === 'confirmed'
  const spotsLeft = session.capacity - bookingCount

  let label = 'Book'
  let disabled = false
  if (isBooked) { label = "You're in"; disabled = true }
  else if (isFull) { label = 'Full'; disabled = true }

  return (
    <div style={{ border: '1px solid rgba(28,58,42,0.15)', padding: '1.5rem', backgroundColor: 'white' }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label-overline mb-2" style={{ color: 'var(--serve-sage)' }}>
            {formatDate(session.date)}
          </p>
          <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', fontWeight: 400, lineHeight: 1.1 }}>
            {session.title}
          </h3>
          <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.4rem' }}>
            {formatTime(session.start_time)} · {session.duration_minutes} min · {session.instructor}
          </p>
        </div>
        <div className="flex flex-col items-end gap-3 shrink-0">
          <p style={{ fontSize: '0.75rem', opacity: isFull && !isBooked ? 1 : 0.5, color: isFull && !isBooked ? '#c0392b' : 'inherit' }}>
            {isBooked ? 'Booked' : isFull ? 'Full' : `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left`}
          </p>
          {disabled ? (
            <span style={{
              padding: '0.6rem 1.25rem',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: isBooked ? 0.6 : 0.3,
              border: '1px solid currentColor',
            }}>
              {label}
            </span>
          ) : (
            <button onClick={() => onBook(session)} className="btn-luxury btn-luxury-dark" style={{ padding: '0.6rem 1.25rem' }}>
              <span>{label}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
