'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Complete Spiritual News Data with proper navigation links
const SPIRITUAL_DATA = {
  // Top Stories (Main Banner)
  topStories: [
    {
      id: "top1",
      title: "Premand Ji Maharaj's Historic 7-Day Satsang Draws 50 Million Devotees Worldwide",
      description: "In a momentous spiritual gathering, Premand Ji Maharaj's discourse on 'The Path to Inner Peace' reaches over 50 million viewers across 180 countries.",
      category: "Top News",
      time: "2 hours ago",
      image: "https://res.cloudinary.com/demo/basketball_shot.jpg",
      slug: "historic-7-day-satsang-50-million-devotees"
    },
    {
      id: "top2",
      title: "Krishna Janmashtami 2026: Grand Celebrations Worldwide",
      description: "Millions of devotees celebrate the birth of Lord Krishna with midnight prayers, dance, and devotional songs across temples worldwide.",
      category: "Festivals",
      time: "4 hours ago",
      image: "https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?w=800&auto=format",
      slug: "krishna-janmashtami-2026-grand-celebrations"
    },
    {
      id: "top3",
      title: "Radha Ashtami: The Appearance Day of Goddess Radha",
      description: "Devotees observe fast and offer special prayers to Radha Rani, the eternal consort of Lord Krishna.",
      category: "Divine Events",
      time: "5 hours ago",
      image: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?w=800&auto=format",
      slug: "radha-ashtami-appearance-day-goddess-radha"
    },
  ],

  // Latest News Ticker
  tickerNews: [
    { text: "Premand Ji Maharaj to visit Vrindavan Ashram next week", slug: "premand-ji-visits-vrindavan" },
    { text: "Radha Sudha Nidhi - Daily Divine Reading Chapter 108", slug: "radha-sudha-nidhi-chapter-108" },
    { text: "Krishna Bhakti: The Path of Love and Devotion", slug: "krishna-bhakti-path-love-devotion" },
    { text: "Radha-Krishna Leela: Stories of Divine Love", slug: "radha-krishna-leela-divine-love" },
    { text: "Gita Wisdom: Chapter 12 - Bhakti Yoga Explained", slug: "bhagavad-gita-chapter-12-bhakti-yoga" },
  ],

  // Krishna & Radha - Divine Couple
  krishnaRadha: {
    title: "Śrī Śrī Rādhā Kṛṣṇa",
    subtitle: "The Divine Eternal Love",
    description: "Radha and Krishna represent the eternal love between the soul and the Supreme. Their divine pastimes (Leelas) teach us about unconditional love, devotion, and surrender.",
    image: "https://images.pexels.com/photos/2908172/pexels-photo-2908172.jpeg?w=800&auto=format",
    slug: "radha-krishna-divine-couple",
    teachings: [
      { text: "Love without expectation is the highest form of devotion", slug: "love-without-expectation" },
      { text: "See the divine in every living being", slug: "divine-in-every-being" },
      { text: "Surrender completely for spiritual liberation", slug: "surrender-for-liberation" },
    ],
    festivals: [
      { name: "Radha Ashtami", date: "September 7, 2026", significance: "Appearance day of Radha Rani", slug: "radha-ashtami" },
      { name: "Janmashtami", date: "August 15, 2026", significance: "Birth of Lord Krishna", slug: "janmashtami" },
      { name: "Sharad Purnima", date: "October 20, 2026", significance: "Rasa Leela celebration", slug: "sharad-purnima" },
    ]
  },

  // Radha Sudha Nidhi - Daily Divine Reading
  radhaSudhaNidhi: {
    title: "Radha Sudha Nidhi",
    subtitle: "Daily Divine Reading & Explanation",
    slug: "radha-sudha-nidhi",
    todayReading: {
      chapter: "Chapter 108",
      title: "The Divine Love of Radha-Krishna",
      verse: "Śrī Rādhā Sudhā Nidhi verse 108",
      explanation: "This sacred verse describes the eternal divine love between Radha and Krishna. The nectar-like love of Radha for Krishna is the highest form of devotion, representing the soul's complete surrender to the divine.",
      keyTeaching: "Love without expectation is the highest form of worship.",
      practice: "Today, practice offering your actions to the divine without expecting any returns.",
      image: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?w=600&auto=format",
      slug: "radha-sudha-nidhi-chapter-108"
    },
    previousReadings: [
      { id: "rd1", chapter: "Chapter 107", title: "The Essence of Surrender", date: "Yesterday", slug: "radha-sudha-nidhi-chapter-107" },
      { id: "rd2", chapter: "Chapter 106", title: "Divine Grace", date: "June 7, 2026", slug: "radha-sudha-nidhi-chapter-106" },
      { id: "rd3", chapter: "Chapter 105", title: "The Path of Devotion", date: "June 6, 2026", slug: "radha-sudha-nidhi-chapter-105" },
    ]
  },

  // Bhagavad Gita Chapters
  gitaChapters: [
    { 
      id: "g1", 
      chapter: "Chapter 12", 
      title: "Bhakti Yoga - The Path of Devotion",
      verse: "Those who worship Me, renouncing all actions in Me...",
      explanation: "Lord Krishna explains that devotees who fix their minds on Him with unwavering faith are swiftly delivered.",
      keyQuote: "Fix your mind on Me alone, and you shall dwell in Me hereafter.",
      image: "https://images.pexels.com/photos/2908172/pexels-photo-2908172.jpeg?w=400&auto=format",
      slug: "bhagavad-gita-chapter-12-bhakti-yoga"
    },
    { 
      id: "g2", 
      chapter: "Chapter 2", 
      title: "Sankhya Yoga - The Yoga of Knowledge",
      verse: "You have a right to perform your prescribed duties...",
      explanation: "Krishna teaches about the eternal nature of the soul and detachment from results.",
      keyQuote: "You have control over action alone, never over its fruits.",
      image: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?w=400&auto=format",
      slug: "bhagavad-gita-chapter-2-sankhya-yoga"
    },
  ],

  // Radha Baba Story
  radhaBaba: {
    name: "Radha Baba",
    title: "The Divine Saint of Vrindavan",
    story: "Radha Baba is a revered saint from Vrindavan who has dedicated his life to the devotion of Radha-Krishna. He spent decades in deep meditation, experiencing divine visions of the divine couple.",
    teachings: [
      { text: "Chant the holy names of Radha-Krishna daily", slug: "chant-holy-names" },
      { text: "Serve all beings as you serve the divine", slug: "serve-all-beings" },
      { text: "See God in every living creature", slug: "see-god-in-all" },
    ],
    image: "https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?w=400&auto=format",
    slug: "radha-baba-saint-of-vrindavan",
    ashramLocation: "Radha Kunj, Vrindavan, Uttar Pradesh"
  },

  // Krishna Leela Stories
  krishnaLeelas: [
    { id: "kl1", title: "Birth of Lord Krishna", description: "Lord Krishna's divine appearance in Mathura prison", time: "3 days ago", image: "https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?w=400&auto=format", slug: "birth-of-lord-krishna" },
    { id: "kl2", title: "Rasa Leela with Gopis", description: "The divine dance of Krishna with the Gopis of Vrindavan", time: "5 days ago", image: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?w=400&auto=format", slug: "rasa-leela-with-gopis" },
    { id: "kl3", title: "Killing of Kansa", description: "Lord Krishna's victory over the evil king Kansa", time: "1 week ago", image: "https://images.pexels.com/photos/2908172/pexels-photo-2908172.jpeg?w=400&auto=format", slug: "killing-of-kansa" },
  ],

  // Radha Rani Stories
  radhaStories: [
    { id: "rs1", title: "Radha Rani's Birth", description: "The appearance of Goddess Radha in Barsana", time: "4 days ago", image: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?w=400&auto=format", slug: "radha-rani-birth" },
    { id: "rs2", title: "Radha-Krishna's Eternal Bond", description: "The divine love story that transcends time", time: "6 days ago", image: "https://images.pexels.com/photos/2908172/pexels-photo-2908172.jpeg?w=400&auto=format", slug: "radha-krishna-eternal-bond" },
  ],

  // Daily Mantras
  dailyMantras: [
    { id: "dm1", mantra: "Om Radha Krishnaya Namah", meaning: "Salutations to Radha-Krishna", benefit: "Increases love and devotion", slug: "radha-krishna-mantra" },
    { id: "dm2", mantra: "Hare Krishna Hare Krishna", meaning: "Chanting the holy names", benefit: "Brings peace and purification", slug: "hare-krishna-mantra" },
    { id: "dm3", mantra: "Om Krishnaya Vasudevaya Haraye", meaning: "Salutations to Lord Krishna", benefit: "Removes obstacles", slug: "krishna-mantra" },
  ],

  // Premand Ji Articles
  premandJiArticles: [
    { id: "p1", title: "Divine Discourse: The Essence of Bhakti Yoga", time: "1 hour ago", image: "https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?w=400&auto=format", slug: "essence-of-bhakti-yoga" },
    { id: "p2", title: "Premand Ji's Guidance on Overcoming Modern Anxiety", time: "3 hours ago", image: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?w=400&auto=format", slug: "overcoming-modern-anxiety" },
    { id: "p3", title: "Upcoming Satsang Schedule with Premand Ji", time: "5 hours ago", image: "https://images.pexels.com/photos/2908172/pexels-photo-2908172.jpeg?w=400&auto=format", slug: "upcoming-satsang-schedule" },
  ],

  // Yoga Articles
  yogaArticles: [
    { id: "y1", title: "10 Morning Yoga Poses for Energy", time: "2 hours ago", image: "https://images.pexels.com/photos/3822748/pexels-photo-3822748.jpeg?w=400&auto=format", slug: "morning-yoga-poses-energy" },
    { id: "y2", title: "Advanced Asanas for Practitioners", time: "4 hours ago", image: "https://images.pexels.com/photos/2588643/pexels-photo-2588643.jpeg?w=400&auto=format", slug: "advanced-yoga-asanas" },
  ],

  // Meditation Articles
  meditationArticles: [
    { id: "m1", title: "Guided Meditation for Beginners", time: "3 hours ago", image: "https://images.pexels.com/photos/3822739/pexels-photo-3822739.jpeg?w=400&auto=format", slug: "guided-meditation-beginners" },
    { id: "m2", title: "Benefits of Daily Mindfulness", time: "5 hours ago", image: "https://images.pexels.com/photos/2608513/pexels-photo-2608513.jpeg?w=400&auto=format", slug: "benefits-daily-mindfulness" },
  ],

  // Sidebar Popular Posts
  popularPosts: [
    { id: "pop1", title: "10 Benefits of Daily Meditation", views: "15.2k reads", time: "1 day ago", image: "https://images.pexels.com/photos/3822739/pexels-photo-3822739.jpeg?w=150&auto=format", slug: "benefits-daily-meditation" },
    { id: "pop2", title: "Premand Ji's Teachings on Inner Peace", views: "12.8k reads", time: "2 days ago", image: "https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?w=150&auto=format", slug: "inner-peace-teachings" },
    { id: "pop3", title: "Understanding Radha-Krishna Love", views: "9.5k reads", time: "3 days ago", image: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?w=150&auto=format", slug: "radha-krishna-love" },
  ],

  // Stats
  stats: [
    { value: "50M+", label: "Monthly Devotees" },
    { value: "180+", label: "Countries Reached" },
    { value: "10,000+", label: "Free Satsangs" },
    { value: "2,000+", label: "Seva Projects" },
  ]
};

export default function Home() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Top Bar - Professional */}
      <div className="hidden lg:block bg-white border-b border-gray-200 text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 text-gray-500">
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="text-orange-500">Premand Ji Maharaj&apos;s Blessings</span>
            </div>
            <div className="flex gap-3 text-gray-400">
              <span>Radhe Radhe</span>
              <span>Jai Shri Krishna</span>
              <span>Hare Krishna</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breaking News Ticker - Clickable */}
      <div className="bg-orange-500 text-white py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="bg-white text-orange-500 px-2 py-0.5 text-xs font-bold rounded">LATEST</span>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                {SPIRITUAL_DATA.tickerNews.map((news, idx) => (
                  <Link 
                    key={idx} 
                    href={`/news/${news.slug}`}
                    className="mx-4 text-sm hover:underline inline-block text-white"
                  >
                    {news.text} •
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Grid Layout - 70/30 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Story Carousel - Clickable */}
            <div className="relative rounded-xl overflow-hidden bg-gray-200">
              <Link href={`/news/${SPIRITUAL_DATA.topStories[0].slug}`}>
                <div className="relative h-80 md:h-96 cursor-pointer group">
                  <Image 
                    src={SPIRITUAL_DATA.topStories[0].image} 
                    alt={SPIRITUAL_DATA.topStories[0].title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <span className="inline-block bg-orange-500 text-xs px-2 py-0.5 rounded mb-2">TOP NEWS</span>
                    <h1 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-orange-300 transition">
                      {SPIRITUAL_DATA.topStories[0].title}
                    </h1>
                    <p className="text-gray-200 text-sm line-clamp-2">{SPIRITUAL_DATA.topStories[0].description}</p>
                    <div className="mt-2 text-xs text-gray-300">{SPIRITUAL_DATA.topStories[0].time}</div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Secondary Stories Row - Clickable */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPIRITUAL_DATA.topStories.slice(1, 3).map((story) => (
                <Link key={story.id} href={`/news/${story.slug}`}>
                  <div className="relative h-56 rounded-xl overflow-hidden bg-gray-200 cursor-pointer group">
                    <Image 
                      src={story.image} 
                      alt={story.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 p-4 text-white">
                      <span className="text-xs text-orange-300">{story.category}</span>
                      <h3 className="font-bold text-base mt-1 line-clamp-2 group-hover:text-orange-300 transition">
                        {story.title}
                      </h3>
                      <span className="text-xs text-gray-300 mt-1 block">{story.time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Krishna & Radha Section - Clickable */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="mb-4">
                <Link href={`/teachings/${SPIRITUAL_DATA.krishnaRadha.slug}`}>
                  <h2 className="text-xl font-bold text-gray-800 hover:text-orange-500 transition inline-block">
                    Śrī Śrī Rādhā Kṛṣṇa
                  </h2>
                </Link>
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">The Divine Eternal Love</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2">
                  <Link href={`/teachings/${SPIRITUAL_DATA.krishnaRadha.slug}`}>
                    <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                      <Image 
                        src={SPIRITUAL_DATA.krishnaRadha.image} 
                        alt="Radha Krishna" 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  </Link>
                  <p className="text-sm text-gray-600">{SPIRITUAL_DATA.krishnaRadha.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SPIRITUAL_DATA.krishnaRadha.teachings.map((teaching, idx) => (
                      <Link 
                        key={idx} 
                        href={`/teachings/${teaching.slug}`}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-orange-100 hover:text-orange-600 transition"
                      >
                        {teaching.text}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Sacred Festivals</h3>
                  <div className="space-y-2">
                    {SPIRITUAL_DATA.krishnaRadha.festivals.map((festival, idx) => (
                      <Link key={idx} href={`/festivals/${festival.slug}`}>
                        <div className="bg-gray-50 rounded-lg p-2 hover:bg-orange-50 transition cursor-pointer">
                          <div className="font-medium text-gray-800 text-sm">{festival.name}</div>
                          <div className="text-xs text-gray-500">{festival.date}</div>
                          <div className="text-xs text-gray-600">{festival.significance}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Radha Sudha Nidhi Section - Clickable */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="mb-4">
                <Link href={`/teachings/${SPIRITUAL_DATA.radhaSudhaNidhi.slug}`}>
                  <h2 className="text-xl font-bold text-gray-800 hover:text-orange-500 transition inline-block">
                    Radha Sudha Nidhi
                  </h2>
                </Link>
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Daily Divine Reading</span>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <Link href={`/reading/${SPIRITUAL_DATA.radhaSudhaNidhi.todayReading.slug}`}>
                  <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      src={SPIRITUAL_DATA.radhaSudhaNidhi.todayReading.image} 
                      alt="Radha Sudha Nidhi" 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                </Link>
                <div className="flex-1">
                  <div className="text-xs text-orange-600">{SPIRITUAL_DATA.radhaSudhaNidhi.todayReading.chapter}</div>
                  <Link href={`/reading/${SPIRITUAL_DATA.radhaSudhaNidhi.todayReading.slug}`}>
                    <h3 className="font-bold text-gray-800 hover:text-orange-500 transition">
                      {SPIRITUAL_DATA.radhaSudhaNidhi.todayReading.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">{SPIRITUAL_DATA.radhaSudhaNidhi.todayReading.explanation}</p>
                  <div className="mt-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                      {SPIRITUAL_DATA.radhaSudhaNidhi.todayReading.keyTeaching}
                    </span>
                  </div>
                  <Link 
                    href={`/reading/${SPIRITUAL_DATA.radhaSudhaNidhi.todayReading.slug}`} 
                    className="text-xs text-orange-600 hover:underline mt-2 inline-block"
                  >
                    Read Full Reading →
                  </Link>
                </div>
              </div>
            </div>

            {/* Bhagavad Gita Section - Clickable */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Bhagavad Gita Wisdom</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SPIRITUAL_DATA.gitaChapters.map((chapter) => (
                  <Link key={chapter.id} href={`/teachings/${chapter.slug}`}>
                    <div className="flex gap-3 cursor-pointer group">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image 
                          src={chapter.image} 
                          alt={chapter.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-orange-600">{chapter.chapter}</div>
                        <h3 className="font-semibold text-gray-800 text-sm group-hover:text-orange-500 transition">
                          {chapter.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{chapter.explanation}</p>
                        <p className="text-xs italic text-gray-500 mt-1">&quot;{chapter.keyQuote}&quot;</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Krishna Leela Stories - Clickable */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Krishna Leela - Divine Pastimes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SPIRITUAL_DATA.krishnaLeelas.map((story) => (
                  <Link key={story.id} href={`/stories/${story.slug}`}>
                    <div className="bg-gray-50 rounded-lg overflow-hidden cursor-pointer group hover:shadow-md transition">
                      <div className="relative h-32">
                        <Image 
                          src={story.image} 
                          alt={story.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-800 text-sm group-hover:text-orange-500 transition">
                          {story.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{story.description}</p>
                        <span className="text-xs text-gray-400 mt-1 block">{story.time}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Radha Rani Stories - Clickable */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Radha Rani - The Divine Goddess</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SPIRITUAL_DATA.radhaStories.map((story) => (
                  <Link key={story.id} href={`/stories/${story.slug}`}>
                    <div className="flex gap-3 bg-gray-50 rounded-lg p-3 cursor-pointer group hover:bg-orange-50 transition">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image 
                          src={story.image} 
                          alt={story.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm group-hover:text-orange-500 transition">
                          {story.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1">{story.description}</p>
                        <span className="text-xs text-gray-400 mt-1 block">{story.time}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Daily Mantras - Clickable */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Daily Mantras for Peace</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {SPIRITUAL_DATA.dailyMantras.map((mantra) => (
                  <Link key={mantra.id} href={`/mantras/${mantra.slug}`}>
                    <div className="bg-gray-50 rounded-lg p-3 text-center cursor-pointer hover:bg-orange-50 transition">
                      <p className="text-sm font-mono font-semibold text-orange-700">{mantra.mantra}</p>
                      <p className="text-xs text-gray-600 mt-1">{mantra.meaning}</p>
                      <p className="text-xs text-gray-500 mt-1">{mantra.benefit}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Radha Baba Section - Clickable */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="mb-4">
                <Link href={`/saints/${SPIRITUAL_DATA.radhaBaba.slug}`}>
                  <h2 className="text-xl font-bold text-gray-800 hover:text-orange-500 transition inline-block">
                    {SPIRITUAL_DATA.radhaBaba.name} - {SPIRITUAL_DATA.radhaBaba.title}
                  </h2>
                </Link>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <Link href={`/saints/${SPIRITUAL_DATA.radhaBaba.slug}`}>
                  <div className="relative w-full md:w-40 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      src={SPIRITUAL_DATA.radhaBaba.image} 
                      alt="Radha Baba" 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                </Link>
                <div>
                  <p className="text-sm text-gray-600">{SPIRITUAL_DATA.radhaBaba.story}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {SPIRITUAL_DATA.radhaBaba.teachings.map((teaching, idx) => (
                      <Link 
                        key={idx} 
                        href={`/teachings/${teaching.slug}`}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded hover:bg-orange-100 hover:text-orange-600 transition"
                      >
                        {teaching.text}
                      </Link>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">📍 {SPIRITUAL_DATA.radhaBaba.ashramLocation}</p>
                </div>
              </div>
            </div>

            {/* Premand Ji Articles - Clickable */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Premand Ji Maharaj</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SPIRITUAL_DATA.premandJiArticles.map((article) => (
                  <Link key={article.id} href={`/articles/${article.slug}`}>
                    <div className="bg-gray-50 rounded-lg overflow-hidden cursor-pointer group hover:shadow-md transition">
                      <div className="relative h-32">
                        <Image 
                          src={article.image} 
                          alt={article.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-orange-500 transition">
                          {article.title}
                        </h3>
                        <span className="text-xs text-gray-400 mt-1 block">{article.time}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Yoga & Meditation Section - Clickable */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3">Yoga</h3>
                {SPIRITUAL_DATA.yogaArticles.map((article) => (
                  <Link key={article.id} href={`/articles/${article.slug}`}>
                    <div className="flex gap-2 mb-2 pb-2 border-b border-gray-100 last:border-0 cursor-pointer group">
                      <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                        <Image 
                          src={article.image} 
                          alt={article.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 group-hover:text-orange-500 transition line-clamp-2">
                          {article.title}
                        </h4>
                        <span className="text-xs text-gray-400">{article.time}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3">Meditation</h3>
                {SPIRITUAL_DATA.meditationArticles.map((article) => (
                  <Link key={article.id} href={`/articles/${article.slug}`}>
                    <div className="flex gap-2 mb-2 pb-2 border-b border-gray-100 last:border-0 cursor-pointer group">
                      <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                        <Image 
                          src={article.image} 
                          alt={article.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 group-hover:text-orange-500 transition line-clamp-2">
                          {article.title}
                        </h4>
                        <span className="text-xs text-gray-400">{article.time}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Stats Counter */}
            <div className="grid grid-cols-2 gap-3">
              {SPIRITUAL_DATA.stats.map((stat, idx) => (
                <div key={idx} className="text-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-xl font-bold text-orange-500">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Popular Posts - Clickable */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">Most Popular</h3>
              <div className="space-y-3">
                {SPIRITUAL_DATA.popularPosts.map((post, idx) => (
                  <Link key={post.id} href={`/articles/${post.slug}`}>
                    <div className="flex gap-2 cursor-pointer group">
                      <span className="text-lg font-bold text-gray-300 w-6">{String(idx + 1).padStart(2, '0')}</span>
                      <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                        <Image 
                          src={post.image} 
                          alt={post.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-700 group-hover:text-orange-500 transition line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex gap-2 text-xs text-gray-400 mt-0.5">
                          <span>{post.views}</span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Divine Quote - Random daily quote */}
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 text-center">
              <p className="text-sm italic text-gray-700">&quot;The highest form of devotion is to love without expectation, just as Radha loves Krishna.&quot;</p>
              <p className="text-xs text-orange-600 mt-2">— Radha Baba</p>
            </div>

            {/* Newsletter */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
              <h3 className="font-bold text-gray-800 text-sm mb-1">Daily Blessings Newsletter</h3>
              <p className="text-xs text-gray-500 mt-1">Get divine wisdom delivered to your inbox</p>
              <form className="mt-3" onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent" 
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-500 transition"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-2">Join 500,000+ devotees worldwide</p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}