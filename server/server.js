require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
multer = require("multer");
const uploadRouter = require("./routers/uploadRouter.js");

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

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Routes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    // cb(null, `${Date.now()}.jpg`);
    // cb(null, file.originalname);
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
// console.log(upload);
app.post("/api/uploads", upload.single("file"), (req, res) => {
  try {
    console.log(req.file);
    return res.status(200).json(`/${req.file.filename}`);
  } catch (err) {
    console.log(err);
  }
});

require("./routers/productRouter")(app);
require("./routers/userRouter")(app);
require("./routers/orderRouter")(app);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.get("/", (req, res) => {
  res.send("Server is ready ");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.MY_PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});
