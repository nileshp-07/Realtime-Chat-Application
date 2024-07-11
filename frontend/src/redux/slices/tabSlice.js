import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFileMenuOpen : false
}


const tabSlice = createSlice({
    name : "tab",
    initialState,
    reducers : {
        setIsFileMenuOpen : (state,action) => {
            state.isFileMenuOpen = action.payload
        }
    }
})


export default tabSlice;
export const {setIsFileMenuOpen} = tabSlice.actions