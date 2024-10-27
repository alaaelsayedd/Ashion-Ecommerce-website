import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export let getUserWishListProduct = createAsyncThunk(
  "wishlist/getUserWishListProduct",
  async () => {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  }
);
let wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistproduct: [],
    wishlistCount :0
  },
  extraReducers: (builder) => {
    builder.addCase(getUserWishListProduct.fulfilled, (state, action) => {
      state.wishlistproduct = action.payload.data;
      state.wishlistCount = action.payload.count;
    
    });
  },
  reducers: {
    setWishlistCount: (state, action) => {
      state.wishlistCount = action.payload;
    },
    setWishlistProducts: (state, action) => {
      state.wishlistproduct = action.payload;
    },
   
  },
});
export let wishlistReducer = wishlistSlice.reducer;
export let { setWishlistCount,setWishlistProducts } = wishlistSlice.actions;
