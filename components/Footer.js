'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerSections = {
    about: {
      title: 'Premand Ji Maharaj',
      content: 'Dedicated to spreading divine wisdom, spiritual teachings, and the path of inner peace. Join millions of devotees worldwide on the sacred journey of self-discovery.',
      social: [
        { name: 'Twitter', url: 'https://twitter.com' },
        { name: 'YouTube', url: 'https://youtube.com' },
        { name: 'Instagram', url: 'https://instagram.com' },
        { name: 'Facebook', url: 'https://facebook.com' },
      ]
    },
    quickLinks: {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About Premand Ji', href: '/about' },
        { name: 'Divine Discourses', href: '/discourses' },
        { name: 'Upcoming Satsangs', href: '/satsangs' },
        { name: 'Contact Ashram', href: '/contact' },
        { name: 'Donate for Seva', href: '/donate' },
      ]
    },
    krishnaRadha: {
      title: 'Krishna & Radha',
      links: [
        { name: 'Krishna Leelas', href: '/category/krishna-leelas' },
        { name: 'Radha Rani Stories', href: '/category/radha-stories' },
        { name: 'Bhagavad Gita', href: '/category/bhagavad-gita' },
        { name: 'Radha Sudha Nidhi', href: '/category/radha-sudha-nidhi' },
        { name: 'Sacred Festivals', href: '/category/festivals' },
        { name: 'Temples & Pilgrimage', href: '/category/temples' },
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'Daily Blessings', href: '/newsletter' },
        { name: 'Ashram Visits', href: '/ashram' },
        { name: 'Free Satsangs', href: '/satsangs' },
        { name: 'Spiritual Store', href: '/store' },
        { name: 'Community Forum', href: '/community' },
        { name: 'Support & Seva', href: '/support' },
      ]
    }
  }

  // Social media SVG icons
  const SocialIcon = ({ name }) => {
    switch(name) {
      case 'Twitter':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
          </svg>
        )
      case 'YouTube':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
        )
      case 'Instagram':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
          </svg>
        )
      case 'Facebook':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <footer className="bg-[#f8f6f2] border-t border-[#e8e0d6]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
              {footerSections.about.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {footerSections.about.content}
            </p>
            <div className="flex gap-2 pt-2">
              {footerSections.about.social.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white text-gray-500 rounded-md flex items-center justify-center hover:bg-[#d98e04] hover:text-white transition-all duration-300 border border-[#e8e0d6] hover:border-[#d98e04]"
                  aria-label={social.name}
                >
                  <SocialIcon name={social.name} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
              {footerSections.quickLinks.title}
            </h3>
            <ul className="space-y-2">
              {footerSections.quickLinks.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[#d98e04] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Krishna & Radha Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
              {footerSections.krishnaRadha.title}
            </h3>
            <ul className="space-y-2">
              {footerSections.krishnaRadha.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[#d98e04] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
              Daily Blessings
            </h3>
            <p className="text-gray-600 text-sm">
              Receive divine wisdom, Radha Sudha Nidhi, and spiritual guidance directly to your inbox.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 bg-white border border-[#e8e0d6] rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d98e04] focus:border-transparent transition-shadow"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#d98e04] text-white font-medium rounded-lg hover:bg-[#b87400] transition-all duration-300 text-sm"
              >
                Subscribe to Newsletter
              </button>
            </form>
            <p className="text-xs text-gray-500">
              Join 500,000+ devotees. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#e8e0d6] bg-[#f8f6f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © {currentYear} Premand Ji Maharaj Divine Mission. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-[#d98e04] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-[#d98e04] transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-500 hover:text-[#d98e04] transition-colors">
                Sitemap
              </Link>
              <Link href="/rss" className="text-gray-500 hover:text-[#d98e04] transition-colors">
                RSS Feed
              </Link>
            </div>

            <button
              onClick={handleBackToTop}
              className="group bg-white border border-[#e8e0d6] hover:bg-[#d98e04] text-gray-500 hover:text-white p-2 rounded-lg transition-all duration-300"
              aria-label="Back to top"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}