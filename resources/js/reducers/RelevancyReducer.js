
export default function RelevancyReducer(relevantClients, client){
    if(typeof client === 'number'){
        return relevantClients.filter(relClient => {
            if(relClient.id == client) return false
            return true
        })
    }

    let newRelevantClients = relevantClients.filter( relClient => {
        if(relClient.id == client.id) return false
        return true
    })

    newRelevantClients.unshift(client)

    if(newRelevantClients.length > 5){ // TODO -- make it configurable
        newRelevantClients.pop()
        return newRelevantClients
    }

    return newRelevantClients
}
