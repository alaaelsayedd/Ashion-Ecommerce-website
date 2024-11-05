import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { wishlistReducer } from "./wishlistSlice";

export let store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    
  },
});
