import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='w-full h-full bg-blue-800 flex justify-center items-center'>
        <div className='w-[25%] h-[60%] bg-white border rounded-[20px] flex flex-col justify-around items-center'>
            <h1 className='font-bold text-2xl text-blue-600'>Login</h1>
            <input type="email" placeholder='Enter your email' className='border-[2px] border-black rounded-[8px] w-[80%] h-[50px] outline-blue-800 pl-[5px] text-[17px] font-xl'/>
            <input type="password" placeholder='Enter your password' className='border-[2px] border-black rounded-[8px] w-[80%] h-[50px] outline-blue-800 pl-[5px] text-[17px] font-xl'/>
            <button className='w-[100px] h-[40px] bg-blue-600 text-white text-[19px] border border-blue-800 rounded-[8px] '>Login</button>
            <p>Don't Have An Account? <b className='text-blue-600'><Link to={'/signup'}>SignUp</Link></b></p>
        </div>
    </div>
  )
}

export default Login