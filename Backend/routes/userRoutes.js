import express from "express";
import userController from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/register", userController.userRegister);
userRouter.post("/signIn", userController.userSignIn);

export default userRouter;