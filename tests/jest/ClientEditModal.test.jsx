import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import ClientEditModal from "../../resources/js/components/ClientEditModal"
import userEvent from "@testing-library/user-event"

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

test('close modal', async () => {
    const setEditModalMock = jest.fn()

    const user = userEvent.setup()
    render(<ClientEditModal client={{}} setEditModal={setEditModalMock} />)

    await user.click(screen.queryByText('Cancelar'))

    expect(setEditModalMock).toHaveBeenCalledWith({ isOpen: false })
})
