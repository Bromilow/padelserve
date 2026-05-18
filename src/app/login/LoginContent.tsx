'use client'

import { useState, Suspense } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { asset } from '@/lib/assetPath'

const EyeIcon = ({ open }: { open: boolean }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

function PasswordField({ placeholder, value, onChange, autoComplete, minLength }: {
  placeholder: string
  value: string
  onChange: (v: string) => void
  autoComplete: string
  minLength?: number
}) {
  const [show, setShow] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <input
        className="form-field"
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        required
        autoComplete={autoComplete}
        minLength={minLength}
        style={{ width: '100%', paddingRight: '2.8rem' }}
      />
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.35, cursor: 'pointer', lineHeight: 1 }}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        <EyeIcon open={show} />
      </button>
    </div>
  )
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const rawRedirect = searchParams.get('redirect') || '/profile'
  const redirect = rawRedirect.startsWith('/') ? rawRedirect : '/profile'

  const [tab, setTab] = useState<'signin' | 'register'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push(redirect)
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, phone } },
    })
    if (error) { setError(error.message); setLoading(false); return }
    setRegistered(true)
    setLoading(false)
  }

  async function handleResetPassword() {
    if (!email) { setError('Enter your email first.'); return }
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/profile`,
    })
    setResetSent(true)
    setError('')
  }

  if (registered) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: 'var(--serve-cream)' }}>
        <div className="max-w-md w-full text-center">
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--serve-green)', margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <p className="label-overline mb-6" style={{ color: 'var(--serve-sage)' }}>You&rsquo;re almost in</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2.5rem', fontWeight: 300 }}>Check your email</h1>
          <p className="mt-4" style={{ fontSize: '0.9rem', lineHeight: 1.8, opacity: 0.6 }}>
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account, then sign in.
          </p>
          <button
            onClick={() => { setRegistered(false); setTab('signin') }}
            className="mt-10 btn-luxury btn-luxury-dark"
          >
            <span>Back to Sign In</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--serve-cream)' }}>

      {/* ── Left: image panel (desktop only) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-14" style={{ minHeight: '100vh' }}>
        <Image
          src={asset('/assets/rooftop-yoga.jpg')}
          alt="Yoga and Pilates at SERVE"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)' }} />
        <div className="relative z-10">
          <p className="label-overline mb-4" style={{ color: 'var(--serve-amber)', letterSpacing: '0.2em' }}>SERVE Padel &amp; Play</p>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 300, color: 'var(--serve-cream)', lineHeight: 1.2, fontStyle: 'italic' }}>
            Your sessions.<br />Your community.<br />Your space.
          </p>
        </div>
      </div>

      {/* ── Right: form panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-24 lg:py-0" style={{ minHeight: '100vh' }}>
        <div className="w-full max-w-sm">

          {/* Tabs */}
          <div className="flex gap-0 mb-10 border-b" style={{ borderColor: 'rgba(28,58,42,0.15)' }}>
            {(['signin', 'register'] as const).map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); setResetSent(false) }}
                className="pb-3 pr-8 label-overline transition-all duration-300"
                style={{
                  borderBottom: tab === t ? '2px solid var(--serve-green)' : '2px solid transparent',
                  color: tab === t ? 'var(--serve-green)' : 'rgba(20,20,20,0.35)',
                  marginBottom: '-1px',
                }}
              >
                {t === 'signin' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          {/* Heading */}
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2.2rem', fontWeight: 300, lineHeight: 1.1, marginBottom: '0.6rem' }}>
            {tab === 'signin' ? 'Welcome back.' : 'Join SERVE.'}
          </h1>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.7, opacity: 0.5, marginBottom: '2rem' }}>
            {tab === 'signin'
              ? 'Sign in to view and manage your yoga and pilates session bookings.'
              : 'Create a free account to book yoga and pilates sessions and manage your reservations.'}
          </p>

          {tab === 'signin' ? (
            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
              <input className="form-field" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
              <PasswordField placeholder="Password" value={password} onChange={setPassword} autoComplete="current-password" />
              {error && <p style={{ fontSize: '0.8rem', color: '#c0392b' }}>{error}</p>}
              {resetSent && <p style={{ fontSize: '0.8rem', color: 'var(--serve-sage)' }}>Reset link sent. Check your email.</p>}
              <button type="submit" disabled={loading} className="btn-luxury btn-luxury-dark mt-2" style={{ width: '100%', justifyContent: 'center' }}>
                <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              </button>
              <button type="button" onClick={handleResetPassword} style={{ fontSize: '0.75rem', opacity: 0.4, textDecoration: 'underline', textAlign: 'left' }}>
                Forgot password?
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <input className="form-field" type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required autoComplete="name" />
              <input className="form-field" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
              <input className="form-field" type="tel" placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} required autoComplete="tel" />
              <PasswordField placeholder="Password (min 8 characters)" value={password} onChange={setPassword} autoComplete="new-password" minLength={8} />
              {error && <p style={{ fontSize: '0.8rem', color: '#c0392b' }}>{error}</p>}
              <button type="submit" disabled={loading} className="btn-luxury btn-luxury-dark mt-2" style={{ width: '100%', justifyContent: 'center' }}>
                <span>{loading ? 'Creating account...' : 'Create Account'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LoginContent() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--serve-cream)' }}>
        <div className="animate-spin" style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--serve-green)', borderTopColor: 'transparent' }} />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
