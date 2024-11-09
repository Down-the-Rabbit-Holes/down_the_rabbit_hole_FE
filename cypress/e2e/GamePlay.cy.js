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
  });
});

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
    ).as('rabbit');
    cy.visit('http://localhost:3000/game');
  });

  it('displays rabbit information', () => {
    // cy.get('[data-cy="animal-name"]').should('contain', 'RABBIT');
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
  });

  it('displays NavBar on page load', () => {
    cy.get('.navBar').should('exist');
    cy.get('.nav-wrapper').should('exist');
    cy.get('[data-cy="title"]').should('have.text', 'Down The Rabbit Hole');
    cy.get('.my-save-view').should('have.text', 'My Favorites');
  });

  it('favorites button toggles adding animals to favorites', () => {
    cy.intercept('POST', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites', {
      statusCode: 200,
      body: {
        id: 1,
        animal_id: 1
      }
    }).as('favorite-animal');
  
    cy.get('#switch').should('not.be.checked');
    cy.get('.love').should('be.visible').click();
    cy.get('#switch').should('be.checked');

    cy.wait('@favorite-animal').then((interception) => {
      const favoriteId = interception.response.body.id;
  
     
      cy.intercept('DELETE', `https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites/${favoriteId}`, {
        statusCode: 200
      }).as('unfavorite-animal');
  
      cy.get('.love-heart').click();
      cy.get('#switch').should('not.be.checked');
  
      cy.wait('@unfavorite-animal');
    });
  });

  it('displays eat me button which opens predator modal when clicked', () => {
    cy.intercept('GET',
      'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=eat_me&animal_name=rabbit',
      { statusCode: 200,
        body: {
          data: [
            {
              id: '1',
              attributes: {
                name: 'Coyote',
                photo_url: 'https://images.pexels.com/photos/23511068/pexels-photo-23511068/free-photo-of-close-up-of-a-coyote-standing-on-a-field.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
            },
          ],
        },
      }
    ).as('fetchPredators');

    cy.get('[data-cy="eat-me-button"]').should('have.text', "Eat Me!").click();

    cy.wait('@fetchPredators');

    cy.get('[data-cy="modal-overlay"]').should('be.visible');
    cy.get('[data-cy="modal-content"]').should('be.visible');
    cy.get('[data-cy="predators-header"]').should('contain', "Prey's Predators");

    cy.get('[data-cy="predators-container"]')
      .children()
      .should('have.length', 1);

      cy.get('[data-cy="predators-container"]')
      .children()
      .eq(0)
      .within(() => {
        cy.get('.predator-image')
          .should('have.attr', 'src', 'https://images.pexels.com/photos/23511068/pexels-photo-23511068/free-photo-of-close-up-of-a-coyote-standing-on-a-field.jpeg?auto=compress&cs=tinysrgb&w=600')
          .should('have.attr', 'alt', 'A Coyote');
        cy.contains('Coyote');
      });

  });

  it('can exit predator modal by clicking outside the box', () => {
    cy.intercept(
      'GET',
      'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=eat_me&animal_name=rabbit', {
        statusCode: 200,
        body: []
      }
    );
    cy.get('[data-cy="modal-overlay"]').should('not.exist');
    cy.get('[data-cy="eat-me-button"]').click();
    cy.get('[data-cy="modal-overlay"]').should('exist');
    cy.get('[data-cy="predators-header"]').should('exist');

    cy.get('[data-cy="GamePlay-section"]').click();
    cy.get('[data-cy="modal-overlay"]').should('not.exist');
    cy.get('[data-cy="predators-header"]').should('not.exist');
  });

  it('hell', () => {
    cy.intercept('GET',
      'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=eat_me&animal_name=rabbit',
      { statusCode: 200,
        body: {
          data: [
            {
              id: '1',
              attributes: {
                name: 'Coyote',
                photo_url: 'https://images.pexels.com/photos/23511068/pexels-photo-23511068/free-photo-of-close-up-of-a-coyote-standing-on-a-field.jpeg?auto=compress&cs=tinysrgb&w=600',
              },
            },
          ],
        },
      }
    ).as('fetchPredators');

    cy.intercept('GET',
      'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=start&name=Coyote',
      {
        statusCode: 200,
        fixture: 'second-animal'
      }
    ).as('fetchCoyote');

    cy.get('[data-cy="eat-me-button"]').click();
    cy.wait('@fetchPredators');

    // Click on the predator image (Coyote)
    cy.get('[data-cy="predator-image"]').click();
    cy.wait('@fetchCoyote');

    // Verify that the main page displays the new selected predator (Coyote)
    cy.get('[data-cy="animal-name"]').should('contain', 'COYOTE');
    cy.get('[data-cy="animal-pic"]').should('have.attr', 'src').and('include', 'coyote-standing-on-a-field.jpeg');
    
    // Check facts about the Coyote
    cy.get('[data-cy="scientific-name-li"]').should('contain', 'Canis latrans');
    cy.get('[data-cy="animal-pic"]').should('contain', 'https://images.pexels.com/photos/23511068/pexels-photo-23511068/free-photo-of-close-up-of-a-coyote-standing-on-a-field.jpeg?auto=compress&cs=tinysrgb&w=600');
    cy.get('[data-cy="diet-li"]').should('contain', "A Coyote's diet includes Rabbit, Mice, Deer");
    cy.get('[data-cy="predators-li"]').should('contain', "A Coyote's predators include Human, Bears, Wolves");
    cy.get('[data-cy="habitat-li"]').should('contain', 'forests, plains and deserts');
    cy.get('[data-cy="top-speed-li"]').should('contain', '40 miles per hour');
    cy.get('[data-cy="lifespan-li"]').should('contain', '10 - 15 years');
    cy.get('[data-cy="weight-li"]').should('contain', '7kg - 21kg');
    cy.get('[data-cy="fun-fact-li"]').should('contain', 'Prairie Wolf');
  });


  // it('selecting a predator exits modal then sets predator as current animal', () => {
  //   cy.intercept('GET',
  //     'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=eat_me&animal_name=rabbit',
  //     { statusCode: 200,
  //       body: {
  //         data: [
  //           {
  //             id: '1',
  //             attributes: {
  //               name: 'Coyote',
  //               photo_url: 'https://images.pexels.com/photos/23511068/pexels-photo-23511068/free-photo-of-close-up-of-a-coyote-standing-on-a-field.jpeg?auto=compress&cs=tinysrgb&w=600',
  //             },
  //           },
  //         ],
  //       },
  //     }
  //   ).as('fetchPredators');
  //   cy.intercept('GET',
  //     'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals?action_type=start&name=Coyote', {
  //       statusCode: 200,
  //       fixture: 'second-animal'
  //     }
  //   ).as('fetchCoyote');
    
  //   cy.get('[data-cy="eat-me-button"]').click()
  //   // cy.get('[data-cy="predator-image"]').eq(1).click()
  //   // cy.get('[data-cy="predator-image"]').click()


  //   cy.wait('@fetchPredators');

  // // Click on the predator image (Coyote)
  //   cy.get('[data-cy="predator-image"]').click();

  //   // Wait for the fetch of the selected animal
  //   cy.wait('@fetchCoyote');

  //   // Validate that the current animal data is rendered correctly
  //   cy.get('[data-cy="animal-name"]').should('contain', 'Coyote');
  //   cy.get('[data-cy="animal-pic"]').should('have.attr', 'src').and('include', 'coyote-standing-on-a-field.jpeg');
  //   cy.get('[data-cy="scientific-name-li"]').should('contain', 'Canis latrans');
  //   cy.get('[data-cy="diet-li"]').should('contain', 'Carnivore');
  //   cy.get('[data-cy="prey-li"]').should('contain', 'Rabbit, Mice, Deer');
  //   cy.get('[data-cy="predators-li"]').should('contain', 'Human, Bears, Wolves');
  //   cy.get('[data-cy="habitat-li"]').should('contain', 'Forests, plains and deserts');
  //   cy.get('[data-cy="top-speed-li"]').should('contain', '40 miles per hour');
  //   cy.get('[data-cy="fun-fact-li"]').should('contain', 'Prairie Wolf');
  //   cy.get('[data-cy="lifespan-li"]').should('contain', '10 - 15 years');
  //   cy.get('[data-cy="weight-li"]').should('contain', '7kg - 21kg');

    // cy.get('[data-cy="animal-name"]').should('contain', 'COYOTE');
    // cy.get('[data-cy="animal-pic"]').should('exist');
    // cy.get('[data-cy="animal-pic"]').should('contain', 'https://images.pexels.com/photos/23511068/pexels-photo-23511068/free-photo-of-close-up-of-a-coyote-standing-on-a-field.jpeg?auto=compress&cs=tinysrgb&w=600');
    // cy.get('[data-cy="scientific-name-li"]').should('contain', 'Canis latrans');
    // cy.get('[data-cy="diet-li"]').should('contain', 'Rabbit, Mice, Deer');
    // cy.get('[data-cy="predators-li"]').should('contain', 'Human, Bears, Wolves, Great horned owls, Bald Eagles');
    // cy.get('[data-cy="habitat-li"]').should('contain', 'Forests, plains and deserts');
    // cy.get('[data-cy="top-speed-li"]').should('contain', '40 miles per hour');
    // cy.get('[data-cy="fun-fact-li"]').should('contain', 'Also known as the Prairie Wolf!');
    // cy.get('[data-cy="lifespan-li"]').should('contain', '10 - 15 years');
    // cy.get('[data-cy="weight-li"]').should('contain', '7kg - 21kg (15lbs - 46lbs)');
  // });
});
