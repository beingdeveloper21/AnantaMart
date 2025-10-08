// controllers/userControllers.js
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../config/email.js";  // ✅ use centralized email util

// Create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ------------------- User Login -------------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token, userId: user._id });
  } catch (error) {
    console.error("loginUser error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ------------------- User Registration -------------------
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists with this email" });
    }

    // Validate email and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    // Generate JWT token
    const token = createToken(user._id);

    // ---------------- Send Welcome Email ----------------
    try {
      await sendEmail({
        to: email,
        subject: "Welcome to AnantaMart!",
        html: `
          <h1>Welcome to AnantaMart, ${name}!</h1>
          <p>We’re excited to have you onboard 🎉</p>
          <p>Streamline your business procurement with AnantaMart.</p>
          <p>
            ✔️ Quality products<br>
            ✔️ Competitive pricing<br>
            ✔️ Dedicated business support
          </p>
          <p>Happy Shopping!<br>– Team AnantaMart</p>
        `,
      });
      console.log("✅ Welcome email sent to", email);
    } catch (emailError) {
      console.error("❌ Failed to send welcome email:", emailError);
    }

    // -----------------------------------------------------

    res.json({ success: true, token, userId: user._id });
  } catch (error) {
    console.error("registerUser error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ------------------- Admin Login -------------------
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("adminLogin error:", error);
    res.json({ success: false, message: error.message });
  }
};
// controllers/userControllers.js  (append)
const getUserStatus = async (req, res) => {
  try {
    // accept userid from headers (keep it simple and match frontend)
    const userId = req.headers.userid || req.headers['user-id'];
    if (!userId) return res.status(400).json({ success: false, message: "userid header required" });

    const user = await userModel.findById(userId).select("plusMember");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    return res.json({ success: true, plusMember: !!user.plusMember });
  } catch (error) {
    console.error("getUserStatus error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export { loginUser, registerUser, adminLogin,getUserStatus };
