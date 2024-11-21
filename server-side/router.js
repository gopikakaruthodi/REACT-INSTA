import { Router } from "express";
import * as rh from "./requestHandler.js";


const router=Router()

router.route("/signup").post(rh.signup)
router.route("/signin").post(rh.signin)
router.route("/checkemail").post(rh.checkEmail)



export default router
