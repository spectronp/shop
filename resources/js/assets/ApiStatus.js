
// NOTE -- call it FormStatus ???
export default class ApiStatus {

    static IDLE = new ApiStatus('idle')
    static WAITING = new ApiStatus('waiting')
    static SUCCESS = new ApiStatus('success')
    static ERROR = new ApiStatus('err')

    constructor(name){
        this.name = name
    }
}
