import express from "express"
import { applicationUpdate, postApplication } from "../controller/applicationController.js"
import { isAuthorized } from "../middlewares/auth.js"

const router = express.Router()

router.post("/post/:jobId",isAuthorized,postApplication)
router.put("/update/:id",isAuthorized,applicationUpdate)
// router.get("/j")

export default router