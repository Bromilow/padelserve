import type { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: "About SERVE | Umhlanga's Premier Padel & Lifestyle Club",
  description:
    'Learn about SERVE Padel & Play in Umhlanga — a social and lifestyle destination with world-class padel courts, artisan food, and a community-first approach.',
  openGraph: {
    title: "About SERVE | Umhlanga's Premier Padel & Lifestyle Club",
    description:
      'Learn about SERVE Padel & Play in Umhlanga — a social and lifestyle destination with world-class padel courts, artisan food, and a community-first approach.',
    url: 'https://bromilow.github.io/padelserve/about',
    type: 'website',
  },
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return <AboutContent />
}
