'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Profile, Booking, Session } from '@/lib/types'

interface ProfileWithMeta extends Profile {
  upcoming_count: number
  bookings?: (Booking & { sessions: Session })[]
  showBookings?: boolean
}

const MONTH = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
function fmt(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${d.getDate()} ${MONTH[d.getMonth()]}`
}
function fmtTime(t: string) {
  const [h, m] = t.split(':').map(Number)
  return `${h > 12 ? h - 12 : h || 12}:${String(m).padStart(2,'0')}${h >= 12 ? 'pm' : 'am'}`
}

export default function UsersTab() {
  const [users, setUsers] = useState<ProfileWithMeta[]>([])
  const [filtered, setFiltered] = useState<ProfileWithMeta[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => { fetchUsers() }, [])

  useEffect(() => {
    const q = search.toLowerCase()
    setFiltered(users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)))
  }, [search, users])

  async function fetchUsers() {
    const [profilesRes, bookingsRes] = await Promise.all([
      supabase.from('profiles').select('*').order('name'),
      supabase.from('bookings').select('user_id, status, sessions(date)').eq('status', 'confirmed'),
    ])
    const counts: Record<string, number> = {}
    bookingsRes.data?.forEach(b => {
      const d = (b.sessions as unknown as Session)?.date
      if (d >= today) counts[b.user_id] = (counts[b.user_id] || 0) + 1
    })
    const withMeta = (profilesRes.data || []).map(p => ({ ...p, upcoming_count: counts[p.id] || 0 }))
    setUsers(withMeta)
    setFiltered(withMeta)
    setLoading(false)
  }

  async function toggleBookings(userId: string) {
    const user = users.find(u => u.id === userId)!
    if (user.showBookings) {
      const update = (u: ProfileWithMeta) => u.id === userId ? { ...u, showBookings: false } : u
      setUsers(p => p.map(update)); setFiltered(p => p.map(update))
      return
    }
    if (!user.bookings) {
      const { data } = await supabase
        .from('bookings').select('*, sessions(*)')
        .eq('user_id', userId).order('created_at', { ascending: false }).limit(20)
      const upd = (u: ProfileWithMeta) => u.id === userId
        ? { ...u, bookings: (data || []) as (Booking & { sessions: Session })[], showBookings: true } : u
      setUsers(p => p.map(upd)); setFiltered(p => p.map(upd))
    } else {
      const upd = (u: ProfileWithMeta) => u.id === userId ? { ...u, showBookings: true } : u
      setUsers(p => p.map(upd)); setFiltered(p => p.map(upd))
    }
  }

  async function toggleRole(userId: string, currentRole: string) {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    if (!confirm(`${newRole === 'admin' ? 'Promote to admin' : 'Remove admin role for'} this user?`)) return
    await supabase.from('profiles').update({ role: newRole }).eq('id', userId)
    fetchUsers()
  }

  if (loading) return <div style={{ opacity: 0.5, fontSize: '0.9rem' }}>Loading…</div>

  return (
    <div className="max-w-2xl">
      <input className="form-field mb-6" placeholder="Search by name or email…" value={search} onChange={e => setSearch(e.target.value)} />
      <div className="flex flex-col gap-3">
        {filtered.map(user => (
          <div key={user.id} style={{ border: '1px solid rgba(28,58,42,0.15)', backgroundColor: 'white' }}>
            <div className="flex items-start justify-between p-4">
              <div>
                <div className="flex items-center gap-2">
                  <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', fontWeight: 400 }}>
                    {user.name || '(no name)'}
                  </p>
                  {user.role === 'admin' && (
                    <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', backgroundColor: 'var(--serve-amber)', color: 'white', padding: '0.15rem 0.4rem' }}>
                      Admin
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.78rem', opacity: 0.6, marginTop: '0.2rem' }}>{user.email} · {user.phone}</p>
                <p style={{ fontSize: '0.72rem', opacity: 0.4, marginTop: '0.15rem' }}>
                  {user.upcoming_count} upcoming booking{user.upcoming_count !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex gap-3 shrink-0" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <button onClick={() => toggleBookings(user.id)} style={{ opacity: 0.5, textDecoration: 'underline' }}>
                  {user.showBookings ? 'Hide' : 'Bookings'}
                </button>
                <button
                  onClick={() => toggleRole(user.id, user.role)}
                  style={{ opacity: 0.5, textDecoration: 'underline', color: user.role === 'admin' ? '#c0392b' : 'inherit' }}
                >
                  {user.role === 'admin' ? 'Remove admin' : 'Make admin'}
                </button>
              </div>
            </div>
            {user.showBookings && (
              <div className="px-4 pb-4" style={{ borderTop: '1px solid rgba(28,58,42,0.08)' }}>
                {!user.bookings?.length ? (
                  <p style={{ fontSize: '0.8rem', opacity: 0.4, marginTop: '0.75rem' }}>No bookings.</p>
                ) : (
                  <div className="flex flex-col gap-1 mt-3">
                    {user.bookings.map(b => (
                      <div key={b.id} className="flex items-center justify-between" style={{ fontSize: '0.78rem', opacity: 0.7 }}>
                        <span>{b.sessions?.title}</span>
                        <span>{b.sessions ? `${fmt(b.sessions.date)} ${fmtTime(b.sessions.start_time)}` : ''}</span>
                        <span style={{ color: b.status === 'cancelled' ? '#c0392b' : 'var(--serve-sage)' }}>{b.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
