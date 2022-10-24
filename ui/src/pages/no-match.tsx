import notFoundImage from '../assets/404.svg'
import { Link } from '../lib/link'
import { styled } from '../styles/stitches.config'

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: '1.5rem',
})

const Image = styled('img', {
  width: '400px',
})

const Title = styled('h1', {
  color: '$slate11',
  fontSize: '2.5rem',
  fontWeight: '$bold',
  lineHeight: 1.25,
})

const Subtitle = styled('h2', {
  color: '$slate11',
  fontSize: '1.5rem',
  fontWeight: '$normal',
  lineHeight: 1.25,
})

export function NoMatch() {
  return (
    <Wrapper>
      <Image src={notFoundImage} alt="Not found" />
      <Title>Could not find the requested page</Title>
      <Subtitle>
        Go to <Link to="/">Home</Link>
      </Subtitle>
    </Wrapper>
  )
}
