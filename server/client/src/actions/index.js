import axios from 'axios'
import { FETCH_USER } from './types'


export const fetchUser = () => {
    return async (dispatch) => {
        const res = await axios.get('/api/current_user')

        dispatch({
            type: FETCH_USER,
            payload: res.data
        })
    }
}

export const handleToken = token => {
    return async (dispatch) => {
        // this post will post the credit and return a user with the updated credit amount
        const res = await axios.post('/api/stripe', token)
        
        dispatch({
            type: 'FETCH_USER',
            payload: res.data
        })
    }
}

export const submitSurvey = (values, history) => {
    return async dispatch => {
        const res = await axios.post('/api/surveys', values)
        
        // route to /surveys
        history.push('/surveys')
        // fetch the updated user
        dispatch({
            type: 'FETCH_USER',
            payload: res.data
        }) 
    }
}

