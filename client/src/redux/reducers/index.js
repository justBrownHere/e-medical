import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import doctor from './doctorReducer'
import allcode from './allcodesReducer'
import specialty from './specialtyReducer'
import clinic from './clinicReducer'

export default combineReducers({
    auth,
    token,
    users,
    doctor,
    allcode,
    specialty,
    clinic
})