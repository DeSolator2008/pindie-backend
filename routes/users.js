const usersRouter = require('express').Router();
  
const findAllUsers = require('../middlewares/users');
const sendAllUsers = require('../controllers/users');
  
usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.post(
    "/users",
    findAllUsers,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword,
    checkAuth,
    hashPassword,
    createUser,
    sendUserCreated
  ); 
usersRouter.put("/users/:id", findUserById, updateUser, sendUserUpdated); 
usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);
usersRouter.delete("/users/:id", checkAuth, deleteUser, sendUserDeleted); 
usersRouter.get("/users", findAllUsers, filterPassword, sendAllUsers);
usersRouter.get("/users/:id", findUserById, filterPassword, sendUserById); 
usersRouter.get("/me", checkAuth, sendMe); 
  
module.exports = usersRouterRouter;