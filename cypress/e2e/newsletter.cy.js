describe('Newsletter', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    });
    it('should display a success message', () => {
        cy.intercept('POST','/newsletter*',{status:201});//Intercept any HTTP request
        cy.visit("/")
        cy.get('[data-cy="newsletter-email"]').type('test@test.com')
        cy.get('[data-cy="newsletter-submit"]').click()
        cy.contains('Thanks for signing up')
    })

    it('should display validation errors', ()=>{
        cy.intercept('POST','/newsletter*',{message:'Email exists already.'});//Intercept any HTTP request
        cy.visit("/")
        cy.get('[data-cy="newsletter-email"]').type('test@test.com')
        cy.get('[data-cy="newsletter-submit"]').click()
        cy.contains('Email exists already.')
    })
    it('should successfully create a new contact', () => {
        cy.request({
            method:'POST',
            url:'/newsletter',
            body:{email:'test@example.com'},
            form: true
        }).then(res => {
            expect(res.status).eq(201);
        });
    });
})