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
        <div className="h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
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
        </div>
    )
}
