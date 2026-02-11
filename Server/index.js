const express = require('express');
const db = require('./config/db');
const router = require('./controllers/authController');
const userData = require('./routers/userData')
let app = express();
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');

const initSocket = require('./sockets/socket');

db();

app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json())
app.use('/api',router);
app.use('/userdata', userData);
// console.log(router);

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"http://localhost:5173"
    }
})

initSocket(io);

server.listen(4000, ()=>{
    console.log("Server running on port no 4000");
})