import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";

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

    const user = await User.create({
        name,
        email,
        phone,
        password,
        role,
        institute
    })

    res.status(200).json({
        success:true,
        user
    })
})