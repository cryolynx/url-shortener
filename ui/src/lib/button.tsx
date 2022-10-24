import { styled } from '../styles/stitches.config'

export const Button = styled('button', {
  border: 'none',
  borderRadius: '0.25em',
  padding: '0.5em 1em',
  backgroundColor: '$indigo9',
  color: '$indigo1',
  fontFamily: 'inherit',
  fontWeight: '$medium',
  fontSize: '1.5rem',
  lineHeight: 1.25,
  transition: 'background-color 0.1s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '$indigo10',
  },
})
