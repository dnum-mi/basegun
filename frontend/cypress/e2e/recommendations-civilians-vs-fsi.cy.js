describe('Recommendations Civilians vs FSI', () => {
  it('should show application version FSI', () => {
    cy.accueil()
    cy.getByDataTestid('secure-firearm')
      .contains('Je veux mettre en sécurité mon arme')
      .click()
    cy.url().should('contain', '/guide-mise-en-securite/mise-en-securite-recommandations')
    cy.contains('h2', 'Mettre en sécurité mon arme')
    cy.contains('span', 'extraire des munitions')
    cy.get('h2')
  })

  it('should show application version Civilians', () => {
    cy.visit('/', {
      onBeforeLoad: win => {
        Object.defineProperty(win.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
        })
      },
    })
    cy.getByDataTestid('basegun-logo').should('exist')
    cy.contains('li', 'Basegun est une application')
    cy.get('swiper-container').shadow().find('.swiper-button-next').click()
    cy.contains('li', 'ne remplace en aucun cas l\'avis d\'un expert')
    cy.get('#agree-button').contains('J\'ai compris').click()
    cy.url().should('contain', '/accueil')
    cy.getByDataTestid('secure-firearm')
      .contains('Je veux mettre en sécurité mon arme')
      .click()
    cy.url().should('contain', '/guide-mise-en-securite/mise-en-securite-recommandations')
    cy.contains('h2', 'Mettre en sécurité mon arme')
    cy.contains('span', 'extraire des munitions')
  })
})
