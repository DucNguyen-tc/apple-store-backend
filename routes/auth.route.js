const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");

router.post("/register", authController.register);
router.post("/login", authController.login);


router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret);
    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
});

module.exports = router;
