describe('Main Page', () => {
  beforeEach(() => {    
  cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites', {
  });
    cy.visit('https://down-the-rabbit-hole.netlify.app/')
  });

  it('displays NavBar on page load', () => {
    cy.get('[data-cy="title"]').should('have.text', 'Down The Rabbit Hole');
  });

  it('clicking on My Favorites takes user to Favorites', () => {

    cy.get('[data-cy="favorites-button"]').first().click();
    cy.url().should('include', '/favorites');
  });

  it('clicking on Down The Rabbit Hole keeps user on main page', () => {
    cy.get('[data-cy="title"]').click();
    cy.url().should('include', '/');
  });

  it('displays game start image and instructions on load', () => {
    cy.get('[data-cy="game-start-image"]').should('be.visible');
    cy.get('[data-cy="home-page-instructions"]').should('contain', 'Click the bunny to discover fascinating facts about them and the intricate food web they belong to!');
  });

  it('clicking on game start image takes user to Game page with rabbit data', () => {
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=start&name=rabbit', {
    })
    cy.get('[data-cy="game-start-image"]').click();
    cy.url().should('include', '/game');
    cy.url().should('include', 'animal_name=rabbit');
  });

  it('allows navigating to Game page by pressing Enter or Space on game start image', () => {
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=start&name=rabbit', {
    })
    cy.get('[data-cy="game-start-image"]').focus().type('{enter}');
    cy.url().should('include', '/game');
    cy.visit('https://down-the-rabbit-hole.netlify.app/'); // Reset to main page
    cy.get('[data-cy="game-start-image"]').focus().type(' ');
    cy.url().should('include', '/game');
  });
});