import React from 'react'
import { IoMdAdd } from "react-icons/io";

const AddGroup = () => {
  return (
    <div className="flex flex-col items-center py-6 px-10 w-[500px] max-h-[700px] overflow-hidden bg-white outline-none rounded-md shadow-custom">
        <h2 className='text-center text-xl font-semibold'>Create a Groups</h2>

        <div className='w-full mt-8'>
          <p>Members (add min 3 members)</p>

          <div className='flex flex-col gap-3 mt-2 overflow-y-scroll w-full h-full'>
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
                   <div className='p-[6px] rounded-full bg-[#fd4f50] cursor-pointer my-auto'>
                      <IoMdAdd size={24} fill='white'/>
                   </div>
                </div>
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default AddGroup