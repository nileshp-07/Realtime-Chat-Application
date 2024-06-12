import React ,{ lazy } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Sidebar from './components/Sidebar';
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
               <Route path="/" element={<Home/>}/>
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