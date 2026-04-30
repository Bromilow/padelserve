'use client'

import { useState } from 'react'
import SessionsTab from './admin/SessionsTab'
import UsersTab from './admin/UsersTab'
import StatsTab from './admin/StatsTab'

type AdminTab = 'sessions' | 'users' | 'stats'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>('sessions')

  const tabs: { id: AdminTab; label: string }[] = [
    { id: 'sessions', label: 'Sessions' },
    { id: 'users', label: 'Users' },
    { id: 'stats', label: 'Stats' },
  ]

  return (
    <div>
      <div className="flex gap-6 mb-8 border-b" style={{ borderColor: 'rgba(28,58,42,0.15)' }}>
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
      {activeTab === 'sessions' && <SessionsTab />}
      {activeTab === 'users' && <UsersTab />}
      {activeTab === 'stats' && <StatsTab />}
    </div>
  )
}
