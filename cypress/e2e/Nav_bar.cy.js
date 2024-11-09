describe('GamePlay component', () => {
  beforeEach(() =>{
    // hint: you'll want to add an intercept here if you are making a network request on page load!
    cy.visit('http://localhost:3000/')
  });

  it('displays NavBar on page load', () => {
    cy.get('[data-cy="title"]').should('have.text', 'Down The Rabbit Hole')
    cy.get('.my-save-view').should('have.text', 'My Favorites')
  })











})