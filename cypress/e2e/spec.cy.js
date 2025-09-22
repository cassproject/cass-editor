describe('template spec', () => {
})

/* ==== Test Created with Cypress Studio ==== */
it('create and delete framework', function () {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:8082?server=https://dev.cassproject.org/api/');
  cy.get('#side-nav-frameworks-link').click();
  cy.get('#add-new-dropdown-toggle-button').click();
  cy.get('#add-new-dropdown-framework').click();
  cy.get('section.modal-card-body').click();
  cy.get('#http\\:\\/\\/schema\\.org\\/description-0 > .field > .control.is-expanded > #property-string-computed-text').click();
  cy.get('#http\\:\\/\\/schema\\.org\\/description-0 > .field > .control.is-expanded > #property-string-computed-text').clear('');
  cy.get('#http\\:\\/\\/schema\\.org\\/description-0 > .field > .control.is-expanded > #property-string-computed-text').type("This is a test framework created by Cypress. It should be deleted.");
  cy.get('#thing-editing-done-editing-button').click();
  cy.get('#edit-node-button').click({ force: true }); // The window should be scrolled such that this is visible. It may be visible, maybe not. This is a design principle issue?
  cy.wait(2000); // This is a bug, it should be either invisible while binding or bound immediately.
  cy.get('#cancel-create-new-thing-button').click();
  cy.get('#delete-framework-confirm-delete-button').click();
  /* ==== End Cypress Studio ==== */
});