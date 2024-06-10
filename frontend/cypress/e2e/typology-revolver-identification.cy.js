describe("Typology Revolver Identification", () => {
  it("should identificate revolver typology", () => {
    cy.Identification();
    cy.getByDataTestid("select-file").as("fileInput");
    cy.intercept("POST", "/api/upload").as("upload");
    cy.get("@fileInput").selectFile("./cypress/images/revolver.jpg", {
      force: true,
    });
    cy.wait("@upload").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
    cy.IdentificationRevolver();
    cy.url().should("contain", "/guide-identification/resultat-final");
    cy.getByDataTestid("arm-category").should("contain", "Catégorie B ou D");
    cy.getByDataTestid("return-to-home-end").click();
    cy.url().should("contain", "/accueil");
  });
});
