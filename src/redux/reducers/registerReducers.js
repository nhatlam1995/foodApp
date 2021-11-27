import { SIGN_UP_FAIL, SIGN_UP_NAVIGATE, SIGN_UP_SUCCESS } from "../actions/actionTypes";

const initialState = {
    loading: false,
    error: false,
    message: null,
};

const registerReducers = (state = initialState, action) => {
    try {
        switch (action.type) {
            case SIGN_UP_SUCCESS:
                return {
                    ...state,
                    error: false,
                    message: action.response.message
                }
            case SIGN_UP_FAIL:
                return {
                    ...state,
                    error: true,
                    message: action.response.message
                }
            default:
                return { ...state }
        }
    } catch (error) {
        console.log('Register Reducers error', error)
        return error
    }
};

export default registerReducers;