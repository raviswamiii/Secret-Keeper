import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blacklistToken.js";
import userModel from "../models/userModel.js";

const userAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
    }

    const blacklisted = await blacklistTokenModel.findOne({ token });
    if (blacklisted) {
      return res
        .status(403)
        .json({ success: false, message: "Token has been invalidated." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token." });
    }

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token expired. Please login again." });
    }

    return res
      .status(500)
      .json({ success: false, message: "Authorization error." });
  }
};

export default userAuth;
