// app/[category]/page.js

import { getPostsByCategory, getAllCategories } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'auto'
export const revalidate = 3600

// Generate metadata for the category page
export async function generateMetadata({ params }) {
  const { category } = await params
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found',
      robots: 'noindex, nofollow',
    }
  }
  
  const categoryName = category.replace(/-/g, ' ').toUpperCase()
  const posts = await getPostsByCategory(category)
  
  if (!posts || posts.length === 0) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found',
      robots: 'noindex, nofollow',
    }
  }
  
  return {
    title: `${categoryName} - Divine Teachings & Articles`,
    description: `Explore divine teachings, spiritual wisdom, and articles about ${categoryName}. Discover sacred knowledge and deepen your spiritual practice.`,
    openGraph: {
      title: `${categoryName} - Divine Teachings`,
      description: `Explore spiritual wisdom and articles about ${categoryName}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} - Divine Teachings`,
      description: `Explore spiritual wisdom and articles about ${categoryName}`,
    },
  }
}

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = await getAllCategories()
  
  return categories.map((category) => ({
    category: category // This should match the folder name, e.g., "bhagavad-gita"
  }))
}

// Main category page component
export default async function CategoryPage({ params }) {
  const { category } = await params
  
  if (!category) {
    notFound()
  }
  
  const posts = await getPostsByCategory(category)
  
  if (!posts || posts.length === 0) {
    notFound()
  }
  
  const categoryName = category.replace(/-/g, ' ').toUpperCase()
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">📿</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {categoryName}
          </h1>
        </div>
        <p className="text-lg text-gray-600">
          Explore divine teachings, spiritual wisdom, and articles about {categoryName}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <span>{posts.length} articles</span>
          <span>•</span>
          <span>Updated regularly</span>
        </div>
      </header>
      
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          // Extract the slug without the category prefix for the URL
          const postSlug = post.slug
          
          return (
            <article 
              key={postSlug}
              className="group bg-white rounded-xl border border-[#e8e0d6] overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <Link href={`/${postSlug}`} className="block">
                {/* Image */}
                {post.imageUrl && (
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={post.imageUrl}
                      alt={post.imageAlt || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                    <span>•</span>
                    <span>{post.readingTime || 5} min read</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#d98e04] transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    {post.description || 'Explore this divine teaching and deepen your spiritual understanding.'}
                  </p>
                  
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="text-xs bg-[#f8f6f2] text-gray-600 px-2 py-0.5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-xs text-gray-400">+{post.tags.length - 3}</span>
                      )}
                    </div>
                  )}
                  
                  {/* Read More */}
                  <div className="mt-4 inline-flex items-center text-sm font-medium text-[#d98e04] group-hover:text-[#b87400]">
                    Read Article
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}