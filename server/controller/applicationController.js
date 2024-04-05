import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";

export const postApplication = catchAsyncErrors(async(req,res,next)=>{
    const {role} = req.user;
    if(!(role === "Student")){
        return next(new ErrorHandler("Invalid route for your Role",400))
    }

    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Please upload your resume"),400)
    }

    const {resume} = req.files;
    const uploadOnCloudinary = async (file) => {
        try {
          if (!file) {
            return { error: "File path not provided" };
          }
          if (!file.endsWith('.pdf')) {
            return { error: "Only PDF files are allowed" };
          }
      
          const response = await cloudinary.uploader.upload(file, {
            resource_type: "raw",
          });
      
          return response;
        } catch (err) {
          console.error(err);
          return { error: "Failed to upload to Cloudinary" };
        }
      };
    
    const cloudinaryResponse = uploadOnCloudinary(resume);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log("Cloudinary Error: ",cloudinaryResponse.error || "Unknow Error Occured at cloudinary upload")
        return next(new ErrorHandler("Server side upload failed for your Resume",500))
    }
    const {name,email,phone,address,jobId} = req.body;
    if(!jobId){
        return next(new ErrorHandler("Job not Found",404))
    }
    const applicantID = {
        user : req.user._id,
        role : "Student"
    }
    const jobDetails = await Job.findById(jobId)
    if(!jobDetails){
        return next(new ErrorHandler("Job not Found",404))
    }

    const employerID = {
        user: jobDetails.postedBy,
        role: "Company"
    }
    if(!name || !email || !phone || !address || !applicantID || !employerID || !resume){
        return next(new("Please provide all the details for the application",400))
    }
    
    const application = await Application.create({
        name,email,phone,address,resume:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        },applicantID,employerID
    })

    res.status(200).json({
        success:true,
        message:"Application submitted successfully",
        application
    })
    
})