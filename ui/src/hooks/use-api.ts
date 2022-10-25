import { useState } from 'react'

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const headers = { 'Content-Type': 'application/json' }

  function handleError() {
    setError(true)
    setLoading(false)
  }

  async function shortenUrl(longUrl: string): Promise<string | null> {
    setError(false)
    setLoading(true)

    try {
      const response = await fetch(`/api/urls/shorten`, {
        method: 'POST',
        body: JSON.stringify({ url: longUrl }),
        headers,
      })

      if (!response.ok) {
        handleError()
        return null
      }

      const { slug } = await response.json()

      setLoading(false)

      return slug
    } catch (err) {
      handleError()
      return null
    }
  }

  async function getOriginalUrl(slug: string): Promise<string | null> {
    setError(false)
    setLoading(true)

    const query = slug && new URLSearchParams({ slug })
    const endpoint = `/api/urls?${query}`

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers,
      })

      if (!response.ok) {
        handleError()
        return null
      }

      const { originalUrl } = await response.json()

      setLoading(false)

      return originalUrl
    } catch (error) {
      handleError()
      return null
    }
  }

  return { shortenUrl, getOriginalUrl, loading, error }
}
