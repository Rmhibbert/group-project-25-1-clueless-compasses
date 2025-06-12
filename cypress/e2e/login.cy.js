describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('TC-DMS-2.3.1a - Should reject non-existent user login', () => {
    cy.wait(1000);
    cy.get('#email').type('notauser');
    cy.get('#password').type('password');
    cy.get('button[type="submit"]').click();
    cy.get('.text-red-600')
    .should('be.visible')
    .and('contain.text', 'User not found');
    
    cy.url().should('include', '/login');
  });

  it('TC-DMS-2.3.1b - Should allow existing user login', () => {
    cy.wait(1000);
    cy.get('#email').type('admin@example.com');
    cy.get('#password').type('password123');
    cy.get('button[type="submit"]').click();

    cy.url().should('not.include', '/login');

    cy.contains(/logout/i).should('exist');
  });
});
