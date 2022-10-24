import '@testing-library/jest-dom/extend-expect'

import { render, screen } from '@testing-library/react'

import { FormResult } from './form-result'

test('displays original link and short link if present', async () => {
  render(
    <FormResult
      originalLink="https://testing-library.com/docs/react-testing-library/example-intro"
      shortenedLink="http://localhost:8080/2Bi"
      error={false}
    />
  )

  expect(
    screen.getByText(
      'https://testing-library.com/docs/react-testing-library/example-intro'
    )
  ).toBeDefined()
  expect(screen.getByText('localhost:8080/2Bi')).toBeDefined()
})

test('displays error text', async () => {
  render(<FormResult originalLink={null} shortenedLink={null} error={true} />)

  expect(
    screen.getByText(
      'There was an issue with generating your short link. Please try again.'
    )
  ).toBeDefined()
})
