describe('Hazard Reporting Page', () => {
  const baseUrl = 'http://localhost:5173';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.login();
    cy.visit('/hazard');
  });

  it('TC-DMS-2.3.1c - Should NOT allow submitting a blank hazard', () => {
    cy.intercept('GET', '**/api/v1/hazards').as('getHazards');

    cy.wait('@getHazards');

    cy.get('details').then(($hazardsBefore) => {
      const initialCount = $hazardsBefore.length;

      cy.contains('button', 'Submit Hazard').click();

      cy.get('details').should('have.length', initialCount);
    });
  });

  it('TC-DMS-2.3.1d - Should create a new hazard successfully', () => {
    cy.wait(3000)
    cy.contains('label', 'Agency').find('select').select('USAR');
    cy.get('input[placeholder="Enter an address"]').type('Test Street, South Hill');
    cy.contains('label', 'Severity Level').find('select').select('Low');
    cy.contains('label', 'Status').find('select').select('Active');
    cy.contains('label', 'Contact Info').find('input').type('test@email.com');
    cy.contains('label', 'Source of info').find('textarea').type('Test');
    cy.contains('label', 'Relevant Details').find('textarea').type('Test');
      cy.contains('button', 'Submit Hazard').click();

  });
});
