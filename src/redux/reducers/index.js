import { combineReducers } from "redux";
import cartItemsReducers from "./cartItemsReducers";
import favoriteReducers from "./favoriteReducers";
import homeReducers from "./homeReducers";
import loginReducers from "./loginReducers";
import userReducers from "./userReducers";

const rootReducers = combineReducers({
    login: loginReducers,
    user: userReducers,
    cart: cartItemsReducers,
    home: homeReducers,
    favorite: favoriteReducers,
})

export default rootReducers