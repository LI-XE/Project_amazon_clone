const ProductController = require("../controllers/productController");
const { isAuth } = require("../config/jwt.config");

module.exports = function (app) {
  // create products
  app.post("/api/products/create", ProductController.createProducts);
  // all products
  app.get("/api/products/", ProductController.products);
  // get categories
  app.get("/api/products/categories", ProductController.getCategories);
  // get one product
  app.get("/api/products/:id", ProductController.getOneProduct);
  // delete
  app.delete("/api/products/:id", ProductController.deleteProduct);
  // create review
  app.post("/api/products/:id/reviews", isAuth, ProductController.createReview);
};
