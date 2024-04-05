import express from "express"
import { companyPostedAll, companyPostedInst, deleteJob, getInstJobs, getOnejob, postJob, updateJob } from "../controller/jobController.js"
import { isAuthorized } from "../middlewares/auth.js"

const router = express.Router()

router.get("/instjob",isAuthorized,getInstJobs).post("/postjob",isAuthorized,postJob)
router.get("/instjob/:id",isAuthorized,getOnejob)
router.put("/update/:id",isAuthorized,updateJob)
router.delete("/delete/:id",isAuthorized,deleteJob)
router.get("/companyseeall",isAuthorized,companyPostedAll)
router.get("/companyseeinst",isAuthorized,companyPostedInst)

export default router;