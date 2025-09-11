import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
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

    if (!validator.isStrongPassword(password, { minLength: 8 }))
      return res.status(400).json({
        success: false,
        message: "Password must be 8 characters long.",
      });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });

    const user = await userModel.findOne({ email });

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });

    const token = createToken(user._id);

    return res
      .status(200)
      .json({ success: true, message: "Sign in successful", token });
  } catch (error) {
    console.error("Sing in error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default { userRegister, userSignIn };
