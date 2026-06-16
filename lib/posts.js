// lib/posts.js

import { readFile, readdir } from 'fs/promises'
import path from 'path'
import fs from 'fs'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

// Cache for performance
let cachedPosts = null
let lastCacheTime = 0
const CACHE_TTL = 60000

// Extract metadata from HTML comments
function extractMetadata(htmlContent) {
  if (!htmlContent) return {}
  
  const commentMatch = htmlContent.match(/<!--\s*([\s\S]*?)\s*-->/)
  if (!commentMatch) return {}
  
  const metadata = {}
  const lines = commentMatch[1].split('\n')
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue
    
    const key = line.substring(0, colonIndex).trim()
    let value = line.substring(colonIndex + 1).trim()
    
    if (key === 'tags') {
      value = value.split(',').map(t => t.trim().toLowerCase()).filter(t => t)
    }
    
    metadata[key] = value
  }
  
  return metadata
}

// Recursively get all files from directories
function getAllFiles(dir, basePath = '') {
  const items = fs.readdirSync(dir, { withFileTypes: true })
  let files = []
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    const relativePath = basePath ? `${basePath}/${item.name}` : item.name
    
    if (item.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, relativePath))
    } else if (item.name.endsWith('.html')) {
      files.push({ fullPath, relativePath })
    }
  }
  
  return files
}

// Get all posts with caching - SUPPORTS NESTED FOLDERS
export async function getAllPosts(forceRefresh = false) {
  const now = Date.now()
  
  if (!forceRefresh && cachedPosts && (now - lastCacheTime) < CACHE_TTL) {
    return cachedPosts
  }
  
  try {
    const files = getAllFiles(postsDirectory)
    const posts = []
    
    for (const file of files) {
      try {
        const slug = file.relativePath.replace('.html', '')
        const content = await readFile(file.fullPath, 'utf-8')
        const metadata = extractMetadata(content)
        
        // Calculate reading time
        const cleanContent = content.replace(/<!--[\s\S]*?-->/, '').trim()
        const wordCount = cleanContent.split(/\s+/).length
        const readingTime = metadata['reading-time'] || Math.ceil(wordCount / 200)
        
        posts.push({
          slug: slug,
          title: metadata.title || slug.split('/').pop()?.replace(/-/g, ' ') || 'Untitled',
          description: metadata.description || '',
          date: metadata.date || new Date().toISOString(),
          modified: metadata.modified || metadata.date,
          author: metadata.author || 'Anonymous',
          authorUrl: metadata.author_url || '',
          authorTwitter: metadata.author_twitter || '',
          category: metadata.category || '',
          tags: Array.isArray(metadata.tags) ? metadata.tags : [],
          imageUrl: metadata.image || '',
          imageAlt: metadata.image_alt || metadata.title || '',
          readingTime: readingTime || 5,
          wordCount: wordCount || 0,
        })
      } catch (err) {
        console.error(`Error processing file ${file.relativePath}:`, err)
        continue
      }
    }
    
    cachedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date))
    lastCacheTime = now
    
    return cachedPosts
  } catch (error) {
    console.error('Error getting posts:', error)
    return []
  }
}

