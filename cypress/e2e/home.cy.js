describe('Main Page', () => {
  beforeEach(() =>{
    // hint: you'll want to add an intercept here if you are making a network request on page load!
    cy.visit('http://localhost:3000/')
  });
  it('displays NavBar on page load', () => {
    cy.get('[data-cy="title"]').contains('Down the rabbit hole')
  })

  it('displays game start image/button and instructions on load', () => {
    cy.get('[data-cy="game-start-image"]').should('be.visible');
    cy.get('[data-cy="home-page-instructions"')
    .contains('Click the bunny to discover fascinating facts about them and the intricate food web they belong to!')
  })

  it('clicking on game start img takes user to GameStart', () => {
    cy.get('[data-cy="game-start-image"]').click();
    cy.url().should('include', '/game')
  })
})