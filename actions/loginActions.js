import AsyncStorage from '@react-native-community/async-storage';

import {FETCH_USER_DATA} from './actionsTypes'

export const storeUserData = (data) => dispatch => {
                dispatch({
                    type: FETCH_USER_DATA,
                    payload: data
                })
}
        