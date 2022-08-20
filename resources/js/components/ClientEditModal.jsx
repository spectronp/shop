import { useState } from 'react'
import api from '../assets/api'

export default function ClientEditModal({ client, setEditModal, registerRelevantClient }){
    const [name, setName] = useState(client.name)
    const [about, setAbout] = useState( client.about ?? '' )

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

    function handleSubmit(e){
        e.preventDefault()

        api.updateClient(client.id, name, about)

        setEditModal({ isOpen: false })

        registerRelevantClient({ id: client.id, name: name, about: about })
    }

    return <form onSubmit={ handleSubmit }>
        <label htmlFor="name">Nome</label>
        <input type="text" name="name" id="name" value={ name } onChange={ handleChange } />

        <label htmlFor="about">Sobre</label>
        <input type="text" name="about" id="about" value={ about } onChange={ handleChange } />

        <button onClick={ () => setEditModal({ isOpen: false }) } >Cancelar</button>
        <button type="submit">Salvar</button>
    </form>
}
