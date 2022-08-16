import MostRelevant from './MostRelevant'

export default function CardDisplay({ relevantClients, setEditModal }){
    return <MostRelevant
        relevantClients={relevantClients}
        setEditModal={setEditModal}
    />
}
