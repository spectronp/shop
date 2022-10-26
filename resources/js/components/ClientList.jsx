import ClientCard from './ClientCard'

export default function ClientList({ clients, setEditModal }){
    return (
        <ol>
        {
            clients.map(client => (
                <li><ClientCard client={client} key={client.id} setEditModal={setEditModal} /></li>
            ))
        }
        </ol>
    )
}
