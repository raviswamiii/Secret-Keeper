import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/userModel";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "7d" });
};

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({email});
    if (exists)
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });

    if (!validator.isEmail(email))
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email." });

    if (!password || password.length < 8)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
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

    res
      .status(201)
      .json({ success: true, message: "User registered successfully.", token });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export default userRegister;
