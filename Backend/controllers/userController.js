import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

const createAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
};

const createRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// ---------------- REGISTER ----------------
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email." });
    }

    if (!validator.isStrongPassword(password, { minLength: 8 })) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long and include numbers, uppercase, lowercase, and symbols.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    // save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      accessToken,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ---------------- LOGIN ----------------
const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    // update refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Sign in successful",
      accessToken,
    });
  } catch (error) {
    console.error("Sign in error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- REFRESH ----------------
const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ success: false, message: "No refresh token" });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ success: false, message: "Invalid refresh token" });
    }

    const accessToken = createAccessToken(user._id);
    return res.json({ success: true, accessToken });
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid or expired refresh token" });
  }
};

// ---------------- LOGOUT ----------------
const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        await userModel.findByIdAndUpdate(decoded.id, { $unset: { refreshToken: 1 } });
      } catch (err) {
        // token might be expired -> still clear cookie
      }
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.json({ success: true, message: "Logged out" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default { userRegister, userSignIn, refresh, logout };
