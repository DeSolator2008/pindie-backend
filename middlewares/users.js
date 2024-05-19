const users = require('../models/user');
const bcrypt = require("bcryptjs");

const hashPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
}; 

const findAllUsers = async (req, res, next) => {
  req.usersArray = await users.find({});
  next();
}

const createUser = async (req, res, next) => {
  try {
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    res.status(400).send("Ошибка при создании пользователя");
  }
};

const findUserById = async (req, res, next) => {
  console.log("GET /users/:id");
  try {
    req.user = await users.findById(req.params.id);
    next();
  } catch (error) {
    res.status(404).send({ message: "User not found" });
  }
}; 

const updateUser = async (req, res, next) => {
  try {
    req.user = await users.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка обновления пользователя" }));
  }
}; 

const deleteUser = async (req, res, next) => {
  try {
    req.user = await users.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
  }
}; 

const checkEmptyName = async (req, res, next) => {
  if (!req.body.name) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Заполни поле имени" }));
  } 
  else {
    next();
  }
}; 

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (!req.body.name||!req.body.email||!req.body.password) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Заполни поле имени и пароля" }));
  } 
  else {
    next();
  }
}; 

const checkEmptyNameAndEmail = async (req, res, next) => {
  if (!req.body.name||!req.body.email) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Заполни поле имени, пароля и имэйла" }));
  } 
  else {
    next();
  }
};

const filterPassword = (req, res, next) => {
if (req.user) {
  req.user = filterUser(req.user);
}
if (req.usersArray) {
  req.usersArray = req.usersArray.map((user) => filterUser(user));
}
next();
}; 

module.exports = hashPassword, findAllUsers, createUser, findUserById, updateUser, deleteUser, checkEmptyName, checkEmptyNameAndEmail, checkEmptyNameAndEmailAndPassword, filterPassword; 