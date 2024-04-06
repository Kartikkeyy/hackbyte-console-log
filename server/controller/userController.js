import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../util/sendToken.js";

export const register = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,phone,password,role,institute} = req.body;
    if(!name || !email || !phone || !password || !role ){
        return next(new ErrorHandler("Please fill all the fields required for registration",400))
    }
    if(role == "Company" && req.body.institute){
        return next(new ErrorHandler("You can not enter institute for this role",400))
    }
    if(!institute && !(role == "Company")){
        return next(new ErrorHandler("Please enter institute field",400))
    }

    let user = await User.findOne({email:email})
    if(user){
        return next(new ErrorHandler("User already exits with this email",400))
    }

    user = await User.create({
        name,
        email,
        phone,
        password,
        role,
        institute
    })

    sendToken(user,200,res,"Registration Successfull")
})

export const login = catchAsyncErrors(async(req,res,next)=>{
    const {email,password,role} = req.body;
    if(!role || !email || !password){
        return next(new ErrorHandler("Please provide full credentials to login",400))
    }

    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid Credentials for login request",400))
    }

    const isCorrectPassword = await user.comparePassword(password)
    if(!isCorrectPassword){
        return next(new ErrorHandler("Invalid Credentials for login request",400))
    }

    if(user.role != role){
        return next(new ErrorHandler(`You are not registered with the role ${role}`,400))
    }
    sendToken(user,200,res,"Login Successfully")
})

export const logout = catchAsyncErrors(async(req,res,next)=>{
    res.status(201).cookie("token","",{
        httpOnly:true,
        expires: new Date(Date.now())
    }).json({
        success:true,
        messsage:"User Logged Out Successfully"
    })
})

export const getUser = catchAsyncErrors((req,res,next)=>{
    const user = req.user
    res.status(200).json({
        success:true,
        user
    })
})