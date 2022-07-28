
export default function RelevancyReducer(relevantClients, client){
    relevantClients.unshift(client)

    if(relevantClients.lenght > 5){ // TODO -- make it configurable
        relevantClients.pop()
        return relevantClients
    }

    return relevantClients
}
