import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    notificationsCount :  1,
    newMessageAlert :[{
        chatId: "",
        count : 0
    }]
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
        }
    }
})


export default chatSlice;
export const {setNotificationsCount, setNewMessageAlert} = chatSlice.actions