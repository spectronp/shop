
export default function RelevancyReducer(relevantClients, client){
    relevantClients.unshift(client)

    if(relevantClients.length > 5){ // TODO -- make it configurable
        relevantClients.pop()
        let newRelevantClients = [...relevantClients]
        return newRelevantClients
    }

    let newRelevantClients = [...relevantClients]
    return newRelevantClients
}
