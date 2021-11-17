import { GET_USER_FAVORITE_FAIL, GET_USER_FAVORITE_SUCCESS, REMOVE_USER_FAVORITE_FAIL, REMOVE_USER_FAVORITE_SUCCESS, SET_USER_FAVORITE_FAIL, SET_USER_FAVORITE_SUCCESS } from "../actions/actionTypes"

const initialState = {
    loading: true,
    data: []
}

const favoriteReducers = (state = initialState, action) => {
    try {
        switch (action.type) {
            case GET_USER_FAVORITE_SUCCESS:
                return {
                    ...state,
                    data: action.response.userCheckFavorite.favoritesData,
                    loading: false
                }
            case GET_USER_FAVORITE_FAIL:
                return {
                    ...state,
                    data: action,
                    loading: true
                }
            case SET_USER_FAVORITE_SUCCESS:
                return {
                    ...state,
                    data: state.data.concat(action.response.foodCheck),
                    loading: false
                }
            case SET_USER_FAVORITE_FAIL:
                return {
                    ...state,
                    error: action.response.message,
                    loading: true
                }
            case REMOVE_USER_FAVORITE_SUCCESS:
                return {
                    ...state,
                    data: state.data.filter(item => item._id !== action.response.favorite._id),
                    loading: false
                }
            case REMOVE_USER_FAVORITE_FAIL:
                return {
                    ...state,
                    data: [...data],
                    error: action.response.message,
                    loading: true
                }
            default:
                return {
                    ...state
                }
        }
    } catch (error) {
        console.log('Favorite Reducers Error', error)
        return error
    }
}

export default favoriteReducers;