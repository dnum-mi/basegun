describe("Expert contact path", () => {
  it("should simulate expert path for police", () => {
    cy.session("police_user", () => {
      cy.visit("/accueil");
      cy.origin("http://localhost:8080", () => {
        cy.visit(
          "/realms/basegun/protocol/openid-connect/auth?client_id=basegun&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fcallback",
        );
        cy.get("#input-\\:r2\\:").type("police");
        cy.get("#password").type("password");
        cy.get("#kc-login").click();
      });
    });

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
    cy.url().should("include", "/guide-contact");
    cy.contains("span", "Contacter un expert en arme");
    cy.contains("h3", "Avertissement");
    cy.getByDataTestid("back-home").click();
  });

  it("should simulate expert path for gendarme", () => {
    cy.session("gendarmerie_user", () => {
      cy.visit("/accueil");
      cy.origin("http://localhost:8080", () => {
        cy.visit(
          "/realms/basegun/protocol/openid-connect/auth?client_id=basegun&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fcallback",
        );
        cy.get("#input-\\:r2\\:").type("gendarmerie");
        cy.get("#password").type("password");
        cy.get("#kc-login").click();
      });
    });

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

    cy.wait(1000);
    cy.url().should("include", "/guide-contact");
    cy.contains("span", "Contacter un expert de l'IRCGN");
    cy.getByDataTestid("situation-urgente").click();
    cy.contains("span", "00 00 00 00 00");
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
