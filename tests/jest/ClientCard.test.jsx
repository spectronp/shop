import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ClientCard from '../../resources/js/components/ClientCard'
import { api } from '../../resources/js/assets/api'


jest.mock('../../resources/js/assets/api')

function setMocks(){
    api.getHistory.mockResolvedValue('')
    api.updateHistory.mockResolvedValue()
}

afterEach(() => {
    setMocks()
})

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
test('dont call getHistory before expansion', () => {
    render(<ClientCard client={{}} />)

    expect(api.getHistory).not.toHaveBeenCalled()
})

test('call getHistory', async () => {
    const user = userEvent.setup()
    render(<ClientCard client={{ id: 42 }} />)

    await user.click(screen.queryByTitle('expand'))

    expect(api.getHistory).toHaveBeenCalledWith( 42 )
})

test('loading feedback', async () => {
    api.getHistory.mockReturnValueOnce( new Promise(() => {}) ) // NOTE -- return client id ???
    const user = userEvent.setup()
    render(<ClientCard client={{}} />)

    await user.click(screen.queryByTitle('expand'))

    expect(screen.queryByText('Carregando...')).toBeInTheDocument()
})


test('display saved history', async () => {
    let history = 'history line'
    const user = userEvent.setup()
    api.getHistory.mockResolvedValueOnce( history )
    render(<ClientCard client={{}} />)

    await user.click(screen.queryByTitle('expand'))

    expect(screen.queryByText(history)).toBeInTheDocument()
})

test('call updateHistory', async () => {
    jest.useFakeTimers()
    let history = 'history line'
    const user = userEvent.setup({
        advanceTimers: () => jest.runOnlyPendingTimers(), // TODO -- search why i cant use "delay: null here"
    })
    render(<ClientCard client={{ id: 42 }} />)

    await user.click(screen.queryByTitle('expand'))

    let history_element = await screen.findByTitle('history')
    await user.type(history_element, history)

    act(() => {
        jest.runAllTimers()
    })

    expect(api.updateHistory).toHaveBeenLastCalledWith(42, history)
    jest.useRealTimers()
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
    const user = userEvent.setup()
    render(<ClientCard client={{}} />)

    await user.click(screen.queryByTitle('expand'))
    let history_element = await screen.findByTitle('history')
    await user.type(history_element, 'history line')

    let saved = await screen.findByText('Salvo')
    expect(saved).toBeInTheDocument()
})


test('error feedback when loading history', async () => {
    let error_response = {
        message: 'error message'
    }

    api.getHistory.mockRejectedValueOnce(error_response)
    const user = userEvent.setup()
    render(<ClientCard client={{}} />)

    await user.click(screen.queryByTitle('expand'))

    expect(screen.queryByText(error_response.message)).toBeInTheDocument()
})

test('error feedback when updating history', async () => {
    jest.useFakeTimers()
    let error_response = {
        message: 'error message'
    }

    api.updateHistory.mockRejectedValue(error_response)
    const user = userEvent.setup({
        advanceTimers: () => jest.runOnlyPendingTimers()
    })
    render(<ClientCard client={{}} />)

    await user.click(screen.queryByTitle('expand'))

    let history_element = await screen.findByTitle('history')
    await user.type(history_element, 'history line')

    act(() => {
        jest.runAllTimers()
    })

    let feedback = await screen.findByText(error_response.message)
    expect(feedback).toBeInTheDocument()
})
