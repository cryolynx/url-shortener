import { Link as RouterLink } from 'react-router-dom'

import { styled } from '../styles/stitches.config'

export const Link = styled(RouterLink, {
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
