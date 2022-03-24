const UserController = require("../controllers/userController");

module.exports = function (app) {
  // register user
  app.post("/api/users/register", UserController.register);
  // login user
  app.post("/api/users/login", UserController.login);
  // logout user
  app.post("/api/users/logout", UserController.logout);
  // get one user
  app.get("/api/users/:id", UserController.getOneUser);
};
