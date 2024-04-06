import express from "express"
import { applicationUpdate, myApplications, postApplication } from "../controller/applicationController.js"
import { isAuthorized } from "../middlewares/auth.js"

const router = express.Router()

router.post("/post/:jobId",isAuthorized,postApplication)
router.put("/update/:id",isAuthorized,applicationUpdate)
router.get("/my",isAuthorized,myApplications)

export default router