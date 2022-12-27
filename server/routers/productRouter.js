const ProductController = require("../controllers/productController");

module.exports = function (app) {
  // create products
  app.get("/api/products/create", ProductController.createProducts);
  // all products
  app.get("/api/products/", ProductController.products);
  // get one product
  app.get("/api/products/:id", ProductController.getOneProduct);
  // delete
  app.delete("/api/products/:id", ProductController.deleteProduct);
  // get categories
  app.get("/api/products/categories", ProductController.getCategories);
};
