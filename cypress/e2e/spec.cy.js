describe('template spec', () => {
  it('opens', () => {
    cy.visit('http://localhost:8082/?server=http://localhost/api/')
  })
  it('createAccount', () => {
    cy.visit('http://localhost:8082/?server=http://localhost/api/')
    cy.get('#side-nav-show-login-button').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.is-dark').click();
    cy.get(':nth-child(1) > .control > .input').clear();
    cy.get(':nth-child(1) > .control > .input').type('name');
    cy.get(':nth-child(2) > .control > .input').clear();
    cy.get(':nth-child(2) > .control > .input').type('email@email.com');
    cy.get(':nth-child(3) > .control > .input').clear();
    cy.get(':nth-child(3) > .control > .input').type('username');
    cy.get('.is-grouped > :nth-child(1) > .input').clear();
    cy.get('.is-grouped > :nth-child(1) > .input').type('password');
    cy.get(':nth-child(2) > .input').clear();
    cy.get(':nth-child(2) > .input').type('password');
    cy.get('.buttons > .is-expanded > :nth-child(2)').click();
    cy.get('.logo-container > .button > span').click();
    cy.get('.my-2 > .button > :nth-child(2)').click();
    cy.get('.is-secondary > :nth-child(2)').click();
    cy.get('#side-nav-show-login-button > :nth-child(2)').click();
    cy.get(':nth-child(1) > .control > .input').clear('u');
    cy.get(':nth-child(1) > .control > .input').type('username');
    cy.get(':nth-child(2) > .control > .input').clear();
    cy.get(':nth-child(2) > .control > .input').type('password');
    cy.get('.is-primary > .icon > .fa').click();
    cy.get('.logo-container > .button > span').click();
    cy.get('.px-3 > .my-2 > .button').click();
    cy.get('.modal-card-foot > .buttons > .is-primary > :nth-child(2)').click();
    cy.get(':nth-child(1) > .control > .input').clear('us');
    cy.get(':nth-child(1) > .control > .input').type('username');
    cy.get(':nth-child(2) > .control > .input').clear();
    cy.get(':nth-child(2) > .control > .input').type('password');
    cy.get('.is-primary > :nth-child(2)').click();
    /* ==== End Cypress Studio ==== */
  })
})