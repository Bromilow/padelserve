'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/lib/types'

export default function ProfileForm({ profile }: { profile: Profile }) {
  const [name, setName] = useState(profile.name)
  const [phone, setPhone] = useState(profile.phone)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSaved(false)
    setError('')
    const { error } = await supabase
      .from('profiles')
      .update({ name, phone })
      .eq('id', profile.id)
    if (error) {
      setError('Failed to save. Please try again.')
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md">
      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <div>
          <label className="label-overline block mb-2" style={{ color: 'rgba(20,20,20,0.4)' }}>Full Name</label>
          <input className="form-field" type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label className="label-overline block mb-2" style={{ color: 'rgba(20,20,20,0.4)' }}>Email</label>
          <input className="form-field" type="email" value={profile.email} disabled style={{ opacity: 0.4, cursor: 'not-allowed' }} />
        </div>
        <div>
          <label className="label-overline block mb-2" style={{ color: 'rgba(20,20,20,0.4)' }}>Phone</label>
          <input className="form-field" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        {error && <p style={{ fontSize: '0.8rem', color: '#c0392b' }}>{error}</p>}
        {saved && <p style={{ fontSize: '0.8rem', color: 'var(--serve-sage)' }}>Saved successfully.</p>}
        <button type="submit" disabled={loading} className="btn-luxury btn-luxury-dark" style={{ alignSelf: 'flex-start' }}>
          <span>{loading ? 'Saving…' : 'Save changes'}</span>
        </button>
      </form>
    </div>
  )
}
