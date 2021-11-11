import { combineReducers } from "redux";
import cartItemsReducer from "./cartItemsReducer";

const rootReducers = combineReducers({
    // login: loginReducer,

    // user: userReducer,
    cartItem: cartItemsReducer,

})

export default rootReducers
