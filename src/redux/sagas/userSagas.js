import { put, takeEvery } from "@redux-saga/core/effects";
import { GET_USER_INFO, GET_USER_INFO_FAIL, GET_USER_INFO_SUCCESS } from "../actions/actionTypes";
import { Get_User_Info } from "../middleware/apis/userApis";

function* getUserInfo(action) {
    var response = yield Get_User_Info();

    if (response !== undefined) {
        if (response.success === true) {
            yield put({ type: GET_USER_INFO_SUCCESS, response: response })
        }
        else
            yield put({ type: GET_USER_INFO_FAIL, response: response.message })
    }
    else
        yield put({ type: GET_USER_INFO_FAIL, response: response.message })
}

export function* watchUser() {
    yield takeEvery(GET_USER_INFO, getUserInfo)
}