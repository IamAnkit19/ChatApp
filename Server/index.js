const express = require('express');
const db = require('./config/db');
const router = require('./controllers/authController');
const userData = require('./routers/userData')
let app = express();
const cors = require('cors');

db();

app.use(cors());
app.use(express.json())
app.use('/api',router);
app.use('/userdata', userData);
// console.log(router);

app.listen(4000, ()=>{
    console.log("Server running on port no 4000");
})