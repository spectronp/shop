import axios from "axios"

// Get MIX_APP_URL and MIX_APP_PORT from .env file
const APP_URL = process.env.MIX_APP_URL
const APP_PORT = process.env.MIX_APP_PORT

// NOTE -- use window.axios ???
// NOTE -- use Bluebird or RxJs ???

// TODO -- error handling

class Api{
    constructor(){
        this.instance = axios.create({
            baseURL: `${APP_URL}:${APP_PORT}/api`
        })
        this.lastCallReject = null
    }

    async apiCall(method, url, params, delay = 0){
        if(this.lastCallReject) this.lastCallReject('newCall')

        let final_response
        let apiCall

        await new Promise((resolve, reject) => {
            this.lastCallReject = reject
            setTimeout(() => {
                resolve()
            }, delay)
        }).then(() => {
            apiCall = method(url, params)
            .then(response => {
                   if( response != undefined ) final_response = response.data
                })
            },
            () => {}
        )

        await apiCall

        return final_response
    }

    async addClient(name, about){
        let res = await this.apiCall(this.instance.post, '/clients',{ client: { name: name, about: about} })
        return res['id']
    }

    async updateClient(id, name, about){
        return this.apiCall(this.instance.put, `/clients/${id}`, { name: name, about: about})
    }

    async deleteClient(id){
        return this.apiCall(this.instance.delete, `/clients/${id}`)
    }

    async getHistory(id){
        let res = await this.apiCall(this.instance.get, `/clients/${id}/history`)
        return res['history']
    }

    async updateHistory(id, history){
        let delay = 200
        return this.apiCall(this.instance.put, `/clients/${id}/history`, { history: history}, delay)
    }
}

export default Api

export const api = new Api()
