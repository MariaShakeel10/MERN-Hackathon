import express from "express";
import User from "../../models/User.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "_id username"); // Fetch only _id and username
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export { router };
