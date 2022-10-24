import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useApi } from '../hooks/use-api'
import { NoMatch } from './no-match'
import { Redirect } from './redirect'

export function Slug() {
  const { slug } = useParams<{ slug: string }>()
  const { getOriginalUrl, loading } = useApi()
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null)

  useEffect(() => {
    async function initialize() {
      if (slug) {
        const originalUrl = await getOriginalUrl(slug)
        setRedirectUrl(originalUrl)
      }
    }

    initialize()
  }, [slug])

  if (loading) {
    return null
  }

  return redirectUrl ? <Redirect url={redirectUrl} /> : <NoMatch />
}
