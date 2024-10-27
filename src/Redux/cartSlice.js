import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export let getUserCartProduct = createAsyncThunk(
  "cart/getUserCartProduct",
  async () => {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  }
);
let cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
    totalCartPrice: 0,
    cartCount: 0,
  },
  extraReducers: (builder) => {
    builder.addCase(getUserCartProduct.fulfilled, (state, action) => {
      state.cartProducts = action.payload.data.products;
      state.totalCartPrice = action.payload.data.totalCartPrice;
      state.cartCount = action.payload.numOfCartItems;
    });
  },
  reducers: {
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    setCartProducts: (state, action) => {
      state.cartProducts = action.payload;
    },
    settotalCartPrice: (state, action) => {
      state.totalCartPrice = action.payload;
    },
  },
});
export let cartReducer = cartSlice.reducer;
export let { setCartCount,setCartProducts,settotalCartPrice } = cartSlice.actions;
