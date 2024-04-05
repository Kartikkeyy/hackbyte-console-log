import express  from "express";
import { getUser, login, logout, register} from "../controller/userController.js"
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register",register).post("/login",login).get("/logout",isAuthorized,logout).get("/getuser",isAuthorized,getUser)

export default router;