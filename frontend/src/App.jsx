import React ,{ lazy } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"

const Messages = lazy(() => import("./components/Messages"))
const ChatInfo  = lazy(() => import("./components/ChatInfo"))
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chats = lazy(() => import("./pages/Chats"));
const UserProfile = lazy(() => import("./components/UserProfile"))
// import Home from "./pages/Home" 
const App = () => {
    // skeleton 
    // zod
    // dark mode
  return (
     <BrowserRouter>
        <div className='flex font-sans max-h-screen overflow-hidden'>
            <Routes>
               <Route element={<Home/>}>
                  <Route path="/chat/:id" element={<Messages/>}/>
                  <Route path="/" element={<h1>Please select chat to message</h1>}/>
                  <Route path="chat-info/:id" element={<ChatInfo/>}/>
               </Route>
               <Route path="/login" element={<Login/>}/>
               <Route path="/chat/:id" element={<Chats/>}/>
               <Route path="/user-profile" element={<UserProfile/>}/>

               <Route path="*" element={<h1>Page not found</h1>}/>
            </Routes>
        </div>
     </BrowserRouter>
  )
}

export default App