import { useState } from "react"

export default function Search({ setSearchInput }) {

    const [search, setSearch] = useState('')

    function handleChange(e){
        setSearch(e.target.value)
        setSearchInput(e.target.value)
    }

    return <div>
        <label htmlFor="search">Buscar</label>
        <input type="text" id="search" value={search}  onChange={handleChange} />
    </div>
}
