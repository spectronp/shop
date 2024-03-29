describe('Clients Page', () => {

    beforeEach(() => {
        cy.refreshDatabase()
    })

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
        // NOTE -- Assert the input is not visible before?
        cy.get('button#add-form-toggle').as('addFormToggle').click()
        cy.findByPlaceholderText('Nome').should('be.visible')
        cy.get('@addFormToggle').click()
        cy.findByPlaceholderText('Nome').should('not.exist')

        // Opens the add form and type the client name, about and click the submit button
        cy.get('@addFormToggle').click()
        cy.findByPlaceholderText('Nome').type(client_data.name)
        cy.findByPlaceholderText('Sobre').type(client_data.about)
        cy.findByText('Cadastrar').click() // NOTE -- Maybe it could be an loading feedback after this click

        // Check for the successful request feedback
        cy.contains('Cliente cadastrada(o)')

        // Add form inputs should be empty after an successful request
        cy.findByPlaceholderText('Nome').should('have.value', '')
        cy.findByPlaceholderText('Sobre').should('have.value', '')

        // Request feedback should disappear after typing something in the form again
        cy.findByPlaceholderText('Nome').type('a')
        cy.contains('Cliente cadastrada(o)').should('not.exist')

        // Close, open the form and check if the inputs have been reset
        // TODO -- do this depending on the the time the form is kept closed
        cy.get('@addFormToggle').click()
        cy.get('@addFormToggle').click()
        cy.findByPlaceholderText('Nome').should('have.value', '')
        cy.findByPlaceholderText('Sobre').should('have.value', '')
        cy.get('@addFormToggle').click()

        // Check if the new added client is in the more recent section
        cy.contains('Mais recentes').parents('#most-relevant-wrapper')
        .within(() => {
            cy.contains(client_data.name).parents('.client-card').as('addedClient')
            cy.contains(client_data.about)
        })

        // This block tests the client card internal features
        cy.get('@addedClient').within(() => {

            // Expand card and create history
            // NOTE -- Only one card expanded per time ???
            cy.get('.client-history').should('not.exist')
            cy.contains(client_data.name).as('expand').click() // NOTE -- Maybe this expand action should cover the whole client card
            cy.get('.client-history').as('history').type(history_line)
            cy.contains('Salvando...')
            cy.contains('Salvo')

            // Shrink the card and assert the client data is not visible
            cy.get('@expand').click()
            cy.get('@history').should('not.exist')

            // Expand the card again and assert the history line is there
            cy.get('@expand').click()
            cy.get('@history').should('have.value', history_line)

            // Click edit button and save it as an alias
            cy.get('.edit-button').as('edit').click()
        })

        // Assert client name is in the input field and close
        // cy.findByPlaceholderText('Nome').should('have.value', client_data.name)
        // cy.findByPlaceholderText('Sobre').should('have.value', client_data.about)
        // cy.findByText('Cancelar').click()

        // Click the edit button, check if the client data is present in the input, change the data and click 'Save'
        // cy.get('@edit').click()

        // cy.findByPlaceholderText('Nome')
        //     .should('have.value', client_data.name)
        //     .clear()
        //     .type(edited_client_data.name)

        // cy.findByPlaceholderText('Sobre')
        //     .should('have.value', client_data.about)
        //     .clear()
        //     .type(edited_client_data.about)

        // cy.findByText('Salvar').click()

        // // Assert edit modal is closed after saving
        // cy.findByPlaceholderText('Nome').should('not.exist')
        // cy.findByPlaceholderText('Sobre').should('not.exist')

        // // Check if the card has the edited data
        // cy.get('@addedClient').within(() => {
        //     cy.contains(edited_client_data.name)
        //     cy.contains(edited_client_data.about)
        // })

        // // Click 'edit', then 'delete', check for 'Are u sure?' message, click 'cancel' and check if the client still there
        // cy.get('@edit').click()
        // cy.get('.delete-client').as('delete').click()
        // cy.contains('Tem certeza?')
        // cy.findByText('Não').click()
        // cy.contains(edited_client_data.name)
        // cy.contains(edited_client_data.about)

        // // Do the same thing, but click 'Yes' at the end to delete the client, and assert the client is not there anymore
        // cy.get('@delete').click()
        // cy.findByText('Sim, deletar cliente').click()
        // cy.findByText(edited_client_data.name).should('not.exist')
    })

    it('Clients Search', () => {
        cy.seed('ClientSeeder')

        const client = 'Test Client'

        cy.visit('/')

        cy.findByPlaceholderText('Buscar').as('search').type(client)
        cy.get('#search-load').should('be.visible')
        cy.get('#results').within(() => { // NOTE - Maybe the #results and #results-list could be the same
            cy.get('ol').as('list').should('have.length', 1) // NOTE -- This length will be configurable in the future
            cy.get('@list').eq(0).get('.client-card').contains(client)
        })
        cy.get('#search-load').should('not.exist')

        cy.get('@search').clear()
        cy.get('#search-load').should('not.exist')
        cy.get('#results').should('not.exist')
    })
})
