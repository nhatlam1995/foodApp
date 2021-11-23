
import { put, takeEvery } from 'redux-saga/effects';
import { ADD_ORDER, ADD_ORDER_FAIL, ADD_ORDER_SUCCESS } from '../actions/actionTypes';
import { Add_Order } from '../middleware/apis/orderApis';

export function* watchOrder() {
    yield takeEvery(ADD_ORDER, addOrderFlow);
}

function* addOrderFlow(action) {
    try {
        const response = yield Add_Order(action.payload)

        if (response !== undefined) {
            if (response.success === true) {
                yield put({ type: ADD_ORDER_SUCCESS, response: response })
            }
            else {
                yield put({ type: ADD_ORDER_FAIL, response: response })
            }
        }
        else {
            yield put({ type: ADD_ORDER_FAIL, response: response })
        }
    } catch (error) {
        console.log('Order Sagas error: ', error);
        return error;
    }
}

