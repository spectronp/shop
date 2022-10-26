import { useState } from "react"
import { api } from "../assets/api"
import ApiStatus from "../assets/ApiStatus"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export default function ClientCard({ client, setEditModal }){
    const [expanded, setExpansion] = useState(false)
    const [history, setHistory] = useState(null)
    const [status, setStatus] = useState({
        apiStatus: ApiStatus.IDLE,
    })

    if(expanded === true && history === null) {
        api.getHistory(client.id)
        .then( response => {
            setStatus({
                apiStatus: ApiStatus.IDLE,
            })
            setHistory(response)
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
        })

        setHistory('') // TODO -- retry to load history after some time
    }

    function handleChange(e){
        setHistory(e.target.value)

        // Reject last queued api call
        if(status.lastCall) status.lastCall()

        let callReject

        new Promise( (resolve , reject) => { // TODO -- make api handle delay and retry

            callReject = () => {
                reject({
                    message: 'cancelled by new call' // NOTE -- return something else on rejection
                })
            }

            setTimeout(() => {
                resolve()
            }, 200)
        })
        .then(() => {
                api.updateHistory(client.id, e.target.value)
                .then( () => {
                    setStatus({
                        apiStatus: ApiStatus.SUCCESS,
                        apiAction: api.updateHistory,
                    })
                })
                .catch( error => {
                    setStatus({
                        apiStatus: ApiStatus.ERROR,
                        apiAction: api.updateHistory,
                        error: error
                    })
                })
            },

            reason => {
                if(reason.message == 'cancelled by new call') return
            }
        )

        setStatus({
            apiStatus: ApiStatus.WAITING,
            apiAction: api.updateHistory,
            lastCall: callReject,
        })
    }

    function feedback(){
        switch( status.apiStatus ) {
            case ApiStatus.IDLE:
                return null
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

    function isLoading(){
        if(status.apiStatus == ApiStatus.WAITING && status.apiAction == api.getHistory) return true

        return false
    }

    return (
        <div className="client-card grid grid-cols-2 gap-y-2 rounded-xl border p-2">
            <div className="block"  onClick={() => setExpansion( ! expanded )}>
                <p className="text-xl">{client.name}</p>
                <p>{client.about}</p>
            </div>
            {
                expanded ?
                    <>
                    <button className="edit-button justify-self-end mr-2" onClick={ () => setEditModal({ isOpen: true, client: client }) } >
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <p>{feedback()}</p>
                    {
                        isLoading()
                            ? null
                            : <textarea title="history" className="client-history col-span-full bg-gray-800 rounded-sm border" value={history} onChange={handleChange} ></textarea>
                    }
                    </>
                : null
            }
        </div>
    )
}
