import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/actionTypes";

const initalState = []

const cartItemsReducer = (state = initalState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            if (state.some(item => item.id === action.payload.id)) {
                return state.map(item => (item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item))
            }
            return [...state, { ...action.payload, quantity: 1 }];
        case REMOVE_FROM_CART:
            return state
                .map(item => (item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item))
                .filter(item => item.quantity > 0);
    }
    return state
}

export default cartItemsReducer