import express from "express";
import userController from "../controllers/userController.js";
import userAuth from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/signUp", userController.signUp);
userRouter.post("/signIn", userController.signIn);
userRouter.post("/logout", userAuth, userController.logout);

export default userRouter;
