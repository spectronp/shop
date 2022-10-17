import { useReducer, useState } from "react"
import Search from "./Search"
import MiddleSector from "./MiddleSector"
import CardDisplay from "./CardDisplay"
import ClientEditModal from "./ClientEditModal"
import RelevancyReducer from "../reducers/RelevancyReducer"

export default function ClientsPage(){
    const [searchInput, setSearchInput] = useState()
    const [relevantClients, registerRelevantClient] = useReducer(RelevancyReducer, [])
    const [editModal, setEditModal] = useState({ isOpen: false })

    return (
        <>
        <Search setSearchInput={setSearchInput} />
        {
            editModal.isOpen
                ? <ClientEditModal
                    client={editModal.client}
                    setEditModal={setEditModal}
                    registerRelevantClient={registerRelevantClient}
                />
                : null
        }
        <MiddleSector registerRelevantClient={registerRelevantClient} />
        <CardDisplay
            searchInput={searchInput}
            relevantClients={relevantClients}
            registerRelevantClient={registerRelevantClient}
            setEditModal={setEditModal}
        />
        </>
    )
}
