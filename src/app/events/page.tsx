import type { Metadata } from 'next'
import EventsContent from './EventsContent'

export const metadata: Metadata = {
  title: 'Private Events & Functions in Umhlanga | SERVE Padel',
  description: 'Host your next event at SERVE Padel & Play, Umhlanga. Birthday parties, kids\' celebrations, and corporate team-building days on championship padel courts with full catering. 185 Ridge Rd, Umhlanga.',
  openGraph: {
    title: 'Private Events & Functions | SERVE Padel Umhlanga',
    description: 'Host your next event at SERVE Padel in Umhlanga. Birthday parties, kids\' celebrations, and corporate team-building on championship padel courts.',
    url: 'https://servepadel.co.za/events',
    type: 'website',
    images: [{ url: '/assets/court-night-lights.webp', width: 1200, height: 630, alt: 'SERVE Padel private events' }],
  },
  alternates: { canonical: 'https://servepadel.co.za/events' },
}

export default function EventsPage() {
  return <EventsContent />
}
