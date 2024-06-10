describe("Firearm Fiability", () => {
  it("should identificate firearm with high fiability", () => {
    cy.Identification();

    cy.getByDataTestid("select-file").as("fileInput");
    cy.intercept("POST", "/api/upload").as("upload");
    cy.get("@fileInput").selectFile("./cypress/images/pistolet-semi-auto.jpg", {
      force: true,
    });
    cy.wait("@upload").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
    cy.getByDataTestid("next-step").click();
    cy.IdentificationPistoletSemiAuto();
    cy.url().should("contain", "/guide-identification/resultat-final");
    cy.getByDataTestid("arm-category").should("contain", "Catégorie B");
    cy.getByDataTestid("arm-category").should(() => {
      expect(localStorage.getItem("confidenceLevel")).to.eq('"high"');
    });
  });

  it("should identificate firearm with medium fiability", () => {
    cy.Identification();

    cy.getByDataTestid("select-file").as("fileInput");
    cy.intercept("POST", "/api/upload").as("upload");
    cy.get("@fileInput").selectFile("./cypress/images/arme-medium.png", {
      force: true,
    });
    cy.wait("@upload").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
    cy.url().should("contain", "/guide-identification/resultat-typologie");
    cy.contains("h3", "Catégorie A, B ou D");
    cy.get("h2").should(() => {
      expect(localStorage.getItem("confidenceLevel")).to.eq('"medium"');
    });
  });

  it("should identificate firearm with low fiability", () => {
    cy.Identification();

    cy.getByDataTestid("select-file").as("fileInput");
    cy.intercept("POST", "/api/upload").as("upload");
    cy.get("@fileInput").selectFile("./cypress/images/arme-low.png", {
      force: true,
    });
    cy.wait("@upload").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
    cy.url().should("contain", "/guide-identification/resultat-typologie");
    cy.contains("h2", "Catégorie non déterminée");
    cy.get("h2").should(() => {
      expect(localStorage.getItem("confidenceLevel")).to.eq('"low"');
    });
  });
});
