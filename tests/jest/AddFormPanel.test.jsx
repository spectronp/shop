import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import AddFormPanel from '../../resources/js/components/AddFormPanel'
import api from '../../resources/js/assets/api'

jest.mock('../../resources/js/assets/api', () => {
    return {
        addClient: jest.fn()
    }
})

test.only('no feedback by dafault', () => {
    const feedbackMessages = ['Carregando...', 'Cliente cadastrada(o)', 'Erro']
    render(<AddFormPanel />)

    feedbackMessages.forEach( message => {
        expect(screen.queryByText(message)).toBeNull()
    })
})

test('success feedback', async () => {
    api.addClient.mockResolvedValueOnce({})
    const user = userEvent.setup()
    render(<AddFormPanel />)

    await user.click(screen.queryByText('Cadastrar'))

    expect(screen.queryByText('Cliente cadastrada(o)')).toBeInTheDocument()
})

test('waiting feedback', async () => {
    api.addClient.mockReturnValueOnce(new Promise(() => {}))
    const user = userEvent.setup()
    render(<AddFormPanel />)

    await user.click(screen.queryByText('Cadastrar'))

    expect(screen.queryByText('Carregando...')).toBeInTheDocument()
})

test('error feedback', async () => {
    api.addClient.mockRejectedValueOnce({})
    const user = userEvent.setup()
    render(<AddFormPanel />)

    await user.click(screen.queryByText('Cadastrar'))

    expect(screen.queryByText('Erro')).toBeInTheDocument()
})
