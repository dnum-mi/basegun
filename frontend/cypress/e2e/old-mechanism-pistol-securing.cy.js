describe('Old Mechanism Pistol Securing', () => {
  it('should secure and identificate old mechanism pistol', () => {
    cy.accueil()
    cy.miseEnSecurite()
    cy.getByDataTestid('select-file').as('fileInput')
    cy.intercept('POST', '/api/upload').as('upload')
    cy.get('@fileInput').selectFile('./cypress/images/pistolet-ancien-a-percussion-monocoup.jpg', { force: true })
    cy.wait('@upload').then(({ response }) => {
      expect(response.statusCode).to.eq(200)
    })
    cy.pasDeGuide()
    cy.getByDataTestid('arm-category').should('contain', 'Catégorie D')
    cy.getByDataTestid('return-to-home-end').click()
    cy.url().should('contain', '/accueil')
  })
})
