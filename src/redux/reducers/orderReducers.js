import { ADD_ORDER_FAIL, ADD_ORDER_SUCCESS } from "../actions/actionTypes"

const initialState = {
    loading: true,
    data: []
}

const orderReducers = (state = initialState, action) => {
    try {
        switch (action.type) {
            case ADD_ORDER_SUCCESS:
                return {
                    ...state,
                    data: action,
                    loading: false
                }
            case ADD_ORDER_FAIL:
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
        console.log('Order Reducers Error', error)
        return error
    }
}

export default orderReducers;