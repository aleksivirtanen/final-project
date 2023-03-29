const Joi = require("joi");
const items = require("../models/items");

const getItems = async (req, res) => {
  try {
    const response = await items.findAll();
    if (response) {
      res.send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const getItemById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await items.findItemById(id);
    if (response.length === 1) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

const getItemsByUserId = async (req, res) => {
  try {
    const userId = req.userData.userId;
    const response = await items.findItemsByUserId(userId);
    if (response) {
      res.send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const createItem = async (req, res) => {
  const schema = Joi.object({
    itemName: Joi.string().min(3).required(),
    category: Joi.string().min(3).required(),
    price: Joi.number().precision(2).positive().required(),
    image: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const item = {
    userId: req.userData.userId,
    itemName: req.body.itemName,
    category: req.body.category,
    price: req.body.price,
    image: req.body.image,
  };

  try {
    const result = await items.findByItem(item);
    if (result.length > 0) {
      res.status(400).send({ message: "Item is in the database already" });
      return;
    }
    const response = await items.create(item);
    if (response) {
      item.id = response.insertId;
      res.status(201).send(item);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await items.deleteById(id);
    if (response) {
      res.status(200).send({ message: "Item deleted" });
    }
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = {
  createItem,
  getItemsByUserId,
  getItemById,
  deleteItem,
  getItems,
};
