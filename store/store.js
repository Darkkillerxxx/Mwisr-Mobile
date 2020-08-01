import {createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux'
import loginReducer from './Reducers/login'
import CDReducer from './Reducers/CallDetails'

const rootReducer=combineReducers({
    login:loginReducer,
    CallDetails:CDReducer
  })
  
const store=createStore(rootReducer)

export default store