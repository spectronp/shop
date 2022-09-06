import { useState } from "react"
import { api } from "../assets/api"
import ApiStatus from "../assets/ApiStatus"

export default function AddFormPanel({ registerRelevantClient }) {

    const [name, setName] = useState('')
    const [about, setAbout] = useState('')

    const [status, setStatus] = useState( ApiStatus.IDLE )
    const [error, setError] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()

        api.addClient(name, about)
        .then((response) => {
            let client = {
                id: response,
                name: name,
                about: about

            }
            registerRelevantClient(client)

            setName('')
            setAbout('')
            setStatus(ApiStatus.SUCCESS)
        })
        .catch(() => {
            setStatus(ApiStatus.ERROR)
            setError('Erro')
        })

        setStatus(ApiStatus.WAITING)
    }

    const handleChange = e => {
        setStatus(ApiStatus.IDLE)

        switch(e.target.attributes.id.value){
            case 'name':
                setName(e.target.value)
                break
            case 'about':
                setAbout(e.target.value)
                break
        }
    }

    const feedback = () => {
        switch(status){
            case ApiStatus.IDLE:
                return null
            case ApiStatus.WAITING:
                return <p>Carregando...</p>
            case ApiStatus.SUCCESS:
                return <p>Cliente cadastrada(o)</p>
            case ApiStatus.ERROR:
                return <p>{ error }</p>
        }
    }

    return (
        <>
        <form onSubmit={ handleSubmit } >
            <input type="text" name="" id="name" value={name} onChange={handleChange} />
            <label htmlFor="name">Nome</label>

            <input type="text" name="" id="about" value={about} onChange={handleChange} />
            <label htmlFor="about">Sobre</label>

            <button type="submit" id="register">Cadastrar</button>
        </form>
        { feedback() }
        </>
    )
}
