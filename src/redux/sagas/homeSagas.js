import { put, takeEvery } from "@redux-saga/core/effects";
import { GET_CATEGORY_INFO, GET_CATEGORY_INFO_FAIL, GET_CATEGORY_INFO_SUCCESS } from "../actions/actionTypes";
import { Get_Category_Info } from "../middleware/apis/homeApis";

function* getCategoryInfo(action) {
    var response = yield Get_Category_Info();

    if (response !== undefined) {
        if (response.success === true) {
            yield put({ type: GET_CATEGORY_INFO_SUCCESS, response: response })
        }
        else
            yield put({ type: GET_CATEGORY_INFO_FAIL, response: response.message })
    }
    else
        yield put({ type: GET_CATEGORY_INFO_FAIL, response: response.message })
}

export function* watchCategory() {
    yield takeEvery(GET_CATEGORY_INFO, getCategoryInfo)
}