import ClientList from './ClientList'

export default function MostRelevant({ relevantClients }){
    return (
        <div id="most-relevant-wrapper">
        <p>Mais recentes</p>
        <ClientList clients={relevantClients} />
        </div>
    )
}
