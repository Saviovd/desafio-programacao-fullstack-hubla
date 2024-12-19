describe("Hello World Page", () => {
  it("should display 'Hello World' on the screen", () => {
    cy.visit("/");

    cy.contains("Hello World").should("be.visible");
  });
});
