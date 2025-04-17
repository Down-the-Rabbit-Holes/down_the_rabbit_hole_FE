describe('Park Selection', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites', {
    });
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/parks', {
      statusCode: 200, fixture: 'parks' 
    });
    cy.visit('http://localhost:3000/park-selection');
  });

  it('contains a list of all national parks from the database', () => {
    cy.get(':nth-child(1) > [data-cy="parks-poster"]').should('exist');
    cy.get(':nth-child(4) > [data-cy="parks-poster"]').should('exist');
  });

  it('shows a rabbit giving directions', () => {
    cy.get('.details-rabbit-image').should('exist');
    cy.get('[data-cy="selection-page-instructions"]').should('contain', 'Dive into the wonders of nature')
    .should('contain', 'by selecting a park from the list.')
    .should('contain', 'Each park unveils fascinating facts')
    .should('contain', 'about its unique ecosystem,')
    .should('contain', 'showcasing the diverse animals')
    .should('contain', 'that call it home.')
    .should('contain', 'Click on a park to start exploring!');
  });

  it('lets a user select from a list of national parks and brings them to a park details page', () => {
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/park_animals/4', {
    });
    cy.get(':nth-child(4) > [data-cy="parks-poster"]').click();
    cy.url().should('include', '/park-details/4'); 
  });
});