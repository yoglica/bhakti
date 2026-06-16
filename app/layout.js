// app/layout.js
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'My Blog - Thoughts on Tech & Development',
    template: '%s | My Blog',
  },
  description: 'A blog about web development, Next.js, and modern JavaScript.',
  
  // Canonical URL
  alternates: {
    canonical: '/',
  },
  
  // Open Graph
  openGraph: {
    title: 'My Blog',
    description: 'A blog about web development, Next.js, and modern JavaScript.',
    url: 'https://yourdomain.com',
    siteName: 'My Blog',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'My Blog - Web Development Blog',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'My Blog',
    description: 'A blog about web development, Next.js, and modern JavaScript.',
    images: ['/og-image.jpg'],
    site: '@myblog',
    creator: '@myblog',
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  
  // Verification
  verification: {
    google: 'your-google-verification-code',
  },
  
  // Other
  category: 'technology',
  keywords: ['web development', 'Next.js', 'JavaScript', 'React', 'blog'],
  authors: [{ name: 'My Blog Team', url: 'https://yourdomain.com/about' }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

// Add preconnect links via Next.js built-in
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="grow">{children}</main>
        <Footer />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'My Blog',
              url: 'https://yourdomain.com',
              description: 'A blog about web development, Next.js, and modern JavaScript.',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://yourdomain.com/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </body>
    </html>
  )
}