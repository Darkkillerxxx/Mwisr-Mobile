import {SET_MINI_CD, SET_MAX_CD} from './actionType'

export const setMiniDetails = (MiniDetails) => {
    return {
        type:SET_MINI_CD,
        payload:MiniDetails
    }
}

export const setMaxDetails = (MaxDetails)=>{
    return{
        type:SET_MAX_CD,
        payload:MaxDetails
    }
}
