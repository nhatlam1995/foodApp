import { ADD_TO_CART, REMOVE_ALL_FROM_CART, REMOVE_FROM_CART, REMOVE_ITEM_FROM_CART } from "./actionTypes"

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