import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import chalk from "chalk";

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (err) {
    console.error(chalk.bgMagenta("Registration error:", err));
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    console.log(chalk.bgBlue("Login request received:", req.body)); // ✅ Debugging request data

    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    const checkUser = await User.findOne({ email });
    console.log(chalk.bgBlue("User found:", checkUser)); // ✅ Check if user exists

    if (!checkUser) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist" });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log("Generated Token:", token); // ✅ Debugging token

    // res
      // .cookie("token", token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: "None", // ✅ Needed for Vercel + Railway cookie sharing
      // })
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,      // ❗ local only
        sameSite: "Lax"     // ❗ important for localhost
      })
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          _id: checkUser._id,
          email: checkUser.email,
          username: checkUser.username,
          role: checkUser.role,
        },
      });
  } catch (err) {
    console.error(chalk.bgMagenta("Backend Login Error:", err)); // ✅ Log actual backend error
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// logout
const logoutUser = (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged out successfully" });
};

//  auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Unauthorized User" });
  }
};

// Export the functions
export { registerUser, loginUser, logoutUser, authMiddleware };
