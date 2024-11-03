describe('GamePlay component', () => {
  beforeEach(() =>{
    // hint: you'll want to add an intercept here if you are making a network request on page load!
    cy.visit('http://localhost:3000/game')
  });

  it('displays NavBar on page load', () => {
    cy.get('[data-cy="title"]').should('have.text', 'Down The Rabbit Hole')
  })

  it('displays prey animal image and facts', () => {
    cy.get('[data-cy="animal-container"]').within(() => {
      cy.get('[data-cy="animal-name"]').contains('rabbit')
      cy.get('[data-cy="animal-pic"]').should('have.attr', 'src')
      cy.get('[data-cy="facts-list"]').each(() => {
        cy.get('[data-cy="diet-li"]').should('be.visible')
        cy.get('[data-cy="predators-li"]').should('be.visible')
      })
    })
  })

  it('displays a favorite button that adds animal to Favorites', () => {
    cy.get('[data-cy="add-to-favorites"]').should('be.visible')
    // need to add testing for once functionality is implemented
  })

  it('displays eat me button which opens predator modal when clicked', () => {
    cy.get('[data-cy="eat-me-button"]').should('have.text', "Eat Me!")
    cy.get('[data-cy="eat-me-button"]').click()
    cy.get('[data-cy="modal-overlay"]').should('be.visible')
  })

  it('modal displays predator info', () => {
    cy.get('[data-cy="eat-me-button"]').click()
    cy.get('[data-cy="predators-header"]').should('be.visible')
    cy.get('[data-cy="predator-image"]').should('have.attr', 'src')
    cy.get('[data-cy="predator-image"]').should('have.length', 3)
  })

  it('selecting a predator exits modal then sets predator as current animal', () => {
    cy.get('[data-cy="eat-me-button"]').click()
    cy.get('[data-cy="predator-image"]').eq(1).click()

    cy.get('[data-cy="animal-container"]').within(() => {
      cy.get('[data-cy="animal-name"]').contains('bobcat')
      cy.get('[data-cy="animal-pic"]').should('have.attr', 'src')
      cy.get('[data-cy="facts-list"]').each(() => {
        cy.get('[data-cy="diet-li"]').should('be.visible')
        cy.get('[data-cy="predators-li"]').should('be.visible')
      })
    })
  })

  it('can exit predator modal by clicking outside the box', () => {
    cy.get('[data-cy="modal-overlay"]').should('not.exist')

    cy.get('[data-cy="eat-me-button"]').click()
    cy.get('[data-cy="modal-overlay"]').should('exist')
    cy.get('[data-cy="predators-header"]').should('be.visible')

    cy.get('[data-cy="modal-overlay"]').click()
    cy.get('[data-cy="modal-overlay"]').should('not.exist')
    cy.get('[data-cy="predators-header"]').should('not.exist')
  })

})