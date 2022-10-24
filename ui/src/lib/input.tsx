import { styled } from '../styles/stitches.config'

export const Input = styled('input', {
  width: '600px',
  border: '1px solid $slate8',
  borderRadius: '0.5rem',
  padding: '0.5em',
  color: '$indigo12',
  fontSize: '1.5rem',
  lineHeight: 1.25,
  '&:focus': {
    outlineWidth: '2px',
    outlineColor: '$indigo8',
  },
  '&::placeholder': {
    color: '$slate8',
  },
})
