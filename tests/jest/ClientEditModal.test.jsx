import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import ClientEditModal from "../../resources/js/components/ClientEditModal"
import userEvent from "@testing-library/user-event"
import { api } from "../../resources/js/assets/api"

jest.mock("../../resources/js/assets/api")

function setMocks(){
    api.updateClient.mockResolvedValue()
}

afterEach(() => {
    setMocks()
})

test('display client data in input fields', () => {
    let client = {
        name: 'John',
        about: 'Hot as Duck'
    }

    render(<ClientEditModal client={client} />)

    let name_input = screen.queryByDisplayValue(client.name)
    let name_label = screen.queryByText('Nome')

    expect(name_input).toBeInTheDocument()
    expect(name_label).toBeInTheDocument()
    expect(name_input.getAttribute('id')).toBe(name_label.getAttribute('for'))

    let about_input = screen.queryByDisplayValue(client.about)
    let about_label = screen.queryByText('Sobre')

    expect(about_input).toBeInTheDocument()
    expect(about_label).toBeInTheDocument()
    expect(about_input.getAttribute('id')).toBe(about_label.getAttribute('for'))
})

test('close modal when user click cancel', async () => {
    const setEditModalMock = jest.fn()

    const user = userEvent.setup()
    render(<ClientEditModal client={{}} setEditModal={setEditModalMock} registerRelevantClient={ new Function } />)

    await user.click(screen.queryByText('Cancelar'))

    expect(setEditModalMock).toHaveBeenCalledWith({ isOpen: false })
})

test('close modal when user click save', async () => {
    const setEditModalMock = jest.fn()

    const user = userEvent.setup()
    render(<ClientEditModal client={{}} setEditModal={setEditModalMock} registerRelevantClient={ new Function } />)

    await user.click(screen.queryByText('Salvar'))

    expect(setEditModalMock).toHaveBeenCalledWith({ isOpen: false })
})

test('call updateClient', async () => {
    let client = {
        id: 42,
        name: 'John',
        about: 'cool'
    }

    const user = userEvent.setup()
    render(<ClientEditModal client={{ id: client.id, name: '' }} setEditModal={ new Function } registerRelevantClient={ new Function } />)

    await user.type(screen.queryByLabelText('Nome'), client.name)
    await user.type(screen.queryByLabelText('Sobre'), client.about)
    await user.click(screen.queryByText('Salvar'))

    expect(api.updateClient).toHaveBeenCalledWith(client.id, client.name, client.about)
})

test('set saved client relevancy', async () => {
    let client = {
        id: 42,
        name: 'a',
    }

    const registerRelevantClientMock = jest.fn()

    const user = userEvent.setup()
    render(<ClientEditModal client={{ id: client.id, name: '' }} setEditModal={ new Function } registerRelevantClient={ registerRelevantClientMock } />)

    await user.type(screen.queryByLabelText('Nome'), client.name)
    await user.click(screen.queryByText('Salvar'))

    expect(registerRelevantClientMock).toHaveBeenCalledWith(expect.objectContaining({ id: client.id, name: client.name }))
})

test('delete section, open and close', async () => {
    const user = userEvent.setup()
    render(<ClientEditModal client={{}} />)

    await user.click(screen.queryByText('Deletar'))

    expect(screen.queryByText('Nome')).not.toBeInTheDocument()
    expect(screen.queryByText('Tem certeza?')).toBeInTheDocument()

    await user.click(screen.queryByText('Não'))

    expect(screen.queryByText('Tem certeza?')).not.toBeInTheDocument()
    expect(screen.queryByText('Nome')).toBeInTheDocument()
})

test('call deleteClient', async () => {
    let client_id = 42
    const user = userEvent.setup()
    render(<ClientEditModal client={{ id: client_id }} setEditModal={ new Function } registerRelevantClient={ new Function } />)

    await user.click(screen.queryByText('Deletar'))
    await user.click(screen.queryByText('Sim, deletar cliente'))

    expect(api.deleteClient).toHaveBeenCalledWith(client_id)
})

test('remove client from relevants', async () => {
    let client_id = 42
    const registerRelevantClientMock = jest.fn()
    const user = userEvent.setup()
    render(<ClientEditModal client={{id: client_id}} setEditModal={ new Function } registerRelevantClient={registerRelevantClientMock} />)

    await user.click(screen.queryByText('Deletar'))
    await user.click(screen.queryByText('Sim, deletar cliente'))

    expect(registerRelevantClientMock).toHaveBeenCalledWith(client_id)
})

test('close edit after deletion', async () => {
    const user = userEvent.setup()
    const setEditModalMock = jest.fn()
    render(<ClientEditModal client={{}} setEditModal={setEditModalMock} registerRelevantClient={ new Function } />)

    await user.click(screen.queryByText('Deletar'))
    await user.click(screen.queryByText('Sim, deletar cliente'))

    expect(setEditModalMock).toHaveBeenCalledWith({ isOpen: false })
})

test('waiting feedback after click to delete', async () => {
    api.deleteClient.mockReturnValue( new Promise(() => {}) )
    const user = userEvent.setup()
    render(<ClientEditModal client={{}} setEditModal={ new Function } registerRelevantClient={ new Function } />)

    await user.click(screen.queryByText('Deletar'))
    await user.click(screen.queryByText('Sim, deletar cliente'))

    expect(screen.queryByText('Sim, deletar cliente')).not.toBeInTheDocument()
    expect(screen.queryByText('Não')).not.toBeInTheDocument()
    expect(screen.queryByText('Deletando...')).toBeInTheDocument()
})

test('error feedback on deletion', async () => {
    let error_message = 'error message'
    api.deleteClient.mockRejectedValue({ message: error_message })
    const user = userEvent.setup()
    render(<ClientEditModal client={{}} setEditModal={ new Function } registerRelevantClient={ new Function } />)

    await user.click(screen.queryByText('Deletar'))
    await user.click(screen.queryByText('Sim, deletar cliente'))

    expect(screen.queryByText('Erro: '.concat(error_message))).toBeInTheDocument()
    expect(screen.queryByText('Tentar outra vez?')).toBeInTheDocument()
    expect(screen.queryByText('Sim, deletar cliente')).toBeInTheDocument()
    expect(screen.queryByText('Não')).toBeInTheDocument()

})
