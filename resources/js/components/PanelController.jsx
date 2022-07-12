import Panel from "../assets/Panel"
import AddFormPanel from "./AddFormPanel"

export default function PanelController({ activePanel }) {

    switch(activePanel) {
        case Panel.ADD_FORM:
            return <AddFormPanel />
        default:
            return null
    }
}
