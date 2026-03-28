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

const base = process.env.NODE_ENV === 'production' ? '/padelserve' : ''

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
  metadataBase: new URL('https://bromilow.github.io/padelserve'),
  alternates: {
    canonical: 'https://bromilow.github.io/padelserve',
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
        url: '/assets/court-night-lights.webp',
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
    images: ['/assets/court-night-lights.webp'],
  },
  icons: {
    icon: [
      { url: `${base}/assets/favicon/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${base}/assets/favicon/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
    ],
    shortcut: `${base}/assets/favicon/favicon.ico`,
    apple: `${base}/assets/favicon/apple-touch-icon.png`,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsActivityLocation",
              "name": "SERVE Padel & Play",
              "description": "Umhlanga's premier padel club with 3 championship padel courts and 1 pickleball court. Open 6am–10pm daily.",
              "url": "https://bromilow.github.io/padelserve",
              "telephone": "+27615451063",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "2nd Floor, 185 Ridge Road",
                "addressLocality": "Umhlanga",
                "addressRegion": "KwaZulu-Natal",
                "postalCode": "4319",
                "addressCountry": "ZA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -29.726,
                "longitude": 31.071
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                "opens": "06:00",
                "closes": "22:00"
              },
              "sport": ["Padel", "Pickleball"],
              "priceRange": "$$",
              "image": "https://bromilow.github.io/padelserve/assets/court-night-lights.webp",
              "sameAs": ["https://www.instagram.com/servepadel"]
            })
          }}
        />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
