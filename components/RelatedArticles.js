// components/RelatedArticles.jsx

import Link from 'next/link'
import Image from 'next/image'

export default function RelatedArticles({ posts, currentSlug }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="font-bold text-gray-800 mb-2">Related Articles</h3>
        <p className="text-sm text-gray-600">No related articles found.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="font-bold text-gray-800 mb-3">Related Articles</h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="flex gap-3 group items-start hover:bg-white p-2 rounded-lg transition-colors -mx-2"
          >
            {/* Image - Left side */}
            <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt || post.title || 'Article image'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="80px"
                  unoptimized={true}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl bg-gray-100">
                  📄
                </div>
              )}
            </div>

            {/* Content - Right side */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
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
              {post.matchingTags && post.matchingTags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {post.matchingTags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs text-blue-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}