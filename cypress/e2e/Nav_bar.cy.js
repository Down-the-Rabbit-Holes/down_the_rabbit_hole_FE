describe('Nav bar component', () => {
  beforeEach(() =>{
    cy.intercept(
      'GET',
      'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites',
      { statusCode: 200, fixture: 'favorites' }
    );

    cy.intercept(
      'GET',
      'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=start&name=rabbit',
      { statusCode: 200, fixture: 'rabbit' }
    );



    // hint: you'll want to add an intercept here if you are making a network request on page load!
    cy.visit('https://down-the-rabbit-hole.netlify.app/')
  });

  it('displays NavBars contents on page load', () => {
    cy.get('[data-cy="title"]').should('have.text', 'Down The Rabbit Hole')
    cy.get('.my-save-view').should('have.text', 'My Favorites')
  })

  it('Should bring you back to home when title is clicked', () => {
    cy.get('[data-cy="game-start-image"]').click()
    cy.get('[data-cy="title"]').click()
    cy.url().should('eq', 'https://down-the-rabbit-hole.netlify.app/');
  })

  it('Should load a favorites view when clicked', () => {
    cy.get('.my-save-view').click()
    cy.url().should('eq', 'https://down-the-rabbit-hole.netlify.app/favorites');
  })

  it('Should load home view when the title is clicked', () => {
    cy.get('.my-save-view').click()
    cy.get('[data-cy="title"]').click()
    cy.url().should('eq', 'https://down-the-rabbit-hole.netlify.app/');
  })
})

describe('Sad path nav bar ', () => {
  beforeEach(() =>{
    cy.intercept(
      'GET',
      'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites',
      { statusCode: 500 }
    );
    cy.visit('https://down-the-rabbit-hole.netlify.app/')
  });

  it('Should load a error massage when my favorites is clicked', () => {
    cy.get('.my-save-view').click()
    cy.url().should('eq', 'https://down-the-rabbit-hole.netlify.app/favorites');
    cy.get('[data-cy="favorite-header"]').should('have.text', 'No Favorites Yet')

  })

})