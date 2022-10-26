import Panel from "../assets/Panel"
import ControlButton from "./ControlButton"

export default function ControlTab({ setActivePanel }){
    return <div className="w-2/3 flex items-center justify-start mb-3">
        <ControlButton panel={Panel.ADD_FORM} setActivePanel={setActivePanel} />
    </div>
}
