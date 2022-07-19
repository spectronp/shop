import { useRef, useState } from "react"
import api from "../assets/api"
import ApiStatus from "../assets/ApiStatus"

export default function AddFormPanel() {

    const nameRef = useRef(null)
    const aboutRef = useRef(null)

    const [status, setStatus] = useState( ApiStatus.IDLE )
    const [error, setError] = useState(null)

    const handleSubmit = e => {

        e.preventDefault()

        let name = nameRef.current.value
        let about = aboutRef.current.value

        api.addClient(name, about)
        .then((response) => {
            console.log('then')
            setStatus(ApiStatus.SUCCESS)
        })
        .catch(() => {
            console.log('catch')
            setStatus(ApiStatus.ERROR)
            setError('Erro')
        })

        setStatus(ApiStatus.WAITING)
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
            <input type="text" name="" id="name" ref={ nameRef } />
            <label htmlFor="name">Nome</label>

            <input type="text" name="" id="about" ref={ aboutRef } />
            <label htmlFor="about">Sobre</label>

            <button type="submit" id="register">Cadastrar</button>
        </form>
        { feedback() }
        </>
    )
}
