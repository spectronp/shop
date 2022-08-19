import RelevancyReducer from '../../resources/js/reducers/RelevancyReducer'

test('put client at the start and return the result if lenght < 5', () => {
    let initial =  [ {id: 1}, {id: 2}, {id: 3} ] //[1, 2, 3]
    let toBeInserted =  { id: 4 } // 4
    let expected =   [ {id: 4}, {id: 1}, {id: 2}, {id: 3} ] //[4, 1, 2, 3]

    let result = RelevancyReducer(initial, toBeInserted)

    expect(result).toEqual(expected)
})

test('put client at the start and remove the last one if lenght > 5', () => {
    let initialArray = [ {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5} ]
    let toBeInserted = {id: 6}
    let expected = [ {id: 6}, {id: 1}, {id: 2}, {id: 3}, {id: 4} ]

    let result = RelevancyReducer(initialArray, toBeInserted)

    expect(result).toEqual(expected)
})

test('remove client with same id', () => {
    let initialArray = [ {id: 1}, {id: 2}, {id: 3}, {id: 4} ]
    let toBeInserted = {id: 3}
    let expected = [ {id: 3}, {id: 1}, {id: 2}, {id: 4} ]

    let result = RelevancyReducer(initialArray, toBeInserted)

    expect(result).toEqual(expected)
})
