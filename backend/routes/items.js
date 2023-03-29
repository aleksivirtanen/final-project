const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
  getItems,
  createItem,
  deleteItem,
  getItemById,
  getItemsByUserId,
} = require("../controllers/items");

router.get("/", getItems);
//router.get("/:id", getItemById);

router.use(verifyToken);

router.get("/myitems", getItemsByUserId);
router.post("/", createItem);
router.delete("/:id", deleteItem);

module.exports = router;
