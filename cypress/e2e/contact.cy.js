describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.getById("contact-input-message").type("Hello world");
    cy.get('[data-cy="contact-input-name"]').type("John Doe");
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
    cy.get('[data-cy="contact-btn-submit"]').should(
      "not.have.attr",
      "disabled",
    );
    cy.screenshot();
    cy.get('[data-cy="contact-input-email"]').type("test@example.com{enter}");

    // cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').contains("Sending...");
    cy.get('[data-cy="contact-btn-submit"]').should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.eq("Sending...");
    });
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
    cy.get('[data-cy="contact-input-message"]').focus().blur(); //Make loose focus on the element
    // cy.get('[data-cy="contact-input-message"]')
    //   .parent()
    //   .then((el) => {
    //     expect(el.attr("class")).to.contains("invalid");
    //   });
    cy.get('[data-cy="contact-input-message"]')
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/); //The first should yield an element and we check that invalid is on that element
    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);
    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .should((el) => {
        expect(el.attr("class")).to.contains("invalid");
      }); //This is another way to use should and to be sure that it is using the same element
    // .should("have.attr", "class")
    // .and("match", /invalid/);
  });
});
