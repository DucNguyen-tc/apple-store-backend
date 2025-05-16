const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.get("/me", verifyToken, UserController.getProfile); // Lấy thông tin người dùng đã đăng nhập
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);


module.exports = router;
