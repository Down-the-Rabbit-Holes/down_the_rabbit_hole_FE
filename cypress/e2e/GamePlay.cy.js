describe('GamePlay component', () => {
  beforeEach(() =>{
    // hint: you'll want to add an intercept here if you are making a network request on page load!
    cy.visit('http://localhost:3000/game')
  });

  it('displays NavBar on page load', () => {
    cy.get('[data-cy="title"]').contains('Down the rabbit hole')
  })

  it('displays prey animal image and facts', () => {
    cy.get('[data-cy="prey-container"]').within(() => {
      cy.get('[data-cy="prey-animal-name"]').contains('rabbit')
      cy.get('[data-cy="prey-animal-pic"]').should('have.attr', 'src')
      cy.get('[data-cy="prey-facts-list"]').each(() => {
        cy.get('[data-cy="prey-diet-li"]').should('be.visible')
        cy.get('[data-cy="preys-predators-li"]').should('be.visible')
      })
    })
  })

  it('displays eat me button which opens predator modal', () => {
    cy.get('[data-cy="eat-me-button"]').should('have.text', "Eat Me!")
    cy.get('[data-cy="eat-me-button"]').click()
    cy.url().should('')
  })
})