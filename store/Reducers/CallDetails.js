import  {SET_MINI_CD,SET_MAX_CD} from '../Actions/actionType'

const initialState={
   MiniCallDetails:[],
   MaxCalLDetails:[]
}

const CDReducer=(state = initialState,action)=>{

    switch(action.type)
    {
        case SET_MINI_CD:
            return{
                ...state,
                MiniCallDetails:action.payload
            };
        
        case SET_MAX_CD:
            return{
                ...state,
                MaxCallDetails:action.payload
            };

        default:
            return state
    }
}

export default CDReducer;