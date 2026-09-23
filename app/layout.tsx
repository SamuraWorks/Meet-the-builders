import type { Metadata, Viewport } from 'next'
import { Baloo_2, Nunito } from 'next/font/google'
import './globals.css'

const display = Baloo_2({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
})

const body = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Future Builders Academy — Meet the Builders',
  description:
    'Register your young builder (ages 7–17) for the Future Builders Academy meetup, "Meet the Builders" — Saturday, 26 September 2026, Freetown Innovation Lab. FREE EVENT with games, creativity challenges, problem solving, building, teamwork and Showcase.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3002'),
  openGraph: {
    title: 'Future Builders Academy — Meet the Builders',
    description:
      'Register your young builder (ages 7–17) for the Future Builders Academy meetup, Saturday, 26 September 2026. FREE EVENT.',
    type: 'website',
    images: [
      {
        url: '/future-builders/meet-the-builders-flyer.jpeg',
        width: 720,
        height: 1080,
        alt: 'Future Builders Academy Meet the Builders flyer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Future Builders Academy — Meet the Builders',
    description: 'Register for the Future Builders Academy meetup, Saturday, 26 September 2026.',
    images: ['/future-builders/meet-the-builders-flyer.jpeg'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff6e5' },
    { media: '(prefers-color-scheme: dark)', color: '#241c5c' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}