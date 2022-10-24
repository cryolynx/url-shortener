import { Anchor } from '../lib/anchor'
import { styled } from '../styles/stitches.config'

const Result = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  rowGap: '1rem',
  height: '120px',
  padding: '2rem 1rem',
  color: '$slate11',
  fontSize: '1.25rem',
})

const ErrorText = styled('p', {
  color: '$red11',
})

type FormResultProps = {
  originalLink: string | null
  shortenedLink: string | null
  error: boolean
}

export function FormResult({
  originalLink,
  shortenedLink,
  error,
}: FormResultProps) {
  return (
    <Result>
      {originalLink && shortenedLink ? (
        <>
          <div>
            <span>Original link:</span>
            &nbsp;
            <Anchor
              href={originalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {originalLink}
            </Anchor>
          </div>
          <div>
            <span>Your new short link:</span>
            &nbsp;
            <Anchor
              href={shortenedLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortenedLink.replace(/^https?:\/\//, '')}
            </Anchor>
          </div>
        </>
      ) : null}
      {error ? (
        <ErrorText>
          There was an issue with generating your short link. Please try again.
        </ErrorText>
      ) : null}
    </Result>
  )
}
