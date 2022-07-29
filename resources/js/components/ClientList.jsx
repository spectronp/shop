import ClientCard from './ClientCard'

export default function ClientList({ clients }){
    return (
        <div>
        <ol>
        {
            clients.map(client => (
                <li><ClientCard client={client} id={client.id} /></li>
            ))
        }
        </ol>
        </div>
    )
}
