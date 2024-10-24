describe("Typology Revolver Securing", () => {
  it("should identificate revolver with small fireplaces (?) ", () => {
    cy.miseEnSecurite();
    cy.getByDataTestid("select-file").as("fileInput");
    cy.intercept("POST", "/api/upload").as("upload");
    cy.get("@fileInput").selectFile("./cypress/images/revolver.jpg", {
      force: true,
    });
    cy.wait("@upload").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
    cy.url().should("contain", "/mise-en-securite-choix-option-etape/1");
    cy.getByDataTestid("button-next").should("have.attr", "disabled");
    cy.contains("Petites Cheminées").first().click();
    cy.getByDataTestid("button-next").should("not.have.attr", "disabled");
    cy.getByDataTestid("button-next").click();
    cy.url().should("contain", "/fin-mise-en-securite");
    cy.contains("h1", "mise en sécurité");
    cy.contains("p", "les manipulations sont complexes");
    cy.getByDataTestid("go-to-identification").click();
    cy.url().should("contain", "/guide-identification/resultat-final");
    cy.getByDataTestid("arm-category").should("contain", "Catégorie D");
  });

  it("should secure and identificate real revolver with barrel button", () => {
    cy.miseEnSecurite();
    cy.getByDataTestid("select-file").as("fileInput");
    cy.intercept("POST", "/api/upload").as("upload");
    cy.get("@fileInput").selectFile("./cypress/images/revolver.jpg", {
      force: true,
    });
    cy.wait("@upload").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
    cy.arrierePlatRevolver();
    cy.contains("Bouton à côté du barillet").first().click();
    cy.getByDataTestid("button-next").should("not.have.attr", "disabled");
    cy.getByDataTestid("button-next").click();
    cy.getVideo();
    cy.contains("h1", "Mettre en sécurité mon arme");
    cy.contains("li", "Tirer ou pousser");
    cy.getByDataTestid("button-next").click();
    cy.url().should("contain", "/fin-mise-en-securite");
    cy.getByDataTestid("go-to-identification").click();
    cy.IdentificationRevolver();
    cy.url().should("contain", "/guide-identification/resultat-final");
    cy.getByDataTestid("arm-category").should("contain", "Catégorie B");
    cy.getByDataTestid("return-to-home-end").click();
    cy.url().should("contain", "/accueil");
  });
  it("should secure and identificate real revolver with hidden door", () => {
    cy.miseEnSecurite();
    cy.getByDataTestid("select-file").as("fileInput");
    cy.intercept("POST", "/api/upload").as("upload");
    cy.get("@fileInput").selectFile("./cypress/images/revolver.jpg", {
      force: true,
    });
    cy.wait("@upload").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
    cy.arrierePlatRevolver();
    cy.contains("Portière qui cache le côté droit du barillet").first().click();
    cy.getByDataTestid("button-next").should("not.have.attr", "disabled");
    cy.getByDataTestid("button-next").click();
    cy.getByDataTestid("button-next").should("have.attr", "disabled");
    cy.contains("Le barillet ne bascule pas").first().click();
    cy.getByDataTestid("button-next").should("not.have.attr", "disabled");
    cy.getByDataTestid("button-next").click();
    cy.contains("h1", "Mettre en sécurité mon arme");
    cy.contains("li", "Contrôler que chaque chambre");
    cy.getByDataTestid("button-next").click();
    cy.url().should("contain", "/fin-mise-en-securite");
    cy.getByDataTestid("go-to-identification").click();
    cy.IdentificationRevolver();
    cy.url().should("contain", "/guide-identification/resultat-final");
    cy.getByDataTestid("arm-category").should("contain", "Catégorie B");
    cy.getByDataTestid("return-to-home-end").click();
    cy.url().should("contain", "/accueil");
  });
});
