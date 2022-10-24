import { useState } from 'react'

export function useApi() {
  const [loading, setLoading] = useState(true)
  const headers = { 'Content-Type': 'application/json' }

  async function shortenUrl(longUrl: string): Promise<string> {
    setLoading(true)

    const response = await fetch(`/api/urls/shorten`, {
      method: 'POST',
      body: JSON.stringify({ url: longUrl }),
      headers,
    })
    const { slug } = await response.json()

    setLoading(false)

    return slug
  }

  async function getOriginalUrl(slug: string): Promise<string | null> {
    setLoading(true)

    const query = slug && new URLSearchParams({ slug })
    const endpoint = `/api/urls?${query}`
    const response = await fetch(endpoint, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      setLoading(false)
      return null
    }

    const { originalUrl } = await response.json()

    setLoading(false)

    return originalUrl
  }

  return { shortenUrl, getOriginalUrl, loading }
}
