import Link from 'next/link'
import { getRelatedPosts } from '@/lib/posts'

export default async function RelatedArticles({ currentSlug, currentTags, currentCategory, limit = 4 }) {
  const relatedPosts = await getRelatedPosts({
    slug: currentSlug,
    tags: currentTags || [],
    category: currentCategory || ''
  }, limit)
  
  if (!relatedPosts || relatedPosts.length === 0) {
    return null
  }
  
  return (
    <div className="space-y-5">
      <h3 className="text-base font-medium text-gray-900 tracking-tight">
        Related reads
      </h3>
      
      <div className="space-y-6">
        {relatedPosts.map((post) => (
          <Link 
            key={post.slug} 
            href={`/${post.slug}`}
            className="group block"
          >
            <div className="flex gap-4">
              {post.imageUrl && (
                <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg bg-gray-50">
                  <img 
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition line-clamp-2 text-sm leading-snug">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
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
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {post.matchingTags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-gray-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}