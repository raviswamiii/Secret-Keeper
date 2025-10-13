import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blacklistToken.js";
import userModel from "../models/userModel.js";

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.Authorization?.split(" ")[1];

    if (!token)
      return res
        .status(400)
        .json({ success: false, message: "Token not found." });

    const blacklisted = await blacklistTokenModel.findOne({ token });

    if (blacklisted)
      return res
        .status(400)
        .json({ success: false, message: "Unauthorized token." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findbyId(decoded.id);

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found." });

    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Authorization error." });
  }
};

export default userAuth;
