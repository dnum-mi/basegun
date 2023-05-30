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
