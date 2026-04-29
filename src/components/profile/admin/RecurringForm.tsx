'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { generateSessionInstances } from '@/lib/recurrence'
import type { RecurrenceTemplate } from '@/lib/types'

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

interface RecurringFormProps {
  initial?: Partial<RecurrenceTemplate>
  onSuccess: () => void
  onCancel: () => void
}

export default function RecurringForm({ initial, onSuccess, onCancel }: RecurringFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [instructor, setInstructor] = useState(initial?.instructor ?? '')
  const [dayOfWeek, setDayOfWeek] = useState(String(initial?.day_of_week ?? 1))
  const [startTime, setStartTime] = useState(initial?.start_time ?? '')
  const [duration, setDuration] = useState(String(initial?.duration_minutes ?? 60))
  const [capacity, setCapacity] = useState(String(initial?.capacity ?? 10))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const templatePayload = {
      title, instructor,
      day_of_week: Number(dayOfWeek),
      start_time: startTime,
      duration_minutes: Number(duration),
      capacity: Number(capacity),
      is_active: true,
    }

    let templateId: string
    if (initial?.id) {
      const { error } = await supabase.from('recurrence_templates').update(templatePayload).eq('id', initial.id)
      if (error) { setError('Failed to update template.'); setLoading(false); return }
      templateId = initial.id
    } else {
      const { data, error } = await supabase.from('recurrence_templates').insert(templatePayload).select().single()
      if (error || !data) { setError('Failed to create template.'); setLoading(false); return }
      templateId = data.id
    }

    const fullTemplate: RecurrenceTemplate = {
      id: templateId, title, instructor,
      day_of_week: Number(dayOfWeek),
      start_time: startTime,
      duration_minutes: Number(duration),
      capacity: Number(capacity),
      is_active: true,
      created_at: new Date().toISOString(),
    }

    const instances = generateSessionInstances(fullTemplate, 8)
    if (instances.length > 0) {
      const { error } = await supabase.from('sessions').insert(instances)
      if (error) { setError('Template saved but session generation failed.'); setLoading(false); return }
    }

    onSuccess()
  }

  const fieldLabel = (label: string) => (
    <label className="label-overline block mb-1" style={{ color: 'rgba(20,20,20,0.4)', fontSize: '0.6rem' }}>{label}</label>
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 max-w-lg" style={{ border: '1px solid rgba(28,58,42,0.15)', backgroundColor: 'white' }}>
      <p className="label-overline" style={{ color: 'var(--serve-sage)' }}>{initial?.id ? 'Edit recurring schedule' : 'New recurring schedule'}</p>
      <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Generates sessions for the next 8 weeks automatically.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">{fieldLabel('Title')}<input className="form-field" value={title} onChange={e => setTitle(e.target.value)} required /></div>
        <div className="col-span-2">{fieldLabel('Instructor')}<input className="form-field" value={instructor} onChange={e => setInstructor(e.target.value)} required /></div>
        <div>
          {fieldLabel('Day of week')}
          <select className="form-field" value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)}>
            {DAY_NAMES.map((d, i) => <option key={i} value={i}>{d}</option>)}
          </select>
        </div>
        <div>{fieldLabel('Start time')}<input className="form-field" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required /></div>
        <div>{fieldLabel('Duration (min)')}<input className="form-field" type="number" min={15} max={240} value={duration} onChange={e => setDuration(e.target.value)} required /></div>
        <div>{fieldLabel('Capacity')}<input className="form-field" type="number" min={1} max={100} value={capacity} onChange={e => setCapacity(e.target.value)} required /></div>
      </div>
      {error && <p style={{ fontSize: '0.8rem', color: '#c0392b' }}>{error}</p>}
      <div className="flex gap-4 mt-2">
        <button type="submit" disabled={loading} className="btn-luxury btn-luxury-dark" style={{ padding: '0.7rem 1.5rem' }}>
          <span>{loading ? 'Saving…' : 'Save schedule'}</span>
        </button>
        <button type="button" onClick={onCancel} style={{ fontSize: '0.75rem', opacity: 0.5, textDecoration: 'underline' }}>Cancel</button>
      </div>
    </form>
  )
}
