const UserController = require("../controllers/userController");
const { isAuth, isAdmin } = require("../config/jwt.config");
const userController = require("../controllers/userController");

module.exports = function (app) {
  // admin users
  app.get("/api/users", isAuth, isAdmin, UserController.adminUser);
  // register user
  app.post("/api/users/register", UserController.register);
  // login user
  app.post("/api/users/login", UserController.login);
  // logout user
  app.post("/api/users/logout", isAuth, UserController.logout);
  // get one user
  app.get("/api/users/:id", UserController.getOneUser);
  // get one user
  app.put("/api/users/:id", isAuth, UserController.updateProfile);
  // admin user
};
