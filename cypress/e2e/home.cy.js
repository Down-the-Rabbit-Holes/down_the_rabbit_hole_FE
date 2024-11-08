describe('Main Page', () => {
  beforeEach(() =>{
    // hint: you'll want to add an intercept here if you are making a network request on page load!
    // cy.visit('http://localhost:3000/')
    cy.visit('https://down-the-rabbit-hole.netlify.app/')
  });

  it('displays NavBar on page load', () => {
    cy.get('[data-cy="title"]').should('have.text', 'Down The Rabbit Hole')
  })

  // it('clicking on My Favorites takes user to Favorites', () => {
  //   cy.get('[data-cy="favorites-button"]').click();
  //   cy.url().should('include', '/favorites')
  // })

  it('clicking on Down The Rabbit Hole keeps user on main page', () => {
    cy.get('[data-cy="title"]').click();
    cy.url().should('include', '/')
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