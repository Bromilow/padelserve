import type { Metadata } from 'next'
import MenuContent from './MenuContent'

export const metadata: Metadata = {
  title: 'Eat & Drink | SERVE Padel & Play Umhlanga',
  description: 'Explore the SERVE kitchen and bar in Umhlanga. Wood-fired pizzas, artisan light bites, craft cocktails, curated wines and premium non-alcoholic drinks — all on the terrace at 185 Ridge Rd.',
  openGraph: {
    title: 'Eat & Drink | SERVE Padel & Play Umhlanga',
    description: 'Wood-fired pizzas, craft cocktails, and a terrace worth lingering on. The SERVE kitchen and bar, Umhlanga.',
    url: 'https://bromilow.github.io/padelserve/menu',
    type: 'website',
    images: [{ url: '/assets/Food.png', width: 1200, height: 630, alt: 'SERVE Padel & Play — Eat & Drink, Umhlanga' }],
  },
  alternates: { canonical: '/menu' },
}

export default function MenuPage() {
  return <MenuContent />
}
