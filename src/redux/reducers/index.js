import { combineReducers } from "redux";
import cartItemsReducers from "./cartItemsReducers";
import favoriteReducers from "./favoriteReducers";
import homeReducers from "./homeReducers";
import loginReducers from "./loginReducers";
import orderReducers from "./orderReducers";
import registerReducers from "./registerReducers";
import userReducers from "./userReducers";

const rootReducers = combineReducers({
    login: loginReducers,
    register: registerReducers,
    user: userReducers,
    cart: cartItemsReducers,
    home: homeReducers,
    favorite: favoriteReducers,
    order: orderReducers,
})

export default rootReducers