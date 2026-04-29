import type { Metadata } from 'next'
import ProfileContent from './ProfileContent'

export const metadata: Metadata = {
  title: 'My Account | SERVE Padel & Play',
}

export default function ProfilePage() {
  return <ProfileContent />
}
