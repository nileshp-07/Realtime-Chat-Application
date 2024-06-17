import React from 'react'

const UserProfile = () => {
  return (
    <div className="flex flex-col items-center  py-8 px-14 w-[700px] bg-white outline-none rounded-md shadow-custom">
        <div className='h-[200px] w-[200px] rounded-full bg-black'>

        </div>

        <div className='w-full mt-8'>
          <form>
            <div className='flex flex-col'>
                 <label>Name:</label>
                 <input
                    type='text'
                    name='name'
                    value = "Nilesh patidar"
                    className='py-2 px-4 bg-[#E5E8ED] rounded-[4px] outline-none placeholder:font-light w-full'
                 />
             </div>
             <div className='flex flex-col mt-5'>
                 <label>Username:</label>
                 <input
                    disabled
                    type='text'
                    name='username'
                    value = "nileshp07"
                    className='py-2 px-4 bg-[#E5E8ED] rounded-[4px] outline-none placeholder:font-light w-full'
                 />
             </div>

             <div className='flex flex-col mt-5'>
                 <label>Email Address:</label>
                 <input
                    type='email'
                    name='email'
                    value = "patidarnilesh8120@gmail.com"
                    className='py-2 px-4 bg-[#E5E8ED] rounded-[4px] outline-none placeholder:font-light w-full'
                 />
             </div>
             <div className='flex flex-col mt-5'>
                 <label>About me:</label>
                 <textarea
                    cols="10"
                    className='py-2 px-4 h-[70px] bg-[#E5E8ED] rounded-[4px] outline-none placeholder:font-light w-full'
                 >
                    my name is nilesh patidar and i am Full Stack Developer
                    my name is nilesh patidar and i am Full Stack Developer
                    my name is nilesh patidar and i am Full Stack Developer
                    my name is nilesh patidar and i am Full Stack Developer
                 </textarea>
             </div>
 
             <div className='mt-5 flex gap-10'>
                <div className='flex flex-col'>
                    <label>Gender:</label>
                    <input
                        type='text'
                        name='gender'
                        value = "Male"
                        className='py-2  px-4 bg-[#E5E8ED] rounded-[4px] outline-none placeholder:font-light'
                    />
                </div>
                <div className='flex flex-col'>
                    <label>Date of Birth:</label>
                    <input
                        type='text'
                        name='DOB'
                        value = "16/08/2003"
                        className='py-2 px-4 bg-[#E5E8ED] rounded-[4px] outline-none placeholder:font-light w-full'
                    />
                </div>
             </div>

             <button className='py-2 px-5 text-white bg-[#fd4f50]  rounded-md mt-8 '>
                Save Changes
             </button>

          </form>
        </div>
    </div>
  )
}

export default UserProfile