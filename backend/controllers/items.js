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
      res.status(200).send(response[0]);
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
    description: Joi.string().allow(null, ''),
    category: Joi.string().min(3).required(),
    price: Joi.number().precision(2).positive().required(),
    image: Joi.string().allow(null, ''),
  });

  const { error } = schema.validate(req.body, {convert:false});
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const item = {
    userId: req.userData.userId,
    itemName: req.body.itemName,
    description: req.body.description,
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

const editItem = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number(),
    itemName: Joi.string().min(3).required(),
    description: Joi.string().allow(null, ''),
    price: Joi.number().precision(2).positive().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const item = {
    id: req.body.id,
    itemName: req.body.itemName,
    description: req.body.description,
    price: req.body.price,
  };

  try {
    const response = await items.edit(item);
    if (response) {
      res.status(200).send(item);
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
  editItem,
  getItemsByUserId,
  getItemById,
  deleteItem,
  getItems,
};
