describe('Incident Reporting Page', () => {
  const baseUrl = 'http://localhost:5173';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.login();
    cy.visit('/incident');
  });

  it('TC-DMS-2.3.1e - Should NOT allow submitting a blank incident report', () => {
    cy.get('details').then(($incidentsBefore) => {
      const initialCount = $incidentsBefore.length;
      cy.wait(1000);
      cy.contains('button', 'Submit Incident').click();
      cy.wait(1000);

      cy.get('details').should('have.length', initialCount);
    });
  });

  it('TC-DMS-2.3.1f - Should create a new incident report successfully', () => {
    const randomId = Math.floor(Math.random() * 10000);
    const address = `Test Street ${randomId}, South Hill`;

    cy.get('details').then(($incidentsBefore) => {
      const initialCount = $incidentsBefore.length;

      cy.wait(1000);
      cy.get('input[placeholder="Description"]').type(`Test ${randomId}`);
      cy.get('input[placeholder="Cause"]').type(`Test ${randomId}`);
      cy.get('input[placeholder="Source"]').type(`Test ${randomId}`);
      cy.get('input[placeholder="Enter an address"]').type(address);

      cy.wait(1000);
      cy.get('.list-none').should('be.visible').first().click();

      const now = new Date().toISOString().slice(0, 16);
      cy.get('input[type="datetime-local"]').type(now);

      cy.wait(1000);
      cy.contains('button', 'Submit Incident').click();
      cy.wait(1000);

      cy.get('details').should('have.length', initialCount + 1);
    });
  });
});
