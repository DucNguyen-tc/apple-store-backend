const User = require("../models/user.model");

// Lấy thông tin người dùng đã đăng nhập
exports.getProfile = async (req, res) => {
  try {
    console.log("User ID:", req.user.id); // Log user ID for debugging
    const user = await User.getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found"});
    }

    res.json(user);
  }
  catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Tạo mới user
exports.createUser = async (req, res, next) => {
  try {
    const id = await User.createUser(req.body);
    res.status(201).json({
      message: "User created successfully",
      id: id,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy danh sách users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Lấy user theo id
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Cập nhật user theo id
exports.updateUser = async (req, res, next) => {
  try {
    const updated = await User.updateUser(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Xóa user theo id
exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
