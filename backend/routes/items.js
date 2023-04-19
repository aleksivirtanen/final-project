const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
  getItems,
  createItem,
  editItem,
  deleteItem,
  getItemById,
  getItemsByUserId,
} = require("../controllers/items");

router.get("/", getItems);

router.use(verifyToken);

router.get("/myitems", getItemsByUserId);
router.get("/:id", getItemById);
router.put("/:id", editItem);
router.post("/", createItem);
router.delete("/:id", deleteItem);

module.exports = router;
