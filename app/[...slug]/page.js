// app/[...slug]/page.js

import { getPostBySlug, getAllPosts, getRelatedPosts, getPageBySlug, getPostsByCategory } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import RelatedArticles from '@/components/RelatedArticles'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const PAGE_SLUGS = ['about-us', 'contact', 'privacy', 'terms']

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params
  
  if (!slug || !Array.isArray(slug) || slug.length === 0) {
    return {
      title: 'Not Found',
      description: 'The requested page could not be found',
      robots: 'noindex, nofollow',
    }
  }
  
  const slugString = slug.join('/')
  
  // Skip system paths
  if (slugString.startsWith('.well-known') || slugString.startsWith('_next')) {
    return {
      title: 'Not Found',
      description: 'The requested resource could not be found',
      robots: 'noindex, nofollow',
    }
  }
  
  // Check if it's a page
  if (PAGE_SLUGS.includes(slugString) || PAGE_SLUGS.includes(slug[0])) {
    const pageSlug = slugString === 'about-us' ? 'about-us' : slugString
    const page = await getPageBySlug(pageSlug)
    if (page) {
      return {
        title: page.title,
        description: page.description,
        alternates: {
          canonical: page.canonical || `https://yourblog.com/${slugString}/`,
        },
        openGraph: {
          title: page.title,
          description: page.description,
          type: page.ogType || 'website',
          images: page.imageUrl ? [
            {
              url: page.imageUrl,
              alt: page.imageAlt || page.title,
              width: page.imageWidth || 1200,
              height: page.imageHeight || 630,
            },
          ] : undefined,
        },
        twitter: {
          card: page.twitterCard || 'summary_large_image',
          title: page.title,
          description: page.description,
          images: page.imageUrl ? [page.imageUrl] : undefined,
        },
      }
    }
  }
  
  // Try to find as a post
  const post = await getPostBySlug(slugString)
  
  if (post) {
    const category = slug.length > 1 ? slug[0] : null
    
    return {
      title: post.title,
      description: post.description,
      alternates: {
        canonical: post.canonical || `https://yourblog.com/${slugString}`,
      },
      openGraph: {
        title: post.title,
        description: post.description,
        type: post.ogType || 'article',
        publishedTime: post.date,
        modifiedTime: post.modified || post.date,
        authors: post.author ? [post.author] : undefined,
        tags: post.tags,
        category: category || undefined,
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
        card: post.twitterCard || 'summary_large_image',
        title: post.title,
        description: post.description,
        images: post.imageUrl ? [post.imageUrl] : undefined,
        site: post.twitterSite || undefined,
        creator: post.twitterCreator || undefined,
      },
      keywords: post.tags?.join(', '),
      robots: post.robots || 'index, follow',
    }
  }
  
  // Check if it's a category
  const categoryPosts = await getPostsByCategory(slugString)
  if (categoryPosts && categoryPosts.length > 0) {
    return {
      title: `${slugString.replace(/-/g, ' ').toUpperCase()} - Divine Teachings`,
      description: `Explore divine teachings and articles about ${slugString.replace(/-/g, ' ')}`,
      openGraph: {
        title: `${slugString.replace(/-/g, ' ').toUpperCase()} - Divine Teachings`,
        description: `Explore spiritual wisdom and articles about ${slugString.replace(/-/g, ' ')}`,
        type: 'website',
      },
    }
  }
  
  return {
    title: 'Not Found',
    description: 'The requested page could not be found',
    robots: 'noindex, nofollow',
  }
}

// Generate static paths - return empty for dynamic
export async function generateStaticParams() {
  return []
}

// Helper function to build breadcrumb data
function buildBreadcrumbs(slug) {
  const parts = slug.join('/').split('/')
  let currentPath = ''
  
  return parts.map((part, index) => {
    currentPath += `/${part}`
    const isLast = index === parts.length - 1
    const displayName = part.replace(/-/g, ' ')
    
    return {
      path: currentPath,
      displayName,
      isLast
    }
  })
}

