describe('The Authorization page', () => {
  it('should let the user sign up with valid credentials', () => {
    cy.visit('/auth')
    cy.contains('SignUp instead?').click()
    cy.get('button').should('not.contain', 'SignUp instead?')
    cy.get('#name').type("Tony Stark")
    cy.get('#email').type("tony@starkk.com")
    cy.get('#password').type("tony1234")
    cy.get('form > .button').click()
    cy.url().should('be.equal',`${Cypress.config("baseUrl")}/`)
  })
  it('should login a valid user', () => {
    cy.login("tony@starkk.com", "tony1234")
    cy.url().should('be.equal',`${Cypress.config("baseUrl")}/`)
  })
})