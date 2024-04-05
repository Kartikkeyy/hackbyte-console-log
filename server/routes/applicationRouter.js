import express from "express"
import { postApplication } from "../controller/applicationController.js"
import { isAuthorized } from "../middlewares/auth.js"

const router = express.Router()

router.post("/post",isAuthorized,postApplication)

export default router