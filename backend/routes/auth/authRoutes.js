import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} from "../../controllers/auth/authController.js";
import User  from "../../models/User.js";
import chalk from'chalk';

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Fetch user details (excluding password)
    const user = await User.findById(req.user.id).select("-password");

    res.json({ success: true, user }); // ✅ Ensure it's returning JSON
  } catch (err) {
    console.error(chalk.bgMagenta("Auth Check Error:", err));
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// EXPORT
export { router };