// Get single post by slug - SUPPORTS NESTED PATHS
export async function getPostBySlug(slug) {
  if (!slug) return null
  
  try {
    const filePath = path.join(postsDirectory, `${slug}.html`)
    const content = await readFile(filePath, 'utf-8')
    const metadata = extractMetadata(content)
    
    // Remove metadata comment from content
    const cleanContent = content.replace(/<!--[\s\S]*?-->/, '').trim()
    
    // Calculate reading time
    const wordCount = cleanContent.split(/\s+/).length
    const readingTime = metadata['reading-time'] || Math.ceil(wordCount / 200)
    
    return {
      slug: slug,
      content: cleanContent,
      title: metadata.title || slug.split('/').pop()?.replace(/-/g, ' ') || 'Untitled',
      description: metadata.description || '',
      date: metadata.date || new Date().toISOString(),
      modified: metadata.modified || metadata.date,
      author: metadata.author || 'Anonymous',
      authorUrl: metadata.author_url || '',
      authorTwitter: metadata.author_twitter || '',
      category: metadata.category || '',
      tags: Array.isArray(metadata.tags) ? metadata.tags : [],
      imageUrl: metadata.image || '',
      imageAlt: metadata.image_alt || metadata.title || '',
      imageWidth: metadata.image_width || 1200,
      imageHeight: metadata.image_height || 630,
      canonical: metadata.canonical || '',
      ogType: metadata.og_type || 'article',
      ogSiteName: metadata.og_site_name || '',
      twitterCard: metadata.twitter_card || 'summary_large_image',
      twitterSite: metadata.twitter_site || '',
      twitterCreator: metadata.twitter_creator || '',
      readingTime: readingTime,
      wordCount: wordCount,
      language: metadata.language || 'en-US',
      robots: metadata.robots || 'index, follow',
      googlebot: metadata.googlebot || '',
    }
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error)
    return null
  }
}

// Get posts by category
export async function getPostsByCategory(category) {
  if (!category) return []
  
  const allPosts = await getAllPosts()
  const normalizedCategory = category.toLowerCase()
  
  return allPosts.filter(post => {
    // Check if slug starts with category (e.g., "bhagavad-gita/nidhivan...")
    return post.slug.toLowerCase().startsWith(normalizedCategory + '/')
  })
}

// Get all unique categories - FIXED
export async function getAllCategories() {
  const allPosts = await getAllPosts()
  const categories = new Set()
  
  for (const post of allPosts) {
    const parts = post.slug.split('/')
    if (parts.length > 1) {
      categories.add(parts[0])
    }
  }
  
  return Array.from(categories)
}

export async function getRelatedPosts(currentPost, limit = 3) {
  if (!currentPost || !currentPost.slug) {
    return []
  }
  
  const allPosts = await getAllPosts()
  
  if (!allPosts || allPosts.length === 0) {
    return []
  }
  
  const currentTags = Array.isArray(currentPost.tags) ? currentPost.tags : []
  const currentCategory = currentPost.category || ''
  
  const scoredPosts = []
  
  for (const post of allPosts) {
    if (!post || !post.slug || post.slug === currentPost.slug) {
      continue
    }
    
    let score = 0
    const matchingTags = []
    
    if (currentCategory && post.category === currentCategory) {
      score += 10
    }
    
    const postTags = Array.isArray(post.tags) ? post.tags : []
    if (currentTags.length > 0 && postTags.length > 0) {
      for (const tag of currentTags) {
        if (tag && postTags.includes(tag)) {
          score += 2
          matchingTags.push(tag)
        }
      }
    }
    
    if (score > 0) {
      scoredPosts.push({
        ...post,  // This includes all post properties including imageUrl
        score,
        matchingTags
      })
    }
  }
  
  return scoredPosts
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, limit)
}

// Get paginated posts
export async function getPaginatedPosts(page = 1, pageSize = 10) {
  const allPosts = await getAllPosts()
  const totalPages = Math.ceil(allPosts.length / pageSize)
  const start = (page - 1) * pageSize
  const posts = allPosts.slice(start, start + pageSize)
  
  return { posts, totalPages, currentPage: page }
}

// Get posts by tag
export async function getPostsByTag(tag) {
  if (!tag) return []
  
  const allPosts = await getAllPosts()
  const normalizedTag = tag.toLowerCase()
  
  return allPosts.filter(post => {
    const postTags = Array.isArray(post.tags) ? post.tags : []
    return postTags.some(t => t && t.toLowerCase() === normalizedTag)
  })
}

// Get all unique tags with counts
export async function getAllTags() {
  const allPosts = await getAllPosts()
  const tagsMap = new Map()
  
  for (const post of allPosts) {
    const postTags = Array.isArray(post.tags) ? post.tags : []
    for (const tag of postTags) {
      if (tag) {
        const normalizedTag = tag.toLowerCase()
        tagsMap.set(normalizedTag, (tagsMap.get(normalizedTag) || 0) + 1)
      }
    }
  }
  
  return Array.from(tagsMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}