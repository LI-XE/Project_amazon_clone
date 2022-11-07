require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");

const cors = require("cors");
const cookieParser = require("cookie-parser");

//server configuration first
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

// run the Mongoose connect file
require("./config/mongoose.config");

// Routes
require("./routers/productRouter")(app);
require("./routers/userRouter")(app);
require("./routers/orderRouter")(app);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.get("/", (req, res) => {
  res.send("Server is ready ");
});

// const __dirname = path.resolve();
app.use(express.static(("amazon_clone/build/")));s
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "amazon_clone","build", "index.html"))
);

// app.use("*", express.static(path.join(__dirname, "/amazon_clone/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "amazon_clone", "build", "index.html"));
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.MY_PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});
