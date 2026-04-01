const userModel = require("../models/user.model");

module.exports.profileController = async (req, res) => {
  const userId = req.userId;
  // console.log(userId);
  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
};

module.exports.editProfileController = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, bio } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, phone, bio },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};
