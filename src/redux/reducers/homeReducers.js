import { GET_CATEGORY_INFO_FAIL, GET_CATEGORY_INFO_SUCCESS } from "../actions/actionTypes"

const initialState = {
    loading: true,
    data: []
}

const homeReducers = (state = initialState, action) => {
    try {
        switch (action.type) {
            case GET_CATEGORY_INFO_SUCCESS:
                return {
                    ...state,
                    data: action,
                    loading: false
                }
            case GET_CATEGORY_INFO_FAIL:
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
        console.log('Home Reducers Error', error)
        return error
    }
}

export default homeReducers;