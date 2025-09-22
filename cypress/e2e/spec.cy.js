describe('template spec', () => {
})

/* ==== Test Created with Cypress Studio ==== */
it('create and delete framework', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:8082?server=http://dev.cassproject.org/api/');
  cy.get(':nth-child(2) > :nth-child(1) > a > :nth-child(2)').click();
  cy.get('.dropdown-trigger > .is-hidden-touch > :nth-child(2)').click();
  cy.get('[href="#"]').click();
  cy.get('#property-string-computed-text').click();
  cy.get('#property-string-computed-text').click();
  cy.get('#property-string-computed-text').click();
  cy.get('.is-dark > :nth-child(2)').click();
  cy.get('.edit-button > .icon > .fa').click();
  cy.get('.button.is-danger > .icon > .fa').click();
  cy.get('#app > :nth-child(1) > #cass-modal > .modal-card > .modal-card-foot > .is-danger').click();
  /* ==== End Cypress Studio ==== */
});