import { screen, render, act } from '@testing-library/react'
import '@testing-library/jest-dom'

import MiddleSector from '../../resources/js/components/MiddleSector'
import ControlTab from "../../resources/js/components/ControlTab"
import PanelController from "../../resources/js/components/PanelController"

jest.mock("../../resources/js/components/ControlTab", () => jest.fn(({ setActivePanel }) => <div data-testid="ControlTab"></div> ))

jest.mock("../../resources/js/components/PanelController", () => jest.fn(({ activePanel }) => <div data-testid="PanelController"></div> ))

expect.extend({
    toHaveActivePanel(received, expectedPanel){
        let activePanel = received.mock.lastCall[0]['activePanel']

        if(activePanel === expectedPanel){
            return {
                pass: true,
                message: () => `expected to not receive ${expectedPanel} as activePanel`
            }
        } else{
            return {
                pass: false,
                message: () => `expected to receive ${expectedPanel} as activePanel, instead of ${activePanel}`
            }
        }
    }
})


// Tests
test('renders PanelController', () => {
    render(<MiddleSector />)

    expect(screen.queryByTestId('PanelController')).toBeInTheDocument()
})

test('renders ControlTab', () => {
    render(<MiddleSector />)

    expect(screen.queryByTestId('PanelController')).toBeInTheDocument()
})

test('pass a hook function as props to ControlTab', () => { // NOTE -- maybe test that setActivePanel is actually a React Hook ??
    render(<MiddleSector />)

    expect(ControlTab).toHaveBeenCalledWith(
        expect.objectContaining(
            { setActivePanel: expect.any(Function) },
        ),
        expect.anything()
    )
})

test('pass registerRelevantClient reducer to PanelController', () => {
    const registerRelevantClient = new Function()
    render(<MiddleSector registerRelevantClient={registerRelevantClient} />)

    expect(PanelController).toHaveBeenCalledWith(
        expect.objectContaining(
            { registerRelevantClient: registerRelevantClient },
        ),
        expect.anything()
    )
})

test('returns null on first render', () => {
    render(<MiddleSector />)

    expect(PanelController).toHaveActivePanel(null)
})

test('return the same panel id received at the first setActivePanel call', () => {
    render(<MiddleSector />)
    const setActivePanel = panel => {
        act(() => {
            ControlTab.mock.lastCall[0]['setActivePanel'](panel)
        })
    }

    setActivePanel('test-panel')

    expect(PanelController).toHaveActivePanel('test-panel')
})

test('returns the second panel id when receives 2 different ids', () => {
    render(<MiddleSector />)
    const setActivePanel = panel => {
        act(() => {
            ControlTab.mock.lastCall[0]['setActivePanel'](panel)
        })
    }

    setActivePanel('first-panel')
    setActivePanel('second-panel')

    expect(PanelController).toHaveActivePanel('second-panel')
})

test('returns null when receives the same panel id', () => {
    render(<MiddleSector />)
    const setActivePanel = panel => {
        act(() => {
            ControlTab.mock.lastCall[0]['setActivePanel'](panel)
        })
    }

    setActivePanel('test-panel')
    setActivePanel('test-panel')

    expect(PanelController).toHaveActivePanel(null)
})
