import ClientList from './ClientList'

export default function MostRelevant({ relevantClients, setEditModal }){
    return (
        <div id="most-relevant-wrapper" className='w-11/12 text-center'>
        <p>Mais recentes</p>
        <ClientList clients={relevantClients} setEditModal={setEditModal} />
        </div>
    )
}
