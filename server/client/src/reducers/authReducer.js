import { FETCH_USER } from '../actions/types'

const initialState = {
    user: null,
}

export default function(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case FETCH_USER:
            let newState = Object.assign({}, state)
            newState.user = action.payload || false 
            return newState
        default:
            return state
    }
}
