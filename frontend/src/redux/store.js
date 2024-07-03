import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice";


const store = configureStore({
    reducer : {
        [authSlice.name] : authSlice.reducer  //directly can do auth = authslice.reducer but if we have changed the slice name we have to change it from here also
    }
})

export default store;