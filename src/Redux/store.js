import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";

export let store = configureStore({
    reducer:{
        cart:cartReducer
    }
})