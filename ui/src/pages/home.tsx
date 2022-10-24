import * as LabelPrimitive from '@radix-ui/react-label'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormResult } from '../components/form-result'
import { useApi } from '../hooks/use-api'
import { Button } from '../lib/button'
import { Input } from '../lib/input'
import { Title } from '../lib/title'
import { styled } from '../styles/stitches.config'

const Form = styled('form', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  columnGap: '1rem',
})

const InputField = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

const Label = styled(LabelPrimitive.Root, {
  marginBottom: '0.5em',
  fontSize: '1.25rem',
  lineHeight: '1.5em',
  color: '$slate11',
})

type FormValues = {
  url: string
}

export function Home() {
  const { register, handleSubmit, reset } = useForm<FormValues>()
  const { shortenUrl } = useApi()
  const [originalLink, setOriginalLink] = useState<string | null>(null)
  const [shortenedLink, setShortenedLink] = useState<string | null>(null)
  const [error, setError] = useState(false)

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setOriginalLink(null)
    setShortenedLink(null)
    setError(false)

    try {
      setOriginalLink(data.url)

      const slug = await shortenUrl(data.url)

      setShortenedLink(`${window.origin}/${slug}`)
      reset()
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  return (
    <div>
      <Title>shorten.me</Title>
      <Form id="shorten-url" onSubmit={handleSubmit(onSubmit)}>
        <InputField>
          <Label htmlFor="url-input">Enter your link</Label>
          <Input
            {...register('url')}
            type="url"
            id="url-input"
            placeholder="https://example.com"
            required
          />
        </InputField>
        <Button type="submit">Shorten</Button>
      </Form>
      <FormResult
        originalLink={originalLink}
        shortenedLink={shortenedLink}
        error={error}
      />
    </div>
  )
}
