import { put, takeEvery } from "@redux-saga/core/effects";
import { GET_USER_FAVORITE, GET_USER_FAVORITE_FAIL, GET_USER_FAVORITE_SUCCESS, REMOVE_USER_FAVORITE, REMOVE_USER_FAVORITE_FAIL, REMOVE_USER_FAVORITE_SUCCESS, SET_USER_FAVORITE, SET_USER_FAVORITE_FAIL, SET_USER_FAVORITE_SUCCESS } from "../actions/actionTypes";
import { Get_User_Favorite, Remove_User_Favorite, Set_User_Favorite } from "../middleware/apis/favoriteApis";

function* getUserFavorite() {
    try {
        var response = yield Get_User_Favorite();

        if (response !== undefined) {
            if (response.success === true) {
                yield put({ type: GET_USER_FAVORITE_SUCCESS, response: response })
            }
            else {
                yield put({ type: GET_USER_FAVORITE_FAIL, response: response })
            }
        }
        else {
            yield put({ type: GET_USER_FAVORITE_FAIL, response: response })
        }
    } catch (error) {
        console.log('Get User favorite Error: ', error)
        return error
    }

}

export function* watchFavorite() {
    yield takeEvery(GET_USER_FAVORITE, getUserFavorite)
}

function* removeUserFavorite(itemId) {
    try {
        var response = yield Remove_User_Favorite(itemId);
        if (response !== undefined) {
            if (response.success === true) {
                yield put({ type: REMOVE_USER_FAVORITE_SUCCESS, response: response });
            }
            else
                yield put({ type: REMOVE_USER_FAVORITE_FAIL, response: response });
        }
        else {
            yield put({ type: REMOVE_USER_FAVORITE_FAIL, response: response });
        }
    } catch (error) {
        console.log('Remove User favorite Error: ', error)
        return error
    }
}

export function* watchRemoveFavorite() {
    yield takeEvery(REMOVE_USER_FAVORITE, removeUserFavorite)
}

function* setUserFavorite(itemId) {
    try {
        var response = yield Set_User_Favorite(itemId);
        if (response !== undefined) {
            if (response.success === true) {
                yield put({ type: SET_USER_FAVORITE_SUCCESS, response: response })
            }
            else
                yield put({ type: SET_USER_FAVORITE_FAIL, response: response });
        }
        else
            yield put({ type: SET_USER_FAVORITE_FAIL, response: response })

    } catch (error) {
        console.log('Set User favorite Error: ', error)
        return error
    }

}

export function* watchSetFavorite() {
    yield takeEvery(SET_USER_FAVORITE, setUserFavorite)
}