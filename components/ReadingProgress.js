'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (scrollTop / height) * 100
      setWidth(scrolled)
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div 
      className="fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-300"
      style={{ width: `${width}%` }}
    />
  )
}