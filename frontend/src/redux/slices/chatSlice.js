import { createSlice } from "@reduxjs/toolkit"
import { getOrSaveFromStorage } from "../../lib/features";


const initialState = {
    notificationsCount :  0,
    newMessageAlert : getOrSaveFromStorage({
        key : "newMessageAlert",
        get : true
    }) || [{
        chatId: "",
        count : 0
    }],
    isNewGroup : true
}

const chatSlice = createSlice({
    name : "chat",
    initialState , 
    reducers : {
        setNotificationsCount : (state , action ) => {
            state.notificationsCount = action.payload
        },

        setNewMessageAlert : (state, action) => {
            const chatId = action.payload.chatId;

            const index = state.newMessageAlert.findIndex(item => item.chatId === chatId);

            if(index == -1)
            {
                state.newMessageAlert.push({
                    chatId,
                    count : 1
                })
            } 
            else{
                state.newMessageAlert[index].count++;
            }
        },
        removeNewMessagesAlert: (state, action) => {
            state.newMessageAlert = state.newMessageAlert.filter(
              (item) => item.chatId !== action.payload
            );
        },
        setIsNewGroup : (state, action) => {
            state.isNewGroup = action.payload;
        }
    }
})


export default chatSlice;
export const {setNotificationsCount, setNewMessageAlert,removeNewMessagesAlert, setIsNewGroup} = chatSlice.actions