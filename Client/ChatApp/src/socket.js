import {io} from 'socket.io-client';

export const createSocket = () =>{
    return io("http://localhost:4000", {
        auth:{
            token: localStorage.getItem("Token")
        }
    })
}