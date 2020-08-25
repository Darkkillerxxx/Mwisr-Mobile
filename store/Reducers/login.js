import  {SET_LOGIN,SET_MSG,SET_ROUTE,SET_NRML_MSG} from '../Actions/actionType'

const initialState={
    login:[],
    ErrorMsg:null,
    Message:"",
    RouteName:""
}

const loginReducer=(state = initialState,action)=>{

    switch(action.type)
    {
        case SET_LOGIN:
            return{
                ...state,
                login:action.payload
            };
        
        case SET_MSG:
            return{
                ...state,
                ErrorMsg:action.payload
            };

        case SET_ROUTE:
           return{
               ...state,
               RouteName:action.payload
           };
        
        case SET_NRML_MSG:
            return{
                ...state,
                Message:action.payload
            };

        default:
            return state
    }
}

export default loginReducer;