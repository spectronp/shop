
export default function ClientCard({ client }){
    return (
        <div className="client-card">
        <p>{client.name}</p>
        <p>{client.about}</p>
        </div>
    )
}
