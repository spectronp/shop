import { useState } from "react"
import api from "../assets/api"
import ApiStatus from "../assets/ApiStatus"

export default function ClientCard({ client }){
    const [expanded, setExpansion] = useState(false)
    const [history, setHistory] = useState(null)
    const [status, setStatus] = useState({
        apiStatus: ApiStatus.IDLE,
        apiAction: null,
        error: null
    })

    if(expanded === true && history === null) {
        api.getHistory(client.id)
        .then( response => {
            setStatus({
                apiStatus: ApiStatus.IDLE,
                apiAction: api.getHistory,
                error: null
            })
            setHistory(response.history)
        })
        .catch(error => {
            setStatus({
                apiStatus: ApiStatus.ERROR,
                apiAction: api.getHistory,
                error: error
            })
            setHistory('')
        })

        setStatus({
            apiStatus: ApiStatus.WAITING,
            apiAction: api.getHistory,
            error: null
        })

        setHistory('') // TODO -- retry to load history after some time
    }

    function handleChange(e){ // TODO -- wait some time for more input before calling api
        setHistory(e.target.value)

        api.updateHistory(client.id, e.target.value)
        .then( response => {
            setStatus({
                apiStatus: ApiStatus.SUCCESS,
                apiAction: api.updateHistory,
                error: null
            })
        })
        .catch( error => {
            setStatus({
                apiStatus: ApiStatus.ERROR,
                apiAction: api.updateHistory,
                error: error
            })
        })

        setStatus({
            apiStatus: ApiStatus.WAITING,
            apiAction: api.updateHistory,
            error: null
        })
    }

    function feedback(){
        switch( status.apiStatus ) {
            case ApiStatus.SUCCESS:
                return 'Salvo'
            case ApiStatus.WAITING:
                if(status.apiAction == api.updateHistory){
                    return 'Salvando...'
                } else if(status.apiAction == api.getHistory){
                    return 'Carregando...'
                }
            case ApiStatus.ERROR:
                return status.error.message
        }
    }

    return (
        <div className="client-card">
        <button title="expand" className="expand-toggle" onClick={() => setExpansion( ! expanded )}></button>
        <p>{client.name}</p>
        <p>{client.about}</p>
        {
            expanded ?
                <>
                <p>{feedback()}</p>
                <textarea title="history" className="client-history" value={history} onChange={handleChange} ></textarea>
                </>
            : null
        }
        </div>
    )
}