// Breadcrumb Component
function Breadcrumb({ slug }) {
  const breadcrumbs = buildBreadcrumbs(slug)
  
  return (
    <nav className="text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center space-x-2">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>
        {breadcrumbs.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            {item.isLast ? (
              <span className="text-gray-600 font-medium truncate max-w-[200px]">
                {item.displayName}
              </span>
            ) : (
              <Link 
                href={item.path} 
                className="text-blue-600 hover:underline truncate max-w-[150px]"
              >
                {item.displayName}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Category Page Component
function CategoryPage({ category, posts }) {
  const categoryName = category.replace(/-/g, ' ').toUpperCase()
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article 
            key={post.slug}
            className="group bg-white rounded-xl border border-[#e8e0d6] overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <Link href={`/${post.slug}`} className="block">
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
                
                <div className="mt-4 inline-flex items-center text-sm font-medium text-[#d98e04] group-hover:text-[#b87400]">
                  Read Article
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

// Share Buttons
function ShareButtons({ url, title }) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  }
  
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-semibold text-gray-700">Share:</span>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 bg-blue-400 text-white text-sm rounded hover:bg-blue-500 transition-colors"
      >
        Twitter
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 bg-blue-700 text-white text-sm rounded hover:bg-blue-800 transition-colors"
      >
        LinkedIn
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
      >
        Facebook
      </a>
      <a
        href={shareLinks.email}
        className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-800 transition-colors"
      >
        Email
      </a>
    </div>
  )
}

// Tags Component
function PostTags({ tags }) {
  if (!tags || tags.length === 0) return null
  
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-semibold text-gray-700">Tags:</span>
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  )
}

// Author Bio Component
function AuthorBio({ author, authorUrl, authorTwitter }) {
  if (!author) return null
  
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
          {author.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">
            {author}
          </h4>
          <div className="flex items-center gap-3 mt-1">
            {authorUrl && (
              <a 
                href={authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Website
              </a>
            )}
            {authorTwitter && (
              <a 
                href={`https://twitter.com/${authorTwitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:underline"
              >
                Twitter
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Main page component
export default async function BlogPost({ params }) {
  const { slug } = await params
  
  if (!slug || !Array.isArray(slug) || slug.length === 0) {
    notFound()
  }
  
  const slugString = slug.join('/')
  
  // Skip system paths
  if (slugString.startsWith('.well-known') || slugString.startsWith('_next')) {
    notFound()
  }
  
  if (slug.some(part => part.includes('..') || part.includes('/') || part.includes('\\'))) {
    notFound()
  }
  
  // Check if it's a page (about-us, contact, etc.)
  if (PAGE_SLUGS.includes(slugString) || PAGE_SLUGS.includes(slug[0])) {
    const pageSlug = slugString === 'about-us' ? 'about-us' : slugString
    const page = await getPageBySlug(pageSlug)
    if (page) {
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <article className="article-content prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-a:text-blue-600">
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </article>
        </div>
      )
    }
  }
  
  // Try to find as a post
  const post = await getPostBySlug(slugString)
  
  if (post) {
    const category = slug.length > 1 ? slug[0] : null
    const relatedPosts = await getRelatedPosts(post, 5)
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourblog.com'
    const fullUrl = `${baseUrl}/${slugString}`
    
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      image: post.imageUrl || undefined,
      datePublished: post.date,
      dateModified: post.modified || post.date,
      author: {
        '@type': 'Person',
        name: post.author,
        url: post.authorUrl || undefined,
      },
      publisher: {
        '@type': 'Organization',
        name: 'MyBlog',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl,
      },
      keywords: post.tags?.join(', ') || undefined,
      articleSection: category || undefined,
      wordCount: post.wordCount || undefined,
      timeRequired: post.readingTime ? `PT${post.readingTime}M` : undefined,
      inLanguage: post.language || 'en-US',
    }
    
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb slug={slug} />
          
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {post.author && (
                <span>
                  By <span className="font-medium text-gray-800">{post.author}</span>
                </span>
              )}
              
              {post.date && (
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
              
              {post.readingTime && (
                <span>{post.readingTime} min read</span>
              )}
              
              {category && (
                <Link 
                  href={`/${category}`}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
                >
                  {category}
                </Link>
              )}
            </div>
          </header>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <article className="lg:w-2/3">
              {post.imageUrl && (
                <div className="mb-8 relative">
                  <Image
                    src={post.imageUrl}
                    alt={post.imageAlt || post.title}
                    width={post.imageWidth || 1200}
                    height={post.imageHeight || 630}
                    className="w-full h-auto rounded-lg shadow-md"
                    priority
                  />
                </div>
              )}
              
              <div 
                className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-a:text-blue-600 prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
              
              <PostTags tags={post.tags} />
              
              <AuthorBio 
                author={post.author}
                authorUrl={post.authorUrl}
                authorTwitter={post.authorTwitter}
              />
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <ShareButtons url={fullUrl} title={post.title} />
              </div>
            </article>
            
            <aside className="lg:w-1/3">
              <div className="sticky top-24 space-y-6">
                <RelatedArticles 
                  posts={relatedPosts}
                  currentSlug={slugString}
                />
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-bold text-gray-800 mb-2">
                    Subscribe to Newsletter
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Get the latest posts delivered right to your inbox.
                  </p>
                  <form className="flex flex-col gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors font-medium"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </>
    )
  }
  
  // If not a post, check if it's a category folder
  const categoryPosts = await getPostsByCategory(slugString)
  if (categoryPosts && categoryPosts.length > 0) {
    return <CategoryPage category={slugString} posts={categoryPosts} />
  }
  
  notFound()
}