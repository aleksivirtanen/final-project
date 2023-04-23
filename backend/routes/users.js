const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
  getUsers,
  loginUser,
  signUpUser,
  forgotPassword,
  verifyLink,
  updatePassword,
} = require("../controllers/users");

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/forgotpassword", forgotPassword);
router.get("/resetpassword/:id/:token", verifyLink);
router.put("/resetpassword/:id/:token", updatePassword);

router.use(verifyToken);

router.get("/", getUsers);

module.exports = router;
