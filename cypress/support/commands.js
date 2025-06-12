Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.wait(1000);
  cy.get('#email').type('admin@example.com');
  cy.get('#password').type('password123');
  cy.get('button[type="submit"]').click();
});
