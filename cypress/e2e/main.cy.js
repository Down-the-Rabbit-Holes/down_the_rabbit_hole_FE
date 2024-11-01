// Mock data to use for testing:

describe('Main Page', () => {
  it('displays title on page load', () => {
    // hint: you'll want to add an intercept here if you are making a network request on page load!
    cy.visit('http://localhost:3000/')
    .get('h1')
    .contains('Down the rabbit hole')
  })
})