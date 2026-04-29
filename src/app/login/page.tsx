import type { Metadata } from 'next'
import LoginContent from './LoginContent'

export const metadata: Metadata = {
  title: 'Sign In | SERVE Padel & Play',
  description: 'Sign in or create an account to book yoga sessions.',
}

export default function LoginPage() {
  return <LoginContent />
}
