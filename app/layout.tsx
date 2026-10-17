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
  title: 'Builda — Meet the Builders: Robotics Day 2026',
  description: 'Builda Robotics Day 2026: a hands-on experience where children ages 4–17 explore creativity, building, teamwork, and problem-solving in Freetown.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3002'),
  openGraph: {
    title: 'Builda — Meet the Builders: Robotics Day 2026',
    description: 'Saturday, 31 October 2026 at Freetown Innovation Lab. Pay As You Can.',
    type: 'website',
    images: [{ url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20261017-WA0076-MI7UXSJ4va3xyMyK8ikw3uTuecj2s0.jpg', width: 720, height: 1080, alt: 'Builda Robotics Day 2026 flyer' }],
  },
  twitter: { card: 'summary_large_image', title: 'Builda — Robotics Day 2026', images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20261017-WA0076-MI7UXSJ4va3xyMyK8ikw3uTuecj2s0.jpg'] },
  icons: { icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20261017-WA0074-pqs47ZHaSfz3VK8IKMPX9NSbQ6yqJY.jpg', apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20261017-WA0074-pqs47ZHaSfz3VK8IKMPX9NSbQ6yqJY.jpg' },
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
