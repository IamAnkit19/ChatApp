const mongoose = require('mongoose');
require('dotenv').config();

function db(){
    // mongodb://127.0.0.1:27017/chatApp
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("DB Connected...");
    }).catch((error)=>{
        console.log(error);
    });
}

module.exports = db;