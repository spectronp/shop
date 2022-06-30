describe('Clients Page', () => {

    const getByLabel = (label) => {
        return cy
            .contains('label', label)
            .invoke('attr', 'for')
            .then((id) => {
                cy.get('#' + id)
            })
    }

    it('Clients CRUD', () => {

    const client_data = {
        name: 'Thomas',
        about: 'Bald'
    }

    const edited_client_data = {
        name: 'Thomas Turbando',
        about: 'Bald and bankrupt'
    }

    const history_line = '2 lipstick $$$'

    cy.visit('/')

    // Opens and close the add form
    cy.get('button#add-form-toggle').as('addFormToggle').click()
    getByLabel('Nome').should('be.visible')
    cy.get('addFormToggle').click()
    getByLabel('Nome').should('not.be.visible')

    // Opens the add form and type the client name, about and click the submit button
    cy.get('addFormToggle').click()
    getByLabel('Nome').type(client_data.name)
    getByLabel('Sobre').type(client_data.about)
    getByLabel('Cadastrar').click() // NOTE -- Maybe it could be an loading feedback after this click

    // Add form inputs should be empty after an successful request
    getByLabel('Nome').should('be.empty')
    getByLabel('Sobre').should('be.empty')

    // Check for the successful request feedback
    cy.contains('Cliente cadastrada(o)')

    // Request feedback should disappear after typing somethin in the form again
    getByLabel('Nome').type('a')
    cy.contains('Cliente cadastrada(o)').should('not.exist')

    // Closes the add form and check if the form inputs have been reset
    cy.get('addFormToggle').click()
    getByLabel('Nome').should('be.empty')
    getByLabel('Sobre').should('be.empty')

    // Check if the new added client is in the more recent section
    cy.contains('Mais recentes').parents('#more-recent-wrapper')
      .within(() => {
        cy.contains(client_data.name).parents('.client-card').as('addedClient')
        cy.contains(client_data.about)
      })

    // This block tests the client card internal features
    cy.get('addedClient').within(() => {

        // Expand card, create history and type one line
        cy.get('.expand-toggle').as('expand').click() // NOTE -- Maybe this expand action should cover the whole client card
        cy.get('.client-history').as('history').should('not.be.visible')
        getByLabel('Adicionar Histórico').click().should('not.exist')
        cy.get('history').type(history_line)
        cy.contains('Salvando...')
        cy.contains('Salvo')

        // Shrink the card and assert the client data is not visible
        cy.get('expand').click()
        cy.get('history').should('not.be.visible')

        // Expand the card again and assert the history line is there
        cy.get('expand').click()
        cy.get('history').should('have.value', history_line)

        // Click edit button,
        cy.get('.edit-button').as('edit').click()
        cy.get('input').should('have.value', edited_client_data.name)
        getByLabel('Cancelar').click()

        // Click the edit button, check if the client data is present in the input, change the data and click 'Edit'
        cy.get('.edit-button').as('edit').click()
        getByLabel('Name')
            .should('have.value', client_data.name)
            .clear()
            .type(edited_client_data.name)

        getByLabel('Sobre')
            .should('have.value', client_data.about)
            .clear()
            .type(edited_client_data.about)

        getByLabel('Editar').click()
        cy.get('input').should('not.be.visible')

        // Check if the card has the edited data
        cy.contains(edited_client_data.name)
        cy.contains(edited_client_data.about)

        // Click 'edit', then 'delete', check for 'Are u sure?' message, click 'cancel' and check if the client still there
        cy.get('edit').click()
        cy.get('.delete-client').as('delete').click()
        cy.contains('Tem certeza?')
        cy.contains('A(o) cliente deletado sera enviada(o) para a lixeira e deletado permanentemente depois de 30 dias')
        cy.contains('E possivel deletar permanentemente de forma manual na lixeira')
        getByLabel('Cancelar').click()
        cy.contains(edited_client_data.name)
        cy.contains(edited_client_data.about)

        // Do the same thing, but click 'Yes' at the end to delete the client, and assert the cient is not there anymore
        cy.get('delete').click()
        getByLabel('Sim, deletar cliente').click()
        cy.get('addedClient').should('not.exist')
    })
  })

    it('Clients Search', () => {
      cy.refreshDatabase()
      cy.seed('ClientsSeeder')

      const client = 'Claudia' // TODO -- Get one client that the Seeder inserted in the db

      cy.visit('/')

      getByLabel('Buscar').as('search').type(client)
      cy.get('#search-load').should('be.visible')
      cy.get('#results').within(() => { // NOTE - Maybe the #results and #results-list could be the same
        cy.get('ol#results-list').as('list').should('have.length', 10) // NOTE -- This length will be configurable in the future
        cy.get('list').eq(0).get('.client-card').contains(client)
      })
      cy.get('#search-load').should('not.be.visible')

      cy.get('search').clear()
      cy.get('#search-load').should('be.visible')
      cy.get('#results').should('not.be.visible')
    })
})
