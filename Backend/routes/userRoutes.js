import express from "express";
const userRouter = express.Router();
import userController from "../controllers/userController.js"

userRouter.post("/register", userController.userRegister);

export default userRouter;