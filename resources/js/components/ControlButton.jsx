
export default function ControlButton({ panel, setActivePanel }){

    return (
        <button id='add-form-toggle' onClick={() => setActivePanel(panel)}></button>
    )
}
