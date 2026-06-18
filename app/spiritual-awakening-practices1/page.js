// app/spiritual-awakening-practices/page.js

import { getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'auto'
export const revalidate = 3600

export async function generateMetadata() {
  const post = await getPostBySlug('spiritual-awakening-practices')
  
  if (!post) {
    return {
      title: 'Spiritual Awakening Practices',
      description: 'Learn about spiritual awakening practices',
    }
  }
  
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: post.canonical || `https://yourblog.com/spiritual-awakening-practices/`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      images: post.imageUrl ? [
        {
          url: post.imageUrl,
          alt: post.imageAlt || post.title,
          width: post.imageWidth || 1200,
          height: post.imageHeight || 630,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  }
}

export default async function SpiritualAwakeningPage() {
  const post = await getPostBySlug('spiritual-awakening-practices')
  
  if (!post) {
    notFound()
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="article-content prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-a:text-blue-600">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  )
}