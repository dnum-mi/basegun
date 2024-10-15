describe("Expert contact path", () => {
  it("should simulate expert path for police", () => {
    cy.wait(5000);
    cy.ExpertContactPath();

    cy.getByDataTestid("select-file").as("fileInput");
    cy.intercept("POST", "/api/upload").as("upload");
    cy.get("@fileInput").selectFile("./cypress/images/arme-low.png", {
      force: true,
    });
    cy.wait("@upload").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
    cy.getByDataTestid("expert-path").click();

    cy.url().should("include", "localhost:8080");

    cy.origin("http://localhost:8080", () => {
      cy.get("#username").type("police");
      cy.get("#password").type("password");
      cy.get("#kc-login").click();

      cy.contains("span", "Contacter un expert en arme");
      cy.contains("h3", "Avertissement");
      cy.getByDataTestid("back-home").click();
      cy.url().should("contain", "/accueil");
    });
  });

  it.only("should simulate expert path for gendarme", () => {
    cy.ExpertContactPath();
    cy.wait(1000);

    cy.getByDataTestid("select-file").as("fileInput");
    cy.intercept("POST", "/api/upload").as("upload");
    cy.get("@fileInput").selectFile("./cypress/images/arme-low.png", {
      force: true,
    });
    cy.wait(1000);
    cy.wait("@upload").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
    cy.wait(1000);
    // cy.getByDataTestid("expert-path").click();

    cy.visit("/auth/callback");
    cy.wait(5000);
    cy.get("#username").type("gendarmerie");
    cy.wait(1000);
    cy.get("#password").type("password");
    cy.wait(1000);
    cy.get("#kc-login").click();
    cy.wait(1000);

    // cy.url().should("include", "localhost:8080");
    // cy.get("#username").type("gendarmerie");
    // cy.get("#password").type("password");
    // cy.get("#kc-login").click();
    cy.contains("span", "Contacter un expert de l'IRCGN");
    cy.getByDataTestid("situation-urgente").click();
    cy.contains("span", "01 78 47 31 46");
    cy.getByDataTestid("previous").click();
    cy.getByDataTestid("situation-non-urgente").click();
    cy.getByDataTestid("confirm-button").click();
    cy.getByDataTestid("nigend").type("12345");
    cy.getByDataTestid("next-button").click();
    cy.getByDataTestid("una-procedure-number").type("12345");
    cy.getByDataTestid("next-button").click();
    cy.getByDataTestid("confirm-button").click();
    cy.getByDataTestid("left-picture").selectFile(
      "./cypress/images/arme-low.png",
      {
        force: true,
      },
    );
    cy.getByDataTestid("right-picture").selectFile(
      "./cypress/images/arme-low.png",
      {
        force: true,
      },
    );
    cy.getByDataTestid("markings-pictures").selectFile(
      "./cypress/images/arme-low.png",
      {
        force: true,
      },
    );
    cy.getByDataTestid("magazine-picture").selectFile(
      "./cypress/images/arme-low.png",
      {
        force: true,
      },
    );
    cy.getByDataTestid("next-button").click();
    cy.contains("h3", "Le formulaire a été envoyé avec succès !");
    cy.getByDataTestid("back-home").click();
    cy.url().should("contain", "/accueil");
  });
});
