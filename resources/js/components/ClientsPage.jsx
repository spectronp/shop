import { useReducer, useState } from "react"
import MiddleSector from "./MiddleSector"
import CardDisplay from "./CardDisplay"
import ClientEditModal from "./ClientEditModal"
import RelevancyReducer from "../reducers/RelevancyReducer"

export default function ClientsPage(){
    const [relevantClients, registerRelevantClient] = useReducer(RelevancyReducer, [])
    const [editModal, setEditModal] = useState({ isOpen: false })

    return (
        <>
        {
            editModal.isOpen
                ? <ClientEditModal client={editModal.client} setEditModal={setEditModal} />
                : null
        }
        <MiddleSector registerRelevantClient={registerRelevantClient} />
        <CardDisplay
            relevantClients={relevantClients}
            registerRelevantClient={registerRelevantClient}
            setEditModal={setEditModal}
        />
        </>
    )
}
