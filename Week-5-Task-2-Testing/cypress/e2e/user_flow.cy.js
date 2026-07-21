describe('E2E User Flow Test', () => {
  it('simulates full user flow: typing, validation error, and item creation', () => {
    cy.visit('/');

    // 1. Verify app load
    cy.contains('Task Manager App').should('be.visible');

    // 2. Trigger validation error
    cy.get('button[type="submit"]').click();
    cy.contains('Item name is required').should('be.visible');

    // 3. Complete happy path user flow
    cy.get('input[placeholder="Enter item name"]').type('E2E Cypress Test Item');
    cy.get('button[type="submit"]').click();

    // 4. Verify item appears in list
    cy.contains('E2E Cypress Test Item').should('be.visible');
  });
});