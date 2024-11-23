import { Router } from "express";
import * as rh from "./requestHandler.js";
import Auth from "./middleware/Auth.js";


const router=Router()

router.route("/signup").post(rh.signup)
router.route("/signin").post(rh.signin)
router.route("/checkemail").post(rh.checkEmail)
router.route("/getuser").get(Auth,rh.getUser)



export default router
