const ProductController = require("../controllers/productController");
const { isAuth, isAdmin } = require("../config/jwt.config");

module.exports = function (app) {
  // create products
  app.post("/api/products/create", ProductController.createProducts);
  // all products
  app.get("/api/products/", ProductController.products);

  // get categories
  app.get("/api/products/categories", ProductController.getCategories);
  // all products admin
  app.get(
    "/api/products/admin",
    isAuth,
    isAdmin,
    ProductController.productListsAdmin
  );
  // create products
  app.post("/api/products", isAuth, isAdmin, ProductController.addProduct);
  // edit products
  app.put("/api/products/:id/edit", isAuth, isAdmin, ProductController.editProduct);

  // get one product
  app.get("/api/products/:id", ProductController.getOneProduct);
  // delete
  app.delete("/api/products/:id", ProductController.deleteProduct);
  // create review
  app.post("/api/products/:id/reviews", isAuth, ProductController.createReview);
};
