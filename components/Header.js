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

  // Organized by categories matching your existing pages
  const megaMenus = {
    scriptures: {
      title: "Sacred Scriptures",
      icon: "📜",
      columns: [
        {
          title: "Bhagavad Gita",
          links: [
            { name: "Leaving Family to Become Sanyasi", href: "/bhagavad-gita/leaving-family-to-become-a-sanyasi" },
            { name: "Purpose of Life", href: "/bhagavad-gita/purpose-of-life-Bhagavad-Gita" },
            { name: "Top 7 Gita Quotes on Success", href: "/top-7-bhagavad-gita-quotes-on-success" },
            { name: "Top 15 Inspirational Gita Quotes", href: "/top-15-bhagavad-gita-inspirational-quotes" },
          ]
        },
        {
          title: "Vedic Wisdom",
          links: [
            { name: "Hinduism", href: "/religion/hindu" },
            { name: "Buddhism", href: "/religion/buddism" },
            { name: "Om - The Sacred Sound", href: "/religious-beliefs/om" },
            { name: "Non-Attachment", href: "/religious-beliefs/non-attachment" },
          ]
        },
        {
          title: "Spiritual Practices",
          links: [
            { name: "Patanjali Ashtanga Yoga", href: "/religion-and-spirituality/patanjali-ashtanga-yoga-step" },
            { name: "How to Get Spiritual", href: "/religion-and-spirituality/how-to-get-spiritual" },
            { name: "Vegetarian Diet", href: "/religion-and-spirituality/vegetarian-diet" },
            { name: "Ekadasi Fasting", href: "/religion-and-spirituality/ekadasi-fasting" },
          ]
        },
      ]
    },
    divine_personalities: {
      title: "Divine Personalities",
      icon: "🕉️",
      columns: [
        {
          title: "Lord Krishna",
          links: [
            { name: "Krishna - Purna Avatar", href: "/krishna/krishna-purna-avatar" },
            { name: "Krishna Life Lessons", href: "/krishna/krishna-life-lessons" },
            { name: "Nidhivan Mystery", href: "/krishna/nidhivan-in-vrindavan-mystery" },
            { name: "Krishna's Heart in Puri", href: "/travel-destination/krishna-heart-alive-in-puri-jagannath-temple-miracle" },
          ]
        },
        {
          title: "Lord Shiva",
          links: [
            { name: "Shiva Facts", href: "/shiva/shiva-facts" },
            { name: "10 Things from Shiva Purana", href: "/shiva/10-things-of-shiva-purana-useful-in-life" },
            { name: "Kailash Mountain Mystery", href: "/shiva/kailash-mountain-mystery" },
            { name: "Jyotirlinga of India", href: "/shiva/jyotirlinga-of-india" },
          ]
        },
        {
          title: "Radha & Other Deities",
          links: [
            { name: "Radha Ashtami", href: "/radha/radha-ashtami" },
            { name: "Sree Ram Janmabhoomi", href: "/travel-destination/sree-ram-janmabhoomi-mandir-ayodhya" },
          ]
        },
      ]
    },
    gurus_saints: {
      title: "Gurus & Saints",
      icon: "🙏",
      columns: [
        {
          title: "Premand Ji Maharaj",
          links: [
            { name: "Divine Discourses", href: "/premand-ji/discourses" },
            { name: "Spiritual Teachings", href: "/premand-ji/teachings" },
            { name: "Life & Mission", href: "/premand-ji/biography" },
            { name: "Satsang Schedule", href: "/premand-ji/satsangs" },
          ]
        },
        {
          title: "Sai Baba",
          links: [
            { name: "Sai Baba Quotes", href: "/quotes/sai-baba-quotes" },
            { name: "Sathya Sai Baba Quotes", href: "/sathya-sai-baba-quotes-in-English" },
            { name: "Sai Baba Miracle Stories", href: "/guru/sai-baba-miracle-stories" },
          ]
        },
        {
          title: "Other Enlightened Masters",
          links: [
            { name: "Ramana Maharshi", href: "/guru/biography-of-ramana-maharshi" },
            { name: "Mahavatar Babaji", href: "/guru/mahavatar-babaji" },
            { name: "Vivekananda Quotes", href: "/success-vivekananda-quotes-life" },
            { name: "Osho Quotes on Life", href: "/top-15-osho-inspirational-quotes-on-life" },
            { name: "Osho on Life & Death", href: "/top-15-osho-inspirational-quotes-on-life-and-death" },
          ]
        },
      ]
    },
    spirituality: {
      title: "Spirituality & Yoga",
      icon: "🧘",
      columns: [
        {
          title: "Meditation & Yoga",
          links: [
            { name: "Benefits of Meditation", href: "/yoga-and-meditation/benefits-of-meditation" },
            { name: "How to Practice Japa", href: "/yoga-and-meditation/how-to-practice-mantra-japa-meditation" },
            { name: "Kundalini Awakening", href: "/yoga-and-meditation/how-to-awaken-kundalini-chakra" },
            { name: "Karma Yoga", href: "/yoga-and-meditation/karma-yoga" },
            { name: "Pranayama", href: "/yoga-and-meditation/prayanama" },
          ]
        },
        {
          title: "Spiritual Living",
          links: [
            { name: "Brahma Muhurta Benefits", href: "/spirituality/brahma-muhurta-time-benefits" },
            { name: "Spiritual Awakening", href: "/spirituality/spiritual-awakening-practices" },
            { name: "Reduce Stress Spiritually", href: "/spirituality/spiritual-steps-to-reduce-stress" },
            { name: "Salvation (Moksha)", href: "/spirituality/what-is-salvation-or-moksha" },
            { name: "Celibacy", href: "/celibacy/celibacy" },
          ]
        },
        {
          title: "Holy Places",
          links: [
            { name: "Kedarnath Yatra", href: "/travel-destination/kedarnath-yatra" },
            { name: "Rameshwaram Temple", href: "/travel-destination/rameshwaram-jyotirlinga-temple" },
            { name: "Rishikesh Yatra", href: "/travel-destination/rishikesh-yatra" },
            { name: "Ujjain Darshan", href: "/travel-destination/ujjain-darshan-tourism" },
            { name: "Varanasi Yatra", href: "/travel-destination/varanasi-yatra" },
            { name: "Shani Shingnapur", href: "/travel-destination/shani-shingnapur-yatra" },
          ]
        },
        {
          title: "Other Religions",
          links: [
            { name: "Amazing Bible Facts", href: "/religious-beliefs/amazing-bible-facts-statistics" },
            { name: "Mystery of Jesus Christ", href: "/religious-beliefs/mystery-of-jesus-christ" },
            { name: "Gautam Buddha Purnima", href: "/religious-beliefs/gautam-buddha-purnima-vesak" },
            { name: "Types of People Considered Dead", href: "/religious-beliefs/types-of-people-who-are-considered-dead" },
          ]
        },
      ]
    },
    numerology: {
      title: "Numerology",
      icon: "🔢",
      columns: [
        {
          title: "Life Path Numbers",
          links: [
            { name: "Life Path 1", href: "/numerology/life-path-number-1-meaning-numerology" },
            { name: "Life Path 2", href: "/numerology/life-path-number-2-meaning-numerology" },
            { name: "Life Path 3", href: "/numerology/life-path-number-3-meaning-numerology" },
            { name: "Life Path 4", href: "/numerology/life-path-number-4-meaning-numerology" },
            { name: "Life Path 5", href: "/numerology/life-path-number-5-meaning-numerology" },
            { name: "Life Path 6", href: "/numerology/life-path-number-6-meaning-numerology" },
            { name: "Life Path 7", href: "/numerology/life-path-number-7-meaning-numerology" },
            { name: "Life Path 8", href: "/numerology/life-path-number-8-meaning-numerology" },
            { name: "Life Path 9", href: "/numerology/life-path-number-9-meaning-numerology" },
          ]
        },
        {
          title: "Vedic Astrology",
          links: [
            { name: "Learn Numerology", href: "/numerology/learn-numerology" },
            { name: "Sacred Numbers", href: "/numerology/sacred-numbers" },
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
      {/* Top Announcement Bar - Featuring Premand Ji Maharaj */}
      <div className="hidden lg:block bg-gradient-to-r from-[#f8f6f2] to-[#f0ebe4] border-b border-[#e8e0d6] text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-4 text-gray-600">
            <span className="text-[#d98e04] font-medium">🌟 Premand Ji Maharaj</span>
            <span>•</span>
            <span>🙏 Jai Shri Krishna</span>
            <span>•</span>
            <span>🕉️ Divine Discourses</span>
            <span>•</span>
            <span>📿 Next Satsang: June 15, 2026</span>
            <span>•</span>
            <span className="text-[#d98e04]">🌸 Radhe Radhe</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo - Centered around Premand Ji */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={handleNavigation} className="flex items-center gap-3">
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-[#d98e04] to-[#b87400] bg-clip-text text-transparent">
                  Premand Ji Maharaj
                </div>
                <div className="text-[10px] text-gray-400 tracking-wider hidden sm:block">
                  Divine Blessings • Spiritual Wisdom
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation with Mega Dropdowns */}
          <nav className="hidden md:flex items-center space-x-5">
            {/* Home Link */}
            <Link
              href="/"
              onClick={handleNavigation}
              className={`relative text-gray-700 hover:text-[#d98e04] transition-colors font-medium group text-sm ${
                pathname === '/' ? 'text-[#d98e04]' : ''
              }`}
            >
              Home
              <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-[#d98e04] transform origin-left transition-transform duration-300 ${
                pathname === '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>

            {/* Scriptures Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('scriptures')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`relative text-gray-700 hover:text-[#d98e04] transition-colors font-medium group flex items-center gap-1 text-sm ${
                  pathname?.startsWith('/bhagavad-gita') || pathname?.startsWith('/religion') ? 'text-[#d98e04]' : ''
                }`}
              >
                Scriptures
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-[#d98e04] transform origin-left transition-transform duration-300 ${
                  pathname?.startsWith('/bhagavad-gita') || pathname?.startsWith('/religion') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>

              {activeDropdown === 'scriptures' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-screen max-w-4xl bg-white rounded-xl shadow-xl border border-[#e8e0d6] overflow-visible z-50">
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e8e0d6] sticky top-0 bg-white">
                      <span className="text-2xl">{megaMenus.scriptures.icon}</span>
                      <h3 className="text-lg font-bold text-gray-800">{megaMenus.scriptures.title}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {megaMenus.scriptures.columns.map((column, idx) => (
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
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Divine Personalities Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('divine_personalities')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`relative text-gray-700 hover:text-[#d98e04] transition-colors font-medium group flex items-center gap-1 text-sm ${
                  pathname?.startsWith('/krishna') || pathname?.startsWith('/shiva') || pathname?.startsWith('/radha') ? 'text-[#d98e04]' : ''
                }`}
              >
                Divine Personalities
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-[#d98e04] transform origin-left transition-transform duration-300 ${
                  pathname?.startsWith('/krishna') || pathname?.startsWith('/shiva') || pathname?.startsWith('/radha') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>

              {activeDropdown === 'divine_personalities' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-screen max-w-4xl bg-white rounded-xl shadow-xl border border-[#e8e0d6] overflow-visible z-50">
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e8e0d6] sticky top-0 bg-white">
                      <span className="text-2xl">{megaMenus.divine_personalities.icon}</span>
                      <h3 className="text-lg font-bold text-gray-800">{megaMenus.divine_personalities.title}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {megaMenus.divine_personalities.columns.map((column, idx) => (
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
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Gurus & Saints Dropdown - Premiering Premand Ji */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('gurus_saints')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`relative text-[#d98e04] font-semibold group flex items-center gap-1 text-sm ${
                  pathname?.startsWith('/premand-ji') || pathname?.startsWith('/guru') || pathname?.startsWith('/quotes') ? 'text-[#d98e04]' : ''
                }`}
              >
                Gurus & Saints
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-[#d98e04] transform origin-left transition-transform duration-300 ${
                  pathname?.startsWith('/premand-ji') || pathname?.startsWith('/guru') || pathname?.startsWith('/quotes') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>

              {activeDropdown === 'gurus_saints' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-screen max-w-5xl bg-white rounded-xl shadow-xl border border-[#e8e0d6] overflow-visible z-50">
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e8e0d6] sticky top-0 bg-white">
                      <span className="text-2xl">{megaMenus.gurus_saints.icon}</span>
                      <h3 className="text-lg font-bold text-gray-800">{megaMenus.gurus_saints.title}</h3>
                      <span className="ml-auto text-[#d98e04] text-xs font-medium bg-[#f8f6f2] px-3 py-1 rounded-full">🌟 Premand Ji Maharaj</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {megaMenus.gurus_saints.columns.map((column, idx) => (
                        <div key={idx}>
                          <h4 className={`font-semibold mb-3 text-sm ${column.title === "Premand Ji Maharaj" ? 'text-[#d98e04]' : 'text-gray-800'}`}>
                            {column.title}
                            {column.title === "Premand Ji Maharaj" && (
                              <span className="ml-1 text-xs">🌟</span>
                            )}
                          </h4>
                          <ul className="space-y-2">
                            {column.links.map((link, linkIdx) => (
                              <li key={linkIdx}>
                                <Link
                                  href={link.href}
                                  className="block group"
                                  onClick={handleNavigation}
                                >
                                  <div className={`text-sm font-medium transition ${
                                    link.href.includes('/premand-ji') 
                                      ? 'text-[#d98e04] group-hover:text-[#b87400]' 
                                      : 'text-gray-700 group-hover:text-[#d98e04]'
                                  }`}>
                                    {link.name}
                                    {link.href.includes('/premand-ji') && (
                                      <span className="ml-1 text-[10px] text-[#d98e04]">• Featured</span>
                                    )}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-[#f8f6f2] to-[#f0ebe4] px-6 py-3 border-t border-[#e8e0d6]">
                    <Link href="/premand-ji" onClick={handleNavigation} className="text-sm text-[#d98e04] hover:underline flex items-center gap-1 font-medium">
                      🙏 Explore Premand Ji Maharaj's Divine Teachings →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Spirituality Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('spirituality')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`relative text-gray-700 hover:text-[#d98e04] transition-colors font-medium group flex items-center gap-1 text-sm ${
                  pathname?.startsWith('/spirituality') || pathname?.startsWith('/yoga-and-meditation') || pathname?.startsWith('/travel-destination') || pathname?.startsWith('/religious-beliefs') ? 'text-[#d98e04]' : ''
                }`}
              >
                Spirituality
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-[#d98e04] transform origin-left transition-transform duration-300 ${
                  pathname?.startsWith('/spirituality') || pathname?.startsWith('/yoga-and-meditation') || pathname?.startsWith('/travel-destination') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>

              {activeDropdown === 'spirituality' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-screen max-w-5xl bg-white rounded-xl shadow-xl border border-[#e8e0d6] overflow-visible z-50">
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e8e0d6] sticky top-0 bg-white">
                      <span className="text-2xl">{megaMenus.spirituality.icon}</span>
                      <h3 className="text-lg font-bold text-gray-800">{megaMenus.spirituality.title}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {megaMenus.spirituality.columns.map((column, idx) => (
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
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Numerlogy Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleDropdownEnter('numerology')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`relative text-gray-700 hover:text-[#d98e04] transition-colors font-medium group flex items-center gap-1 text-sm ${
                  pathname?.startsWith('/numerology') ? 'text-[#d98e04]' : ''
                }`}
              >
                Numerology
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-[#d98e04] transform origin-left transition-transform duration-300 ${
                  pathname?.startsWith('/numerology') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>

              {activeDropdown === 'numerology' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-screen max-w-3xl bg-white rounded-xl shadow-xl border border-[#e8e0d6] overflow-visible z-50">
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e8e0d6] sticky top-0 bg-white">
                      <span className="text-2xl">{megaMenus.numerology.icon}</span>
                      <h3 className="text-lg font-bold text-gray-800">{megaMenus.numerology.title}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {megaMenus.numerology.columns.map((column, idx) => (
                        <div key={idx}>
                          <h4 className="font-semibold text-gray-800 mb-3 text-sm">{column.title}</h4>
                          <ul className="grid grid-cols-2 gap-1">
                            {column.links.map((link, linkIdx) => (
                              <li key={linkIdx}>
                                <Link
                                  href={link.href}
                                  className="block group"
                                  onClick={handleNavigation}
                                >
                                  <div className="text-sm font-medium text-gray-700 group-hover:text-[#d98e04] transition py-1">
                                    {link.name}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
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

            {/* Premand Ji Blessing Button */}
            <Link
              href="/premand-ji/daily-blessing"
              onClick={handleNavigation}
              className="hidden sm:inline-flex px-4 py-2 bg-gradient-to-r from-[#d98e04] to-[#b87400] text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300"
            >
              🙏 Premand Ji's Blessing
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
                placeholder="Search Premand Ji's teachings, scriptures, quotes..."
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#e8e0d6] bg-white relative z-50 max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              <Link href="/" onClick={handleNavigation} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-[#f8f6f2] transition">
                Home
              </Link>
              
              {/* Premand Ji Maharaj - Featured Section */}
              <div className="px-3 py-2 bg-gradient-to-r from-[#f8f6f2] to-[#f0ebe4] rounded-lg border border-[#e8e0d6] mx-3 mb-2">
                <div className="font-semibold text-[#d98e04] flex items-center gap-1">
                  🌟 Premand Ji Maharaj
                  <span className="text-xs text-gray-500 font-normal">Featured</span>
                </div>
                <div className="pl-4 space-y-1 mt-1">
                  <Link href="/premand-ji/discourses" onClick={handleNavigation} className="block text-sm text-gray-700 hover:text-[#d98e04]">Divine Discourses</Link>
                  <Link href="/premand-ji/teachings" onClick={handleNavigation} className="block text-sm text-gray-700 hover:text-[#d98e04]">Spiritual Teachings</Link>
                  <Link href="/premand-ji/biography" onClick={handleNavigation} className="block text-sm text-gray-700 hover:text-[#d98e04]">Life & Mission</Link>
                  <Link href="/premand-ji/satsangs" onClick={handleNavigation} className="block text-sm text-gray-700 hover:text-[#d98e04]">Satsang Schedule</Link>
                </div>
              </div>
              
              {/* Bhagavad Gita Section */}
              <div className="px-3 py-2">
                <div className="font-semibold text-gray-800">Bhagavad Gita</div>
                <div className="pl-4 space-y-1">
                  <Link href="/bhagavad-gita/leaving-family-to-become-a-sanyasi" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Leaving Family to Become Sanyasi</Link>
                  <Link href="/bhagavad-gita/purpose-of-life-Bhagavad-Gita" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Purpose of Life</Link>
                </div>
              </div>

              {/* Divine Personalities */}
              <div className="px-3 py-2">
                <div className="font-semibold text-gray-800">Divine Personalities</div>
                <div className="pl-4 space-y-1">
                  <Link href="/krishna/krishna-purna-avatar" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Krishna - Purna Avatar</Link>
                  <Link href="/krishna/krishna-life-lessons" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Krishna Life Lessons</Link>
                  <Link href="/shiva/shiva-facts" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Shiva Facts</Link>
                  <Link href="/radha/radha-ashtami" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Radha Ashtami</Link>
                </div>
              </div>

              {/* Gurus & Saints */}
              <div className="px-3 py-2">
                <div className="font-semibold text-gray-800">Gurus & Saints</div>
                <div className="pl-4 space-y-1">
                  <Link href="/guru/biography-of-ramana-maharshi" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Ramana Maharshi</Link>
                  <Link href="/guru/mahavatar-babaji" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Mahavatar Babaji</Link>
                  <Link href="/guru/sai-baba-miracle-stories" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Sai Baba Miracle Stories</Link>
                </div>
              </div>

              {/* Quotes */}
              <div className="px-3 py-2">
                <div className="font-semibold text-gray-800">Inspirational Quotes</div>
                <div className="pl-4 space-y-1">
                  <Link href="/quotes/sai-baba-quotes" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Sai Baba Quotes</Link>
                  <Link href="/success-vivekananda-quotes-life" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Vivekananda Quotes</Link>
                  <Link href="/top-15-osho-inspirational-quotes-on-life" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Osho Quotes</Link>
                </div>
              </div>

              {/* Spirituality & Yoga */}
              <div className="px-3 py-2">
                <div className="font-semibold text-gray-800">Spirituality & Yoga</div>
                <div className="pl-4 space-y-1">
                  <Link href="/yoga-and-meditation/benefits-of-meditation" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Benefits of Meditation</Link>
                  <Link href="/yoga-and-meditation/how-to-practice-mantra-japa-meditation" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Mantra Japa Meditation</Link>
                  <Link href="/spirituality/brahma-muhurta-time-benefits" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Brahma Muhurta Benefits</Link>
                </div>
              </div>

              {/* Holy Places */}
              <div className="px-3 py-2">
                <div className="font-semibold text-gray-800">Holy Places</div>
                <div className="pl-4 space-y-1">
                  <Link href="/travel-destination/kedarnath-yatra" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Kedarnath Yatra</Link>
                  <Link href="/travel-destination/varanasi-yatra" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Varanasi Yatra</Link>
                  <Link href="/travel-destination/rishikesh-yatra" onClick={handleNavigation} className="block text-sm text-gray-600 hover:text-[#d98e04]">Rishikesh Yatra</Link>
                </div>
              </div>

              {/* Numerlogy */}
              <div className="px-3 py-2">
                <div className="font-semibold text-gray-800">Numerology</div>
                <div className="pl-4 grid grid-cols-3 gap-1">
                  {[1,2,3,4,5,6,7,8,9].map(num => (
                    <Link 
                      key={num}
                      href={`/numerology/life-path-number-${num}-meaning-numerology`} 
                      onClick={handleNavigation} 
                      className="text-sm text-gray-600 hover:text-[#d98e04] text-center py-1 px-2 rounded hover:bg-[#f8f6f2]"
                    >
                      Life Path {num}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact & About */}
              <div className="px-3 py-2 border-t border-[#e8e0d6] pt-3 mt-2">
                <Link href="/about" onClick={handleNavigation} className="px-3 py-2 block text-gray-700 hover:bg-[#f8f6f2] transition rounded-lg">
                  About
                </Link>
                <Link href="/contact" onClick={handleNavigation} className="px-3 py-2 block text-gray-700 hover:bg-[#f8f6f2] transition rounded-lg">
                  Contact
                </Link>
              </div>
              
              <div className="pt-3 border-t border-[#e8e0d6] px-3">
                <Link
                  href="/premand-ji/daily-blessing"
                  onClick={handleNavigation}
                  className="block w-full px-3 py-2 text-center bg-gradient-to-r from-[#d98e04] to-[#b87400] text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  🙏 Receive Premand Ji's Blessing
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}