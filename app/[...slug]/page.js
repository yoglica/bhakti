// app/[...slug]/page.js

import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import RelatedArticles from '@/components/RelatedArticles'

export const dynamic = 'auto'
export const revalidate = 3600

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params
  
  if (!slug || !Array.isArray(slug) || slug.length === 0) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found',
      robots: 'noindex, nofollow',
    }
  }
  
  const slugString = slug.join('/')
  if (slugString.startsWith('.well-known') || slugString.startsWith('_next')) {
    return {
      title: 'Not Found',
      description: 'The requested resource could not be found',
      robots: 'noindex, nofollow',
    }
  }
  
  const post = await getPostBySlug(slugString)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found',
      robots: 'noindex, nofollow',
    }
  }
  
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

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug.split('/')
  }))
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
  if (slugString.startsWith('.well-known') || slugString.startsWith('_next')) {
    notFound()
  }
  
  if (slug.some(part => part.includes('..') || part.includes('/') || part.includes('\\'))) {
    notFound()
  }
  
  console.log('Looking for post:', slugString)
  
  const post = await getPostBySlug(slugString)
  
  if (!post) {
    console.log('Post not found for slug:', slugString)
    notFound()
  }
  
  console.log('Post found:', post.title)
  
  const category = slug.length > 1 ? slug[0] : null
  const relatedPosts = await getRelatedPosts(post, 5)

  console.log('Passing to RelatedArticles:', {
    postsCount: relatedPosts.length,
    firstPostImage: relatedPosts[0]?.imageUrl
  })
  
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
                href={`/category/${category}`}
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