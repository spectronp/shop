
import { render } from '@testing-library/react'
import MiddleSector from '../../resources/js/components/MiddleSector'

const ControlTabLoc = "../../resources/js/components/ControlTab"
const PanelControllerLoc = "../../resources/js/components/PanelController"

const mockControlTab = jest.fn()
const mockPanelController = jest.fn()

jest.mock(ControlTabLoc, () => ({ setActivePanel }) => {

    mockControlTab(setActivePanel)

    return null
})

jest.mock(PanelControllerLoc, () => ({ activePanel }) => {

    mockPanelController(activePanel)

    return null
})

describe('MiddleSector', () => {

    beforeEach(() => {
        render(<MiddleSector />)
    })

    const getActivePanel = () => mockPanelController.mock.lastCall[0]
    const getSetActivePanel = () => mockControlTab.mock.lastCall[0]

    test('returns null to Panel Controller on first render', () => {

        const activePanel = getActivePanel()

        expect(activePanel).toBe(null)
    })

    test('return the same panel id received at the first setActive call', () => {
        const setActive = getSetActivePanel()

        setActive('test-panel')

        const activePanel = getActivePanel()

        expect(activePanel).toBe('test-panel')
    })

    test('returns the second panel id when receives 2 different ids', () => {
        const setActivePanel = getSetActivePanel()

        setActivePanel('first-panel')
        setActivePanel('second-panel')

        const activePanel = getActivePanel()

        expect(activePanel).toBe('second-panel')
    })

    test('returns null when receives the same panel id', () => {
        const setActive = getSetActivePanel()

        setActive('test-panel')
        setActive('test-panel')

        const activePanel = getActivePanel()

        expect(activePanel).toBe(null)
    })
})
