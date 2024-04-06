import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,"A Job Title is Required"],
        minLength:[3,"Title length must be greater than 3 characters"],
        maxLength:[30,"Title length must be smaller than 30 characters"]
    },
    description:{
        type:String,
        required:[true,"A Job Description is Required"],
        minLength:[3,"Description length must be greater than 3 characters"],
        maxLength:[100,"Description length must be smaller than 100 characters"]
    },
    category:{
        type:String,
        required:[true,"A Job Category is Required"],
    },
    country:{
        type:String,
        required:[true,"Country is Required"],
    },
    city:{
        type:String,
        required:[true,"City is Required"],
    },
    location:{
        type:String,
        required:[true,"Location in City is Required"],
        minLength:[5,"Location must be greater than 5 characters"],
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"fixedSalary Field should have at least 4 digits"],
        maxLength:[9,"fixedSalary Field should have at most 9 digits"]
    },
    salaryFrom:{
        type:Number,
        minLength:[4,"salaryFrom Field should have at least 4 digits"],
        maxLength:[9,"salaryFrom Field should have at most 9 digits"]
    },
    salaryTo:{
        type:Number,
        minLength:[4,"salaryTo Field should have at least 4 digits"],
        maxLength:[9,"salaryTo Field should have at most 9 digits"]
    },
    expired:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now,
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    institute:{
        type:String,
        required:true
    }
})

export const Job = mongoose.model("Job",jobSchema)