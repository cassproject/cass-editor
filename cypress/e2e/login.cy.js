
  it('createAccount', () => {
    cy.visit('http://localhost:8082/?server=http://localhost/api/')

    let rando = Math.floor(Math.random() * 1000000)
    let user = `testuser${rando}`
    let email = `testuser${rando}@example.com`
    let password = 'testpassword'
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#side-nav-show-login-button > :nth-child(2)').click();
    cy.get('#legacy-login-create-account-button > :nth-child(2)').click();
    cy.get('#legacy-login-create-link-person-name').clear();
    cy.get('#legacy-login-create-link-person-name').type(user);
    cy.get('#legacy-login-create-link-person-email').clear();
    cy.get('#legacy-login-create-link-person-email').type(email);
    cy.get('#legacy-login-create-account-username').clear();
    cy.get('#legacy-login-create-account-username').type(user);
    cy.get('#legacy-login-create-account-password').clear();
    cy.get('#legacy-login-create-account-password').type(password);
    cy.get('#legacy-login-create-account-password-confirm').clear();
    cy.get('#legacy-login-create-account-password-confirm').type(password);
    cy.get('#legacy-login-create-link-person-button').click();
    cy.get('.logo-container > .button > span').click();
    cy.get('.px-3 > .my-2 > .button').click();
    cy.get('.modal-card-foot > .buttons > .is-primary > :nth-child(2)').click();
    cy.get('#legacy-login-username').clear();
    cy.get('#legacy-login-username').type(user);
    cy.get('#legacy-login-password').clear();
    cy.get('#legacy-login-password').type(password);
    cy.get('#legacy-login-button > :nth-child(2)').click();
    cy.get('.logo-container > .button > span').click();
    cy.get('.my-2 > .button > :nth-child(2)').click();
    cy.get('.is-secondary > :nth-child(2)').click();
    cy.get('#side-nav-show-login-button').click();
    cy.get('#legacy-login-username').clear();
    cy.get('#legacy-login-username').type(user);
    cy.get('#legacy-login-password').clear();
    cy.get('#legacy-login-password').type(password);
    cy.get('#legacy-login-button').click();
    cy.get('.logo-container > .button > span').click();
    cy.get('.my-2 > .button > :nth-child(2)').click();
    cy.get('.is-secondary > :nth-child(2)').click();
    /* ==== End Cypress Studio ==== */
  })