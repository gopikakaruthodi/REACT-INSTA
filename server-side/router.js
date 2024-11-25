import { Router } from "express";
import * as rh from "./requestHandler.js";
import Auth from "./middleware/Auth.js";


const router=Router()

router.route("/signup").post(rh.signup)
router.route("/signin").post(rh.signin)
router.route("/checkemail").post(rh.checkEmail)
router.route("/getuser").get(Auth,rh.getUser)

router.route("/adduserdata").post(rh.editUserData)
router.route("/getuserdata").get(Auth,rh.getUserData)
router.route("/deleteuserdata").delete(rh.deleteUserData)




export default router
