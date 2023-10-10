describe('Firearm Fiability', () => {
  it.skip('should identificate firearm with high fiability', () => {
    cy.accueil()
    cy.getByDataTestid('identification')
      .contains('J’ai déjà mis mon arme en sécurité, je veux l’identifier')
      .click()
    cy.url().should('contain', '/instructions')
    cy.contains('h3', 'Pour un résultat optimal')
    cy.contains('span', 'canon vers la droite')

    cy.getByDataTestid('select-file').as('fileInput')
    cy.intercept('POST', '/api/upload').as('upload')
    cy.get('@fileInput').selectFile('./cypress/images/pistolet-semi-auto.jpg', { force: true })
    cy.wait('@upload').then(({ response }) => {
      expect(response.statusCode).to.eq(200)
    })
    cy.getByDataTestid('next-step').click()
    cy.url().should('contain', '/guide-identification/informations-complementaires')
    cy.getByDataTestid('explanation').should('contain', 'questions supplémentaires')
    cy.getByDataTestid('next-step').click()
    cy.url().should('contain', '/guide-identification/munition-type')
    cy.getByDataTestid('next-step').should('have.attr', 'disabled')
    cy.contains('cartouches').first().click()
    cy.getByDataTestid('next-step').should('not.have.attr', 'disabled')
    cy.getByDataTestid('next-step').click()
    cy.url().should('contain', '/guide-identification/resultat-final')
    cy.getByDataTestid('arm-category').should('contain', 'Catégorie B')
    cy.getByDataTestid('arm-category').should(() => {
      expect(localStorage.getItem('confidenceLevel')).to.eq('"high"')
    })
  })

  it.skip('should identificate firearm with medium fiability', () => {
    cy.accueil()
    cy.getByDataTestid('identification')
      .contains('J’ai déjà mis mon arme en sécurité, je veux l’identifier')
      .click()
    cy.url().should('contain', '/instructions')
    cy.contains('h3', 'Pour un résultat optimal')
    cy.contains('span', 'canon vers la droite')

    cy.getByDataTestid('select-file').as('fileInput')
    cy.intercept('POST', '/api/upload').as('upload')
    cy.get('@fileInput').selectFile('./cypress/images/arme-medium.jpg', { force: true })
    cy.wait('@upload').then(({ response }) => {
      expect(response.statusCode).to.eq(200)
    })
    cy.url().should('contain', '/guide-identification/resultat-typologie')
    cy.contains('p', 'Arme semi-automatique ou automatique')
    cy.get('h2').should(() => {
      expect(localStorage.getItem('confidenceLevel')).to.eq('"medium"')
    })
  })

  it.skip('should identificate firearm with low fiability', () => {
    cy.accueil()
    cy.getByDataTestid('identification')
      .contains('J’ai déjà mis mon arme en sécurité, je veux l’identifier')
      .click()
    cy.url().should('contain', '/instructions')
    cy.contains('h3', 'Pour un résultat optimal')
    cy.contains('span', 'canon vers la droite')

    cy.getByDataTestid('select-file').as('fileInput')
    cy.intercept('POST', '/api/upload').as('upload')
    cy.get('@fileInput').selectFile('./cypress/images/arme-low.jpg', { force: true })
    cy.wait('@upload').then(({ response }) => {
      expect(response.statusCode).to.eq(200)
    })
    cy.url().should('contain', '/guide-identification/resultat-typologie')
    cy.contains('p', 'Catégorie Non déterminée')
    cy.get('h2').should(() => {
      expect(localStorage.getItem('confidenceLevel')).to.eq('"low"')
    })
  })
})
