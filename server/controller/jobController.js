import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";


export const getInstJobs = catchAsyncErrors(async(req,res,next)=>{
    const {institute} = req.user
    if(req.user.role === "Company"){
        return next(new ErrorHandler("You are not authorized for this route"))
    }
    if(!institute){
        return next(new ErrorHandler("Please give institute"))
    }
    const jobs = await Job.find({expired:false,institute:institute})
    res.status(200).json({
        success:true,
        jobs
    })
})

export const postJob = catchAsyncErrors(async(req,res,next)=>{
    const {role} = req.user;
    if(!(role === "Company")){
        return next(new ErrorHandler("You are not authorized to post a job",400))
    }
    const {title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo,institute} = req.body;

    if(!title || !description || !category || !country || !city || !location || !institute){
        return next(new ErrorHandler("Please provide all the required information about the job",400))
    }
    if((!salaryFrom || !salaryTo) && !fixedSalary){
        return next(new ErrorHandler("Please provide one field of salary"))
    }
    if(salaryFrom && salaryTo && fixedSalary){
        return next(new ErrorHandler("Please provide only one field of salary"))
    }

    const postedBy = req.user._id;
    const job = await Job.create({title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo,postedBy,institute})

    res.status(200).json({
        success:true,
        message:"Job Posted Successfully",
        job
    })
})

export const getOnejob = catchAsyncErrors(async(req,res,next)=>{
    if(req.user.role === "Company"){
        return next(new ErrorHandler("You are not authorized for this route"))
    }
    const {id} = req.params
    if(!id){
        return next(new ErrorHandler("id not provided",400))
    }
    const job = await Job.find({_id:id})

    res.status(200).json({
        success:true,
        job
    })
})

export const updateJob = catchAsyncErrors(async(req,res,next)=>{
    const {role} = req.user;
    if(!(role === "Company")){
        return next(new ErrorHandler("Invalid route for your Role",400))
    }
    const {id} = req.params
    let job = await Job.findById(id)
    if(!job){
        return next(new ErrorHandler("Job not Found!",404))
    }

    job = await Job.findByIdAndUpdate(id,req.body,{
        new : true,
        runValidators: true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        job,
        message:"Job Updated Successfully"
    })
})

export const companyPostedAll = catchAsyncErrors(async(req,res,next)=>{
    const {role} = req.user
    if(!(role === "Company")){
        return next(new ErrorHandler("Invalid route for your Role",400))
    }
    const myjobs = await Job.find({postedBy: req.user._id})
    res.status(200).json({
        success:true,
        myjobs
    })
})

export const companyPostedInst = catchAsyncErrors(async(req,res,next)=>{
    const {institute} = req.body
    if(!institute){
        return next(new ErrorHandler("Please select an institute",400))
    }
    const myjobs = await Job.find({postedBy: req.user._id,institute:institute})
    res.status(200).json({
        success:true,
        myjobs
    })
})

export const deleteJob = catchAsyncErrors(async(req,res,next)=>{
    const {role} = req.user;
    if(!(role === "Company")){
        return next(new ErrorHandler("Invalid route for your Role",400))
    }
    const {id} = req.params
    let job = await Job.findById(id)
    if(!job){
        return next(new ErrorHandler("Job not Found!",404))
    }
    await job.deleteOne();
    res.status(200).json({
        success:true,
        message:"Job deleted Successfully"
    })
})
