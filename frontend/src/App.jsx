import React ,{ lazy } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import { getSocket, SocketProvider } from './sockets'

const Messages = lazy(() => import("./components/Messages"))
const ChatInfo  = lazy(() => import("./components/ChatInfo"))
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chats = lazy(() => import("./pages/Chats"));
const UserProfile = lazy(() => import("./components/UserProfile"))
// import Home from "./pages/Home" 
const App = () => {
   const socket = getSocket();
   console.log(socket)
  return (
     <BrowserRouter>
        <div className='flex font-sans max-h-screen overflow-hidden'>
            <Routes>
               <Route element={(
               <SocketProvider>
                  <Home />
               </SocketProvider>
               )}>
                  <Route path="/chat/:id" element={<Messages/>}/>
                  <Route path="/" element={<h1>Please select chat to message</h1>}/>
                  <Route path="chat-info/:id" element={<ChatInfo/>}/>
               </Route>
               <Route path="/login" element={<Login/>}/>
               <Route path="*" element={<h1>Page not found</h1>}/>
            </Routes>
        </div>
        <Toaster/>
     </BrowserRouter>
  )
}

export default App