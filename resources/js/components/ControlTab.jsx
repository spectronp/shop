import Panel from "../assets/Panel"
import ControlButton from "./ControlButton"

export default function ControlTab({ setActivePanel }){
    return (
        <ControlButton panel={Panel.ADD_FORM} setActivePanel={setActivePanel} />
    )
}
