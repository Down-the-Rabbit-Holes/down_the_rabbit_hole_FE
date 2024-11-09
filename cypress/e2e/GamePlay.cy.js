describe('Navigating to the game play view', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/', {
      statusCode: 200,
      body: []
    })
  });

  it('routes to a different url for the game play and make the API call', () => {
    cy.get('.game-start-image').should('exist').click();
    cy.url().should('include', '/game');
  })
})


describe('GamePlay component', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites',
      { statusCode: 200, body: [] }
    );
    cy.intercept(
      'GET',
      'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=start&name=rabbit',
      { statusCode: 200, fixture: 'game-play' }
    );
    cy.visit('http://localhost:3000/game');
  });

  it('displays rabbit information', () => {
    cy.get('[data-cy="animal-name"]').should('contain', 'RABBIT');
    cy.get('[data-cy="animal-name"]').should('contain', 'RABBIT');
    cy.get('[data-cy="animal-pic"]').should('exist');
    cy.get('[data-cy="scientific-name-li"]').should('contain', 'oryctolagus cuniculus');
    cy.get('[data-cy="diet-li"]').should('contain', 'Clover, Grass, Crunchy vegetables');
    cy.get('[data-cy="predators-li"]').should('contain', 'Fox, wolf, owl, bobcat, weasel, stoat, hawk');
    cy.get('[data-cy="habitat-li"]').should('contain', 'forest thickets, meadows and woodland');
    cy.get('[data-cy="top-speed-li"]').should('contain', '18 miles per hour');
    cy.get('[data-cy="fun-fact-li"]').should('contain', 'There are more than 50 different species!');
    cy.get('[data-cy="lifespan-li"]').should('contain', '4-9 years');
    cy.get('[data-cy="weight-li"]').should('contain', '0.5-3kg (1.1-6.6lbs)');


    cy.get('[data-cy="eat-me-button"]').should('exist');
    cy.get('.love').should('exist');
  })

  it('displays NavBar on page load', () => {
    cy.get('.navBar').should('exist');
    cy.get('.nav-wrapper').should('exist');
    cy.get('[data-cy="title"]').should('have.text', 'Down The Rabbit Hole');
    cy.get('.my-save-view').should('have.text', 'My Favorites');
  })

  it('displays a favorite button that adds animal to Favorites', () => {
    cy.get('.love').should('be.visible');
    // need to add testing for once functionality is implemented
  })

  it('displays eat me button which opens predator modal when clicked', () => {
    cy.intercept('GET',
      'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=eat_me&animal_name=rabbit',
      { statusCode: 200, fixture: 'second-animal' }
    );
    cy.get('[data-cy="eat-me-button"]').should('have.text', "Eat Me!").click()
    cy.get('[data-cy="modal-overlay"]').should('be.visible')
  })

  it('modal displays predator info', () => {

    cy.intercept(
      'GET',
      'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=eat_me&animal_name=rabbit', {
        statusCode: 200,
        fixture: 'second-animal'
      }
    ).as('eat-me-fetch');
    
    
    cy.get('[data-cy="eat-me-button"]').click();
    cy.wait('@eat-me-fetch');

    cy.get('[data-cy="predators-header"]').should('exist')
    // cy.get('[data-cy="animal-name"]').scrollIntoView().should('be.visible');
    // cy.get('[data-cy="animal-name"]').should('exist');
    cy.get('[data-cy="predator-image"]').should('exist');
  })

  it('can exit predator modal by clicking outside the box', () => {
    cy.intercept(
      'GET',
      'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=eat_me&animal_name=rabbit', {
        statusCode: 200,
        fixture: 'second-animal'
      }
    );
    cy.get('[data-cy="modal-overlay"]').should('not.exist');
    cy.get('[data-cy="eat-me-button"]').click();
    cy.get('[data-cy="modal-overlay"]').should('exist');
    cy.get('[data-cy="predators-header"]').should('exist');
    // cy.get('[data-cy="predators-header"]').should('be.visible')

    cy.get('[data-cy="GamePlay-section"]').click();
    cy.get('[data-cy="modal-overlay"]').should('not.exist');
    cy.get('[data-cy="predators-header"]').should('not.exist');
  })

  it('selecting a predator exits modal then sets predator as current animal', () => {
    cy.intercept('GET',
      'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=eat_me&animal_name=rabbit', {
        statusCode: 200,
        fixture: 'second-animal'
      }
    );
    cy.intercept('GET',
      'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=eat_me&animal_name=Coyote', {
        statusCode: 200,
        fixture: 'second-animal'
      }
    );
    
    cy.get('[data-cy="eat-me-button"]').click()
    cy.get('[data-cy="predator-image"]').eq(1).click()

    cy.get('[data-cy="animal-name"]').should('contain', 'COYOTE');
    cy.get('[data-cy="animal-pic"]').should('exist');
    cy.get('[data-cy="animal-pic"]').should('contain', 'https://images.pexels.com/photos/23511068/pexels-photo-23511068/free-photo-of-close-up-of-a-coyote-standing-on-a-field.jpeg?auto=compress&cs=tinysrgb&w=600');
    cy.get('[data-cy="scientific-name-li"]').should('contain', 'Canis latrans');
    cy.get('[data-cy="diet-li"]').should('contain', 'Rabbit, Mice, Deer');
    // DIET?
    cy.get('[data-cy="predators-li"]').should('contain', 'Human, Bears, Wolves, Great horned owls, Bald Eagles');
    cy.get('[data-cy="habitat-li"]').should('contain', 'Forests, plains and deserts');
    cy.get('[data-cy="top-speed-li"]').should('contain', '40 miles per hour');
    cy.get('[data-cy="fun-fact-li"]').should('contain', 'Also known as the Prairie Wolf!');
    cy.get('[data-cy="lifespan-li"]').should('contain', '10 - 15 years');
    cy.get('[data-cy="weight-li"]').should('contain', '7kg - 21kg (15lbs - 46lbs)');
  })
})
