import { ADD_ORDER, ADD_TO_CART, GET_CATEGORY_INFO, GET_USER_FAVORITE, GET_USER_INFO, LOG_OUT, POST_LOGIN, REMOVE_ALL_FROM_CART, REMOVE_FROM_CART, REMOVE_ITEM_FROM_CART, REMOVE_USER_FAVORITE, SET_USER_FAVORITE, SIGN_UP, SIGN_UP_NAVIGATE } from "./actionTypes"

export const loginAction = (email, password, isRemember) => {
    return {
        type: POST_LOGIN,
        payload: { email, password, isRemember }
    }
}

export const logOutAction = () => {
    return {
        type: LOG_OUT,
    }
}

export const addToCartAction = (item) => {
    return {
        type: ADD_TO_CART,
        payload: item
    }
}

export const removeFromCartAction = (item) => {
    return {
        type: REMOVE_FROM_CART,
        payload: item
    }
}

export const removeItemFromCartAction = (item) => {
    return {
        type: REMOVE_ITEM_FROM_CART,
        payload: item
    }
}

export const removeAllFromCartAction = (item) => {
    return {
        type: REMOVE_ALL_FROM_CART,
        payload: item
    }
}

export const getUserInfo = () => {
    return {
        type: GET_USER_INFO,
    }
}

export const getCategory = () => {
    return {
        type: GET_CATEGORY_INFO
    }
}

export const getUserFavorite = () => {
    return {
        type: GET_USER_FAVORITE
    }
}

export const setUserFavorite = (itemId) => {
    return {
        type: SET_USER_FAVORITE,
        payload: itemId,
    }
}

export const removeUserFavorite = (itemId) => {
    return {
        type: REMOVE_USER_FAVORITE,
        payload: itemId
    }
}

export const addOrder = (data) => {
    return {
        type: ADD_ORDER,
        payload: data
    }
}

export const signUp = (email, phonenumber, password, fullname) => {
    return {
        type: SIGN_UP,
        payload: { email, phonenumber, password, fullname }
    }
}

export const signUpNavigate = () => {
    return {
        type: SIGN_UP_NAVIGATE
    }
}