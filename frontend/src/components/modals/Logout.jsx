import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrTabModal } from '../../redux/slices/tabSlice';
import { setToken, setUser } from '../../redux/slices/authSlice';
import { server_url } from '../../constants/envConfig';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const Logout = ({setOpen}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleClose = () => {
        dispatch(setCurrTabModal("Messages"))
        setOpen(false);
    }

    const logoutHandler = async () => {
        try{
            const {data} = await axios.get(`${server_url}/user/logout`,{
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            dispatch(setUser(null));
            dispatch(setToken(null))

            toast.success("logout");            
        }
        catch(err)
        {
            toast.error(err.response.data.message || "Something went wrong");
        }
        navigate("/login")

    }

  return (
    <div className="flex flex-col items-center font-sans py-6 px-10 w-[300px] max-h-[700px] overflow-hidden bg-white outline-none rounded-md shadow-custom">
        <h2 className='text-lg font-medium '>Do you want to logout?</h2>
        <div className='mt-8 flex justify-around w-full'>
            <button className='py-1 font-medium' 
                onClick={handleClose}>
                Cancel
            </button>

            <button 
            onClick={logoutHandler}
            className='py-1 px-3 bg-[#FD4F50] rounded-md text-white'>
                Logout
            </button>
        </div>
    </div>
  )
}

export default Logout