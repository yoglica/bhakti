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
    category: category
  }))
}

// Helper function to get category icon and color
function getCategoryMetadata(category) {
  const metadata = {
    'bhagavad-gita': { 
      icon: '📜', 
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      description: 'The divine song of Lord Krishna, offering timeless wisdom for life\'s challenges.'
    },
    'celibacy': { 
      icon: '🧘', 
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: 'Exploring the sacred practice of celibacy and its spiritual significance.'
    },
    'guru': { 
      icon: '🙏', 
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: 'Wisdom and teachings from enlightened masters and spiritual guides.'
    },
    'krishna': { 
      icon: '🕉️', 
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'The divine play of Lord Krishna - teachings, pastimes, and eternal wisdom.'
    },
    'numerology': { 
      icon: '🔢', 
      color: 'from-teal-500 to-emerald-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      description: 'Discover the hidden meanings and spiritual significance of numbers.'
    },
    'quotes': { 
      icon: '💫', 
      color: 'from-yellow-500 to-amber-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      description: 'Divine quotes and sayings from saints and sages to inspire your journey.'
    },
    'radha': { 
      icon: '🌸', 
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      description: 'The divine love of Radha - devotion, grace, and spiritual romance.'
    },
    'religion': { 
      icon: '🕯️', 
      color: 'from-red-500 to-orange-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      description: 'Exploring the wisdom of various religious traditions and their teachings.'
    },
    'religion-and-spirituality': { 
      icon: '☸️', 
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'The intersection of religion and spirituality in daily life.'
    },
    'religious-beliefs': { 
      icon: '✝️', 
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: 'Exploring diverse religious beliefs and their spiritual foundations.'
    },
    'shiva': { 
      icon: '🔱', 
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      description: 'The cosmic dance of Lord Shiva - destruction, creation, and transcendence.'
    },
    'spirituality': { 
      icon: '🧘‍♂️', 
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200',
      description: 'Practical wisdom for your spiritual journey and inner transformation.'
    },
    'travel-destination': { 
      icon: '🏛️', 
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      description: 'Sacred journeys to holy places and divine destinations.'
    },
    'yoga-and-meditation': { 
      icon: '🧘‍♀️', 
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      description: 'Paths to inner peace through yoga, meditation, and mindfulness.'
    }
  }
  
  return metadata[category] || { 
    icon: '📿', 
    color: 'from-gray-500 to-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    description: 'Divine teachings and spiritual wisdom.'
  }
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
  const meta = getCategoryMetadata(category)
  
  // Featured post (first or most recent)
  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#f8f6f2] to-[#f0ebe4] border-b border-[#e8e0d6]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#d98e04] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className={`text-5xl md:text-6xl bg-white p-4 rounded-2xl shadow-sm border ${meta.borderColor}`}>
                {meta.icon}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                    {categoryName}
                  </h1>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white border ${meta.borderColor} text-gray-700`}>
                    {posts.length} Articles
                  </span>
                </div>
                <p className="text-base text-gray-600 max-w-2xl">
                  {meta.description}
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex items-center gap-6 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#e8e0d6] shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#d98e04]">{posts.length}</div>
                <div className="text-xs text-gray-500">Articles</div>
              </div>
              <div className="w-px h-10 bg-[#e8e0d6]"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#d98e04]">∞</div>
                <div className="text-xs text-gray-500">Wisdom</div>
              </div>
              <div className="w-px h-10 bg-[#e8e0d6]"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#d98e04]">🙏</div>
                <div className="text-xs text-gray-500">Blessings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-semibold text-[#d98e04] uppercase tracking-wider">🌟 Featured</span>
            <span className="flex-1 h-px bg-gradient-to-r from-[#d98e04] to-transparent"></span>
          </div>
          
          <Link href={`/${featuredPost.slug}`} className="group block">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#e8e0d6]">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 lg:h-auto min-h-[300px] overflow-hidden">
                  {featuredPost.imageUrl ? (
                    <Image
                      src={featuredPost.imageUrl}
                      alt={featuredPost.imageAlt || featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-[#f8f6f2] to-[#f0ebe4]">
                      {meta.icon}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  
                  {/* Category Badge on Image */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-700 border border-[#e8e0d6] shadow-sm`}>
                      <span>{meta.icon}</span>
                      {categoryName}
                    </span>
                  </div>
                  
                  {/* Reading time badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {featuredPost.readingTime || 5} min read
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <time dateTime={featuredPost.date}>
                      {new Date(featuredPost.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-[#d98e04] transition-colors mb-3 line-clamp-3">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-base text-gray-600 mb-4 line-clamp-3">
                    {featuredPost.description || 'Explore this divine teaching and deepen your spiritual understanding.'}
                  </p>
                  
                  {featuredPost.tags && featuredPost.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {featuredPost.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="text-xs bg-[#f8f6f2] text-gray-600 px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="inline-flex items-center text-[#d98e04] font-semibold group-hover:text-[#b87400] transition-colors">
                    Read Full Article
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Grid Section - 4 Articles in a Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800 uppercase tracking-wider">📖 All Articles</span>
            <span className="flex-1 h-px w-16 bg-gradient-to-r from-gray-300 to-transparent"></span>
          </div>
          <span className="text-sm text-gray-500">{remainingPosts.length} more articles</span>
        </div>
        
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {remainingPosts.map((post) => (
            <article 
              key={post.slug}
              className="group bg-white rounded-xl border border-[#e8e0d6] overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col h-full"
            >
              <Link href={`/${post.slug}`} className="block h-full flex flex-col">
                <div className="relative h-40 overflow-hidden flex-shrink-0">
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.imageAlt || post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-[#f8f6f2] to-[#f0ebe4]">
                      {meta.icon}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                    <span>•</span>
                    <span>{post.readingTime || 5} min</span>
                  </div>
                  
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#d98e04] transition-colors line-clamp-2 mb-1.5 flex-1">
                    {post.title}
                  </h3>
                  
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                    {post.description || 'Explore this divine teaching.'}
                  </p>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-auto pt-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag}
                          className="text-[10px] bg-[#f8f6f2] text-gray-600 px-1.5 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="text-[10px] text-gray-400">+{post.tags.length - 2}</span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Load More / Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-white px-6 py-3 rounded-full border border-[#e8e0d6] shadow-sm">
            <span className="text-sm text-gray-600">
              🙏 {posts.length} articles to deepen your spiritual journey
            </span>
            <span className="w-px h-6 bg-[#e8e0d6]"></span>
            <span className="text-sm text-[#d98e04] font-medium">
              Jai Shri Krishna
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}