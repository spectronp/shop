import axios from "axios"

// Get MIX_APP_URL var from .env file
const APP_URL = process.env.MIX_APP_URL
const APP_PORT = process.env.MIX_APP_PORT

// NOTE -- use window.axios ???
const instance = axios.create({
    baseURL: `${APP_URL}:${APP_PORT}/api/clients`
})

const api = {
    addClient: async (name, about) => {

        let response

        try {
            console.log('api try')
            response = await instance.post(null , {
                client: {
                    name: name,
                    about: about
                }
            })

        } catch (error) {
            // TODO -- error handling

            if(error.response){
                console.log(error.response)
            } else if(error.request) {
                console.log('request')
            } else if (error.message){
                console.log(error)
            }

            throw error
        }

        return response.data
    }
}

export default api
