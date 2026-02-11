import axios from 'axios';
import React, { useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import { createSocket } from '../socket';

const API_BASE_URL = "http://localhost:4000";

const Home = () => {
    const [userData, setUserData] = useState({});
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [socket, setSocket] = useState(null);
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // const token = localStorage.getItem("Token");
    // if(!token){
    //   return (
    //     <div className='w-full h-full flex justify-center items-center'>
    //       <h1>Unauthorized User</h1>
    //     </div>
    //   )
    // }
    useEffect(()=>{
        const fun1 = async ()=>{
            try{
                let token = localStorage.getItem("Token");
                if(!token){
                    alert("Please Login First");
                    navigate('/')
                }
                const res = await axios.get(`${API_BASE_URL}/userdata/me`, {headers:{"Authorization":token}});
                if(res.status == 200){
                    setUserData(res.data);
                }
            }
            catch(error){
                console.log(error);
            }
        }
        fun1();

        const fun2 = async ()=>{
            try{
                let token = localStorage.getItem("Token");
                if(!token){
                    alert("Please Login First");
                    navigate('/')
                }
                const res = await axios.get(`${API_BASE_URL}/userdata/getUsers`, {headers:{"Authorization":token}});
                if(res.status == 200){
                    setUsers(res.data);
                }
            }
            catch(error){
                console.log(error);
            }
        }
        fun2();
    },[])
    useEffect(()=>{
        const s = createSocket();
        setSocket(s);

        s.on("receive_private_message", (data)=>{
            setChat((prev)=>[...prev, data]);
        })
        return s.disconnect();
    },[])
    const setUser = (id)=>{
        setSelectedUser(users.find((a,b)=>{
            return id == b;
        }));
    }
    const logOut = () => {
        localStorage.removeItem("Token");
        navigate('/');
    }
    const send = ()=>{
        if(!message || !selectedUser){
            return;
        }
        socket.emit("private_message", {
            to: selectedUser,
            message
        })
        setChat((prev)=>[...prev, {from: me, message}])
        setMessage("");
    }
    return (
    <div className='w-full h-full flex'>
        <div className='w-[30%] h-full border-r box-border'>
            <div className='w-full h-[10%] flex justify-around items-center bg-blue-700'>
                <h1 className='text-xl text-white font-bold'>{userData.userName}</h1>
                <button className=' font-bold w-[100px] h-[40px] bg-white rounded-[10px]' onClick={logOut}>Logout</button>
            </div>
            <div className='w-full h-[90%] flex flex-col items-center'>
                {
                    users.map((a,b)=>{
                        return (
                            <div className='w-full h-[50px] border flex items-center pl-5 font-bold text-xl cursor-pointer' onClick={()=>setUser(b)}>
                                <h2>{a.userName}</h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <div className='w-[70%] h-full'>
            <div className='w-full h-[10%] pl-[20px] flex items-center bg-blue-700'>
                <h1 className='text-xl text-white'>{selectedUser ? selectedUser.userName : "Select A User"}</h1>
            </div>
            <div className='w-full h-[80%]'>
                {
                    chat.map((a, b)=>{
                        return (
                            <>
                            </>
                        )
                    })
                }
            </div>
            {
                selectedUser ? 
                <div className='w-full h-[10%] flex justify-between items-center border'>
                    <input type="text" placeholder='Enter your message' className='w-[80%] h-[80%] border box-border rounded-[8px] pl-4 outline-blue-600' name='message' value={message} onChange={(e)=>setMessage(e.target.value)}/>
                    <button className='w-[100px] h-[80%] border rounded-[8px] bg-blue-600 text-white font-semibold text-xl' onClick={send}>Send</button>
                </div>
                :
                null
            }
        </div>
    </div>
  )
}

export default Home