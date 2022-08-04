import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ClientCard from '../../resources/js/components/ClientCard'
import api from '../../resources/js/assets/api'

jest.mock('../../resources/js/assets/api', () => ({
    getHistory: jest.fn(),
    updateHistory: jest.fn()
}) )

test('display client data', () => {
    let client = {
        name: 'John',
        about: 'Doe'
    }

    render(<ClientCard client={client} />)

    expect(screen.queryByText(client.name)).toBeInTheDocument()
    expect(screen.queryByText(client.about)).toBeInTheDocument()
})

test('not expanded on first render', () => {
    render(<ClientCard client={{}} />)

    expect(screen.queryByText('Carregando...')).not.toBeInTheDocument()
    expect(screen.queryByRole('textarea')).not.toBeInTheDocument()
})

test('change expansion when user click expand button', async () => {
    const user = userEvent.setup()
    render(<ClientCard client={{}} />)

    await user.click(screen.queryByTitle('expand'))

    expect(screen.queryByTitle('history')).toBeInTheDocument()
})

test('saving feedback', async () => {
    api.updateHistory.mockReturnValue( new Promise(() => {}) )
    const user = userEvent.setup()
    render(<ClientCard client={{}} />)

    await user.click(screen.queryByTitle('expand'))
    await user.type(screen.queryByTitle('history'), 'history line')

    expect(screen.queryByText('Salvando...')).toBeInTheDocument()
})

test('saved feedback', async () => {
    api.updateHistory.mockResolvedValue({})
    const user = userEvent.setup()
    render(<ClientCard client={{}} />)

    await user.click(screen.queryByTitle('expand'))
    await user.type(screen.queryByTitle('history'), 'history line')

    expect(screen.queryByText('Salvo')).toBeInTheDocument()
})

test('call updateHistory', async () => {
    api.updateHistory.mockResolvedValue({})
    let history = 'history line'
    const user = userEvent.setup()
    render(<ClientCard client={{}} />)

    await user.click(screen.queryByTitle('expand'))
    await user.type(screen.queryByTitle('history'), history)

    expect(api.updateHistory).toHaveBeenCalledWith(expect.any(Number), history)
})

test('loading feedback', async () => {
    api.getHistory.mockResolvedValue({ history: 'history line' }) // NOTE -- return client id ???
    const user = userEvent.setup()
    render(<ClientCard client={{}} />)

    await user.click(screen.queryByTitle('expand'))

    expect(screen.queryByText('Carregando...')).toBeInTheDocument()
})

test('display saved history', async () => {
    let history = 'history line'
    const user = userEvent.setup()
    api.getHistory.mockResolvedValue({ history: history })
    render(<ClientCard client={{}} />)

    await user.click(screen.queryByTitle('expand'))

    expect(screen.queryByText(history)).toBeInTheDocument()
})

test('dont call getHistory before expansion', () => {
    render(<ClientCard client={{}} />)

    expect(api.getHistory).not.toHaveBeenCalled()
})

test('call getHistory', async () => {
    const user = userEvent.setup()
    render(<ClientCard client={{}} />)

    await user.click(screen.queryByTitle('expand'))

    expect(api.getHistory).toHaveBeenCalledWith(expect.any(Number))
})

test('error feedback', async () => {
    let error_response = {
        error: 'error message'
    }

    api.updateHistory.mockRejectedValue(error_response)
    const user = userEvent.setup()
    render(<ClientCard client={{}} />)

    await user.click(screen.queryByTitle('expand'))
    await user.type(screen.queryByTitle('history'), 'history line')

    expect(screen.queryByText(error_response.error)).toBeInTheDocument()
})
