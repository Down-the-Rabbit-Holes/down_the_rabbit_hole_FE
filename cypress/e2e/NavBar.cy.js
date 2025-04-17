describe('Nav Bar', () => {
  beforeEach(() =>{
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites',
      { statusCode: 200, fixture: 'favorites' }
    );
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/parks', {
      statusCode: 200, fixture: 'parks' 
    });
    cy.visit('http://localhost:3000/');
  });

  it('displays NavBars contents on page load', () => {
    cy.get('[data-cy="nav-bar"]').should('exist');
    cy.get('[data-cy="title"]').should('have.text', 'Down The Rabbit Hole');
    cy.get('[data-cy="favorites-button"]').should('exist');
    cy.get('[data-cy="font-toggle-button"]').should('exist');
  });

  it('should load a favorites view when clicked', () => {
    cy.get('[data-cy="favorites-button"]').click();
    cy.url().should('include', '/favorites');
  });

  it('clicking the font button toggles the dyslexic font', () => {
    cy.get('[data-cy="font-toggle-button"]').click();
    cy.get('[data-cy="title"]').should('have.css', 'font-family', 'OpenDyslexia, -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif')
  });

  it('should bring you back to home when title is clicked', () => {
    cy.get('[data-cy="start-button"]').click()
    cy.get('[data-cy="title"]').click()
    cy.url().should('include', '/');
  })
});

describe('Sad path - Nav Bar ', () => {
  beforeEach(() =>{
    cy.intercept(
      'GET',
      'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites',
      { statusCode: 500 }
    );
    cy.visit('http://localhost:3000/');
  });

  it('Should load a error massage when my favorites is clicked', () => {
    cy.get('[data-cy="favorites-button"]').click()
    cy.url().should('include', '/favorites');
    cy.get('[data-cy="favorite-header"]').should('have.text', 'No Favorites Yet')
  })
});