import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide Name"],
        minLength:[2,"Name must be greater than 2 characters"],
        maxLength:[20,"Name must be smaller than 20 characters"],
    },
    email:{
        type:String,
        required:[true,"Please provide Email"],
        validate:[validator.isEmail,"Provide a valid Email"]
    },
    phone:{
        type:Number,
        required:[true,"Please provide phone number"]
    },
    password:{
        type:String,
        required:[true,"Please provide password"],
        minLength:[8,"Password must be greater than 8 characters"],
        maxLength:[32,"Password must be smaller than 32 characters"],
        select:false
    },
    role:{
        type:String,
        required:[true,"Please provide your role"],
        enum: ["Student","Company","Tnp"]
    },
    institute:{
        type:String,
        required:[true,"Please provide your institute Enter N/A in case of role is Company"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

export const User = mongoose.model("User",userSchema)