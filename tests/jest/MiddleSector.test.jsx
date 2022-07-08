import React from 'react'
import { screen, render, act } from '@testing-library/react'
import '@testing-library/jest-dom'

import MiddleSector from '../../resources/js/components/MiddleSector'
import ControlTab from "../../resources/js/components/ControlTab"
import PanelController from "../../resources/js/components/PanelController"

jest.mock("../../resources/js/components/ControlTab", () => jest.fn(({ setActivePanel }) => <div data-testid="ControlTab"></div> ))

jest.mock("../../resources/js/components/PanelController", () => jest.fn(({ activePanel }) => <div data-testid="PanelController"></div> ))

describe('MiddleSector', () => {

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

    let setActivePanel
    beforeEach(() => {
        jest.clearAllMocks()

        render(<MiddleSector />)
        setActivePanel = (panel) => {
            act(() => {
                ControlTab.mock.lastCall[0]['setActivePanel'](panel)
            })
        }
    })

    // Tests
    test('renders PanelController', () => {
        expect(screen.queryByTestId('PanelController')).toBeInTheDocument()
    })

    test('renders ControlTab', () => {
        expect(screen.queryByTestId('PanelController')).toBeInTheDocument()
    })

    test('pass a hook function as props to ControlTab', () => { // NOTE -- maybe test that setActivePanel is actually a React Hook ??
        expect(ControlTab).toHaveBeenCalledWith(
            expect.objectContaining(
                { setActivePanel: expect.any(Function) },
            ),
            expect.anything()
        )
    })

    test('returns null on first render', () => {
        expect(PanelController).toHaveActivePanel(null)
    })

    test('return the same panel id received at the first setActive call', () => {

        setActivePanel('test-panel')

        expect(PanelController).toHaveActivePanel('test-panel')
    })

    test('returns the second panel id when receives 2 different ids', () => {

        setActivePanel('first-panel')
        setActivePanel('second-panel')

        expect(PanelController).toHaveActivePanel('second-panel')
    })

    test('returns null when receives the same panel id', () => {

        setActivePanel('test-panel')
        setActivePanel('test-panel')

        expect(PanelController).toHaveActivePanel(null)
    })
})
