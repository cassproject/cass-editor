
  it('createAccount', () => {
    cy.visit('http://localhost:8082/?server=https://dev.cassproject.org/api/');

    let rando = Math.floor(Math.random() * 1000000);
    let user = `testuser${rando}`;
    let email = `testuser${rando}@example.com`;
    let password = 'testpassword';

    /* ==== Generated with Cypress Studio ==== */
    cy.get('#side-nav-show-login-button').click();
    cy.get('#legacy-login-create-account-button').click();
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
    cy.get('#side-nav-user-icon-button').click();
    cy.get('#side-nav-logout-button').click();
    cy.get('#logout-success-login-button').click();
    cy.get('#legacy-login-username').clear('');
    cy.get('#legacy-login-username').type(user);
    cy.get('#legacy-login-password').clear('');
    cy.get('#legacy-login-password').type(password);
    cy.get('#legacy-login-button').click();
    cy.get('#side-nav-user-icon-button').click();
    cy.get('#side-nav-logout-button').click();
    cy.get('#logout-success-close-button').click();
    cy.get('#side-nav-user-icon-button').click();
    cy.get('#side-nav-show-login-button').click();
    cy.get('#legacy-login-username').clear('');
    cy.get('#legacy-login-username').type(user);
    cy.get('#legacy-login-password').clear('');
    cy.get('#legacy-login-password').type(password);
    cy.get('#legacy-login-button').click();
    cy.get('#side-nav-user-icon-button').click();
    cy.get('#side-nav-logout-button').click();
    cy.get('#logout-success-close-button').click();
    /* ==== End Cypress Studio ==== */
  })