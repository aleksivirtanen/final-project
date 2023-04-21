describe('Add Item page', () => {
    it('should display error messages for invalid title/price/category inputs', () => {
      cy.visit('/')
      cy.login("seppo@raty.com", "test")
      cy.url().should('be.equal',`${Cypress.config("baseUrl")}/`)
      cy.get('[data-testid="add"] > a').click()
      cy.get('#title').type("T")
      cy.get('#description').type("Description...")
      cy.get('#price').type("200.222")
      cy.get('#image').type("test")
      cy.get('.button').click()
      cy.get('.item-form')
      .should('contain', 'Invalid input. Title must contain 3 to 60 characters')
      cy.get('.item-form')
      .should('contain', 'Invalid input. Please enter the price in the form xx.xx')
      cy.get('.item-form')
      .should('contain', 'Please select a category.')

      cy.get('#title').focus().clear()
      cy.get('#title').type("0123456789012345678901234567890123456789012345678901234567890")
      cy.get('#price').focus().clear()
      cy.get('#price').type("200")
      cy.get('#category-select').click()
      cy.get('.MuiList-root > [tabindex="0"]').click()
      cy.get('.button').click()
      cy.get('.item-form')
      .should('contain', 'Invalid input. Title must contain 3 to 60 characters')
      cy.get('.item-form')
      .should('contain', 'Invalid input. Please enter the price in the form xx.xx')
      cy.get('.item-form')
      .should('not.contain', 'Please select a category.')
    })
    it('should allow users to add new items with valid inputs', () => {
      cy.visit('/')
      cy.login("seppo@raty.com", "test")
      cy.url().should('be.equal',`${Cypress.config("baseUrl")}/`)
      cy.get('[data-testid="add"] > a').click()
      cy.get('#title').type("Valid Input Test")
      cy.get('#description').type("Description...")
      cy.get('#price').type("200.22")
      cy.get('#image').type("test")
      cy.get('#category-select').click()
      cy.get('.MuiList-root > [tabindex="0"]').click()
      cy.get('.button').click()
      cy.url().should('be.equal',`${Cypress.config("baseUrl")}/`)
      cy.get('[data-testid=title]').should('contain', 'Valid Input Test')
      cy.get('[data-testid="myitems"] > a').click()
      cy.contains('Valid Input Test')
      .parent('.item__info')
      .parent('.card')
      .within(() => {
        cy.get('.item__actions > .button--danger').click()
      })
      cy.get('h2 > :nth-child(2)').click()
      cy.get('[data-testid="title"]')
        .should('not.contain', 'Valid Input Test')
    })
  })