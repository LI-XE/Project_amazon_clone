const ProductController = require("../controllers/productController");

module.exports = function (app) {
  // create products
  app.get("/api/products/create", ProductController.createProducts);
  // all products
  app.get("/api/products/", ProductController.products);
  // // get one product
  app.get("/api/products/:id", ProductController.getOneProduct);
};
