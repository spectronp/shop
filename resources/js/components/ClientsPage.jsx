import { useReducer } from "react"
import MiddleSector from "./MiddleSector"
import CardDisplay from "./CardDisplay"
import RelevancyReducer from "../reducers/RelevancyReducer"

export default function ClientsPage(){
    const [relevantClients, registerRelevantClient] = useReducer(RelevancyReducer, [])

    return (
        <>
        <MiddleSector registerRelevantClient={registerRelevantClient} />
        <CardDisplay relevantClients={relevantClients} registerRelevantClient={registerRelevantClient} />
        </>
    )
}
