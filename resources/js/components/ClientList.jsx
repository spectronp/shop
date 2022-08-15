import ClientCard from './ClientCard'

export default function ClientList({ clients }){
    return (
        <div>
        <ol>
        {
            clients.map(client => (
                <li><ClientCard client={client} key={client.id} /></li>
            ))
        }
        </ol>
        </div>
    )
}
