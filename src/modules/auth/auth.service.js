import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../DB/models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "saraha_secret_key";

// 1. Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password, phone, age } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already exists." });

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({ name, email, password: hashedPassword, phone, age });

    return res.status(201).json({ message: "User registered successfully", userId: user._id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 2. Signin
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
