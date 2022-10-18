import axios from 'axios'
import Api from '../../resources/js/assets/api'
import { faker } from '@faker-js/faker'

const defaultAxiosMock = {
    get: jest.fn(() => Promise.resolve()),
    post: jest.fn(() => Promise.resolve()),
    put: jest.fn(() => Promise.resolve()),
    delete: jest.fn(() => Promise.resolve())
}

let axiosMock = defaultAxiosMock

jest.mock('axios', () => ({
    create: jest.fn()
}))

beforeEach(() => {
    axiosMock = defaultAxiosMock
    axios.create.mockReturnValue(axiosMock)
})

test('call on addClient', async () => {
    let client = {
        name: faker.name.fullName(),
        about: faker.random.words()
    }
    let client_id = 42
    axiosMock.post.mockResolvedValue({ data: { id: client_id } })
    const api = new Api()

    let promise = api.addClient(client.name, client.about)
    await promise

    expect.assertions(4)
    expect(promise).toBeInstanceOf(Promise)
    expect(axiosMock.post).toHaveBeenCalledTimes(1)
    expect(axiosMock.post).toHaveBeenCalledWith('/clients', { client: client })
    return promise.then( res => { expect(res).toBe(client_id) })
})

test('call on searchClient', async () => {
    jest.useFakeTimers()
    let client_list = Array(10).fill().map((_, i) => ({
        id: i,
        name: faker.name.fullName(),
        about: faker.random.words()
    }))
    let client = client_list.at(1)
    axiosMock.get.mockResolvedValue({ data: client_list })
    const api = new Api()

    let promise = api.searchClient(client.name)

    jest.runAllTimers()
    await promise

    expect.assertions(4)
    expect(promise).toBeInstanceOf(Promise)
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(axiosMock.get).toHaveBeenCalledWith(`/clients/search?term=${client.name}`, null)

    jest.useRealTimers()

    return promise.then(res => { expect(res).toBe(client_list) })
})

test('2 call on searchClient', async () => {
    jest.useFakeTimers()
    let terms = faker.random.words(2).split(' ')
    const api = new Api()

    let promise1 = api.searchClient(terms[0])
    let promise2 = api.searchClient(terms[1])

    jest.runAllTimers()

    await promise1
    await promise2

    expect.assertions(3)
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(axiosMock.get).toHaveBeenCalledWith(`/clients/search?term=${terms[1]}`, null)

    jest.useRealTimers()

    return promise1.then(res => { expect(res).toEqual({ cancelled: true }) })
})

test('2 calls with delay on searchClient', async () => {
    jest.useFakeTimers()
    let terms = faker.random.words(2).split()
    let type_delay = 200
    const api = new Api()

    let promise1 = api.searchClient(terms[0])

    jest.advanceTimersByTime(type_delay)

    let promise2 = api.searchClient(terms[1])

    jest.runAllTimers()
    await promise1
    await promise2

    expect(axiosMock.get).toHaveBeenCalledTimes(2)
    expect(axiosMock.get).toHaveBeenNthCalledWith( 1,`/clients/search?term=${terms[0]}`, null )
    expect(axiosMock.get).toHaveBeenNthCalledWith( 2, `/clients/search?term=${terms[1]}`, null )

    jest.useRealTimers()
})

test('call on updateClient', async () => {
    let client = {
        name: faker.name.fullName(),
        about: faker.random.words()
    }
    let client_id = 42
    const api = new Api()

    let promise = api.updateClient(client_id, client.name, client.about)
    await promise

    expect(promise).toBeInstanceOf(Promise)
    expect(axiosMock.put).toHaveBeenCalledTimes(1)
    expect(axiosMock.put).toHaveBeenCalledWith(`/clients/${client_id}`, client)
})

test('call on deleteClient', async () => {
    let client_id = 42
    const api = new Api()

    let promise = api.deleteClient(client_id)
    await promise

    expect(promise).toBeInstanceOf(Promise)
    expect(axiosMock.delete).toHaveBeenCalledTimes(1)
    expect(axiosMock.delete).toHaveBeenCalledWith(`/clients/${client_id}`, undefined)
})

test('call on getHistory', async () => {
    let client_id = 42
    let history = faker.lorem.text()
    axiosMock.get.mockResolvedValue({ data: { history: history } })
    const api = new Api()

    let promise = api.getHistory(client_id)
    await promise

    expect.assertions(4)
    expect(promise).toBeInstanceOf(Promise)
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(axiosMock.get).toHaveBeenCalledWith(`/clients/${client_id}/history`, undefined)
    return promise.then( res => { expect(res).toBe(history) })
})

test('call on updateHistory', async () => {
    jest.useFakeTimers()
    let client_id = 42
    let history = faker.lorem.text()
    const api = new Api()

    let promise = api.updateHistory(client_id, history)

    jest.runAllTimers()
    await promise

    expect(promise).toBeInstanceOf(Promise)
    expect(axiosMock.put).toHaveBeenCalledWith(`/clients/${client_id}/history`, { history: history })
    jest.useRealTimers()
})

test('2 calls on updateHistory', async () => {
    jest.useFakeTimers()
    let client_id = 42
    let history = faker.lorem.text()
    let history2 = faker.lorem.text()
    const api = new Api()

    let promise1 = api.updateHistory(client_id, history)
    let promise2 = api.updateHistory(client_id, history2)

    jest.runAllTimers()
    await promise1
    await promise2

    expect(axiosMock.put).toHaveBeenCalledTimes(1)
    expect(axiosMock.put).toHaveBeenCalledWith(`/clients/${client_id}/history`, { history: history2 })
    jest.useRealTimers()
})

test('2 calls with delay on updateHistory', async () => {
    jest.useFakeTimers()
    let client_id = 42
    let history = faker.lorem.text()
    let history2 = faker.lorem.text()
    let type_delay = 200 // in ms
    const api = new Api()

    let promise1 = api.updateHistory(client_id, history)

    jest.advanceTimersByTime(type_delay)

    let promise2 = api.updateHistory(client_id, history2)

    jest.runAllTimers()

    await promise1
    await promise2

    expect(axiosMock.put).toHaveBeenCalledTimes(2)
    expect(axiosMock.put).toHaveBeenNthCalledWith(1, `/clients/${client_id}/history`, { history: history })
    expect(axiosMock.put).toHaveBeenNthCalledWith(2, `/clients/${client_id}/history`, { history: history2 })

    jest.useRealTimers()
})
