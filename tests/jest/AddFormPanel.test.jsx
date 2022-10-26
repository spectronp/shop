import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import AddFormPanel from '../../resources/js/components/AddFormPanel'
import { api } from '../../resources/js/assets/api'

jest.mock('../../resources/js/assets/api')

const submitButtonText = 'Cadastrar'
const nameFieldText = 'Nome'
const aboutFieldText = 'Sobre'
const successFeedback = 'Cliente cadastrada(o)'
const waitingFeedback = 'Carregando...'
const errorFeedback = 'Erro'

test('no feedback by dafault', () => {
    const feedbackMessages = [waitingFeedback, successFeedback, errorFeedback]
    const emptyFunction = new Function()
    render(<AddFormPanel registerRelevantClient={emptyFunction} />)

    feedbackMessages.forEach( message => {
        expect(screen.queryByPlaceholderText(message)).not.toBeInTheDocument()
    })
})

test('success feedback', async () => {
    api.addClient.mockResolvedValueOnce( 1 )
    const user = userEvent.setup()
    const emptyFunction = new Function()
    render(<AddFormPanel registerRelevantClient={emptyFunction} />)

    await user.click(screen.queryByText(submitButtonText))

    expect(screen.queryByText(successFeedback)).toBeInTheDocument()
})

test('waiting feedback', async () => {
    api.addClient.mockReturnValueOnce(new Promise(() => {}))
    const user = userEvent.setup()
    const emptyFunction = new Function()
    render(<AddFormPanel registerRelevantClient={emptyFunction} />)


    await user.click(screen.queryByText(submitButtonText))

    expect(screen.queryByText(waitingFeedback)).toBeInTheDocument()
})

test('call registerRelevantClient on success', async () => {
    const client = {
        name: 'Elliot',
        about: 'hacker'
    }

    api.addClient.mockResolvedValueOnce( 1 )
    const registerRelevantClientMock = jest.fn()
    const user = userEvent.setup()
    render(<AddFormPanel registerRelevantClient={registerRelevantClientMock} />)

    await user.type(screen.queryByPlaceholderText(nameFieldText), client.name)
    await user.type(screen.queryByPlaceholderText(aboutFieldText), client.about)
    await user.click(screen.queryByText(submitButtonText))

    client.id = expect.any(Number)
    expect(registerRelevantClientMock).toHaveBeenCalledWith( client )
})

test('error feedback', async () => {
    api.addClient.mockRejectedValueOnce({ error: 'Mock Error' })
    const user = userEvent.setup()
    const emptyFunction = new Function()
    render(<AddFormPanel registerRelevantClient={emptyFunction} />)

    await user.click(screen.queryByText(submitButtonText))

    expect(screen.queryByText(errorFeedback)).toBeInTheDocument()
})

test('wipe feedback when user type again', async () => {
    api.addClient.mockResolvedValueOnce( 1 )
    const user = userEvent.setup()
    const emptyFunction = new Function()
    render(<AddFormPanel registerRelevantClient={emptyFunction} />)

    await user.click(screen.queryByText(submitButtonText))
    await user.type(screen.queryByPlaceholderText(nameFieldText), 'aaa')

    expect(screen.queryByText(successFeedback)).not.toBeInTheDocument()
})
