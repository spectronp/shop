import { useState } from 'react'
import api from '../assets/api'
import ApiStatus from '../assets/ApiStatus'

export default function ClientEditModal({ client, setEditModal, registerRelevantClient }){
    const [name, setName] = useState(client.name)
    const [about, setAbout] = useState( client.about ?? '' )
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [status, setStatus] = useState({ apiStatus: ApiStatus.IDLE })

    function handleChange(e){
        switch(e.target.name){
            case 'name':
                setName(e.target.value)
                break
            case 'about':
                setAbout(e.target.value)
                break
        }
    }

    function handleDelete(){
        api.deleteClient(client.id)
        .then(() => {
            setEditModal({ isOpen: false })
            registerRelevantClient(client.id)

            setStatus({ apiStatus: ApiStatus.IDLE })
        },

        error => {
            setStatus({
                apiStatus: ApiStatus.ERROR,
                apiAction: api.deleteClient,
                error: error
            })
        })


        setStatus({
            apiStatus: ApiStatus.WAITING,
            apiAction: api.deleteClient
        })
    }

    function handleSubmit(e){
        e.preventDefault()

        api.updateClient(client.id, name, about)

        setEditModal({ isOpen: false })
        registerRelevantClient({ id: client.id, name: name, about: about })
    }

    let delete_buttons = (
        <>
        <button onClick={handleDelete} >Sim, deletar cliente</button>
        <button onClick={ () => setDeleteOpen(false) } >Não</button>
        </>
    )

    if(deleteOpen){
        switch(status.apiStatus){
            case ApiStatus.IDLE:
                return (
                    <div>
                    <p>Tem certeza?</p>

                    { delete_buttons }
                    </div>
                )

            case ApiStatus.WAITING:
                return <p>Deletando...</p>

            case ApiStatus.ERROR:
                return (
                    <div>
                    <p>Erro: {status.error.message}</p>
                    <p>Tentar outra vez?</p>
                    { delete_buttons }
                    </div>
                )
        }
    }

    return <div>
        <button className='delete-client' onClick={ () => setDeleteOpen(true) } >Deletar</button>

        <form onSubmit={ handleSubmit }>

            <label htmlFor="name">Nome</label>
            <input type="text" name="name" id="name" value={ name } onChange={ handleChange } />

            <label htmlFor="about">Sobre</label>
            <input type="text" name="about" id="about" value={ about } onChange={ handleChange } />

            <button onClick={ () => setEditModal({ isOpen: false }) } >Cancelar</button>
            <button type="submit">Salvar</button>
        </form>
    </div>
}
