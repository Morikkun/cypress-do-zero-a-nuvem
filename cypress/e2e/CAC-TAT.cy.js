describe('Central de Atendimento ao Cliente', () => {
  beforeEach(() => {

    cy.visit('./src/index.html')
})

//Aula 2
  it('Checa se o título aparece', () => {
    cy.title().should('eq','Central de Atendimento ao Cliente TAT')
  })

//Primeiro exercicio
  it('Preencher o formulário com sucesso', () =>{
    //Nome
    cy.get('#firstName').click().clear().type('Diego')
    cy.get('#firstName').should('have.value', 'Diego')

    //Sobrenome
    cy.get('#lastName').click().clear().type('Diass')
    cy.get('#lastName').should('have.value', 'Dias')

    //E-mail
    cy.get('#email').click().clear().type('diego.f.dias@outlook.com')
    cy.get('#email').should('have.value', 'diego.f.dias@outlook.com')

    //Feedback
    cy.get('#open-text-area').click().clear().type('Lorem ipsum dolor sit amet', { delay: 0 })
    cy.get('#open-text-area').should('have.value', 'Lorem ipsum dolor sit amet')

    //Clica no botão de envio
    cy.contains('button[type="submit"]', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

//Exercício extra 2
  it('Exibe mensagem de erro ao submeter o formulário com email inválido', () => {
    /* const longString = Cypress._.repeat('insermos uma string', numero aqui) */
    cy.get('#firstName').click().clear().type('Diego')
    cy.get('#lastName').click().clear().type('Dias')
    cy.get('#email').click().clear().type('diego.f.dias123123123131232outlook')
    cy.get('#open-text-area').click().clear().type('Lorem ipsum dolor sit amet', { delay: 0 })
    cy.contains('button[type="submit"]', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  //Exercicio extra 3
  it('Campo de telefone não aceita texto', () => {
    cy.get('#phone').click().clear().type('Isso não é um número')
    cy.get('#phone').should('have.value', '')
  })

  //Exercício extra 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').click().clear().type('Diego')
    cy.get('#lastName').click().clear().type('Dias')
    cy.get('#email').click().clear().type('diego.f.dias@outlook.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').click().clear().type('Adicionando meu feedback', {delay: 0})
    cy.contains('button[type="submit"]', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

//Exercício extra 5
  it('Checa se clear realmente limpa os campos',() => {
    cy.get('#firstName').type('Diego')
    cy.get('#firstName').should('have.value','Diego')
    cy.get('#firstName').clear()
    cy.get('#firstName').should('have.value', '')

    cy.get('#lastName').type('Dias')
    cy.get('#lastName').should('have.value', 'Dias')
    cy.get('#lastName').clear()
    cy.get('#lastName').should('have.value', '')                  

    cy.get('#email').type('diego.f.dias@outlook.com')
    cy.get('#email').should('have.value', 'diego.f.dias@outlook.com')
    cy.get('#email').clear()
    cy.get('#email').should('have.value', '')

    //Adicionar o telefone também
    cy.get('#phone-checkbox').check()
    cy.get('#phone').type('4002-8922')
    cy.get('#phone').clear().should('have.value', '')

    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet', { delay: 10 })
    cy.get('#open-text-area').should('have.value', 'Lorem ipsum dolor sit amet')
    cy.get('#open-text-area').clear()
    cy.get('#open-text-area').should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button[type="submit"]', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  //Comandos customizados, 
  it('envia o formuário com sucesso usando um comando customizado com implementação básica', () =>{
    const data = {
      firstName: 'Diego',
      lastName: 'Dias',
      email: 'diego.f.dias@outlook.com',
      text: 'feedback'
    }
  //cy.fillMandatoryFieldsAndSubmitBasic()
  //cy.fillMandatoryFieldsAndSubmitWithParameter(data)
    cy.fillMandatoryFieldsAndSubmitWithDefault()
    cy.get('.button')
    .click()
    cy.get('.success').should('be.visible')
  })

// Aula 3
  it('seleciona um produto (YouTube) por seu texto', () =>{

    cy.fillMandatoryFieldsAndSubmitWithDefault()
    cy.get('#product').select('YouTube').should('have.value','youtube')
    cy.contains('button[type="submit"]', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.fillMandatoryFieldsAndSubmitWithDefault()
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    cy.contains('button[type="submit"]', 'Enviar').click()
    cy.get('.success').should('be.visible')

  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.fillMandatoryFieldsAndSubmitWithDefault()
    cy.get('#product').select(1).should('have.value', 'blog')
    cy.contains('button[type="submit"]', 'Enviar').click()
    cy.get('.success').should('be.visible')
  
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('[type="radio"]')
      .check('feedback')    
    cy.get('[type="radio"][value="feedback"]')
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    // Seleciona o radio de Elogio
    cy.get('[type="radio"]')
      .check('elogio')
    cy.get('[type="radio"][value="elogio"]')
      .should('be.checked')

    // Seleciona o radio de Feedback
    cy.get('[type="radio"]')
      .check('feedback')
    cy.get('[type="radio"][value="feedback"]')
      .should('be.checked')

    // Seleciona o radio de Ajuda
    cy.get('[type="radio"]')
      .check('ajuda')
    cy.get('[type="radio"][value="ajuda"]')
      .should('be.checked')
  })

  //serviceType é o nome que dei para os tipos de serviço que podemos selecionar no formulário, ou seja, Ajuda, Elogio e Feedback.
  //ele é o argumetno da nossa função de callback dentro de um each, e é isso que faz com que todos os itens sejam iterados por lá.
  //Wrap é o "invólucro" que ao iterar os itens do input do tipo radio, os seleciona manualmente e, com o ajuda do check, são marcados
  it('Marca cada tipo de atendimento com wrapper',  () =>{
    cy.get('input[type="radio"]')
      .each(serviceType => {
        cy.wrap(serviceType)
        .check()
        .should('be.checked')
      }
    )
  })

  it('marca ambos checkboxes, depois desmarca o último', () =>{
    //marcando os checkboxes e checando se foram mesmo marcados
    // cy.get('#email-checkbox')
    //   .check()
    // cy.get('#email-checkbox')
    //   .should('be.checked')
    // cy.get('#phone-checkbox')
    //   .check()
    // cy.get('#phone-checkbox')
    //   .should('be.checked')

    //desmarcando o checkbox de telefone e confirmando que o primeiro está marcado e o segundo não
    // cy.get('#phone-checkbox')
    //   .uncheck()
    // cy.get('#phone-checkbox')
    //   .should('not.be.checked')
    // cy.get('#email-checkbox')
    //   .should('be.checked')

      //Outra implementação, com menos linhas e cenários onde pegamos elementos manualmente
      cy.get('input[type="checkbox"')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
      
  })

  it('seleciona um arquivo da pasta fixtures',() => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () =>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json', null).as('textFile')
    cy.get('#file-upload')
      .selectFile('@textFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  
  //Aula 7: checar links que abrem em outra aba
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a','Política de Privacidade')
    .should('have.attr','href','privacy.html')
    .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
    cy.contains('a','Política de Privacidade')
    .invoke('removeAttr','target')
    .click()
    cy.contains('h1','CAC TAT - Política de Privacidade')
    .should('be.visible')
    cy.contains('p', 'Talking About Testing')
    .should('be.visible')
  })
  })