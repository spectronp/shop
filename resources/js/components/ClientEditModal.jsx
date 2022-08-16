import { useState } from 'react'

export default function ClientEditModal({ client, setEditModal }){
    const [name, setName] = useState(client.name)
    const [about, setAbout] = useState(client.about)

    function handleChange(e){

    }

    function handleSubmit(e){
        e.preventDefault()
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
