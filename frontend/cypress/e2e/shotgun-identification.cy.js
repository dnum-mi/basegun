describe("Shotgun identification", () => {
  it("should identificate real shotgun", () => {
    cy.IdentificationShotgun("Cartouches");
    cy.url().should("contain", "/guide-identification/resultat-final");
    cy.getByDataTestid("arm-category").should("contain", "Catégorie B ou C");
    cy.getByDataTestid("return-to-home-end").click();
    cy.url().should("contain", "/accueil");
  });

  it("should identificate dummy shotgun", () => {
    cy.IdentificationShotgun("Billes");
    cy.url().should("contain", "/guide-identification/resultat-final");
    cy.getByDataTestid("arm-category").should(
      "contain",
      "Catégorie Non Classée",
    );
    cy.getByDataTestid("return-to-home-end").click();
    cy.url().should("contain", "/accueil");
  });
});
