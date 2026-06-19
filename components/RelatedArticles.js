// components/RelatedArticles.jsx

import Link from 'next/link'
import Image from 'next/image'

export default function RelatedArticles({ posts, currentSlug }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="related-article-header !mb-2">
          Related Articles
        </h3>
        <p className="!text-[16px] !text-gray-600">
          No related articles found.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="related-article-header">
        Related Articles
      </h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="flex gap-4 group hover:bg-white p-3 rounded-lg transition-colors -mx-2"
          >
            {/* Image - Left side */}
            <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt || post.title || 'Article image'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="96px"
                  unoptimized={true}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl bg-gray-100">
                  📄
                </div>
              )}
            </div>

            {/* Content - Right side */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h4 className="related-article-title line-clamp-2">
                {post.title}
              </h4>
              <div className="related-article-meta flex items-center gap-2 mt-1.5">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <span>·</span>
                <span>{post.readingTime || 5} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}