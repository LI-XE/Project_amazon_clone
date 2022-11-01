const SeedController = require("../controllers/seedController");

module.exports = function (app) {
  app.get("/api/seed", SeedController.seed);
};
