import { useEffect, useState } from 'react'
import ClientList from './ClientList'
import { api } from '../assets/api'
import ApiStatus from '../assets/ApiStatus'

export default function SearchResult({ searchInput }){

if( ! searchInput ) return null

const [status, setStatus] = useState({ apiStatus: ApiStatus.IDLE })
const [result, setResult] = useState([])

useEffect(() => {
    api.searchClient(searchInput)
    .then(
        response => {
            if( Array.isArray(response) ){
                setResult(response)
                setStatus({ apiStatus: ApiStatus.SUCCESS })
            }
        },

        error => {
            setStatus({
                apiStatus: ApiStatus.ERROR,
                error: error
            })
        }
    )

    setStatus({ apiStatus: ApiStatus.WAITING })
}, [searchInput])

switch(status.apiStatus){
    case ApiStatus.WAITING:
        return <p id='search-load'>Buscando...</p>
    case ApiStatus.SUCCESS:
        if( result.length == 0 ) return <p>Nenhum cliente achado</p>

        return <div id='results'><ClientList clients={result} /></div>
    case ApiStatus.ERROR:
        return <p>Erro: {status.error.message}</p>
}
}
