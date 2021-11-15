import { GET_USER_FAVORITE_FAIL, GET_USER_FAVORITE_SUCCESS, REMOVE_USER_FAVORITE_FAIL, REMOVE_USER_FAVORITE_SUCCESS, SET_USER_FAVORITE_FAIL, SET_USER_FAVORITE_SUCCESS } from "../actions/actionTypes"

const initialState = {
    loading: true,
    data: []
}

const favoriteReducers = (state = initialState, action) => {
    try {
        switch (action.type) {
            case SET_USER_FAVORITE_SUCCESS:
                return {
                    ...state,
                    data: action,
                    loading: false
                }
            case SET_USER_FAVORITE_FAIL:
                return {
                    ...state,
                    data: action,
                    loading: true
                }
            case GET_USER_FAVORITE_SUCCESS:
                return {
                    ...state,
                    data: action,
                    loading: false
                }
            case GET_USER_FAVORITE_FAIL:
                return {
                    ...state,
                    data: action,
                    loading: true
                }
            case REMOVE_USER_FAVORITE_SUCCESS:
                console.log('action', action)
                const newList = action.response.filter(item => item._id !== action.response.favorite._id)
                console.log('newwwwwwwww', newList)
                return newList
            case REMOVE_USER_FAVORITE_FAIL:
                return {
                    ...state,
                    data: action,
                    loading: true
                }
            default:
                return {
                    ...state
                }
        }
    } catch (error) {
        console.log('Favorite Reducers Error', error)
    }
}

export default favoriteReducers;