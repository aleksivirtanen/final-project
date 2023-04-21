const categories = ['Shelters', 'Sleeping Bags and Pads', 
        'Fire and Warmth', 'Camp Cooking and Field Stoves', 
        'Canteens and Hydration Bladders', 'Hygiene and Wash up']

describe('All listings page', () => {
    it('should filter items shown by category checkbox status', () => {
      cy.visit('/')
      cy.get("[data-testid='category']").each($category=>{
        expect($category.text()).to.be.oneOf(categories)
      })
      cy.get('[data-testid="shelters"] > .PrivateSwitchBase-input').click()
      cy.get('[data-testid="sleeping"] > .PrivateSwitchBase-input').click()
      cy.get('[data-testid="warmth"] > .PrivateSwitchBase-input').click()
      cy.get('[data-testid="campcooking"] > .PrivateSwitchBase-input').click()
      cy.get('[data-testid="canteens"] > .PrivateSwitchBase-input').click()
      cy.get('[data-testid="hygiene"] > .PrivateSwitchBase-input').click()
      cy.get('h2').should('contain', 'No items found.')
      cy.get('[data-testid="shelters"] > .PrivateSwitchBase-input').click()
      cy.get('[data-testid="sleeping"] > .PrivateSwitchBase-input').click()
      cy.get('[data-testid="warmth"] > .PrivateSwitchBase-input').click()
      cy.get('[data-testid="campcooking"] > .PrivateSwitchBase-input').click()
      cy.get('[data-testid="canteens"] > .PrivateSwitchBase-input').click()
      cy.get('[data-testid="hygiene"] > .PrivateSwitchBase-input').click()
      cy.get("[data-testid='category']").each($category=>{
        expect($category.text()).to.be.oneOf(categories)
      })
    })
    it('should filter items by keywords', () => {
        cy.visit('/')
        cy.get('[data-testid="title"]')
        .should('contain', 'Swiss Three Piece Mess Kit')
        cy.get('[data-testid="title"]')
        .should('contain', 'Romanian Two Piece Mess Kit')
        cy.get('#search').type("Romanian")
        cy.get('[data-testid="SearchIcon"]').click()
        cy.get('[data-testid="title"]')
        .should('not.contain', 'Swiss Three Piece Mess Kit')
        cy.get('[data-testid="title"]')
        .should('contain', 'Romanian Two Piece Mess Kit')
        cy.get('[data-testid="HighlightOffIcon"]').click()
        cy.get('[data-testid="title"]')
        .should('contain', 'Swiss Three Piece Mess Kit')
    })
  })