describe('task page', () => {
  it('should render the main image', () => {
    cy.visit('http://localhost:5173/');
    cy.get('.main-header').find('img');
    // cy.get('.main-header img')
  });

  it('should display tge page title', ()=> {
    cy.visit('http://localhost:5173/')
    cy.get('h1').contains('My Cypress Course Tasks')
  })
})