const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");

const users = require("../models/users");

const getUsers = async (req, res) => {
  try {
    const response = await users.findAll();
    if (response) {
      res.send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Could not create user, try again please" });
  }

  const newUser = {
    id: v4(),
    name,
    email,
    password: hashedPassword,
  };

  try {
    const exist = await users.findByEmail(newUser.email);
    if (exist.length > 0) {
      return res
        .status(422)
        .send({ message: "Could not create user, user exists" });
    }

    const result = await users.create(newUser);
    if (!result) {
      return res
        .status(500)
        .send({ message: "Could not create user, try again please" });
    }

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      token,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Could not create user, try again please" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let identifiedUser;
  try {
    const result = await users.findByEmail(email);
    if (!result[0]) {
      return res
        .status(401)
        .send({ message: "No user found - Check your credentials" });
    }
    identifiedUser = result[0];
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .send({ message: "No user found - Check your credentials" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }

  try {
    const token = jwt.sign(
      {
        id: identifiedUser.id,
        email: identifiedUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      id: identifiedUser.id,
      email: identifiedUser.email,
      token,
    });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  let identifiedUser;
  try {
    const result = await users.findByEmail(email);
    if (!result[0]) {
      return res
        .status(401)
        .send({ message: "No user found - Check your credentials" });
    }
    identifiedUser = result[0];
    const secret = process.env.JWT_KEY + identifiedUser.password;
    const token = jwt.sign(
      {
        email: identifiedUser.email,
        id: identifiedUser.id,
      },
      secret,
      { expiresIn: "5m" }
    );
    const link = `${process.env.FRONTEND_URL}/resetpassword/${identifiedUser.id}/${token}`;
    console.log(link);
    res.status(200).send({ message: "Link sent to Email", link });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const verifyLink = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const result = await users.findById(id);
  if (!result[0]) {
    return res.status(401).send({ message: "No user found" });
  }
  let identifiedUser = result[0];
  const secret = process.env.JWT_KEY + identifiedUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.status(200).send({ message: "Verified" });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong, link may have expired!" });
  }
};

const updatePassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const result = await users.findById(id);
  if (!result[0]) {
    return res.status(401).send({ message: "No user found" });
  }
  let identifiedUser = result[0];
  const secret = process.env.JWT_KEY + identifiedUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = {
      id: id,
      password: hashedPassword,
    };
    const response = await users.editPassword(user);
    if (response) {
      res.status(200).send({ message: "Password updated" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong, link may have expired!" });
  }
};

module.exports = {
  getUsers,
  loginUser,
  signUpUser,
  forgotPassword,
  verifyLink,
  updatePassword,
};

//
