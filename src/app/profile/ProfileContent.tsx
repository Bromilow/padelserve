'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import MyBookings from '@/components/profile/MyBookings'
import ProfileForm from '@/components/profile/ProfileForm'
import AdminPanel from '@/components/profile/AdminPanel'

type Tab = 'bookings' | 'profile' | 'admin'

export default function ProfileContent() {
  const router = useRouter()
  const { user, profile, loading, isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>('bookings')

  useEffect(() => {
    if (!loading && !user) router.push('/login?redirect=/profile')
  }, [user, loading, router])

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--serve-cream)' }}>
        <div className="animate-spin" style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--serve-green)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  const firstName = profile.name?.split(' ')[0] || 'there'

  const tabs: { id: Tab; label: string }[] = [
    { id: 'bookings', label: 'My Bookings' },
    { id: 'profile', label: 'Profile' },
    ...(isAdmin ? [{ id: 'admin' as Tab, label: 'Admin' }] : []),
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--serve-cream)' }}>

      {/* ── Header band ── */}
      <div style={{ backgroundColor: 'var(--serve-dark)', paddingTop: '5.5rem', paddingBottom: '3rem' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <p className="label-overline mb-3" style={{ color: 'var(--serve-amber)', letterSpacing: '0.2em' }}>
            Member
          </p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 300, color: 'var(--serve-cream)', lineHeight: 1 }}>
            Good to see you, <span style={{ fontStyle: 'italic' }}>{firstName}.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.82rem', color: 'var(--serve-cream)', opacity: 0.45, marginTop: '0.75rem', letterSpacing: '0.04em' }}>
            {profile.email}
          </p>

          {/* Tabs */}
          <div className="flex gap-0 mt-10 border-b" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="pb-3 pr-8 label-overline transition-all duration-300"
                style={{
                  borderBottom: activeTab === tab.id ? '2px solid var(--serve-amber)' : '2px solid transparent',
                  color: activeTab === tab.id ? 'var(--serve-cream)' : 'rgba(255,255,255,0.3)',
                  marginBottom: '-1px',
                  letterSpacing: '0.15em',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-14 pb-24">
        {activeTab === 'bookings' && <MyBookings userId={user!.id} />}
        {activeTab === 'profile' && <ProfileForm profile={profile} />}
        {activeTab === 'admin' && isAdmin && <AdminPanel />}
      </div>
    </div>
  )
}
