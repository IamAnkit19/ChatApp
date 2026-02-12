import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const SignUp = () => {
  let [userData, setUserData] = useState({
    userName:"",
    email:"",
    passWord:""
  });
  const navigate = useNavigate();
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setUserData({...userData, [name]:value});
  }
  const submit = async ()=>{
    try{
      let res = await axios.post('http://localhost:4000/api/signup',userData);
      if(res.status == 200){
        setUserData({
          userName:"",
          email:"",
          passWord:""
        });
        console.log(res.data);
        alert("Account created");
        navigate('/');
      }
    }
    catch(error){
      alert("Some error occured")
      console.log(error);
    }
  }
  return (
    <div className='w-full h-full bg-cyan-50 flex justify-center gap-[20px] items-center'>
      <div className='w-[35%] h-[65%] bg-blue-100 border rounded-[20px] flex flex-col justify-center items-center shadow-xl'>
        <h1 className='font-bold text-5xl'>Instant Chat</h1>
        <h3>Enjoy Realtime Chat Freely</h3>
      </div>
      <div className='w-[35%] h-[65%] bg-white border rounded-[20px] flex flex-col justify-center items-center gap-[30px] shadow-xl'>
        <h1 className='font-bold text-3xl text-blue-700'>SignUp</h1>
        <input type="text" placeholder='Enter your username' className='border-[2px] border-black rounded-[8px] w-[70%] h-[50px] outline-blue-800 pl-[5px] text-[17px] font-xl' name='userName' value={userData.userName} onChange={(e)=>handleChange(e)}/>
        <input type="email" placeholder='Enter your email' name='email' value={userData.email} className='border-[2px] border-black rounded-[8px] w-[70%] h-[50px] outline-blue-800 pl-[5px] text-[17px] font-xl' onChange={(e)=>handleChange(e)}/>
        <input type="password" placeholder='Enter your password' name='passWord' value={userData.passWord} className='border-[2px] border-black rounded-[8px] w-[70%] h-[50px] outline-blue-800 pl-[5px] text-[17px] font-xl' onChange={(e)=>handleChange(e)}/>
        <button className='w-[100px] h-[40px] bg-blue-600 text-white text-[19px] border border-blue-800 rounded-[8px] ' onClick={submit}>SignUp</button>
        <p>Already Have An Account? <b className='text-blue-600'><Link to={'/'}>Login</Link></b></p>
      </div>
    </div>
  )
}

export default SignUp