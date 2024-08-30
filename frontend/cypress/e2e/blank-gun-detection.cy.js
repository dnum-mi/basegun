describe("Blank Gun Detection", () => {
  it("should identificate real blank gun", () => {
    cy.Identification();
    cy.getByDataTestid("select-file").as("fileInput");
    cy.intercept("POST", "/api/upload").as("upload");
    cy.get("@fileInput").selectFile("./cypress/images/blank-gun.jpg", {
      force: true,
    });
    cy.wait("@upload").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
    cy.wait(1000);
    cy.getByDataTestid("next-step").click();
    cy.IdentificationPistoletOCR("Identification d'une arme d'alarme");
    cy.wait(5000);
    cy.url().should("contain", "/guide-identification/resultat-final");
    cy.getByDataTestid("arm-category").should("contain", "Catégorie C");
  });

  it("should identificate firearm with missing text", () => {
    cy.Identification();
    cy.getByDataTestid("select-file").as("fileInput");
    cy.intercept("POST", "/api/upload").as("upload");
    cy.get("@fileInput").selectFile("./cypress/images/no-text.jpg", {
      force: true,
    });
    cy.wait("@upload").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
    cy.wait(1000);
    cy.getByDataTestid("next-step").click();
    cy.IdentificationPistoletOCR("Marquages non détectés");
    cy.get('.fr-col-12 > [data-testid="next-step"]').click();
    cy.url().should("contain", "/guide-identification/resultat-final");
    cy.getByDataTestid("arm-category").should("contain", "Catégorie B");
  });

  it("should identificate firearm with low quality", () => {
    cy.Identification();
    cy.getByDataTestid("select-file").as("fileInput");
    cy.intercept("POST", "/api/upload").as("upload");
    cy.get("@fileInput").selectFile("./cypress/images/low-quality.jpg", {
      force: true,
    });
    cy.wait("@upload").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
    cy.wait(1000);
    cy.getByDataTestid("next-step").click();
    cy.IdentificationPistoletOCR("Qualité d'image insuffisante");
    cy.get('.fr-col-12 > [data-testid="next-step"]').click();
    cy.url().should("contain", "/guide-identification/resultat-final");
    cy.getByDataTestid("arm-category").should("contain", "Catégorie B");
  });
});
