import { styled } from '../styles/stitches.config'

export const Anchor = styled('a', {
  color: '$indigo11',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: '$medium',
  textDecoration: 'inherit',
  '&:hover': {
    color: '$indigo9',
    textDecoration: 'underline',
  },
})
