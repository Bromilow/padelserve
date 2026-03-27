import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost, Great_Vibes } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SERVE Padel & Play | Umhlanga\'s Premier Padel Club',
  description:
    'SERVE Padel & Play is Umhlanga\'s premier padel club. Book world-class padel courts in Umhlanga, enjoy premium facilities, and experience the best padel club in Durban. Things to do in Umhlanga start here.',
  keywords: [
    'padel Umhlanga',
    'padel courts Umhlanga',
    'things to do in Umhlanga',
    'padel club Durban',
    'SERVE padel',
    'padel Durban North',
    'padel KwaZulu-Natal',
    'book padel court',
  ],
  authors: [{ name: 'SERVE Padel & Play' }],
  creator: 'SERVE Padel & Play',
  publisher: 'SERVE Padel & Play',
  metadataBase: new URL('https://servepadel.co.za'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://servepadel.co.za',
    siteName: 'SERVE Padel & Play',
    title: 'SERVE Padel & Play | Umhlanga\'s Premier Padel Club',
    description:
      'Book world-class padel courts in Umhlanga. Premium facilities, professional coaching, and the best padel experience in Durban.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SERVE Padel & Play — Umhlanga\'s Premier Padel Club',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SERVE Padel & Play | Umhlanga\'s Premier Padel Club',
    description:
      'Book world-class padel courts in Umhlanga. Premium facilities, professional coaching, and the best padel experience in Durban.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${jost.variable} ${greatVibes.variable}`}
        style={{ fontFamily: 'var(--font-jost), sans-serif' }}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
