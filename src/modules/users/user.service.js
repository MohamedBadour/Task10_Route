import { User } from "../../DB/models/user.model.js";

// get profile
export const getProfile = async (req, res) => {
  return res.status(200).json({ user: req.user });
};

// update profile
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, age } = req.body;
    const updated = await User.findByIdAndUpdate(req.user._id, { name, phone, age }, { new: true }).select("-password");
    return res.status(200).json({ message: "Profile updated successfully", user: updated });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// delete profile
export const deleteProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    return res.status(200).json({ message: "Profile deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
