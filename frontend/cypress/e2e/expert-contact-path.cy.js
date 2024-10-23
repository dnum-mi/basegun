describe("Expert contact path", () => {
  it.only("should simulate expert path for police", () => {
    // cy.wait(1000);
    // cy.ExpertContactPath();

    // cy.getByDataTestid("select-file").as("fileInput");
    // cy.intercept("POST", "/api/upload").as("upload");
    // cy.get("@fileInput").selectFile("./cypress/images/arme-low.png", {
    //   force: true,
    // });
    // cy.wait("@upload").then(({ response }) => {
    //   expect(response.statusCode).to.eq(200);
    // });
    // cy.wait(1000);
    // cy.getByDataTestid("expert-path").click();
    // cy.wait(1000);

    cy.visit("/auth/callback").then(() => {
      cy.origin("http://localhost:8080", () => {
        cy.visit(
          "/realms/basegun/protocol/openid-connect/auth?client_id=basegun&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fcallback&response_type=code&scope=openid+profile+email&state=428f9398a9194241a174f98656c29a12&code_challenge=6BTYRbPCfmSjp7HgRnCACfe6NGBxckfqKySTKeCW2HI&code_challenge_method=S256",
        );
        cy.get("#username").type("police");
        cy.get("#password").type("password");
        cy.get("#kc-login").click();
      });
    });
    cy.wait(10000);
    cy.visit("/guide-contact");
    cy.reload();
    cy.wait(5000);
    cy.contains("span", "Contacter un expert en arme");
    cy.contains("h3", "Avertissement");
    cy.getByDataTestid("back-home").click();
    cy.url().should("contain", "/accueil");
  });

  it("should simulate expert path for gendarme", () => {
    // cy.ExpertContactPath();
    // cy.wait(1000);

    // cy.getByDataTestid("select-file").as("fileInput");
    // cy.intercept("POST", "/api/upload").as("upload");
    // cy.get("@fileInput").selectFile("./cypress/images/arme-low.png", {
    //   force: true,
    // });
    // cy.wait(1000);
    // cy.wait("@upload").then(({ response }) => {
    //   expect(response.statusCode).to.eq(200);
    // });
    // cy.wait(1000);
    // cy.getByDataTestid("expert-path").click();

    cy.visit(
      "http://localhost:8080/realms/basegun/protocol/openid-connect/auth?client_id=basegun&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fcallback&response_type=code&scope=openid+profile+email&state=428f9398a9194241a174f98656c29a12&code_challenge=6BTYRbPCfmSjp7HgRnCACfe6NGBxckfqKySTKeCW2HI&code_challenge_method=S256",
    );
    cy.wait(2000);
    cy.get("#username").type("gendarmerie");
    cy.wait(1000);
    cy.get("#password").type("password");
    cy.wait(1000);
    cy.get("#kc-login").click();

    // cy.url().should("include", "localhost:8080");
    // cy.get("#username").type("gendarmerie");
    // cy.get("#password").type("password");
    // cy.get("#kc-login").click();
    cy.wait(1000);
    cy.visit("http://localhost:5173/guide-contact");
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
