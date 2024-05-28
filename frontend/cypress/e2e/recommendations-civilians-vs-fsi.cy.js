describe('Recommendations Civilians vs FSI', () => {
  it('should show application version FSI', () => {
    cy.visit('/', {
      onBeforeLoad: win => {
        Object.defineProperty(win.navigator, 'userAgent', {
          value: 'SAID',
        })
      },
    })
    cy.accueil()
    cy.getByDataTestid('secure-firearm')
      .contains('Je veux mettre en sécurité mon arme')
      .click()
    cy.contains('h2', 'Mettre en sécurité mon arme')
    cy.contains('p', 'En cas de doute,')
  })

  it('should show application version Civilians', () => {
    cy.visit('/', {
      onBeforeLoad: win => {
        Object.defineProperty(win.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
        })
      },
    })
    cy.accueil()
    cy.getByDataTestid('secure-firearm')
      .contains('Je veux mettre en sécurité mon arme')
      .click()
    cy.contains('h2', 'Mettre en sécurité mon arme')
    cy.contains('span', 'extraire des munitions')
  })
})
