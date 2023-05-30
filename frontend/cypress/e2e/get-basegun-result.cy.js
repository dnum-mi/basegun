describe('Get Basegun result', () => {
  it('should have dummy button enabled', () => { 
    cy.visit('/')
    cy.get('.swiper-button-next').click()
    cy.get('#position-button')
      .contains('J\'ai compris')
      .click()
    cy.url()
      .should('contain', '/accueil')
    cy.getByDataTestid('start')
      .contains('Démarrer')
      .click()
    cy.url()
      .should('contain', '/instructions')
    cy.contains('h3', 'Pour un résultat optimal')
    cy.contains('span', 'canon vers la droite')

    cy.readFile('./cypress/images/pistolet-semi-auto.jpg', null).then((file) => {
      expect(Cypress.Buffer.isBuffer(file)).to.be.true
      cy.intercept('POST', '/api/upload', {
        label: 'pistolet_semi_auto_moderne',
        confidence: 98,
        confidence_level: 'high'
      }).as('upload')
      cy.getByDataTestid('select-file').selectFile(file, { force: true })
      cy.wait('@upload').then(({ response }) => {
        expect(response.statusCode).to.eq(200)
      })
    })
      cy.visit('/resultat')
      cy.getByDataTestid('legal-category').contains('Catégorie B')
      cy.getByDataTestid('dummy-button')
        .should('be.enabled')
        .contains('Vérifier si l\'arme est factice')
  })

    it('should have dummy button disabled', () => { 
    cy.visit('/instructions')

    cy.readFile('./cypress/images/autre-pistolet.jpg', null).then((file2) => {
      expect(Cypress.Buffer.isBuffer(file2)).to.be.true
      cy.intercept('POST', '/api/upload', {
        label: 'autre_pistolet',
        confidence: 52,
        confidence_level: 'medium'
      }).as('upload')
      cy.getByDataTestid('select-file').selectFile(file2, { force: true })
      cy.wait('@upload').then(({ response }) => {
        expect(response.statusCode).to.eq(200)
      })
      cy.visit('/resultat')
      cy.getByDataTestid('legal-category').contains('Catégorie A, B ou D')
      cy.getByDataTestid('dummy-button')
        .should('be.disabled')
        .contains('Pas de guide de vérification')
    })
  })
})