describe('HomePage', () => {
    it('shoud visit HomePage', () => {
      cy.visit('/')
      cy.getByDataTestid('basegun-logo').should('exist')
      cy.contains('li', 'Basegun est une application' )
    })
  
  it('should open Menu informations', () => {
      cy.visit('/')
      cy.get('button').should('have.class','fr-btn--menu')
    })
  }
)