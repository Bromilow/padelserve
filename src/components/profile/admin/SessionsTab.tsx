'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import SessionForm from './SessionForm'
import RecurringForm from './RecurringForm'
import type { Session, RecurrenceTemplate, Profile } from '@/lib/types'

const DAY = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTH = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${DAY[d.getDay()]} ${d.getDate()} ${MONTH[d.getMonth()]}`
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(':').map(Number)
  return `${h > 12 ? h - 12 : h || 12}:${String(m).padStart(2, '0')}${h >= 12 ? 'pm' : 'am'}`
}

type FormMode = 'none' | 'session' | 'recurring'

interface SessionWithMeta extends Session {
  booking_count: number
  bookers?: Profile[]
  showBookers?: boolean
}

export default function SessionsTab() {
  const [sessions, setSessions] = useState<SessionWithMeta[]>([])
  const [templates, setTemplates] = useState<RecurrenceTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [formMode, setFormMode] = useState<FormMode>('none')
  const [editSession, setEditSession] = useState<Session | null>(null)
  const [editTemplate, setEditTemplate] = useState<RecurrenceTemplate | null>(null)
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => { fetchAll() }, [])

  async function fetchAll() {
    setLoading(true)
    const [sessRes, tmplRes, bkRes] = await Promise.all([
      supabase.from('sessions').select('*').eq('is_active', true).gte('date', today).order('date').order('start_time'),
      supabase.from('recurrence_templates').select('*').eq('is_active', true).order('created_at'),
      supabase.from('bookings').select('session_id').eq('status', 'confirmed'),
    ])
    const counts: Record<string, number> = {}
    bkRes.data?.forEach(b => { counts[b.session_id] = (counts[b.session_id] || 0) + 1 })
    setSessions((sessRes.data || []).map(s => ({ ...s, booking_count: counts[s.id] || 0 })))
    setTemplates(tmplRes.data || [])
    setLoading(false)
  }

  async function toggleBookers(sessionId: string) {
    const session = sessions.find(s => s.id === sessionId)!
    if (session.showBookers) {
      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, showBookers: false } : s))
      return
    }
    if (!session.bookers) {
      const { data } = await supabase
        .from('bookings')
        .select('profiles(*)')
        .eq('session_id', sessionId)
        .eq('status', 'confirmed')
      const bookers = (data || []).map(b => b.profiles as unknown as Profile)
      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, bookers, showBookers: true } : s))
    } else {
      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, showBookers: true } : s))
    }
  }

  async function deleteSession(id: string) {
    if (!confirm('Delete this session?')) return
    await supabase.from('sessions').update({ is_active: false }).eq('id', id)
    fetchAll()
  }

  async function deleteTemplate(id: string) {
    if (!confirm('Deactivate this recurring schedule? Existing sessions remain.')) return
    await supabase.from('recurrence_templates').update({ is_active: false }).eq('id', id)
    fetchAll()
  }

  if (loading) return <div style={{ opacity: 0.5, fontSize: '0.9rem' }}>Loading…</div>

  return (
    <div className="max-w-2xl">
      {formMode === 'none' && (
        <div className="flex gap-4 mb-8">
          <button onClick={() => { setFormMode('session'); setEditSession(null) }} className="btn-luxury btn-luxury-dark" style={{ padding: '0.7rem 1.5rem' }}>
            <span>+ One-off session</span>
          </button>
          <button onClick={() => { setFormMode('recurring'); setEditTemplate(null) }} className="btn-luxury btn-luxury-green" style={{ padding: '0.7rem 1.5rem' }}>
            <span>+ Recurring schedule</span>
          </button>
        </div>
      )}

      {formMode === 'session' && (
        <div className="mb-8">
          <SessionForm
            initial={editSession || undefined}
            onSuccess={() => { setFormMode('none'); setEditSession(null); fetchAll() }}
            onCancel={() => { setFormMode('none'); setEditSession(null) }}
          />
        </div>
      )}

      {formMode === 'recurring' && (
        <div className="mb-8">
          <RecurringForm
            initial={editTemplate || undefined}
            onSuccess={() => { setFormMode('none'); setEditTemplate(null); fetchAll() }}
            onCancel={() => { setFormMode('none'); setEditTemplate(null) }}
          />
        </div>
      )}

      <p className="label-overline mb-4" style={{ color: 'var(--serve-sage)' }}>Upcoming sessions</p>
      {sessions.length === 0 && <p style={{ fontSize: '0.9rem', opacity: 0.5, marginBottom: '2rem' }}>No upcoming sessions.</p>}
      <div className="flex flex-col gap-3 mb-12">
        {sessions.map(session => (
          <div key={session.id} style={{ border: '1px solid rgba(28,58,42,0.15)', backgroundColor: 'white' }}>
            <div className="flex items-start justify-between p-4">
              <div>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', fontWeight: 400 }}>{session.title}</p>
                <p style={{ fontSize: '0.78rem', opacity: 0.6, marginTop: '0.2rem' }}>
                  {formatDate(session.date)} · {formatTime(session.start_time)} · {session.duration_minutes}min · {session.instructor}
                </p>
                <p style={{ fontSize: '0.75rem', opacity: 0.45, marginTop: '0.2rem' }}>
                  {session.booking_count}/{session.capacity} booked
                </p>
              </div>
              <div className="flex gap-3 shrink-0" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <button onClick={() => { setEditSession(session); setFormMode('session') }} style={{ opacity: 0.5, textDecoration: 'underline' }}>Edit</button>
                <button onClick={() => deleteSession(session.id)} style={{ opacity: 0.5, color: '#c0392b', textDecoration: 'underline' }}>Delete</button>
                <button onClick={() => toggleBookers(session.id)} style={{ opacity: 0.5, textDecoration: 'underline' }}>
                  {session.showBookers ? 'Hide' : 'Bookings'}
                </button>
              </div>
            </div>
            {session.showBookers && (
              <div className="px-4 pb-4" style={{ borderTop: '1px solid rgba(28,58,42,0.08)' }}>
                {!session.bookers?.length ? (
                  <p style={{ fontSize: '0.8rem', opacity: 0.4, marginTop: '0.75rem' }}>No bookings yet.</p>
                ) : (
                  <div className="flex flex-col gap-1 mt-3">
                    {session.bookers.map(p => (
                      <p key={p.id} style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                        {p.name} · {p.email} · {p.phone}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="label-overline mb-4" style={{ color: 'var(--serve-sage)' }}>Recurring schedules</p>
      {templates.length === 0 && <p style={{ fontSize: '0.9rem', opacity: 0.5 }}>No recurring schedules.</p>}
      <div className="flex flex-col gap-3">
        {templates.map(template => (
          <div key={template.id} className="flex items-start justify-between p-4" style={{ border: '1px solid rgba(28,58,42,0.15)', backgroundColor: 'white' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', fontWeight: 400 }}>{template.title}</p>
              <p style={{ fontSize: '0.78rem', opacity: 0.6, marginTop: '0.2rem' }}>
                Every {DAY[template.day_of_week]} · {formatTime(template.start_time)} · {template.duration_minutes}min · cap {template.capacity}
              </p>
            </div>
            <div className="flex gap-3" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <button onClick={() => { setEditTemplate(template); setFormMode('recurring') }} style={{ opacity: 0.5, textDecoration: 'underline' }}>Edit</button>
              <button onClick={() => deleteTemplate(template.id)} style={{ opacity: 0.5, color: '#c0392b', textDecoration: 'underline' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
