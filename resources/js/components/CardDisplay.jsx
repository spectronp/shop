import MostRelevant from './MostRelevant'
import SearchResult from './SearchResult'

export default function CardDisplay({ searchInput, relevantClients, setEditModal }){
    return <>
    <SearchResult searchInput={searchInput} />
    <MostRelevant
        relevantClients={relevantClients}
        setEditModal={setEditModal}
    />
    </>
}
