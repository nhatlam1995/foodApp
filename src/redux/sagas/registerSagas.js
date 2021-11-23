import { put, takeEvery } from 'redux-saga/effects';
import { SIGN_UP, SIGN_UP_FAIL, SIGN_UP_SUCCESS } from '../actions/actionTypes';
import { postRegister } from '../middleware/apis/registerApis';

export function* watchRegister() {
    yield takeEvery(SIGN_UP, signUpFlow);
}

function* signUpFlow(action) {
    const { email, phonenumber, password, fullname } = action.payload

    try {
        const response = yield postRegister(email, phonenumber, password, fullname)

        if (response !== undefined) {
            if (response.success === true) {
                yield put({ type: SIGN_UP_SUCCESS, response: response })
                console.log('Register Saga response ', response)
            }
            else {
                yield put({ type: SIGN_UP_FAIL, response: response })
            }
        }
        else {
            yield put({ type: SIGN_UP_FAIL, response: response })
        }
    } catch (error) {
        console.log('Register Saga error:', error);
        return error;
    }
}