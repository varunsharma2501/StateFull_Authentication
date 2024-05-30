const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/authentication");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
},
{timestamps:true})

const User=mongoose.model('user',userSchema);
module.exports=User;