import type { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: "About SERVE | Umhlanga's Premier Padel & Lifestyle Club",
  description:
    "SERVE Padel & Play is Umhlanga's premier padel and lifestyle destination. 3 championship padel courts, 1 pickleball court, artisan kitchen, and a community-first culture. Located at 185 Ridge Rd, Umhlanga.",
  openGraph: {
    title: "About SERVE | Umhlanga's Premier Padel & Lifestyle Club",
    description:
      "SERVE Padel & Play is Umhlanga's premier padel and lifestyle destination. 3 championship padel courts, 1 pickleball court, artisan kitchen, and a community-first culture.",
    url: 'https://servepadel.co.za/about',
    type: 'website',
    images: [{ url: '/assets/now.JPG', width: 1200, height: 630, alt: "SERVE Padel & Play — Umhlanga's Premier Padel Club" }],
  },
  alternates: {
    canonical: 'https://servepadel.co.za/about',
  },
}

export default function AboutPage() {
  return <AboutContent />
}
