'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Session } from '@/lib/types'

interface SessionFormProps {
  initial?: Partial<Session>
  onSuccess: () => void
  onCancel: () => void
}

export default function SessionForm({ initial, onSuccess, onCancel }: SessionFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [instructor, setInstructor] = useState(initial?.instructor ?? '')
  const [date, setDate] = useState(initial?.date ?? '')
  const [startTime, setStartTime] = useState(initial?.start_time ?? '')
  const [duration, setDuration] = useState(String(initial?.duration_minutes ?? 60))
  const [capacity, setCapacity] = useState(String(initial?.capacity ?? 10))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const basePayload = {
      title, instructor, date,
      start_time: startTime,
      duration_minutes: Number(duration),
      capacity: Number(capacity),
      is_active: true,
    }
    const { error } = initial?.id
      ? await supabase.from('sessions').update(basePayload).eq('id', initial.id)
      : await supabase.from('sessions').insert({ ...basePayload, is_recurring: false })
    if (error) { setError('Failed to save session.'); setLoading(false); return }
    onSuccess()
  }

  const fieldLabel = (label: string) => (
    <label className="label-overline block mb-1" style={{ color: 'rgba(20,20,20,0.4)', fontSize: '0.6rem' }}>{label}</label>
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 max-w-lg" style={{ border: '1px solid rgba(28,58,42,0.15)', backgroundColor: 'white' }}>
      <p className="label-overline" style={{ color: 'var(--serve-sage)' }}>{initial?.id ? 'Edit session' : 'New one-off session'}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">{fieldLabel('Title')}<input className="form-field" value={title} onChange={e => setTitle(e.target.value)} required /></div>
        <div className="col-span-2">{fieldLabel('Instructor')}<input className="form-field" value={instructor} onChange={e => setInstructor(e.target.value)} required /></div>
        <div>{fieldLabel('Date')}<input className="form-field" type="date" value={date} onChange={e => setDate(e.target.value)} required /></div>
        <div>{fieldLabel('Start time')}<input className="form-field" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required /></div>
        <div>{fieldLabel('Duration (min)')}<input className="form-field" type="number" min={15} max={240} value={duration} onChange={e => setDuration(e.target.value)} required /></div>
        <div>{fieldLabel('Capacity')}<input className="form-field" type="number" min={1} max={100} value={capacity} onChange={e => setCapacity(e.target.value)} required /></div>
      </div>
      {error && <p style={{ fontSize: '0.8rem', color: '#c0392b' }}>{error}</p>}
      <div className="flex gap-4 mt-2">
        <button type="submit" disabled={loading} className="btn-luxury btn-luxury-dark" style={{ padding: '0.7rem 1.5rem' }}>
          <span>{loading ? 'Saving…' : 'Save session'}</span>
        </button>
        <button type="button" onClick={onCancel} style={{ fontSize: '0.75rem', opacity: 0.5, textDecoration: 'underline' }}>Cancel</button>
      </div>
    </form>
  )
}
