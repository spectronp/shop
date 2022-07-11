
export default PanelReducer = (activePanel, clickedPanel) => {

    if(activePanel === clickedPanel){
        return null
    } else {
        return clickedPanel
    }

}
