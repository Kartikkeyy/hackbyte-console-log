import mongoose from "mongoose"

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"RecruitIn"
    }).then(()=>{
        console.log("Connected to database Successfully")
    }).catch((err)=>{
        console.log(`Error while connecting to database :${err}`)
    })
}