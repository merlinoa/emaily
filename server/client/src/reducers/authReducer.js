import { FETCH_USER } from '../actions/types'

const initialState = {
    user: null,
}

export default function(state = null, action) {
    //console.log(action)
    switch (action.type) {
        case FETCH_USER:
            //let newState = Object.assign({}, state)
            //newState.user = action.payload || false 
            //return newState
            return action.payload || false
        default:
            return state
    }
}
