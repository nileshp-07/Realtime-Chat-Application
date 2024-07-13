import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFileMenuOpen : false,
    currTabModal : "Messages"
}


const tabSlice = createSlice({
    name : "tab",
    initialState,
    reducers : {
        setIsFileMenuOpen : (state,action) => {
            state.isFileMenuOpen = action.payload
        },
        setCurrTabModal : (state, action) => {
            state.currTabModal = action.payload
        }
    }
})


export default tabSlice;
export const {setIsFileMenuOpen, setCurrTabModal} = tabSlice.actions