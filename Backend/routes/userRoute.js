import express from "express";
import userController from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/signUp", userController.signUp);
userRouter.post("/signIn", userController.signIn);

export default userRouter;
