'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Session } from '@/lib/types'

interface SessionFill extends Session { booking_count: number }

const DAY = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTH = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
function fmt(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${DAY[d.getDay()]} ${d.getDate()} ${MONTH[d.getMonth()]}`
}

export default function StatsTab() {
  const [totalBookings, setTotalBookings] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [sessionsThisWeek, setSessionsThisWeek] = useState(0)
  const [avgFillRate, setAvgFillRate] = useState(0)
  const [upcoming, setUpcoming] = useState<SessionFill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchStats() }, [])

  async function fetchStats() {
    const today = new Date().toISOString().slice(0, 10)
    const weekEnd = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10)

    const [bkRes, usersRes, weekRes, upcomingRes, pastRes] = await Promise.all([
      supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'confirmed'),
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('sessions').select('*', { count: 'exact', head: true }).eq('is_active', true).gte('date', today).lte('date', weekEnd),
      supabase.from('sessions').select('*').eq('is_active', true).gte('date', today).order('date').order('start_time'),
      supabase.from('sessions').select('id, capacity').eq('is_active', true).lt('date', today),
    ])

    setTotalBookings(bkRes.count || 0)
    setTotalUsers(usersRes.count || 0)
    setSessionsThisWeek(weekRes.count || 0)

    const pastSessions = pastRes.data || []
    if (pastSessions.length > 0) {
      const { data: pastBookings } = await supabase
        .from('bookings').select('session_id').eq('status', 'confirmed')
        .in('session_id', pastSessions.map(s => s.id))
      const pastCounts: Record<string, number> = {}
      pastBookings?.forEach(b => { pastCounts[b.session_id] = (pastCounts[b.session_id] || 0) + 1 })
      const rates = pastSessions.map(s => (pastCounts[s.id] || 0) / s.capacity)
      setAvgFillRate(rates.reduce((a, b) => a + b, 0) / rates.length)
    }

    const upcomingSessions = upcomingRes.data || []
    if (upcomingSessions.length > 0) {
      const { data: upBk } = await supabase
        .from('bookings').select('session_id').eq('status', 'confirmed')
        .in('session_id', upcomingSessions.map(s => s.id))
      const counts: Record<string, number> = {}
      upBk?.forEach(b => { counts[b.session_id] = (counts[b.session_id] || 0) + 1 })
      setUpcoming(upcomingSessions.map(s => ({ ...s, booking_count: counts[s.id] || 0 })))
    }

    setLoading(false)
  }

  if (loading) return <div style={{ opacity: 0.5, fontSize: '0.9rem' }}>Loading…</div>

  const cards = [
    { value: totalBookings, label: 'Total bookings', bg: '#d1fae5', border: '#bbf7d0' },
    { value: totalUsers, label: 'Registered users', bg: '#dbeafe', border: '#bfdbfe' },
    { value: sessionsThisWeek, label: 'Sessions this week', bg: '#fef9c3', border: '#fde68a' },
    { value: `${Math.round(avgFillRate * 100)}%`, label: 'Avg fill rate', bg: '#fee2e2', border: '#fecaca' },
  ]

  return (
    <div className="max-w-2xl">
      <div className="grid grid-cols-2 gap-4 mb-12">
        {cards.map(card => (
          <div key={card.label} style={{ backgroundColor: card.bg, border: `1px solid ${card.border}`, padding: '1.25rem', textAlign: 'center' }}>
            <p style={{ fontSize: '2.5rem', fontFamily: 'var(--font-cormorant)', fontWeight: 400, lineHeight: 1 }}>{card.value}</p>
            <p className="label-overline mt-2" style={{ color: 'rgba(20,20,20,0.5)' }}>{card.label}</p>
          </div>
        ))}
      </div>

      <p className="label-overline mb-4" style={{ color: 'var(--serve-sage)' }}>Upcoming — fill rate</p>
      {upcoming.length === 0 && <p style={{ fontSize: '0.9rem', opacity: 0.5 }}>No upcoming sessions.</p>}
      <div style={{ border: '1px solid rgba(28,58,42,0.15)', backgroundColor: 'white' }}>
        {upcoming.map((session, i) => {
          const isFull = session.booking_count >= session.capacity
          return (
            <div key={session.id} className="flex items-center justify-between px-4 py-3" style={{ borderTop: i > 0 ? '1px solid rgba(28,58,42,0.08)' : 'none' }}>
              <div>
                <p style={{ fontSize: '0.9rem', fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>{session.title}</p>
                <p style={{ fontSize: '0.72rem', opacity: 0.5 }}>{fmt(session.date)}</p>
              </div>
              <p style={{ fontSize: '0.85rem', fontWeight: 500, color: isFull ? '#c0392b' : 'var(--serve-dark)' }}>
                {session.booking_count}/{session.capacity}{isFull ? ' · Full' : ''}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
