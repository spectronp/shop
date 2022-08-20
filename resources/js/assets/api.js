import axios from "axios"

// Get MIX_APP_URL and MIX_APP_PORT from .env file
const APP_URL = process.env.MIX_APP_URL
const APP_PORT = process.env.MIX_APP_PORT

// NOTE -- use window.axios ???
const instance = axios.create({
    baseURL: `${APP_URL}:${APP_PORT}/api`
})

// TODO -- error handling
// TODO -- make this more DRY
const api = {
    addClient: async (name, about) => {

        let response

        try {
            response = await instance.post('/clients' , {
                client: {
                    name: name,
                    about: about
                }
            })

        } catch (error) {

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
    },

    getHistory: async id => {
        let response

        try {
            response = await instance.get(`/clients/${id}/history`)
        } catch (error) {
            throw {
                error: error,
                message: 'get history error'
            }
        }

        return response.data
    },

    updateHistory: async (id, history) => {
        let response

        try {
            response = await instance.put(`/clients/${id}/history`, { history: history })
        } catch (error){
            throw {
                error: error,
                message: 'update history error'
            }
        }

        return response.data
    },

    updateClient: async (id, name, about) => {
        let response

        try {
            response = await instance.put(`/clients/${id}`, { name: name, about: about })
        } catch (error) {
            throw {
                error: error,
                message: 'update client error'
            }
        }

        return response.data
    }
}

export default api
