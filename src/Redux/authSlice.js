import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLogggedin: !!localStorage.getItem("token"),
    },
    reducers:{
        setLoginState:(state,action)=>{
            state.isLogggedin=action.payload

        }
    }
})
export let authReducer = authSlice.reducer;
export let {setLoginState} =authSlice.actions