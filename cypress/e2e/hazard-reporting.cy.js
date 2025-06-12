// cypress/e2e/hazard-reporting.cy.js

describe('Hazard Reporting Page', () => {
  const baseUrl = 'http://localhost:5173';

  beforeEach(() => {
    cy.login();
    
    cy.visit(`${baseUrl}/hazards`);
  });

  it('TC-DMS-2.3.1c - Should NOT allow submitting a blank hazard', () => {
    cy.intercept('GET', '**/api/v1/hazards').as('getHazards');

    cy.wait('@getHazards');

    cy.get('details').then(($hazardsBefore) => {
      const initialCount = $hazardsBefore.length;

      cy.contains('Submit Hazard').click();

      cy.get('details').should('have.length', initialCount);
    });
  });

  it('TC-DMS-2.3.1d - Should create a new hazard successfully', () => {
    cy.intercept('GET', '**/api/v1/hazards').as('getHazards');
    cy.intercept('POST', '**/api/v1/hazards').as('postHazard');

    cy.get('select').eq(0).select('USAR');
    cy.get('#address-input-id input').type('Test Street, South Hill{enter}');
    cy.get('select').eq(1).select('Low');
    cy.get('select').eq(2).select('Active');
    cy.get('input[type="text"]').type('test@email.com');
    cy.get('textarea').eq(0).type('Test');
    cy.get('textarea').eq(1).type('Test');

    cy.contains('Submit Hazard').click();

    cy.wait('@postHazard');
    cy.wait('@getHazards');

    cy.get('details').should('contain', 'Test');
  });
});
