// app/about/page.js

import { getPageBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export const dynamic = 'auto'
export const revalidate = 3600

// Generate metadata for the about page
export async function generateMetadata() {
  const page = await getPageBySlug('about-us')
  
  if (!page) {
    return {
      title: 'About Us',
      description: 'Learn about YogLica and our spiritual mission',
    }
  }
  
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.canonical || 'https://yourblog.com/about/',
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'website',
      images: page.imageUrl ? [
        {
          url: page.imageUrl,
          alt: page.imageAlt || page.title,
          width: page.imageWidth || 1200,
          height: page.imageHeight || 630,
        },
      ] : undefined,
    },
  }
}

// Main about page component
export default async function AboutPage() {
  const page = await getPageBySlug('about-us')
  
  if (!page) {
    notFound()
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="article-content prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-a:text-blue-600">
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </article>
    </div>
  )
}