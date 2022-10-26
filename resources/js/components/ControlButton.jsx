import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function ControlButton({ panel, setActivePanel }){

    return (
        <button id='add-form-toggle' className="w-7 h-7 flex justify-center items-center rounded-lg border ml-3" onClick={() => setActivePanel(panel)}>
            <FontAwesomeIcon icon={faPlus} />
        </button>
    )
}
