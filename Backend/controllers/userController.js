import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";

const createAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "15m" });
};

const createRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: "7d" });
};

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });

    const exists = await userModel.findOne({ email });

    if (exists)
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });

    if (!validator.isEmail(email))
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email." });

    if (!validator.isStrongPassword(password))
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Password must be 8 characters long including uppercase, lowercase, number and symbol.",
        });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    user.refreshToken = refreshToken;
    const user = await newUser.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(201)
      .json({
        success: true,
        message: "User registered successfully.",
        accessToken,
      });
  } catch (error) {
    console.log("Registration error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export default userRegister;
