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

// Esse comando não aceita nenhum parâmetro e utiliza valores hardcoded
Cypress.Commands.add('fillMandatoryFieldsAndSubmitBasic', () => {
    //Nome
    cy.get('#firstName').click().clear().type('Diego')
    cy.get('#firstName').should('have.value', 'Diego')

    //Sobrenome
    cy.get('#lastName').click().clear().type('Dias')
    cy.get('#lastName').should('have.value', 'Dias')

    //E-mail
    cy.get('#email').click().clear().type('diego.f.dias@outlook.com')
    cy.get('#email').should('have.value', 'diego.f.dias@outlook.com')

    //Feedback
    cy.get('#open-text-area').click().clear().type('Lorem ipsum dolor sit amet', { delay: 0 })
    cy.get('#open-text-area').should('have.value', 'Lorem ipsum dolor sit amet')

    //Clica no botão de envio
    cy.contains('button[type="submit"]', 'Enviar').click()
}),

// Esse segundo aceita um parâmetro, o qual é um objeto chamado de DATA.
Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithParameter', data => {
    //Nome
    cy.get('#firstName').click().clear().type(data.firstName)
    cy.get('#firstName').should('have.value', data.firstName)

    //Sobrenome
    cy.get('#lastName').click().clear().type(data.lastName)
    cy.get('#lastName').should('have.value', data.lastName)

    //E-mail
    cy.get('#email').click().clear().type(data.email)
    cy.get('#email').should('have.value', data.email)

    //Feedback
    cy.get('#open-text-area').click().clear().type(data.text)
    cy.get('#open-text-area').should('have.value', data.text)

    //Clica no botão de envio
    cy.contains('button[type="submit"]', 'Enviar').click()
})

// Esse terceiro é um comando customizado que vai aceitar tanto um objeto como vai ter valores default
Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithDefault', (data = {
    firstName : 'John',
    lastName : 'Doe',
    email : 'johndoe@email.com',
    text : 'test feedback'

}) =>{
        //Nome
    cy.get('#firstName').click().clear().type(data.firstName)
    cy.get('#firstName').should('have.value', data.firstName)

    //Sobrenome
    cy.get('#lastName').click().clear().type(data.lastName)
    cy.get('#lastName').should('have.value', data.lastName)

    //E-mail
    cy.get('#email').click().clear().type(data.email)
    cy.get('#email').should('have.value', data.email)

    //Feedback
    cy.get('#open-text-area').click().clear().type(data.text)
    cy.get('#open-text-area').should('have.value', data.text)
})
