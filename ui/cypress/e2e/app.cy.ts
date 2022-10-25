/// <reference types="cypress" />

describe('url shortener app', () => {
  const appUrl = 'http://localhost:8080'

  it('can generate a short URL from a provided link and redirect to the original link', () => {
    const linkToShorten = 'https://www.google.com'

    // Disable intercepts to test with real backend
    cy.intercept('POST', 'api/urls/shorten', {
      fixture: 'shorten-url-success.json',
    })
    cy.intercept('GET', 'api/urls?slug=abc', {
      fixture: 'get-url-success.json',
    })

    cy.visit(appUrl)

    cy.get('input[name=url]').type(linkToShorten)
    cy.get('button[type=submit]').click()

    cy.wait(1000)

    cy.contains('Original link').next('a').should('have.text', linkToShorten)
    cy.contains('Your new short link')
      .next('a')
      .invoke('text')
      .should('match', /localhost:8080\/[0-9a-zA-Z]{3,8}/)

    cy.contains('Your new short link')
      .next('a')
      .invoke('attr', 'href')
      .then((href) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        cy.visit(href!)

        cy.wait(1000)

        cy.url().should('contain', linkToShorten)
      })
  })

  it(`shows a 404 page with link to home page if short link doesn't resolve to a right URL`, () => {
    cy.intercept('GET', 'api/urls?slug=123', { fixture: 'get-url-error.json' })

    cy.visit(`${appUrl}/123`)

    cy.contains('Could not find the requested page').should('exist')
    cy.get('a').invoke('attr', 'href').should('eq', '/')
  })
})
