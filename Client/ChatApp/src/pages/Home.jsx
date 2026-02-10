import React from 'react'

const Home = () => {
  return (
    <div className='w-full h-full flex'>
        <div className='w-[30%] h-full border-r box-border'>
            <div className='w-full h-[10%] flex justify-around items-center bg-blue-700'>
                <h1 className='text-xl text-white'>Ankit</h1>
                <button className=' font-bold w-[100px] h-[40px] bg-white rounded-[10px]'>Logout</button>
            </div>
        </div>
        <div className='w-[70%] h-full'>
            <div className='w-full h-[10%] pl-[20px] flex items-center bg-blue-700'>
                <h1 className='text-xl text-white'>Select A User</h1>
            </div>
        </div>
    </div>
  )
}

export default Home