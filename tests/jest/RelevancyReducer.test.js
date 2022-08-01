import RelevancyReducer from '../../resources/js/reducers/RelevancyReducer'

test('put client at the start and return the result if lenght < 5', () => {
    let initialArray = [1, 2, 3]
    let toBeInserted = 4
    let expected = [4, 1, 2, 3]

    let result = RelevancyReducer(initialArray, toBeInserted)

    expect(result).toEqual(expected)
})

test.only('put client at the start and remove the last one if lenght > 5', () => {
    let initialArray = [1, 2, 3, 4, 5]
    let toBeInserted = 6
    let expected = [6, 1, 2, 3, 4]

    let result = RelevancyReducer(initialArray, toBeInserted)

    expect(result).toEqual(expected)
})
