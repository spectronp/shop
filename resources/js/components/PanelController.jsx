import Panel from "../assets/Panel"
import AddFormPanel from "./AddFormPanel"

export default function PanelController({ activePanel, registerRelevantClient }) {

    switch(activePanel) {
        case Panel.ADD_FORM:
            return <AddFormPanel registerRelevantClient={registerRelevantClient} />
        default:
            return null
    }
}
