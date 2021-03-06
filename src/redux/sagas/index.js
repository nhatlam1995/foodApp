import { all } from 'redux-saga/effects';
import { watchFavorite, watchRemoveFavorite, watchSetFavorite } from './favoriteSagas';
import { watchCategory } from './homeSagas';
import { watchLogin } from './loginSagas';
import { watchOrder } from './orderSagas';
import { watchRegister } from './registerSagas';
import { watchUser } from './userSagas';

export default function* rootSagas() {
    yield all([
        watchLogin(),
        watchUser(),
        watchCategory(),
        watchFavorite(),
        watchRemoveFavorite(),
        watchSetFavorite(),
        watchOrder(),
        watchRegister(),
    ])
}