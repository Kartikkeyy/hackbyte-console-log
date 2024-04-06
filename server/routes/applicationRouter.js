import express from "express"
import { applicationUpdate, companyGetAllApplication, myApplications, postApplication, tnpGetAllApplication } from "../controller/applicationController.js"
import { isAuthorized } from "../middlewares/auth.js"

const router = express.Router()

router.post("/post/:jobId",isAuthorized,postApplication)
router.put("/update/:id",isAuthorized,applicationUpdate)
router.get("/my",isAuthorized,myApplications)
router.get("/company/jobapp/:jobId",isAuthorized,companyGetAllApplication)
router.get("/tnp/allapp",isAuthorized,tnpGetAllApplication)
export default router