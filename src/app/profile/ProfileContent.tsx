'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import MyBookings from '@/components/profile/MyBookings'
import ProfileForm from '@/components/profile/ProfileForm'

type Tab = 'bookings' | 'profile'

export default function ProfileContent() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
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

  const tabs: { id: Tab; label: string }[] = [
    { id: 'bookings', label: 'My Bookings' },
    { id: 'profile', label: 'Profile' },
  ]

  return (
    <div className="min-h-screen pt-28 pb-24" style={{ backgroundColor: 'var(--serve-cream)' }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <p className="label-overline mb-4" style={{ color: 'var(--serve-sage)' }}>Your account</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300 }}>
          {profile.name || 'My Account'}
        </h1>
        <div className="flex gap-8 mt-10 border-b" style={{ borderColor: 'rgba(28,58,42,0.15)' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="pb-3 label-overline transition-all duration-300"
              style={{
                borderBottom: activeTab === tab.id ? '1px solid var(--serve-green)' : '1px solid transparent',
                color: activeTab === tab.id ? 'var(--serve-green)' : 'rgba(20,20,20,0.4)',
                marginBottom: '-1px',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-10">
          {activeTab === 'bookings' && <MyBookings userId={user!.id} />}
          {activeTab === 'profile' && <ProfileForm profile={profile} />}
        </div>
      </div>
    </div>
  )
}
