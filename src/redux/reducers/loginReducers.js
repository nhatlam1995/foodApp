import AsyncStorage from "@react-native-async-storage/async-storage";
import { DID_LOGIN_ACTION, LOG_OUT, SIGN_IN_ERROR, SIGN_IN_SUCCESS } from "../actions/actionTypes";

const initialState = {
    isLoggedIn: false,
    data: [],
    error: "",
    loading: true
};

const loginReducers = (state = initialState, action) => {
    try {
        switch (action.type) {
            case SIGN_IN_SUCCESS:
                return {
                    ...state,
                    isLoggedIn: true,
                    data: action,
                    error: false,
                    loading: false
                }
            case SIGN_IN_ERROR:
                return {
                    ...state,
                    isLoggedIn: false,
                    data: action,
                    error: true,
                    loading: true
                }
            case DID_LOGIN_ACTION:
                return 0;
            case LOG_OUT:
                console.log('Logout')
                AsyncStorage.removeItem('token')
                AsyncStorage.removeItem('isRemember')
                return {
                    ...state,
                    isLoggedIn: false,
                    data: [],
                    error: "",
                    loading: true
                }
            default:
                return { ...state }
        }
    } catch (error) {
        console.log('Login Reducers error', error)
        return error
    }
};

export default loginReducers;