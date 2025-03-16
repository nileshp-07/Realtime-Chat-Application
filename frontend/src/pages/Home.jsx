import React, { useCallback, useEffect, useState } from 'react'
import Chats  from "../pages/Chats"
import Sidebar from '../components/Sidebar' 
import Messages from '../components/Messages'
import { Outlet, useParams } from 'react-router-dom'
import {server_url} from "../constants/envConfig"
import { getSocket } from '../sockets'
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS } from '../constants/events'
import { useSocketEvents } from '../hooks/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { setNewMessageAlert, setNotificationsCount } from '../redux/slices/chatSlice'
import { getOrSaveFromStorage } from '../lib/features'

const Home = () => {
  const {notificationsCount} = useSelector((state) => state.chat);
  const {newMessageAlert} = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const {id : chatId} = useParams()
  const dispatch  = useDispatch()
  const socket = getSocket();


  useEffect(() => {
      getOrSaveFromStorage({key : "newMessageAlert", value: newMessageAlert})
  }, [newMessageAlert])

  const newMessageAlertHandler = useCallback((data) => {
       if(data.chatId === chatId) return;
       dispatch(setNewMessageAlert(data));
  },[chatId])

  const newRequestHandler = useCallback(() => {
      dispatch(setNotificationsCount(notificationsCount + 1))
  })

  const onlineUsersListener = useCallback((data) => {
     setOnlineUsers(data);
  }, [])

  const eventHandlers = {
    [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
    [NEW_REQUEST]: newRequestHandler,
    [ONLINE_USERS] : onlineUsersListener
  };

  useSocketEvents(socket, eventHandlers);


  return (
    <div className='flex w-full'>
        <Sidebar/>
        <Chats onlineUsers={onlineUsers}/>

        <Outlet/>
    </div>
  )
}

export default Home