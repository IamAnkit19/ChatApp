const express = require('express');
const db = require('./config/db');
let app = express();

app.get('/', (req, res)=>{
    res.send("Hello");
})

app.listen(4000, ()=>{
    console.log("Server running on port no 4000");
})