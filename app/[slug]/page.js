import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import RelatedArticles from '@/components/RelatedArticles'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found',
      robots: 'noindex, nofollow',
    }
  }
  
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: post.canonical || `https://yourblog.com/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.imageUrl,
          alt: post.imageAlt || post.title,
          width: post.imageWidth || 1200,
          height: post.imageHeight || 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.imageUrl],
    },
  }
}

// Pre-render recent posts
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.slice(0, 5).map((post) => ({ slug: post.slug }))
}

// Main page component with two-column layout
export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }
  
  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.imageUrl,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: post.authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MyBlog',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourblog.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yourblog.com/${post.slug}`,
    },
    keywords: post.tags?.join(', '),
  }
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: Main Article Content */}
          <div className="lg:w-2/3">
            {/* Blog Content */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            
            {/* Tags Section */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-semibold text-gray-700">Tags:</span>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* RIGHT COLUMN: Sidebar with Related Articles */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <RelatedArticles 
                currentSlug={post.slug}
                currentTags={post.tags}
                currentCategory={post.category}
                limit={4}
              />
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}