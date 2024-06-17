import React, { useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import Modal from '@mui/material/Modal';
import AddMembers from './AddMembers';


const ChatInfo = () => {
    const [isGroup, setIsGroup] = useState(true);
    const [open, setOpen] = React.useState(false);
  return (
    <div className='mx-5 my-5 w-full overflow-auto'>
        <div>
            <IoArrowBack size={24}/>
        </div>

        <div className='mt-10 flex flex-col items-center w-full'>
            <div className='h-[200px] w-[200px] bg-black rounded-full'>

            </div>

            <div className='mt-5 flex flex-col items-center'>
                <p className='text-lg font-medium'>Nilesh Patidar</p>
                <p>nileshp07</p>
            </div>
        </div>

        <div className='w-[80%] mt-20 mx-auto'>
        {
            !isGroup && (
                <div>
                    <div className='flex items-center gap-5'>
                        <p className='font-medium'>Email Add:</p>
                        <div className='bg-[#E5E8ED] py-2 px-4 rounded-[4px] outline-none w-fit'>patidarnilesh@gmail.com</div>
                    </div>
                    <div className='flex items-center gap-5 mt-5'>
                        <p className='font-medium'>About me:</p>
                        <div className='bg-[#E5E8ED] py-2 px-4 rounded-[4px] outline-none w-[70%]'>i am nilesh patidar and i am a passoninate mern stack developer pursing Btech computer science enginnerings</div>
                    </div>
                    <div className='mt-20 flex justify-end'>
                        <button className='py-2 px-5 bg-[#fd4f50] text-white rounded-md font-medium'>
                            Unfriend
                        </button>
                    </div>
                </div>
            )
        }
        {
            isGroup && (
                <div>
                   <div className='flex justify-between items-center'>
                    <p className='font-medium'>Group members</p>
                    <button 
                      onClick={() => setOpen(true)}
                      className='py-2 px-5 bg-[#fd4f50] text-white rounded-md '>
                            Add Members
                        </button>
                    </div>
                   <div className='flex flex-col gap-5 mt-5'>
                      {
                        Array.from({ length: 20 }).map((item,index) => (
                            <div className='flex justify-between border rounded-md py-[6px] px-3 '>
                                <div className='flex gap-3'>
                                    <div className='h-[44px] w-[44px] bg-black rounded-full'></div>
                                    <div>
                                        <h2 className='font-medium font-sans'>Nilesh Patidar</h2>
                                        <p className='text-sm -mt-1'>nileshp07</p>
                                    </div>
                                </div>  
                                <div>
                                    May 2024
                                </div>
                            </div>
                        ))
                      }
                   </div>
                   <div className='my-4 flex justify-end '>
                     <div className='mt-2 text-[#fd4f50] py-2 px-5 rounded-md border border-[#fd4f50]'>
                        Exit Group
                     </div>
                   </div>


                   
                </div>
            )
        }

        </div>
        <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 outline-none py-8 px-14 w-[600px] bg-white rounded-md shadow-custom">
           <p className='font-medium font-sans mb-5'>Add Members</p>
           <AddMembers/>
          <div className='mt-5 flex justify-end'>
            <button  className='py-2 px-5 bg-[#fd4f50] text-white rounded-md '>
                Add 
            </button>
          </div>
        </div>
      </Modal>

        
    </div>
  )
}

export default ChatInfo