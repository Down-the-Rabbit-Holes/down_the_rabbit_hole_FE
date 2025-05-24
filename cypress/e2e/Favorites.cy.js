describe('Favorites Page', () =>  {
  beforeEach(() => {
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites', 
      { statusCode: 200, fixture: 'favorites' }
    );
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="favorites-button"]').click({ force: true, multiple: true });
  });

  it('displays NavBar on page load', () => {
    cy.get('[data-cy="title"]').should('have.text', 'Down The Rabbit Hole');
   });

  it('clicking on Down The Rabbit Hole takes user to main page', () => {
    cy.get('[data-cy="title"]').click();
    cy.url().should('include', '/');
  });

  it('displays user favorites on page load', () => {
    cy.get('[data-cy="favorite-list"]').should('have.length', 1);
  });

  it('displays user favorites with correct data', () => {
    cy.get('[data-cy="favorite-list"]').first().should('contain', 'rabbit');
  });

  it('displays user favorites with correct image', () => {
    cy.get('[data-cy="favorite-list"]').within(() => {
      cy.get('[data-cy="favorite-animal-pic"]').should('be.visible')
        .and('have.attr', 'src').and('not.be.empty'); 
      cy.get('.animal-info').should('contain', 'Fun Fact:');
    });
  });

  it('navigates to the home page when tabbing to title and pressing Enter', () => {
    cy.get('[data-cy="title"]').focus().type('{enter}');
    cy.url().should('include', '/');
  })
});
describe('Favorites Without Animals', () => {
  it('displays a different title when the use does not have any animal favorites', () => {
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites', 
      { statusCode: 200, data: {} }
    );
    cy.visit('http://localhost:3000/favorites')
    cy.get('[data-cy="favorite-header"]').should('have.text',  'No Favorites Yet')
  });
});