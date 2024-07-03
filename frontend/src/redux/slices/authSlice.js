import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    isLoading : true
}


const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        setUser : (state, action) => {
            state.user = action.payload
            state.isLoading = false
        }
    }
})


export default authSlice
export const {setUser} = authSlice.actions