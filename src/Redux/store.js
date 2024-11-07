import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { wishlistReducer } from "./wishlistSlice";
import { authReducer } from "./authSlice";

export let store = configureStore({
  reducer: {
    auth:authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    
  },
});
