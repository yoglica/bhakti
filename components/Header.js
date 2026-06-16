'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const dropdownTimeout = useRef(null)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10
      setIsScrolled(scrolled)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle dropdown hover with delay
  const handleDropdownEnter = (dropdownName) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current)
    }
    setActiveDropdown(dropdownName)
  }

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout.current) {
        clearTimeout(dropdownTimeout.current)
      }
    }
  }, [])

  // Create a navigation handler that closes all menus
  const handleNavigation = useCallback(() => {
    setIsMenuOpen(false)
    setShowSearch(false)
    setActiveDropdown(null)
  }, [])

  // Close menus when pathname changes
  const prevPathname = useRef(pathname)
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setIsMenuOpen(false)
      setShowSearch(false)
      setActiveDropdown(null)
      prevPathname.current = pathname
    }
  }, [pathname])

  // Mega Dropdown Data
  const megaMenus = {
    teachings: {
      title: "Divine Teachings",
      icon: "🕉️",
      columns: [
        {
          title: "Scriptures",
          links: [
            { name: "Bhagavad Gita", href: "/teachings/bhagavad-gita", description: "The Song of God" },
            { name: "Radha Sudha Nidhi", href: "/teachings/radha-sudha-nidhi", description: "Divine nectar" },
            { name: "Vedas & Upanishads", href: "/teachings/vedas", description: "Ancient wisdom" },
            { name: "Bhagavata Purana", href: "/teachings/bhagavata-purana", description: "Stories of Krishna" },
          ]
        },
        {
          title: "Spiritual Paths",
          links: [
            { name: "Bhakti Yoga", href: "/teachings/bhakti-yoga", description: "Path of devotion" },
            { name: "Karma Yoga", href: "/teachings/karma-yoga", description: "Path of action" },
            { name: "Jnana Yoga", href: "/teachings/jnana-yoga", description: "Path of knowledge" },
            { name: "Dhyana Yoga", href: "/teachings/dhyana-yoga", description: "Path of meditation" },
          ]
        },
        {
          title: "Sacred Texts",
          links: [
            { name: "Ramayana", href: "/teachings/ramayana", description: "Lord Rama's story" },
            { name: "Mahabharata", href: "/teachings/mahabharata", description: "Epic of India" },
            { name: "Chaitanya Charitamrita", href: "/teachings/chaitanya", description: "Lord Chaitanya's life" },
            { name: "Premand Ji's Discourses", href: "/teachings/premand-ji", description: "Modern wisdom" },
          ]
        },
        {
          title: "Daily Wisdom",
          links: [
            { name: "Quote of the Day", href: "/teachings/quote-of-day", description: "Daily inspiration" },
            { name: "Verse of the Day", href: "/teachings/verse-of-day", description: "Scriptural insights" },
            { name: "Saint Stories", href: "/teachings/saint-stories", description: "Inspiring lives" },
            { name: "Q&A with Saints", href: "/teachings/qa-saints", description: "Spiritual guidance" },
          ]
        },
      ]
    },
    satsangs: {
      title: "Satsangs & Events",
      icon: "🕯️",
      columns: [
        {
          title: "Upcoming Satsangs",
          links: [
            { name: "Virtual Satsang", href: "/satsangs/virtual", description: "Online gatherings" },
            { name: "In-Person Satsang", href: "/satsangs/in-person", description: "Ashram events" },
            { name: "Youth Programs", href: "/satsangs/youth", description: "For young devotees" },
            { name: "Women's Satsang", href: "/satsangs/women", description: "Ladies gatherings" },
          ]
        },
        {
          title: "Festivals",
          links: [
            { name: "Janmashtami", href: "/festivals/janmashtami", description: "Krishna's birth" },
            { name: "Radha Ashtami", href: "/festivals/radha-ashtami", description: "Radha's appearance" },
            { name: "Gita Jayanti", href: "/festivals/gita-jayanti", description: "Gita's birthday" },
            { name: "Holy Days Calendar", href: "/festivals/calendar", description: "All festivals" },
          ]
        },
        {
          title: "Retreats",
          links: [
            { name: "Weekend Retreats", href: "/retreats/weekend", description: "Short getaways" },
            { name: "7-Day Silent Retreat", href: "/retreats/silent", description: "Deep meditation" },
            { name: "Family Retreat", href: "/retreats/family", description: "For all ages" },
            { name: "Seva Retreat", href: "/retreats/seva", description: "Service-based" },
          ]
        },
        {
          title: "Live Streams",
          links: [
            { name: "Morning Aarti", href: "/live/morning-aarti", description: "Daily 6 AM" },
            { name: "Evening Satsang", href: "/live/evening-satsang", description: "Daily 7 PM" },
            { name: "Special Events", href: "/live/special", description: "Live broadcasts" },
            { name: "Recorded Satsangs", href: "/live/recorded", description: "Watch anytime" },
          ]
        },
      ]
    },
    resources: {
      title: "Resources",
      icon: "📿",
      columns: [
        {
          title: "Spiritual Tools",
          links: [
            { name: "Meditation Timer", href: "/tools/meditation-timer", description: "Guided sessions" },
            { name: "Mantra Player", href: "/tools/mantra-player", description: "Chant along" },
            { name: "Temple Locator", href: "/tools/temple-locator", description: "Find nearby temple" },
            { name: "Festival Calendar", href: "/tools/festival-calendar", description: "Plan celebrations" },
          ]
        },
        {
          title: "Community",
          links: [
            { name: "Discussion Forum", href: "/community/forum", description: "Ask questions" },
            { name: "Devotee Stories", href: "/community/stories", description: "Share experiences" },
            { name: "Volunteer Opportunities", href: "/community/volunteer", description: "Seva projects" },
            { name: "Study Groups", href: "/community/study-groups", description: "Join online" },
          ]
        },
        {
          title: "Media",
          links: [
            { name: "Video Gallery", href: "/media/videos", description: "Satsang videos" },
            { name: "Audio Podcast", href: "/media/podcast", description: "Listen on the go" },
            { name: "Photo Gallery", href: "/media/photos", description: "Ashram moments" },
            { name: "E-books", href: "/media/ebooks", description: "Free downloads" },
          ]
        },
        {
          title: "Support",
          links: [
            { name: "Donate for Seva", href: "/support/donate", description: "Support mission" },
            { name: "Sponsor a Child", href: "/support/sponsor", description: "Education support" },
            { name: "Volunteer", href: "/support/volunteer", description: "Join our team" },
            { name: "Prayer Requests", href: "/support/prayers", description: "Submit requests" },
          ]
        },
      ]
    }
  }

  const handleSearch = useCallback((e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }, [searchQuery])

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm' 
          : 'bg-white shadow-sm'
      }`}
    >
      {/* Top Announcement Bar */}
      <div className="hidden lg:block bg-[#f8f6f2] border-b border-[#e8e0d6] text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-4 text-gray-500">
            <span>🌸 Radhe Radhe</span>
            <span>•</span>
            <span>🙏 Jai Shri Krishna</span>
            <span>•</span>
            <span>🕉️ Premand Ji Maharaj Ki Jai</span>
            <span>•</span>
            <span>📿 Upcoming Satsang: June 15, 2026</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={handleNavigation} className="flex items-center gap-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-[#d98e04] to-[#b87400] bg-clip-text text-transparent">
                Premand Ji
              </div>
              <span className="hidden lg:inline text-xs text-gray-400">Divine Blessings</span>
            </Link>
          </div>

          {/* Desktop Navigation with Mega Dropdowns */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Home Link */}
            <Link
              href="/"
              onClick={handleNavigation}
              className={`relative text-gray-700 hover:text-[#d98e04] transition-colors font-medium group ${
                pathname === '/' ? 'text-[#d98e04]' : ''
              }`}
            >
              Home
              <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-[#d98e04] transform origin-left transition-transform duration-300 ${
                pathname === '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>

            {/* Teachings Mega Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('teachings')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`relative text-gray-700 hover:text-[#d98e04] transition-colors font-medium group flex items-center gap-1 ${
                  pathname?.startsWith('/teachings') ? 'text-[#d98e04]' : ''
                }`}
              >
                Teachings
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-[#d98e04] transform origin-left transition-transform duration-300 ${
                  pathname?.startsWith('/teachings') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>

              {activeDropdown === 'teachings' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-screen max-w-5xl bg-white rounded-xl shadow-xl border border-[#e8e0d6] overflow-visible z-50">
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e8e0d6] sticky top-0 bg-white">
                      <span className="text-2xl">{megaMenus.teachings.icon}</span>
                      <h3 className="text-lg font-bold text-gray-800">{megaMenus.teachings.title}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {megaMenus.teachings.columns.map((column, idx) => (
                        <div key={idx}>
                          <h4 className="font-semibold text-gray-800 mb-3 text-sm">{column.title}</h4>
                          <ul className="space-y-2">
                            {column.links.map((link, linkIdx) => (
                              <li key={linkIdx}>
                                <Link
                                  href={link.href}
                                  className="block group"
                                  onClick={handleNavigation}
                                >
                                  <div className="text-sm font-medium text-gray-700 group-hover:text-[#d98e04] transition">
                                    {link.name}
                                  </div>
                                  <div className="text-xs text-gray-400 group-hover:text-gray-500">
                                    {link.description}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#f8f6f2] px-6 py-3 border-t border-[#e8e0d6]">
                    <Link href="/teachings/all" onClick={handleNavigation} className="text-sm text-[#d98e04] hover:underline flex items-center gap-1">
                      View all teachings →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Satsangs Mega Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('satsangs')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`relative text-gray-700 hover:text-[#d98e04] transition-colors font-medium group flex items-center gap-1 ${
                  pathname?.startsWith('/satsangs') ? 'text-[#d98e04]' : ''
                }`}
              >
                Satsangs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-[#d98e04] transform origin-left transition-transform duration-300 ${
                  pathname?.startsWith('/satsangs') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>

              {activeDropdown === 'satsangs' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-screen max-w-5xl bg-white rounded-xl shadow-xl border border-[#e8e0d6] overflow-visible z-50">
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e8e0d6] sticky top-0 bg-white">
                      <span className="text-2xl">{megaMenus.satsangs.icon}</span>
                      <h3 className="text-lg font-bold text-gray-800">{megaMenus.satsangs.title}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {megaMenus.satsangs.columns.map((column, idx) => (
                        <div key={idx}>
                          <h4 className="font-semibold text-gray-800 mb-3 text-sm">{column.title}</h4>
                          <ul className="space-y-2">
                            {column.links.map((link, linkIdx) => (
                              <li key={linkIdx}>
                                <Link
                                  href={link.href}
                                  className="block group"
                                  onClick={handleNavigation}
                                >
                                  <div className="text-sm font-medium text-gray-700 group-hover:text-[#d98e04] transition">
                                    {link.name}
                                  </div>
                                  <div className="text-xs text-gray-400 group-hover:text-gray-500">
                                    {link.description}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#f8f6f2] px-6 py-3 border-t border-[#e8e0d6]">
                    <Link href="/satsangs/all" onClick={handleNavigation} className="text-sm text-[#d98e04] hover:underline flex items-center gap-1">
                      View all satsangs →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Mega Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('resources')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`relative text-gray-700 hover:text-[#d98e04] transition-colors font-medium group flex items-center gap-1 ${
                  pathname?.startsWith('/resources') ? 'text-[#d98e04]' : ''
                }`}
              >
                Resources
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-[#d98e04] transform origin-left transition-transform duration-300 ${
                  pathname?.startsWith('/resources') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-screen max-w-5xl bg-white rounded-xl shadow-xl border border-[#e8e0d6] overflow-visible z-50">
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e8e0d6] sticky top-0 bg-white">
                      <span className="text-2xl">{megaMenus.resources.icon}</span>
                      <h3 className="text-lg font-bold text-gray-800">{megaMenus.resources.title}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {megaMenus.resources.columns.map((column, idx) => (
                        <div key={idx}>
                          <h4 className="font-semibold text-gray-800 mb-3 text-sm">{column.title}</h4>
                          <ul className="space-y-2">
                            {column.links.map((link, linkIdx) => (
                              <li key={linkIdx}>
                                <Link
                                  href={link.href}
                                  className="block group"
                                  onClick={handleNavigation}
                                >
                                  <div className="text-sm font-medium text-gray-700 group-hover:text-[#d98e04] transition">
                                    {link.name}
                                  </div>
                                  <div className="text-xs text-gray-400 group-hover:text-gray-500">
                                    {link.description}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#f8f6f2] px-6 py-3 border-t border-[#e8e0d6]">
                    <Link href="/resources/all" onClick={handleNavigation} className="text-sm text-[#d98e04] hover:underline flex items-center gap-1">
                      View all resources →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* About Link */}
            <Link
              href="/about"
              onClick={handleNavigation}
              className={`relative text-gray-700 hover:text-[#d98e04] transition-colors font-medium group ${
                pathname === '/about' ? 'text-[#d98e04]' : ''
              }`}
            >
              About
              <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-[#d98e04] transform origin-left transition-transform duration-300 ${
                pathname === '/about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>

            {/* Ashram Link */}
            <Link
              href="/ashram"
              onClick={handleNavigation}
              className={`relative text-gray-700 hover:text-[#d98e04] transition-colors font-medium group ${
                pathname === '/ashram' ? 'text-[#d98e04]' : ''
              }`}
            >
              Ashram
              <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-[#d98e04] transform origin-left transition-transform duration-300 ${
                pathname === '/ashram' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>

            {/* Contact Link */}
            <Link
              href="/contact"
              onClick={handleNavigation}
              className={`relative text-gray-700 hover:text-[#d98e04] transition-colors font-medium group ${
                pathname === '/contact' ? 'text-[#d98e04]' : ''
              }`}
            >
              Contact
              <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-[#d98e04] transform origin-left transition-transform duration-300 ${
                pathname === '/contact' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-gray-500 hover:text-[#d98e04] transition rounded-full hover:bg-[#f8f6f2]"
              aria-label="Search teachings"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Daily Blessing Button */}
            <Link
              href="/daily-blessing"
              onClick={handleNavigation}
              className="hidden sm:inline-flex px-4 py-2 bg-[#d98e04] text-white text-sm font-medium rounded-lg hover:bg-[#b87400] transition-all duration-300 shadow-sm"
            >
              🙏 Daily Blessing
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-[#f8f6f2] transition"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="py-4 border-t border-[#e8e0d6]">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search divine teachings, discourses, articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-lg border border-[#e8e0d6] bg-white focus:outline-none focus:ring-2 focus:ring-[#d98e04] focus:border-transparent"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#d98e04]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu with Categories */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#e8e0d6] bg-white relative z-50">
            <div className="flex flex-col space-y-3">
              <Link href="/" onClick={handleNavigation} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-[#f8f6f2] transition">
                Home
              </Link>
              
              {/* Mobile Teachings Section */}
              <div className="px-3 py-2">
                <div className="font-semibold text-gray-800 mb-2">Teachings</div>
                <div className="pl-4 space-y-2">
                  <Link href="/teachings/bhagavad-gita" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Bhagavad Gita</Link>
                  <Link href="/teachings/radha-sudha-nidhi" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Radha Sudha Nidhi</Link>
                  <Link href="/teachings/bhakti-yoga" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Bhakti Yoga</Link>
                  <Link href="/teachings/all" onClick={handleNavigation} className="block text-sm text-[#d98e04] hover:text-[#b87400] font-medium mt-2">View all teachings →</Link>
                </div>
              </div>
              
              {/* Mobile Satsangs Section */}
              <div className="px-3 py-2">
                <div className="font-semibold text-gray-800 mb-2">Satsangs & Events</div>
                <div className="pl-4 space-y-2">
                  <Link href="/satsangs/virtual" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Virtual Satsang</Link>
                  <Link href="/satsangs/in-person" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">In-Person Satsang</Link>
                  <Link href="/festivals/calendar" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Festival Calendar</Link>
                  <Link href="/satsangs/all" onClick={handleNavigation} className="block text-sm text-[#d98e04] hover:text-[#b87400] font-medium mt-2">View all satsangs →</Link>
                </div>
              </div>
              
              {/* Mobile Resources Section */}
              <div className="px-3 py-2">
                <div className="font-semibold text-gray-800 mb-2">Resources</div>
                <div className="pl-4 space-y-2">
                  <Link href="/tools/meditation-timer" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Meditation Timer</Link>
                  <Link href="/media/videos" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Video Gallery</Link>
                  <Link href="/community/forum" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Community Forum</Link>
                  <Link href="/resources/all" onClick={handleNavigation} className="block text-sm text-[#d98e04] hover:text-[#b87400] font-medium mt-2">View all resources →</Link>
                </div>
              </div>
              
              <Link href="/about" onClick={handleNavigation} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-[#f8f6f2] transition">
                About
              </Link>
              <Link href="/ashram" onClick={handleNavigation} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-[#f8f6f2] transition">
                Ashram
              </Link>
              <Link href="/contact" onClick={handleNavigation} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-[#f8f6f2] transition">
                Contact
              </Link>
              
              <div className="pt-3 border-t border-[#e8e0d6]">
                <Link
                  href="/daily-blessing"
                  onClick={handleNavigation}
                  className="block w-full px-3 py-2 text-center bg-[#d98e04] text-white rounded-lg hover:bg-[#b87400] transition"
                >
                  🙏 Receive Daily Blessing
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}