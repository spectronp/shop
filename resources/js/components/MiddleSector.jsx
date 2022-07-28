import { useReducer } from "react";
import PanelReducer from "../reducers/PanelReducer";
import ControlTab from "./ControlTab";
import PanelController from "./PanelController"

export default function MiddleSector(props){

    const [activePanel, setActivePanel] = useReducer(PanelReducer, null)

    return (
        <>
        <ControlTab setActivePanel={setActivePanel} />
        <PanelController activePanel={activePanel} registerRelevantClient={props.registerRelevantClient } />
        </>
    )
}
