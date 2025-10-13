import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import blacklistTokenModel from "../models/blacklistToken.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const signUp = async (req, res) => {
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
        .json({ success: false, message: "Please enter valid email." });

    if (!validator.isStrongPassword(password))
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8 character's long including uppercase, lowercase, number and symbol.",
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = newUser.save();
    const token = createToken(user._id);

    return res
      .status(200)
      .json({ success: true, message: "User registered successfully.", token });
  } catch (error) {
    console.error("SignUp error:", error.message);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });

    const user = await userModel.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });

    const token = createToken(user._id);

    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully.", token });
  } catch (error) {
    console.error("SignIn error:", error.message);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token)
      res.status(400).json({ success: false, message: "Token not found." });
    res.clearCookie("token");
    await blacklistTokenModel.create({ token });
    res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.log("Logout error:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export default { signUp, signIn, logout };
