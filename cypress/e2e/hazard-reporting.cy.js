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
      cy.wait(1000)
      console.log(initialCount);
            cy.wait(3000)

      cy.contains('button', 'Submit Hazard').click();

      cy.get('details').should('have.length', initialCount);
    });
  });

  it('TC-DMS-2.3.1d - Should create a new hazard successfully', () => {
    const randomId = Math.floor(Math.random() * 10000);
    const address = `Test Street ${randomId}, South Hill`;
    cy.get('details').then(($hazardsBefore) => {
    const initialCount = $hazardsBefore.length;

    cy.wait(3000)
    cy.contains('label', 'Agency').find('select').select('USAR');
    cy.get('input[placeholder="Enter an address"]').type(address);
    cy.wait(3000)
    cy.get('.list-none').should('be.visible').first().click();
    cy.contains('label', 'Severity Level').find('select').select('Low');
    cy.contains('label', 'Status').find('select').select('Active');
    cy.contains('label', 'Contact Info').find('input').type(`test${randomId}@email.com`);
    cy.contains('label', 'Source of info').find('textarea').type(`Test ${randomId}`);
    cy.contains('label', 'Relevant Details').find('textarea').type(`Test ${randomId}`);
    cy.wait(3000)
    cy.contains('button', 'Submit Hazard').click();
    cy.wait(3000)
    cy.get('details').should('have.length', initialCount + 1);
    });


  });
});
