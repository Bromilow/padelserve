'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

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
          <p className="label-overline mb-8" style={{ color: 'var(--serve-sage)' }}>Account created</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2.5rem', fontWeight: 300 }}>Check your email</h1>
          <p className="mt-6" style={{ fontSize: '0.9rem', lineHeight: 1.8, opacity: 0.7 }}>
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
    <div className="min-h-screen flex items-center justify-center px-6 pt-14" style={{ backgroundColor: 'var(--serve-cream)' }}>
      <div className="max-w-md w-full py-16">
        <p className="label-overline mb-8" style={{ color: 'var(--serve-sage)' }}>Your account</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2.5rem', fontWeight: 300, lineHeight: 1.1 }}>
          {tab === 'signin' ? 'Welcome back' : 'Create account'}
        </h1>

        <div className="flex gap-8 mt-10 mb-10 border-b" style={{ borderColor: 'rgba(28,58,42,0.15)' }}>
          {(['signin', 'register'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(''); setResetSent(false) }}
              className="pb-3 label-overline transition-all duration-300"
              style={{
                borderBottom: tab === t ? '1px solid var(--serve-green)' : '1px solid transparent',
                color: tab === t ? 'var(--serve-green)' : 'rgba(20,20,20,0.4)',
                marginBottom: '-1px',
              }}
            >
              {t === 'signin' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {tab === 'signin' ? (
          <form onSubmit={handleSignIn} className="flex flex-col gap-6">
            <input className="form-field" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
            <input className="form-field" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
            {error && <p style={{ fontSize: '0.8rem', color: '#c0392b' }}>{error}</p>}
            {resetSent && <p style={{ fontSize: '0.8rem', color: 'var(--serve-sage)' }}>Reset link sent — check your email.</p>}
            <button type="submit" disabled={loading} className="btn-luxury btn-luxury-dark mt-2" style={{ width: '100%', justifyContent: 'center' }}>
              <span>{loading ? 'Signing in…' : 'Sign In'}</span>
            </button>
            <button type="button" onClick={handleResetPassword} style={{ fontSize: '0.75rem', opacity: 0.5, textDecoration: 'underline' }}>
              Forgot password?
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-6">
            <input className="form-field" type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required autoComplete="name" />
            <input className="form-field" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
            <input className="form-field" type="tel" placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} required autoComplete="tel" />
            <input className="form-field" type="password" placeholder="Password (min 8 characters)" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" />
            {error && <p style={{ fontSize: '0.8rem', color: '#c0392b' }}>{error}</p>}
            <button type="submit" disabled={loading} className="btn-luxury btn-luxury-dark mt-2" style={{ width: '100%', justifyContent: 'center' }}>
              <span>{loading ? 'Creating account…' : 'Create Account'}</span>
            </button>
          </form>
        )}
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
