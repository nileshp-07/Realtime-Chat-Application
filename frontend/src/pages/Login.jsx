import React, { useState } from 'react'
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import toast from "react-hot-toast"
import { useDispatch } from "react-redux";
import { server_url } from '../constants/envConfig';
import { setUser, setToken } from '../redux/slices/authSlice';
import {useNavigate}  from "react-router-dom"
import axios from "axios"
const Login = () => {
    const [isLogin , setisLogin ] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loginData, setLoginData] = useState({
                                        username : "",
                                        password : ""
                                      })

    const [signupData, setSignupData] = useState({
                                      name : "",
                                      username : "",
                                      password : "",
                                      confirmPassword : ""
                                    })
    

   

    const handleSignupDataChange = (e) => {
       const {name, value} = e.target;

       setSignupData(prev => (
         {
           ...prev,
           [name] : value
         }
       ))
    }

    const handleLoginDataChange = (e) => {
      const {name, value} = e.target;

      setLoginData(prev => (
        {
          ...prev,
          [name] : value
        }
      ))
    }


    const signupHandler = async (e) => {
      e.preventDefault();

      if(!signupData.name || !signupData.username || !signupData.password || !signupData.confirmPassword)
      {
          toast.error("All fields are required");
          return;
      }

      if(signupData.password !== signupData.confirmPassword)
      {
        toast.error("Password does not match!!");
        return;
      }

      const toastId = toast.loading("Creating Account....")
      setIsLoading(true);

      try{
        const {data} = await axios.post(`${server_url}/user/signup`, signupData);

        dispatch(setUser(data.user))
        dispatch(setToken(data.token))
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message);
      }
      catch(err)
      { 
        toast.error(err?.response?.data?.message || "Something went wrong");
      }

      toast.dismiss(toastId)
      setIsLoading(false);
      navigate("/");
   }


    const loginHandler = async (e) => {
        e.preventDefault();

        if(!loginData.username || !loginData.password)
        {
           toast.error("Username and password is required");
           return;
        }

        const toastId = toast.loading("Logging....")
        setIsLoading(true);
        
        try{
          const {data} = await axios.post(`${server_url}/user/login`, loginData);
  
          dispatch(setUser(data.user))
          dispatch(setToken(data.token))
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          toast.success(data.message);
        }
        catch(err)
        { 
          toast.error(err?.response?.data?.message || "Something went wrong");
        }
  
        toast.dismiss(toastId)
        setIsLoading(false);
        navigate("/");
    }
   
  return (
    <div className='h-screen w-full grid place-items-center'>

      <div className='py-6 px-10 w-[400px] shadow-custom rounded-md'>
         <h2 className='text-center font-semibold text-3xl text-[#fd4f50]' >{isLogin ? "Welcome Back" : "Create Your Account"}</h2>
         <p className='text-lg font-medium mt-2 mb-5 italic'>{isLogin ? "please enter your details" : "Join Us and Start Chatting!"}</p>

         <form onSubmit={isLogin ? loginHandler : signupHandler}>
            {
               !isLogin && (
                <div className='flex flex-col'>
                  <label htmlFor="name">Name<span className='text-[#FF0000]'>*</span></label>
                  <input
                    required
                    type='text'
                    name='name'
                    onChange={handleSignupDataChange}
                    placeholder='Enter your name'
                    value={signupData?.name}
                    className='py-2 px-4 bg-[#E5E8ED] rounded-[4px] outline-none placeholder:font-light'
                  />
                </div>
               )
            }

            <div className='flex flex-col mt-4'>
              <label htmlFor="username">username<span className='text-[#FF0000]'>*</span></label>
              <input
                required
                type='text'
                name='username'
                onChange={isLogin ? handleLoginDataChange : handleSignupDataChange}
                placeholder='Enter your username'
                value={signupData?.username || loginData?.username}
                className='py-2 px-4 bg-[#E5E8ED] rounded-[4px] outline-none placeholder:font-light'
              />
            </div>

            <div className='flex flex-col mt-4 '>
              <label htmlFor="name">Password<span className='text-[#FF0000]'>*</span></label>
              <div className='relative w-full'>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name='password'
                  onChange={isLogin ? handleLoginDataChange : handleSignupDataChange}
                  placeholder='Create a password'
                  value={signupData?.password || loginData?.password}
                  className='w-full py-2 px-4 bg-[#E5E8ED] rounded-[4px] outline-none placeholder:font-light'
                />
                <div onClick={() => setShowPassword(!showPassword)}
                     className='absolute top-[10px] right-[10px] cursor-pointer'>
                {
                  showPassword ?  <BsEyeSlash size={20}/> : <BsEye size={20}/>
                }
                </div>
              </div>
            </div>

            {
               !isLogin && (
                <div className='flex flex-col mt-4'>
                  <label htmlFor="name">Confirm Password<span className='text-[#FF0000]'>*</span></label>
                  <div className='relative w-full'>
                    <input
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      name='confirmPassword'
                      onChange={handleSignupDataChange}
                      placeholder='Confirm your password'
                      value={signupData?.confirmPassword}
                      className='w-full py-2 px-4 bg-[#E5E8ED] rounded-[4px] outline-none placeholder:font-light'
                    />
                    <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className='absolute top-[10px] right-[10px] cursor-pointer'>
                      {
                        showConfirmPassword ?  <BsEyeSlash size={20}/> : <BsEye size={20}/>
                      }
                    </div>
                  </div>
                </div>
               )
            }

            <button onClick={isLogin ? loginHandler : signupHandler}
                  className='text-white py-2 px-5 w-full rounded-md bg-[#fd4f50] mt-10 font-medium'>
              {
                 isLogin ? "Login" : "Create Account"
              }
            </button>
            <p className='flex justify-center gap-1'>or <span className='cursor-pointer text-[#fd4f50]' onClick={() => setisLogin(!isLogin)}>{isLogin ? " Register" : "Login"}</span>instead</p>
         </form>
      </div>
    </div>
  )
}

export default Login