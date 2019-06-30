import { FETCH_USER_DATA } from '../actions/actionsTypes'

const initialState = {
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_DATA:
            return {
                ...state,
                user: action.payload
            }
        default:           
            return state
    }
}