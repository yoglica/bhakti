'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulate API call - replace with your actual endpoint
    setTimeout(() => {
      console.log('Subscribed:', email)
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 500)
  }
  
  return (
    <form className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 rounded-lg px-4 py-2.5 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-white"
        required
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-lg bg-white px-6 py-2.5 font-semibold text-blue-600 transition hover:bg-zinc-100 disabled:opacity-50"
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {status === 'success' && (
        <p className="text-sm text-green-200">Thanks for subscribing!</p>
      )}
    </form>
  )
}