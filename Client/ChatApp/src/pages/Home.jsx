import axios from 'axios';
import React, { useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import { createSocket } from '../socket';

const API_BASE_URL = "https://chatapp-sgv7.onrender.com";

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
        // return s.disconnect();
        return () => {
            s.disconnect();
        };
    },[])

    const setUser = async (user)=>{
        setSelectedUser(user);
        const token = localStorage.getItem("Token");
        try{
            // const res = await axios.get(`${API_BASE_URL}/chatdata/chat?from=${userData._id}&to=${selected._id}`, {headers:{"Authorization":token}});
            const res = await axios.get(`${API_BASE_URL}/chatdata/chat/${user._id}`,{headers:{"Authorization":token}});
            if(res.status == 200)
                setChat(res.data);
        }
        catch(error){
            console.log("Some Error Occured", error);
        }
    }

    const logOut = () => {
        localStorage.removeItem("Token");
        navigate('/');
    }

    const send = async ()=>{
        if(!message || !selectedUser){
            return;
        }
        try{
            socket.emit("private_message", {
                to: selectedUser._id,
                message
            })
            const token = localStorage.getItem("Token");
            const res = await axios.post(`${API_BASE_URL}/chatdata/savechat`, {from: userData._id, to: selectedUser._id, message}, {headers:{"Authorization":token}})
            if(res.status == 200){
                console.log(res.data);
            }
        }
        catch(error){
            console.log("Some Error Occured", error);
        }
        setChat((prev)=>[...prev, {from: userData._id, message}])
        setMessage("");
    }
    const handleSend = (e)=>{
        if(e.key == "Enter"){
            send();
        }
    }
    return (
    <div className='w-full h-full flex'>
        <div className='w-[30%] h-full border-r box-border'>
            <div className='w-full h-[10%] flex justify-around items-center bg-blue-500'>
                <h1 className='text-xl text-white font-bold'>{userData.userName}</h1>
                <button className=' font-bold w-[100px] h-[40px] bg-white rounded-[10px]' onClick={logOut}>Logout</button>
            </div>
            <div className='w-full h-[90%] flex flex-col items-center gap-[2px] bg-cyan-50'>
                {
                    users.map((a)=>{
                        return (
                            <div className='w-full h-[50px] border rounded-[8px] flex items-center pl-5 font-semibold text-xl cursor-pointer gap-[10px] bg-fuchsia-50' onClick={()=>setUser(a)}>
                                <div className='w-[35px] h-[35px] bg-gray-500 flex justify-center items-center rounded-[50%] text-white'>
                                    {a.userName.charAt(0).toUpperCase()}
                                </div>
                                <h2>{a.userName}</h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <div className='w-[70%] h-full'>
            <div className='w-full h-[10%] pl-[20px] flex items-center bg-blue-500 gap-[10px]'>
                {
                    selectedUser ? 
                    <div className='w-[35px] h-[35px] bg-gray-500 flex justify-center items-center rounded-[50%] text-white'>
                        {selectedUser.userName.charAt(0).toUpperCase()}
                    </div>
                    :
                    <></>
                }
                <h1 className='text-xl text-white'>{selectedUser ? selectedUser.userName : "Select A User"}</h1>
            </div>
            <div className='w-full h-[80%] flex flex-col gap-[2px] p-[10px] overflow-y-scroll bg-amber-50'>
                {
                    chat.map((a, b)=>{
                        return (
                            <div className={`w-max max-w-[50%] rounded-[8px] ${a.from === userData._id ? 'self-end bg-blue-400' : 'self-start bg-gray-400'}`}>
                                <p className={`text-white p-2 max-w-full text-wrap`}>{a.message}</p>
                            </div>
                        )
                    })
                }
            </div>
            {
                selectedUser ? 
                <div className='w-full h-[10%] flex justify-between items-center border bg-fuchsia-50'>
                    <input type="text" placeholder='Enter your message' className='w-[80%] h-[80%] border box-border rounded-[8px] px-4 outline-blue-600' name='message' value={message} onChange={(e)=>setMessage(e.target.value)} onKeyDown={handleSend}/>
                    <button className='w-[100px] h-[80%] border rounded-[8px] bg-blue-500 text-white font-medium text-xl' onClick={send}>Send</button>
                </div>
                :
                null
            }
        </div>
    </div>
  )
}

export default Home