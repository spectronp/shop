import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom'
import { faker } from '@faker-js/faker'
import SearchResult from '../../resources/js/components/SearchResult'
import ClientList from '../../resources/js/components/ClientList'
import { api } from '../../resources/js/assets/api'

jest.mock('../../resources/js/assets/api')

jest.mock('../../resources/js/components/ClientList')

function setMocks(){
    api.searchClient.mockResolvedValue([])
}

afterEach(() => {
    setMocks()
})

test('dont render with no search', () => {
    const { container } = render(<SearchResult searchInput={ null } />)

    expect(container.children.length).toBe(0)
})

test('call searchClient', async () => {
    let search_input = 'search input'
    render(<SearchResult searchInput={search_input} />)

    await waitForElementToBeRemoved(() => screen.queryByText('Buscando...'))

    expect(api.searchClient).toHaveBeenCalledWith(search_input)
})

test('searching feedback', () => {
    api.searchClient.mockReturnValue( new Promise(() => {}) )
    render(<SearchResult searchInput={'a'} />)

    expect(screen.queryByText('Buscando...')).toBeInTheDocument()
    expect(ClientList).not.toHaveBeenCalled()
})

test('keep waiting if api call is cancelled', async () => {
    const promise = Promise.resolve({ cancelled: true})
    api.searchClient.mockReturnValue( promise )
    render(<SearchResult searchInput={'a'} />)

    expect(screen.queryByText('Buscando...')).toBeInTheDocument()
    expect(ClientList).not.toHaveBeenCalled()

    await act(async () => {
        await promise
    })
})

test('nothing found feedback', async () => {
    api.searchClient.mockResolvedValue([])
    render(<SearchResult searchInput={'a'} />)

    await waitForElementToBeRemoved(() => screen.queryByText('Buscando...'))

    expect(screen.queryByText('Nenhum cliente achado')).toBeInTheDocument()
    expect(ClientList).not.toHaveBeenCalled()
})

test('pass result to ClientList', async () => {
    let clients = Array(4).fill().map((_, i) => ({ id: i + 1, name: faker.name.fullName() }))

    api.searchClient.mockResolvedValue(clients)

    render(<SearchResult searchInput={'a'} />)

    await waitForElementToBeRemoved(() => screen.queryByText('Buscando...'))

    expect(ClientList).toHaveBeenCalledWith(
        expect.objectContaining({ clients: clients }),
        expect.anything()
    )
})

test('error feedback', async () => {
    let error_message = 'error mesage'
    api.searchClient.mockRejectedValue({ message: error_message })

    render(<SearchResult searchInput={'a'} />)

    await waitForElementToBeRemoved(() => screen.queryByText('Buscando...'))

    expect(screen.queryByText('Erro: '.concat(error_message))).toBeInTheDocument()
    expect(ClientList).not.toHaveBeenCalled()
})
