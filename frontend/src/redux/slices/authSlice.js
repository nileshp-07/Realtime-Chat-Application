import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null || JSON.parse(localStorage.getItem("user")),
    token : null || localStorage.getItem("token"),
    isLoading : true
}


const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        setUser : (state, action) => {
            state.user = action.payload
            state.isLoading = false
        },
        setToken : (state, action)  => {
            state.token = action.payload
            state.isLoading = false
        }
    }
})


export default authSlice
export const {setUser, setToken} = authSlice.actions