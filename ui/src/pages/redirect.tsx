import { useEffect } from 'react'

type RedirectProps = {
  url: string
}

export function Redirect({ url }: RedirectProps) {
  useEffect(() => {
    window.location.href = url
  }, [url])

  return null
}
