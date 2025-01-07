describe("HomePage", () => {
  it("shoud visit HomePage", () => {
    cy.visit("/");
    cy.getByDataTestid("basegun-logo").should("exist");
    cy.contains("li", "Basegun est une application");
    cy.get("swiper-container").shadow().find(".swiper-button-next").click();
    cy.contains("li", "ne remplace en aucun cas l'avis d'un expert");
    cy.get("#agree-button").contains("J'ai compris").click();
    cy.url().should("contain", "/accueil");
  });

  it("should open Menu informations", () => {
    cy.visit("/");
    cy.getByDataTestid("header-logo").contains("Ministère");
    cy.get("#button-menu").should("exist").click();
    cy.getByRole("navigation").contains("a", "À propos").click();
    cy.url().should("contain", "/a-propos");
    cy.contains("p", "Basegun est un projet");

    cy.get("#button-menu").click();
    cy.getByRole("navigation").contains("a", "Mentions légales").click();
    cy.url().should("contain", "/mentions-legales");
    cy.contains("p", "Basegun");

    cy.get("#button-menu").click();
    cy.getByRole("navigation").contains("a", "Contact").click();
    cy.url().should("contain", "/contact");
    cy.contains("a", "support.basegun@interieur.gouv.fr");
    cy.getByRole("navigation")
      .contains("a", "Informations")
      .click({ force: true });

    cy.get("#button-menu").click();
    cy.getByRole("navigation")
      .contains("a", "Accessibilité : partiellement conforme")
      .click();
    cy.url().should("contain", "/accessibilite");
    cy.contains("h1", "Déclaration d’accessibilité");
  });

  it.only("shoud change website theme", () => {
    cy.visit("/");
    cy.getByDataTestid("basegun-logo").should("exist");
    cy.contains("li", "Basegun est une application");
    cy.get("swiper-container").shadow().find(".swiper-button-next").click();
    cy.contains("li", "ne remplace en aucun cas l'avis d'un expert");
    cy.get("#agree-button").contains("J'ai compris").click();
    cy.url().should("contain", "/accueil");
    cy.get("#button-menu").click();
    cy.contains("button", "Paramètres d'affichage").click({ force: true });
    cy.contains("h1", "Changer le thème");
    cy.get(":nth-child(2) > .fr-radio-group > .fr-label").click();
    cy.wait(2000);
    cy.get(":nth-child(3) > .fr-radio-group > .fr-label").click();
    cy.wait(2000);
    cy.get(":nth-child(4) > .fr-radio-group > .fr-label").click();
    cy.wait(2000);
    cy.get(".fr-modal__header > .fr-btn").click();
    cy.get('[data-testid="close-modal-btn"]').click();
  });
});
