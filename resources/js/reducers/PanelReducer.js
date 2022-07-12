
export default function PanelReducer (activePanel, clickedPanel) {

    if(activePanel === clickedPanel){
        return null
    } else {
        return clickedPanel
    }

}
