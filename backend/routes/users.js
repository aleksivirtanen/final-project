const express = require("express");
const router = express.Router();

const {
  getUsers,
  loginUser,
  signUpUser,
  forgotPassword,
  verifyLink,
  updatePassword,
} = require("../controllers/users");

router.get("/", getUsers);
router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/forgotpassword", forgotPassword);
router.get("/resetpassword/:id/:token", verifyLink);
router.put("/resetpassword/:id/:token", updatePassword);

module.exports = router;
