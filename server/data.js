const bcrypt = require("bcrypt");

const data = {
  users: [
    {
      name: "Xiangen",
      email: "susan@gmail.com",
      password: bcrypt.hashSync("123456", 8),
      isAdmin: true,
    },
    {
      name: "Hyangeun",
      email: "susan@gmail.com",
      password: bcrypt.hashSync("123456", 8),
      isAdmin: true,
    },
  ],
  products: [
    {
      brand: "NinkyNonk",
      name: "Toddler Fleece Jacket",
      category: "Jacket",
      image: "/images/product1.webp",
      price: 36.99,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: "high quality product",
    },
    {
      brand: "Happy Cherry",
      name: "Snowsuit Jumpsuit Down Coat",
      category: "Coat",
      image: "/images/product2.jpg",
      price: 47.99,
      countInStock: 20,
      rating: 4.3,
      numReviews: 10,
      description: "high quality product",
    },
    {
      brand: "CECORC",
      name: "Winter Coats for Kids with Hoods",
      category: "Coat",
      image: "/images/product3.jpg",
      price: 22.95,
      countInStock: 15,
      rating: 4.6,
      numReviews: 10,
      description: "high quality product",
    },
    {
      brand: "Tumaron",
      name: "Baby Girl Winter Snowsuit",
      category: "Snowsuit",
      image: "/images/product4.jpg",
      price: 33.94,
      countInStock: 5,
      rating: 4.5,
      numReviews: 10,
      description: "high quality product",
    },
    {
      brand: "Fairy Baby",
      name: "Toddler Baby Winter Hooded Jacket",
      category: "Jacket",
      image: "/images/product5.jpg",
      price: 29.99,
      countInStock: 0,
      rating: 4.8,
      numReviews: 10,
      description: "high quality product",
    },
  ],
};

module.exports = data;
