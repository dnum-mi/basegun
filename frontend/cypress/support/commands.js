// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { mount } from 'cypress/vue'
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('mount', mount)

Cypress.Commands.add('getByDataTestid', (selector, options) => {
  return cy.get(`[data-testid=${selector}]`, options)
})

Cypress.Commands.add('getByRole', (selector, options) => {
  return cy.get(`[role=${selector}]`, options)
})

Cypress.Commands.add('getVideo', () => {
  cy.get('video')
    .then(
      ($video) => {
        $video[0].addEventListener('loadeddata', () => {
          $video[0].play()
        })
        $video[0].load()
      })
  cy.wait(3000)
  cy.get('video')
    .then(($video) => {
      $video[0].pause()
    })
  cy.wait(2000)
  cy.get('video').should('have.prop', 'paused', true)
})

Cypress.Commands.add('accueil', () => {
  cy.getByDataTestid('basegun-logo').should('exist')
  cy.contains('li', 'Basegun est une application')
  cy.get('swiper-container').shadow().find('.swiper-button-next').click()
  cy.contains('li', 'ne remplace en aucun cas l\'avis d\'un expert')
  cy.get('#agree-button').contains('J\'ai compris').click()
  cy.url().should('contain', '/accueil')
})

Cypress.Commands.add('miseEnSecurite', () => {
  cy.visit('/')
  cy.getByDataTestid('basegun-logo').should('exist')
  cy.contains('li', 'Basegun est une application')
  cy.get('swiper-container').shadow().find('.swiper-button-next').click()
  cy.contains('li', 'ne remplace en aucun cas l\'avis d\'un expert')
  cy.get('#agree-button').contains('J\'ai compris').click()
  cy.url().should('contain', '/accueil')
  cy.getByDataTestid('secure-firearm')
    .contains('Je veux mettre en sécurité mon arme')
    .click()
  cy.contains('h2', 'Mettre en sécurité mon arme')
  cy.contains('span', 'extraire des munitions')
  cy.getByDataTestid('button-next')
    .contains('Suivant')
    .click()
  cy.contains('h2', 'Mettre en sécurité mon arme')
  cy.contains('span', 'DIRECTION SÛRE')
  cy.getByDataTestid('button-next')
    .contains('Suivant')
    .click()
  cy.contains('h2', 'Mettre en sécurité mon arme')
  cy.contains('span', 'tutoriel adapté')
  cy.getByDataTestid('button-next')
    .contains('Suivant')
    .click()
})

Cypress.Commands.add('Identification', () => {
  cy.visit('/')
  cy.getByDataTestid('basegun-logo').should('exist')
  cy.contains('li', 'Basegun est une application')
  cy.get('swiper-container').shadow().find('.swiper-button-next').click()
  cy.contains('li', 'ne remplace en aucun cas l\'avis d\'un expert')
  cy.get('#agree-button').contains('J\'ai compris').click()
  cy.url().should('contain', '/accueil')
  cy.getByDataTestid('identification')
    .contains('J’ai déjà mis mon arme en sécurité, je veux l’identifier')
    .click()
  cy.url().should('contain', '/instructions')
  cy.contains('h3', 'Pour un résultat optimal')
  cy.contains('span', 'canon vers la droite')
})

Cypress.Commands.add('IdentificationPistoletSemiAuto', () => {
  cy.url().should('contain', 'guide-identification/informations-complementaires')
  cy.getByDataTestid('next-step').click()
  cy.url().should('contain', '/guide-identification/munition-type')
  cy.getByDataTestid('next-step').should('have.attr', 'disabled')
  cy.contains('Cartouches').first().click()
  cy.getByDataTestid('next-step').should('not.have.attr', 'disabled')
  cy.getByDataTestid('next-step').click()
  cy.url().should('contain', '/guide-identification/armes-alarme')
  cy.getByDataTestid('instruction-armeAlarme').should('contain', 'Votre arme')
  cy.getByDataTestid('next-step').click()
  cy.getByDataTestid('aucune-correspondance').click()
  cy.getByDataTestid('next-step').click()
})

Cypress.Commands.add('IdentificationRevolver', () => {
  cy.url().should('contain', '/resultat-typologie')
  cy.getByDataTestid('next-step').click()
  cy.url().should('contain', 'guide-identification/informations-complementaires')
  cy.getByDataTestid('explanation').should('contain', 'questions supplémentaires')
  cy.getByDataTestid('next-step').click()
  cy.url().should('contain', '/guide-identification/munition-type')
  cy.getByDataTestid('next-step').should('have.attr', 'disabled')
  cy.contains('Balles').first().click()
  cy.getByDataTestid('next-step').should('not.have.attr', 'disabled')
  cy.getByDataTestid('next-step').click()
  cy.url().should('contain', '/guide-identification/armes-alarme')
  cy.getByDataTestid('instruction-armeAlarme').should('contain', 'Votre arme')
  cy.getByDataTestid('next-step').click()
  cy.getByDataTestid('aucune-correspondance').click()
  cy.getByDataTestid('next-step').click()
})

Cypress.Commands.add('arrierePlatRevolver', () => {
  cy.url().should('contain', '/mise-en-securite-choix-option-etape/1')
  cy.getByDataTestid('button-next').should('have.attr', 'disabled')
  cy.contains('Arrière plat').first().click()
  cy.getByDataTestid('button-next').should('not.have.attr', 'disabled')
  cy.getByDataTestid('button-next').click()
  cy.url().should('contain', '/mise-en-securite-choix-option-etape/2')
  cy.getByDataTestid('button-next').should('have.attr', 'disabled')
})

Cypress.Commands.add('IdentificationShoulderBoltRifle', () => {
  cy.url().should('contain', '/fin-mise-en-securite')
  cy.getByDataTestid('go-to-identification').click()
  cy.url().should('contain', '/resultat-typologie')
  cy.getByDataTestid('next-step').click()
  cy.url().should('contain', 'guide-identification/informations-complementaires')
  cy.getByDataTestid('explanation').should('contain', 'questions supplémentaires')
  cy.getByDataTestid('next-step').click()
  cy.url().should('contain', '/guide-identification/munition-type')
  cy.getByDataTestid('next-step').should('have.attr', 'disabled')
  cy.contains('Balles').first().click()
  cy.getByDataTestid('next-step').should('not.have.attr', 'disabled')
  cy.getByDataTestid('next-step').click()
})

Cypress.Commands.add('IdentificationDummyPistolet', () => {
  cy.url().should('contain', '/guide-identification/informations-complementaires')
  cy.getByDataTestid('explanation').should('contain', 'questions supplémentaires')
  cy.getByDataTestid('next-step').click()
  cy.getByDataTestid('next-step').should('have.attr', 'disabled')
  cy.contains('Billes').first().click()
  cy.url().should('contain', '/guide-identification/munition-type')
  cy.getByDataTestid('next-step').should('not.have.attr', 'disabled')
  cy.getByDataTestid('next-step').click()
  cy.url().should('contain', '/guide-identification/resultat-final')
  cy.getByDataTestid('arm-category').should('contain', 'Catégorie Non Classée')
})

Cypress.Commands.add('pasDeGuide', () => {
  cy.contains('h2', 'Pas de guide de mise en sécurité pour votre arme')
  cy.url().should('contain', '/fin-mise-en-securite')
  cy.getByDataTestid('go-to-identification').click()
  cy.url().should('contain', '/guide-identification/resultat-typologie')
})
