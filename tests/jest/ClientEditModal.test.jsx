import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import ClientEditModal from "../../resources/js/components/ClientEditModal"
import userEvent from "@testing-library/user-event"
import api from "../../resources/js/assets/api"

jest.mock("../../resources/js/assets/api", () => ({
    updateClient: jest.fn(() => Promise.resolve())
}) )

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
