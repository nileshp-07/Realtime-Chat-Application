import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice";
import tabSlice from "./slices/tabSlice";
import chatSlice from "./slices/chatSlice";


const store = configureStore({
    reducer : {
        [authSlice.name] : authSlice.reducer,  //directly can do auth = authslice.reducer but if we have changed the slice name we have to change it from here also
        [tabSlice.name] : tabSlice.reducer,
        [chatSlice.name] : chatSlice.reducer,
    }
})

export default store;