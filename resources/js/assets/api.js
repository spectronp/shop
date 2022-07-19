import axios from "axios"

// Get MIX_APP_URL var from .env file
const APP_URL = process.env.MIX_APP_URL

// NOTE -- use window.axios ???
const instance = axios.create({
    baseURL: APP_URL + '/api/clients'
})

const api = {
    addClient: async (name, about) => {

        let response

        try {
            response = await instance.post({
                client: {
                    name: name,
                    about: about
                }
            })

        } catch (error) {
            // TODO -- error handling

            throw error
        }

        return response
    }
}

export default api
