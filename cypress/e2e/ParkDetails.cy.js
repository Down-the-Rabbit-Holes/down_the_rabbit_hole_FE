describe('Park Details', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites', {
    });
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/parks', {
      statusCode: 200, fixture: 'parks' 
    });
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/park_animals/4', {
      statusCode: 200, fixture: 'park-animals' 
    });
    cy.visit('http://localhost:3000/park-selection');
    cy.get(':nth-child(4) > [data-cy="parks-poster"]').click();
  });

  it('shows information about the selected park', () => {
    cy.get('.park-name').should('contain', 'Yellowstone National Park');
    cy.get('[data-cy="parks-details-poster"]')
      .should('have.attr', 'src')
      .and('include', 'yellowstone_national_park.jpg');

    const expectedDetails = [
      'The first national park in the world, Yellowstone features geothermal wonders like Old Faithful, as well as abundant wildlife including bison and grizzly bears.',
      'Location: Wyoming/Montana/Idaho',
      'Annual Visitors: 4.5 million visitors',
      'Get ready to meet some of Yellowstone National Park’s amazing creatures!',
      'Click on any animal to dive into the fascinating food web and see how they connect to the world around them.'
    ];

    cy.get('.park-details-text li').each((item, index) => {
      cy.wrap(item).should('contain.text', expectedDetails[index]);
    });
  });

  it('shows the rabbit image with overlay instructions', () => {
    cy.get('.park-rabbit-image')
      .should('have.attr', 'src')
      .and('include', 'rabbit-drawing.png');

    cy.get('.park-overlay-text')
      .should('contain.text', 'Click on an animal!');
  });

  it('should navigate the user to a animal informational page when an image is selected', () => {
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/animals/13', {
      statusCode: 200, fixture: 'park-animals' 
    });

    cy.get('[data-cy="animal-card-13"] > .animal-image').click();
    cy.url().should('include', '/game?animal_id=13');
  });
});
describe('Park Details - Sad Path', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/users/1/user_favorites', {
    });
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/parks', {
      statusCode: 200, fixture: 'parks' 
    });
    cy.intercept('GET', 'https://fathomless-river-45488-66abd37a0e2d.herokuapp.com/api/v1/park_animals/4', {
      statusCode: 500 
    });
    cy.visit('http://localhost:3000/park-selection');
    cy.get(':nth-child(4) > [data-cy="parks-poster"]').click();
  });

  it('shows a helpful message when failing to fetch park animals', () => {
    cy.get('.parks-animals-message')
      .should('contain.text', "Yellowstone National Park's animals coming soon!");
  });
});
