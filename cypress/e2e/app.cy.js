import { CRUD_ROUTES } from "@/constants/routes.constants"


describe('Cruds', () => {
  it('should validate the cruds flow', () => {
    const BASE_URL = 'http://localhost:3001'
    Object.values(CRUD_ROUTES).forEach(({ href }) => {

      cy.visit(BASE_URL.concat(href))

      cy.get(`a[href*="${href}/add"]`).click()

    })



    // // Find a link with an href attribute containing "about" and click it
    // cy.get('a[href*="about"]').click()

    // // The new url should include "/about"
    // cy.url().should('include', '/about')

    // // The new page should contain an h1 with "About page"
    // cy.get('h1').contains('About Page')
  })
})