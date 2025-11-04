import mongoose from "mongoose";
import dotenv from "dotenv";
import { type } from "os";
import { timeStamp } from "console";
dotenv.config();

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
},{timeStamp : true})

export const user = mongoose.model("users",userSchema);