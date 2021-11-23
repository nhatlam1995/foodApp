import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, takeEvery } from 'redux-saga/effects';
import { POST_LOGIN, SIGN_IN_ERROR, SIGN_IN_SUCCESS } from '../actions/actionTypes';
import { postLogin } from '../middleware/apis/loginApis';

export function* watchLogin() {
    yield takeEvery(POST_LOGIN, signInFlow);
}

function* signInFlow(action) {
    const { email, password } = action.payload
    try {
        const response = yield postLogin(email, password)

        if (response !== undefined) {
            if (response.success === true) {
                yield put({ type: SIGN_IN_SUCCESS, response: response })
                console.log('Login Saga response ', response)
                storeData(response.data.token)
            }
            else {
                yield put({ type: SIGN_IN_ERROR, response: response })
            }
        }
        else {
            yield put({ type: SIGN_IN_ERROR, response: response })
        }
    } catch (error) {
        console.log('Login Sagas error: ', error)
        return error
    }
}

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('token', value)
    } catch (error) {
        console.log('Async Storage set token error', error)
    }
}