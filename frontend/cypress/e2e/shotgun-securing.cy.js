describe("Shotgun securing", () => {
  it("should secure and identificate real shotgun", () => {
    cy.miseEnSecurite();
    cy.getByDataTestid("select-file").as("fileInput");
    cy.intercept("POST", "/api/upload").as("upload");
    cy.get("@fileInput").selectFile("./cypress/images/fusil-a-pompe.jpg", {
      force: true,
    });
    cy.wait("@upload").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
    cy.url().should("contain", "/mise-en-securite-tutoriel");
    cy.getVideo();
    cy.contains("h1", "Mettre en sécurité mon arme");
    cy.contains("li", "Si la pompe est bloquée");
    cy.getByDataTestid("button-next").click();
    cy.contains("h1", "Fin de la mise en sécurité");
    cy.getByDataTestid("go-to-identification").click();
    cy.url().should("contain", "/carte-manquante");
    cy.getByDataTestid("button-next").click();
    cy.IdentificationRealShotgun();
    cy.url().should("contain", "/guide-identification/resultat-final");
    cy.getByDataTestid("arm-category").should("contain", "Catégorie B");
    cy.getByDataTestid("return-to-home-end").click();
    cy.url().should("contain", "/accueil");
  });
});
