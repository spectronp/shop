import { useState } from "react"

export default function Search({ setSearchInput }) {

    const [search, setSearch] = useState('')

    function handleChange(e){
        setSearch(e.target.value)
        setSearchInput(e.target.value)
    }

    return <input type="text" id="search" placeholder="Buscar" className="w-2/3 bg-gray-800 rounded-full border h-10 px-4 mb-4" value={search}  onChange={handleChange} />
}
