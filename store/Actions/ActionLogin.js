import {SET_LOGIN,SET_MSG,SET_ROUTE,SET_NRML_MSG} from './actionType'

export const setLogin = (loginResponse) => {
    return {
        type:SET_LOGIN,
        payload:loginResponse
    }
}

export const setMsg = (Msg)=>{
    return{
        type:SET_MSG,
        payload:Msg
    }
}

export const setRoute = (Route)=>{
    return{
        type:SET_ROUTE,
        payload:Route
    }
}

export const setNrmlMsg=(Route)=>{
    return{
        type:SET_NRML_MSG,
        payload:Route
    }
}