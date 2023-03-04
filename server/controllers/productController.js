const Product = require("../models/productModel");
const data = require("../data.js");
const { update } = require("../models/productModel");

module.exports = {
  // create products
  createProducts: (req, res) => {
    Product.insertMany(data.products)
      .then((createProducts) => {
        console.log(createProducts);
        res.json(createProducts);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  // get all products
  products: (req, res) => {
    console.log("All Products List");
    const page = Number(req.query.pageNum) || 1;
    const pageSize = 10;
    const seller = req.query.seller || "";
    const name = req.query.name || "";
    const category = req.query.category || "";
    const order = req.query.order || "";
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const sellerFilter = seller ? { seller } : {};
    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : { _id: -1 };

    const countProducts = Product.count({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });

    Product.find({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate("seller", "seller.name seller.logo")
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .then((products) => {
        Product.countDocuments({
          ...sellerFilter,
          ...nameFilter,
          ...categoryFilter,
          ...priceFilter,
          ...ratingFilter,
        }).then((countProducts) => {
          console.log(products);
          console.log(countProducts);
          console.log(page);
          res.status(200).json({
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / pageSize),
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  // get one product
  getOneProduct: (req, res) => {
    console.log("get One Product");
    console.log(req.params.id);

    Product.findById(req.params.id)
      .then((product) => {
        console.log(product);
        product.reviews.reverse();
        res.json(product);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  // Get Categories
  getCategories: (req, res) => {
    Product.find({})
      .distinct("category")
      .then((categories) => {
        res.json(categories);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  // create review
  createReview: (req, res) => {
    const productId = req.params.id;
    Product.findById(productId)
      .then((product) => {
        if (product.reviews.find((x) => x.name === req.user.username)) {
          res.status(400).json({ message: "You already submitted a review." });
        } else {
          if (product) {
            const review = {
              name: req.user.username,
              rating: Number(req.body.rating),
              comment: req.body.comment,
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
              product.reviews.reduce((a, c) => c.rating + a, 0) /
              product.reviews.length;
            console.log(review);
            product.save().then((updatedProduct) => {
              res.status(201).json({
                message: " Review Created. ",
                review:
                  updatedProduct.reviews[updatedProduct.reviews.length - 1],
              });
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ message: "Product Not Found." });
      });
  },

  // product list admin
  // PAGE_SIZE = 3;
  productListsAdmin: (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || 10;
    const seller = req.query.seller || "";
    const sellerFilter = seller ? { seller } : {};
    Product.find({ ...sellerFilter })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .then((products) => {
        Product.countDocuments().then((countProducts) => {
          console.log(products);
          console.log(countProducts);
          console.log(page);
          res.status(200).json({
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / pageSize),
          });
        });

        // console.log(pages);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  },

  // create products
  addProduct: (req, res) => {
    const newProduct = new Product({
      name: req.body.name + Date.now(),
      seller: req.user._id,
      brand: req.body.brand,
      category: req.body.category,
      image: req.body.image,
      price: req.body.price,
      countInStock: req.body.countInStock,
      rating: 0,
      numReviews: 0,
      description: req.body.description,
    });

    newProduct
      .save()
      .then((createProduct) => {
        console.log(createProduct);
        res.status(200).json({ message: "Product Created.", createProduct });
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  // Edit Product
  editProduct: (req, res) => {
    console.log("id: " + req.params.id);
    console.log(req.body);
    Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedProduct) => {
        console.log(updatedProduct);
        res.json({ message: " Product Updated.", product: updatedProduct });
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  // Delete Product
  deleteProduct: (req, res) => {
    console.log("id: " + req.params.id);
    Product.findByIdAndDelete(req.params.id)
      .then((deletedProduct) => {
        console.log(deletedProduct);
        res.json({ message: "Product is deleted.", product: deletedProduct });
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
};
