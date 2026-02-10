const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type:String
    },
    email:{
        type:String
    },
    passWord:{
        type:String
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;