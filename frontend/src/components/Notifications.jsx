import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
const Notifications = () => {
  return (
    <div className="flex flex-col items-center py-6 px-10 w-[500px] max-h-[700px] overflow-hidden bg-white outline-none rounded-md shadow-custom">
        <h2 className='text-center text-xl font-semibold'>Notifications</h2>

        <div className='flex flex-col gap-3 mt-2 overflow-y-scroll w-full'>
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
                 <div className='flex items-center gap-1' >
                    <div className='p-[6px] text-[#ff4d6d] rounded-full cursor-pointer my-auto'>
                      <RxCross2 size={20}/>
                    </div>
                    <div className='p-[6px] rounded-full text-[#4ad66d] cursor-pointer my-auto'>
                      <IoMdCheckmark size={22}/>
                    </div>
                 </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Notifications