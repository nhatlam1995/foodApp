import { GET_USER_INFO_FAIL, GET_USER_INFO_SUCCESS } from "../actions/actionTypes"

const initialState = {
    loading: true,
    data: []
}

const userReducers = (state = initialState, action) => {
    try {
        switch (action.type) {
            case GET_USER_INFO_SUCCESS:
                return {
                    ...state,
                    data: action,
                    loading: false
                }
            case GET_USER_INFO_FAIL:
                return {
                    ...state,
                    data: action,
                    loading: true
                }
            default:
                return { ...state }
        }
    } catch (error) {
        console.log('User Reducers Error', error)
        return error
    }
}

export default userReducers;