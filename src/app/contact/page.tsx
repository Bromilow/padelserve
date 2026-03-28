import type { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact SERVE Padel & Play | Umhlanga',
  description: 'Get in touch with SERVE Padel & Play. Located at 2nd Floor, 185 Ridge Rd, Umhlanga. Call 061 545 1063 or enquire online. Open 6am–10pm daily.',
  openGraph: {
    title: 'Contact SERVE Padel & Play | Umhlanga',
    description: 'Get in touch with SERVE Padel & Play. Located at 2nd Floor, 185 Ridge Rd, Umhlanga. Call 061 545 1063 or enquire online. Open 6am–10pm daily.',
    url: 'https://bromilow.github.io/padelserve/contact',
    type: 'website',
    images: [{ url: '/assets/serve-sign-hedge.webp', width: 1200, height: 630, alt: 'SERVE Padel & Play Umhlanga' }],
  },
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return <ContactContent />
}
