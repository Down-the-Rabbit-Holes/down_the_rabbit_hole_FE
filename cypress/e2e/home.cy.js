describe('Main Page', () => {
  beforeEach(() => {    
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites', {
    });
    cy.visit('http://localhost:3000/');
  });

  it('displays NavBar on page load', () => {
    cy.get('[data-cy="title"]').should('have.text', 'Down The Rabbit Hole');
  });

  it('clicking on My Favorites takes user to Favorites', () => {
    cy.get('[data-cy="favorites-button"]').first().click();
    cy.url().should('include', '/favorites');
  });

  it('clicking the font button toggles the dyslexic font', () => {
    cy.get('[data-cy="font-toggle-button"]').click();
    cy.get('[data-cy="title"]').should('have.css', 'font-family', 'OpenDyslexia, -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif')
  });

  it('clicking on Down The Rabbit Hole keeps user on main page', () => {
    cy.get('[data-cy="title"]').click();
    cy.url().should('include', '/');
  });

  it('displays game start image and instructions on load', () => {
    cy.get('.rabbit-image').should('be.visible');
    cy.get('.overlay-text').should('contain', 'Welcome!')
      .should('contain', 'Click here to journey')
      .should('contain', 'Down the Rabbit Hole!');
  });

  it('clicking on game start image takes user to Park Selection component', () => {
    cy.get('.rabbit-image').should('be.visible').click();
    cy.url().should('include', '/park-selection');
  });

  it('allows navigating to Park Selection by pressing Enter or Space on rabbit image image', () => {
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/parks', {
    });

    cy.get('[data-cy="start-button"]').focus().type('{enter}');
    cy.url().should('include', '/park-selection');

    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="start-button"]').focus().type(' ');
    cy.url().should('include', '/park-selection'); 
  });
});